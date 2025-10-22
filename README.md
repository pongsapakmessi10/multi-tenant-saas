# Multi-Tenant SaaS Platform

A complete multi-tenant SaaS platform built with **Next.js 14**, **Supabase**, and **Vercel**. Each tenant gets their own subdomain (e.g., `alice.fluke.xyz`) with complete data isolation and custom branding.

## 🚀 Features

- **Multi-Tenant Architecture**: Each tenant gets a custom subdomain
- **Data Isolation**: Complete tenant separation with Row Level Security
- **Modern Stack**: Next.js 14 App Router, Supabase, TypeScript, Tailwind CSS
- **Admin Panel**: Manage all tenants from a central dashboard
- **Custom Branding**: Each tenant can have their own colors and logo
- **Product Management**: Each tenant can manage their own products
- **Free Deployment**: Ready for Vercel deployment with Cloudflare DNS

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Main Domain   │    │   Subdomain 1   │    │   Subdomain 2   │
│  fluke.xyz      │    │ alice.fluke.xyz │    │  bob.fluke.xyz  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Next.js App   │
                    │   Middleware    │
                    │ Tenant Resolver │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │    Supabase     │
                    │   Database      │
                    │   (RLS Enabled) │
                    └─────────────────┘
```

## 📁 Project Structure

```
├── app/
│   ├── (public)/              # Public routes (main domain)
│   │   ├── page.tsx           # Landing page
│   │   ├── register/          # Tenant registration
│   │   ├── admin/             # Admin panel
│   │   └── tenant-not-found/  # 404 for invalid subdomains
│   ├── (tenant)/              # Tenant-specific routes
│   │   ├── layout.tsx         # Tenant layout
│   │   └── page.tsx           # Tenant homepage
│   ├── api/                   # API routes
│   │   ├── tenants/           # Tenant management
│   │   ├── products/          # Product management
│   │   └── auth/              # Authentication
│   ├── globals.css            # Global styles
│   └── layout.tsx             # Root layout
├── components/                # Reusable components
│   ├── tenant-provider.tsx    # Tenant context
│   ├── tenant-header.tsx      # Tenant navigation
│   ├── product-card.tsx       # Product display
│   ├── admin-header.tsx       # Admin navigation
│   ├── tenant-table.tsx       # Admin tenant table
│   └── stats-cards.tsx        # Admin statistics
├── lib/                       # Utilities and configurations
│   ├── supabase/              # Supabase clients
│   ├── database.types.ts      # Database types
│   ├── tenant.ts              # Tenant utilities
│   └── utils.ts               # General utilities
├── supabase/
│   └── migrations/            # Database migrations
├── middleware.ts              # Next.js middleware
├── vercel.json                # Vercel configuration
└── README.md                  # This file
```

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, make sure you have:
- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **Git** installed ([Download here](https://git-scm.com/))
- A **Supabase account** ([Sign up here](https://supabase.com))
- A **GitHub account** (for deployment)

### Step 1: Set Up the Project

**Option A: If you already have the project files (recommended)**
Since you already have the project files in your current folder, you can skip the git clone step:

```bash
# You're already in the project folder, so just install packages
npm install
```

**Option B: If you want to download fresh from GitHub**
If you prefer to download a fresh copy from GitHub:

```bash
# Clone the repository
git clone https://github.com/your-username/multi-tenant-saas.git

# Navigate to the project directory
cd multi-tenant-saas

# Install dependencies
npm install
```

**Which option should you choose?**
- **Use Option A** if you already have the project files (like you do in `c:\SaasTemplate`)
- **Use Option B** if you want to start completely fresh from GitHub

### Step 2: Set Up Supabase Database

#### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Choose your organization
4. Fill in project details:
   - **Name**: `multi-tenant-saas`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
5. Click **"Create new project"**
6. Wait for the project to be created (2-3 minutes)

#### 2.2 Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

#### 2.3 Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste it into the SQL editor
5. Click **"Run"** to execute the migration
6. You should see "Success. No rows returned" message

**What this migration does:**
- Creates `tenants`, `users`, and `products` tables
- Sets up Row Level Security (RLS) policies
- Creates indexes for better performance
- Inserts sample data for testing

### Step 3: Configure Environment Variables

#### 3.1 Create Environment File

```bash
# Copy the example environment file
cp env.example .env.local
```

#### 3.2 Fill in Your Credentials

Open `.env.local` and replace the placeholder values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Domain Configuration (for local development)
NEXT_PUBLIC_DOMAIN=localhost:3000
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_DOMAIN=localhost:3000
```

