import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const userId = session.metadata?.userId

      if (userId && session.subscription) {
        const subscriptionData: any = await stripe.subscriptions.retrieve(
          session.subscription as string
        )

        const currentPeriodEnd = subscriptionData.current_period_end || Math.floor(Date.now() / 1000)

        await prisma.subscription.upsert({
          where: { userId },
          create: {
            userId,
            stripeCustomerId: session.customer as string,
            stripePriceId: subscriptionData.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(currentPeriodEnd * 1000),
            status: subscriptionData.status,
          },
          update: {
            stripePriceId: subscriptionData.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(currentPeriodEnd * 1000),
            status: subscriptionData.status,
          },
        })
      }
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice: any = event.data.object
      if (invoice.subscription) {
        const subscriptionData: any = await stripe.subscriptions.retrieve(
          invoice.subscription as string
        )

        const currentPeriodEnd = subscriptionData.current_period_end || Math.floor(Date.now() / 1000)

        await prisma.subscription.updateMany({
          where: { stripeCustomerId: invoice.customer as string },
          data: {
            stripePriceId: subscriptionData.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(currentPeriodEnd * 1000),
            status: subscriptionData.status,
          },
        })
      }
      break
    }

    case 'customer.subscription.deleted': {
      const subscription: any = event.data.object

      await prisma.subscription.updateMany({
        where: { stripeCustomerId: subscription.customer as string },
        data: {
          status: 'canceled',
        },
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}
