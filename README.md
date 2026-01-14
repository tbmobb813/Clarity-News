# Clarity News

An AI-powered news aggregator with bias detection and intelligent summaries. Built with modern web technologies and designed for transparency in news consumption.

## 🚀 Features

- **AI-Powered Summaries**: Automatic article summarization using OpenAI GPT-3.5
- **Bias Detection**: Custom bias analysis to help you understand news perspective
- **Real-time News**: Live news from NewsAPI.org across multiple categories
- **Redis Caching**: Fast content delivery with Upstash Redis
- **User Authentication**: Secure auth powered by Supabase
- **Subscription Management**: Stripe integration for premium features
- **Monitoring**: Full observability with Sentry, PostHog, and Vercel Analytics

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** + **shadcn/ui** for beautiful UI
- **React Query** for data fetching
- **Zustand** for state management

### Backend
- **Next.js API Routes** for serverless functions
- **Prisma ORM** with PostgreSQL (Supabase)
- **Redis** (Upstash) for caching

### AI & Data
- **OpenAI API** for article summaries and bias detection
- **NewsAPI.org** for news articles
- Custom bias detection algorithm

### Infrastructure
- **Vercel** for hosting and deployment
- **Supabase** for database and authentication
- **Stripe** for payment processing
- **Cloudflare** CDN integration

### Monitoring
- **Vercel Analytics** for web vitals
- **Sentry** for error tracking
- **PostHog** for product analytics

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Supabase account)
- Redis instance (Upstash account)
- OpenAI API key
- NewsAPI.org API key
- Stripe account (for payments)
- Sentry account (for monitoring)
- PostHog account (for analytics)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tbmobb813/Clarity-News.git
cd Clarity-News
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string from Supabase
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `UPSTASH_REDIS_REST_URL`: Upstash Redis URL
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis token
- `OPENAI_API_KEY`: OpenAI API key
- `NEWS_API_KEY`: NewsAPI.org API key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `NEXT_PUBLIC_SENTRY_DSN`: Sentry DSN
- `SENTRY_AUTH_TOKEN`: Sentry auth token
- `NEXT_PUBLIC_POSTHOG_KEY`: PostHog API key
- `NEXT_PUBLIC_APP_URL`: Your app URL (http://localhost:3000 for dev)

### 4. Set up the database

```bash
npm run prisma:generate
npm run prisma:push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
clarity-news/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   ├── articles/     # News article endpoints
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── subscription/ # Stripe subscription
│   │   │   └── webhook/      # Webhook handlers
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   ├── providers.tsx     # App providers
│   │   └── globals.css       # Global styles
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── ArticleCard.tsx  # Article display
│   │   └── Header.tsx       # Navigation header
│   ├── lib/                 # Utility libraries
│   │   ├── prisma.ts        # Prisma client
│   │   ├── supabase.ts      # Supabase client
│   │   ├── redis.ts         # Redis client
│   │   ├── openai.ts        # OpenAI integration
│   │   ├── newsapi.ts       # NewsAPI integration
│   │   ├── stripe.ts        # Stripe client
│   │   ├── posthog.tsx      # PostHog provider
│   │   └── utils.ts         # Helper functions
│   ├── store/               # Zustand stores
│   │   ├── user.ts          # User state
│   │   └── article.ts       # Article state
│   └── types/               # TypeScript types
│       └── index.ts         # Type definitions
├── .env.example             # Environment variables template
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema changes to database
- `npm run prisma:studio` - Open Prisma Studio

## 🎨 Key Features Explained

### AI-Powered Summaries
Articles are automatically summarized using OpenAI's GPT-3.5 model, providing quick insights without reading full articles.

### Bias Detection
Each article is analyzed for political and media bias, scored from -1 (left-leaning) to 1 (right-leaning), helping users understand different perspectives.

### Caching Strategy
Redis caching reduces API calls and improves performance, with a 15-minute cache for news articles.

### Authentication Flow
Supabase handles user authentication with email/password, with user data synced to the Prisma database.

### Subscription Management
Stripe Checkout handles subscription creation, with webhooks updating subscription status in real-time.

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically:
- Build the application
- Set up serverless functions
- Configure CDN
- Enable analytics

### Database Migrations

After deployment, run migrations:

```bash
npx prisma migrate deploy
```

## 🔒 Security

- All API keys are stored as environment variables
- Stripe webhooks are verified with signatures
- Supabase handles authentication securely
- Rate limiting on API routes (recommended to add)

## 📊 Monitoring

- **Sentry**: Tracks errors and performance issues
- **PostHog**: User behavior and product analytics
- **Vercel Analytics**: Web vitals and performance metrics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn for the beautiful UI components
- All the open-source libraries used in this project