### Step 4: Run the Development Server

```bash
# Start the development server
npm run dev
```

You should see output like:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 2.3s
```

### Step 5: Test Your Application

#### 5.1 Test the Main Site

1. Open your browser and go to `http://localhost:3000`
2. You should see the landing page with:
   - Company logo and navigation
   - Hero section with "Get Started Free" button
   - Features section
   - Demo tenant links

#### 5.2 Test Tenant Registration

1. Click **"Get Started Free"** or go to `http://localhost:3000/register`
2. Fill in the registration form:
   - **Company Name**: `Test Company`
   - **Subdomain**: `test` (will become `test.localhost:3000`)
   - **Primary Color**: Choose any color
3. Click **"Create Tenant"**
4. You should see a success message

#### 5.3 Test Subdomain Access

1. After creating a tenant, you'll be redirected to the tenant site
2. The URL should be something like `http://test.localhost:3000`
3. You should see:
   - Tenant-specific header with your company name
   - Custom color scheme
   - Sample products (if any exist)

#### 5.4 Test Admin Panel

1. Go to `http://localhost:3000/admin`
2. You should see:
   - Admin dashboard with statistics
   - Table of all tenants
   - Options to view, edit, or delete tenants

### Step 6: Set Up Local Subdomain Testing

To test subdomains locally, you need to modify your hosts file:

#### Windows (Run as Administrator)

1. Open Notepad as Administrator
2. Open file: `C:\Windows\System32\drivers\etc\hosts`
3. Add these lines at the end:
```
127.0.0.1 localhost
127.0.0.1 alice.localhost
127.0.0.1 bob.localhost
127.0.0.1 demo.localhost
127.0.0.1 test.localhost
```
4. Save the file

#### macOS/Linux

```bash
# Edit hosts file
sudo nano /etc/hosts

# Add these lines
127.0.0.1 localhost
127.0.0.1 alice.localhost
127.0.0.1 bob.localhost
127.0.0.1 demo.localhost
127.0.0.1 test.localhost
```

#### Test Subdomains

Now you can visit:
- `http://alice.localhost:3000` - Alice's tenant site
- `http://bob.localhost:3000` - Bob's tenant site
- `http://demo.localhost:3000` - Demo tenant site
- `http://test.localhost:3000` - Your test tenant site

## 🎯 Understanding the Application

### How Multi-Tenancy Works

1. **Subdomain Detection**: The middleware detects the subdomain from the URL
2. **Tenant Resolution**: It looks up the tenant in the database
3. **Context Setting**: Tenant information is passed to all components
4. **Data Isolation**: Each tenant only sees their own data

### Key Components

- **Middleware** (`middleware.ts`): Handles subdomain routing
- **Tenant Provider** (`components/tenant-provider.tsx`): Provides tenant context
- **API Routes** (`app/api/`): Handle CRUD operations
- **Database Types** (`lib/database.types.ts`): TypeScript definitions

### Sample Data

The migration includes sample data:
- **3 tenants**: Alice Company, Bob Enterprises, Demo Store
- **4 products**: Distributed across the tenants
- **Sample colors**: Each tenant has a different primary color

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🔧 Troubleshooting

### Common Issues

**1. "Module not found" errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**2. Supabase connection errors**
- Check your `.env.local` file has correct credentials
- Verify your Supabase project is active
- Make sure the migration was run successfully

**3. Subdomains not working locally**
- Check your hosts file is configured correctly
- Restart your browser after modifying hosts file
- Try using incognito/private browsing mode

**4. Database errors**
- Go to Supabase dashboard → SQL Editor
- Run the migration again
- Check the Tables section to verify tables exist

**5. Build errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Getting Help

If you encounter issues:

1. **Check the console** for error messages
2. **Verify environment variables** are set correctly
3. **Check Supabase dashboard** for database issues
4. **Review the logs** in your terminal
5. **Create an issue** in the GitHub repository

## 🚀 Next Steps

Once you have the application running locally:

1. **Customize the UI**: Modify colors, fonts, and layout
2. **Add features**: Implement user authentication, payments, etc.
3. **Deploy to production**: Follow the deployment guide
4. **Set up monitoring**: Add analytics and error tracking
5. **Scale**: Optimize for performance and add more features

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

