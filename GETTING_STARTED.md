# 🚀 Getting Started - Multi-Tenant SaaS Platform

This guide will help you get the Multi-Tenant SaaS platform running on your computer in **under 10 minutes**.

## 📋 What You'll Need

- A computer with internet connection
- Node.js installed ([Download here](https://nodejs.org/) - choose the LTS version)
- A free Supabase account ([Sign up here](https://supabase.com))

## ⚡ Quick Setup (5 Steps)

### Step 1: Download the Code

**Option A: If you have the code already (recommended)**
Since you already have the project files in your current folder (`c:\SaasTemplate`), you can skip the git clone step and just run:

```bash
# You're already in the project folder, so just install packages
npm install
```

**Option B: If you want to download fresh from GitHub**
If you prefer to download a fresh copy from GitHub:

```bash
# Create a new folder for the project (optional)
mkdir my-saas-project
cd my-saas-project

# Download the project from GitHub
git clone https://github.com/your-username/multi-tenant-saas.git

# Go into the project folder
cd multi-tenant-saas

# Install all the required packages
npm install
```

**Which option should you choose?**
- **Use Option A** if you already have the project files (like you do in `c:\SaasTemplate`)
- **Use Option B** if you want to start completely fresh from GitHub

### Step 2: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign up with GitHub (easiest option)
4. Click **"New Project"**
5. Fill in:
   - **Name**: `my-saas-platform`
   - **Password**: Choose a strong password (save it!)
   - **Region**: Pick the one closest to you
6. Click **"Create new project"**
7. Wait 2-3 minutes for it to finish

### Step 3: Get Your Database Keys

1. In your Supabase dashboard, click **"Settings"** (gear icon)
2. Click **"API"** in the left menu
3. Copy these two values:
   - **Project URL** (starts with `https://`)
   - **Anon public key** (starts with `eyJ`)

### Step 4: Set Up Your Environment

1. In your project folder, copy the example file:
   ```bash
   cp env.example .env.local
   ```

2. Open `.env.local` in any text editor and replace the values:

  

   **Example:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://hoqnyyaogiwfgnyxhwmj.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvcW55eWFvZ2l3ZmdueXhod21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5ODE4NDAsImV4cCI6MjA3NjU1Nzg0MH0.p1pfCkqYKP1XxjBeKfFFYS7o2arJ02CLuKdU0WJLpkg
   NEXT_PUBLIC_DOMAIN=localhost:3000
   ```

### Step 5: Set Up the Database

1. In your Supabase dashboard, click **"SQL Editor"**
2. Click **"New query"**
3. Copy and paste the following SQL code:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tenants table
CREATE TABLE tenants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) NOT NULL UNIQUE,
    logo_url TEXT,
    primary_color VARCHAR(7) DEFAULT '#3b82f6',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(tenant_id, email)
);

-- Create products table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_products_tenant_id ON products(tenant_id);
CREATE INDEX idx_products_is_active ON products(is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security with permissive policies
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create permissive RLS policies
CREATE POLICY "Tenants are accessible to everyone" ON tenants
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Users are accessible to everyone" ON users
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Products are accessible to everyone" ON products
    FOR ALL USING (true) WITH CHECK (true);

-- Insert sample data
INSERT INTO tenants (name, subdomain, primary_color) VALUES
    ('Alice Company', 'alice', '#ef4444'),
    ('Bob Enterprises', 'bob', '#10b981'),
    ('Demo Store', 'demo', '#8b5cf6');

INSERT INTO products (tenant_id, name, description, price, image_url) VALUES
    ((SELECT id FROM tenants WHERE subdomain = 'alice'), 'Premium Widget', 'High-quality widget for all your needs', 29.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'),
    ((SELECT id FROM tenants WHERE subdomain = 'alice'), 'Basic Widget', 'Simple widget for everyday use', 9.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'),
    ((SELECT id FROM tenants WHERE subdomain = 'bob'), 'Enterprise Solution', 'Complete enterprise package', 199.99, 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300'),
    ((SELECT id FROM tenants WHERE subdomain = 'demo'), 'Demo Product', 'This is a demo product', 19.99, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300');
```

4. Click **"Run"** (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

### Step 6: Start the Application

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
✓ Ready in 2.3s
```

## 🎉 Test Your Application

### 1. Visit the Main Site
Open your browser and go to: `http://localhost:3000`

You should see a beautiful landing page with:
- Company logo
- "Get Started Free" button
- Features section

### 2. Create Your First Tenant
1. Click **"Get Started Free"**
2. Fill in the form:
   - **Company Name**: `My Test Company`
   - **Subdomain**: `mytest` (this will be `mytest.localhost:3000`)
   - **Primary Color**: Pick any color you like
3. Click **"Create Tenant"**
4. You should see a success message!

### 3. View Your Tenant Site
After creating the tenant, you'll be redirected to your new site. You should see:
- Your company name in the header
- Your chosen color scheme
- A professional-looking storefront

### 4. Check the Admin Panel
Go to: `http://localhost:3000/admin`

You should see:
- Statistics about your platform
- A table showing all tenants (including yours)
- Options to manage tenants

## 🔧 Troubleshooting

### "Module not found" error?
```bash
# Delete and reinstall packages
rm -rf node_modules package-lock.json
npm install
```

### "Cannot connect to Supabase" error?
- Double-check your `.env.local` file
- Make sure you copied the URL and key correctly
- Verify your Supabase project is active

### "Database error" when creating tenant?
- **RLS Policy Error**: If you see "new row violates row-level security policy", run this SQL in Supabase:

```sql
-- Fix RLS policies to allow tenant creation
DROP POLICY IF EXISTS "Tenants are viewable by everyone" ON tenants;
CREATE POLICY "Tenants are accessible to everyone" ON tenants
    FOR ALL USING (true) WITH CHECK (true);
```

- Go back to Supabase → SQL Editor
- Run the migration again
- Make sure you copied the ENTIRE migration file

### Subdomains not working?
This is normal for local development. The main site and admin panel will work perfectly. For full subdomain testing, you'll need to deploy to production.

## 🎯 What You've Built

Congratulations! You now have:

✅ **A working multi-tenant SaaS platform**
✅ **Database with sample data**
✅ **Admin panel to manage tenants**
✅ **Tenant registration system**
✅ **Professional UI with Tailwind CSS**

## 🚀 Next Steps

1. **Customize the design**: Change colors, fonts, and layout
2. **Add your own features**: User authentication, payments, etc.
3. **Deploy to production**: Follow the deployment guide
4. **Get your first customers**: Start marketing your platform!

## 📞 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Look at the [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
- Create an issue in the GitHub repository if you get stuck

---

**🎉 You did it!** You now have a professional multi-tenant SaaS platform running on your computer. Time to start building your business! 🚀