**🎉 Congratulations!** You now have a fully functional multi-tenant SaaS platform running locally. The next step is to deploy it to production and start building your business!

## 🌐 Domain Setup

### For Production (Vercel + Cloudflare)

1. **Deploy to Vercel**:
   ```bash
   npm run build
   vercel --prod
   ```

2. **Configure Cloudflare DNS**:
   - Add your domain to Cloudflare
   - Create a CNAME record: `*` → `your-vercel-app.vercel.app`
   - This enables wildcard subdomain routing

3. **Update Vercel Domain**:
   - In Vercel dashboard, add your domain
   - Configure wildcard subdomain: `*.yourdomain.com`

### For Local Testing

Add to your `/etc/hosts` file:
```
127.0.0.1 localhost
127.0.0.1 alice.localhost
127.0.0.1 bob.localhost
127.0.0.1 demo.localhost
```

Then visit:
- `http://localhost:3000` (main site)
- `http://alice.localhost:3000` (tenant site)
- `http://bob.localhost:3000` (tenant site)

## 🎯 Usage

### Creating a Tenant

1. Visit the main site: `https://fluke.xyz`
2. Click "Get Started Free"
3. Fill in tenant details:
   - Company Name
   - Subdomain (e.g., "alice")
   - Primary Color
4. Your tenant will be available at: `https://alice.fluke.xyz`

### Admin Panel

Visit `https://fluke.xyz/admin` to:
- View all tenants
- See statistics
- Manage tenant settings
- Delete tenants

### Tenant Management

Each tenant can:
- Customize their branding
- Manage products
- Have their own users
- Access their subdomain

## 🔧 API Endpoints

### Tenants
- `GET /api/tenants` - List all tenants
- `POST /api/tenants` - Create new tenant
- `GET /api/tenants/[id]` - Get specific tenant
- `PUT /api/tenants/[id]` - Update tenant
- `DELETE /api/tenants/[id]` - Delete tenant

### Products
- `GET /api/products` - List tenant products
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get specific product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Authentication
- `POST /api/auth/register` - Register new user

## 🗄️ Database Schema

### Tables

**tenants**
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `subdomain` (VARCHAR, Unique)
- `logo_url` (TEXT)
- `primary_color` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**users**
- `id` (UUID, Primary Key)
- `tenant_id` (UUID, Foreign Key)
- `email` (VARCHAR)
- `full_name` (VARCHAR)
- `avatar_url` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**products**
- `id` (UUID, Primary Key)
- `tenant_id` (UUID, Foreign Key)
- `name` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `image_url` (TEXT)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Row Level Security (RLS)

All tables have RLS enabled with tenant isolation:
- Users can only access their tenant's data
- Products are filtered by tenant_id
- Admin operations require proper authentication

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**:
   ```bash
   vercel --prod
   ```

2. **Set Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_DOMAIN`

3. **Configure Domain**:
   - Add your domain in Vercel dashboard
   - Enable wildcard subdomains

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- **Row Level Security**: Database-level tenant isolation
- **Middleware Protection**: Subdomain validation
- **Input Sanitization**: All user inputs are sanitized
- **CORS Headers**: Proper security headers
- **Environment Variables**: Sensitive data in environment

## 🎨 Customization

### Adding New Features

1. **New API Routes**: Add to `app/api/`
2. **New Components**: Add to `components/`
3. **Database Changes**: Create new migration in `supabase/migrations/`
4. **Styling**: Modify `tailwind.config.js` or add custom CSS

### Tenant Customization

Each tenant can customize:
- Primary color (stored in database)
- Logo (upload to Supabase Storage)
- Product catalog
- User management

## 📊 Monitoring

### Built-in Analytics

- Tenant creation tracking
- User registration metrics
- Product management stats
- Admin panel usage

### External Integrations

Ready for:
- Google Analytics
- Sentry error tracking
- Custom analytics solutions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check this README
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub Discussions

## 🎉 Demo

Try the live demo:
- Main site: `https://fluke.xyz`
- Alice tenant: `https://alice.fluke.xyz`
- Bob tenant: `https://bob.fluke.xyz`
- Admin panel: `https://fluke.xyz/admin`

---

**Built with ❤️ using Next.js 14, Supabase, and Vercel**
# multi-tenant-saas
