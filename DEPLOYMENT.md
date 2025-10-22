# Deployment Guide

This guide will walk you through deploying your Multi-Tenant SaaS platform to Vercel with Cloudflare DNS for wildcard subdomain support.

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy Button (Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/multi-tenant-saas)

### Option 2: Manual Deployment

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings (auto-detected)

3. **Set Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_DOMAIN=yourdomain.com
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete

## 🌐 Domain Configuration

### Step 1: Add Domain to Vercel

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your domain: `yourdomain.com`
4. Add wildcard subdomain: `*.yourdomain.com`

### Step 2: Configure Cloudflare DNS

1. **Add Domain to Cloudflare**:
   - Sign up at [cloudflare.com](https://cloudflare.com)
   - Add your domain
   - Update nameservers at your domain registrar

2. **Create DNS Records**:
   ```
   Type: CNAME
   Name: *
   Target: your-vercel-app.vercel.app
   Proxy: Enabled (orange cloud)
   ```

3. **Root Domain Record**:
   ```
   Type: CNAME
   Name: @
   Target: your-vercel-app.vercel.app
   Proxy: Enabled (orange cloud)
   ```

### Step 3: SSL Configuration

- Cloudflare automatically provides SSL certificates
- Vercel also provides SSL for custom domains
- Both work together for maximum security

## 🔧 Environment Variables

### Required Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Domain Configuration
NEXT_PUBLIC_DOMAIN=yourdomain.com
```

### Optional Variables

```env
# Supabase Service Role (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Error Tracking
SENTRY_DSN=your_sentry_dsn
```

## 🗄️ Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and enter project details
4. Wait for project to be created

### 2. Run Database Migration

1. Go to **SQL Editor** in Supabase dashboard
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and run the migration
4. Verify tables are created

### 3. Configure Row Level Security

The migration automatically sets up RLS policies. Verify in **Authentication** → **Policies**:

- `tenants` table: Public read access
- `users` table: Tenant isolation
- `products` table: Tenant isolation

## 🧪 Testing Your Deployment

### 1. Test Main Domain

Visit `https://yourdomain.com`:
- Should show the landing page
- Registration form should work
- Admin panel should be accessible

### 2. Test Subdomain Creation

1. Create a new tenant via registration form
2. Visit the generated subdomain: `https://test.yourdomain.com`
3. Verify tenant-specific content loads

### 3. Test Admin Panel

Visit `https://yourdomain.com/admin`:
- Should show all tenants
- Statistics should display
- Tenant management should work

## 🔍 Troubleshooting

### Common Issues

**1. Subdomains Not Working**
- Check Cloudflare DNS configuration
- Verify wildcard CNAME record exists
- Ensure Vercel domain includes `*.yourdomain.com`

**2. Database Connection Errors**
- Verify Supabase URL and keys
- Check RLS policies are enabled
- Ensure migration was run successfully

**3. Build Failures**
- Check environment variables are set
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

**4. CORS Issues**
- Supabase handles CORS automatically
- Check domain is added to Supabase allowed origins
- Verify middleware configuration

### Debug Mode

Enable debug logging by adding to your environment:

```env
NODE_ENV=development
DEBUG=true
```

## 📊 Monitoring

### Vercel Analytics

1. Enable Vercel Analytics in project settings
2. View real-time performance metrics
3. Monitor function execution times

### Supabase Monitoring

1. Go to **Reports** in Supabase dashboard
2. Monitor database performance
3. Check API usage and limits

### Custom Monitoring

Add monitoring tools:

```bash
npm install @sentry/nextjs
npm install @vercel/analytics
```

## 🔄 Updates and Maintenance

### Updating the Application

1. **Code Changes**:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Database Changes**:
   - Create new migration file
   - Run in Supabase SQL Editor
   - Update TypeScript types

3. **Environment Changes**:
   - Update in Vercel dashboard
   - Redeploy if necessary

### Backup Strategy

1. **Database Backups**:
   - Supabase provides automatic backups
   - Export data regularly via dashboard
   - Keep migration files in version control

2. **Code Backups**:
   - Use Git for version control
   - Keep multiple remotes
   - Regular commits and pushes

## 🚀 Performance Optimization

### Vercel Optimizations

1. **Edge Functions**:
   - Use for lightweight operations
   - Reduce cold start times
   - Global distribution

2. **Image Optimization**:
   - Use Next.js Image component
   - Enable WebP conversion
   - Implement lazy loading

3. **Caching**:
   - Leverage Vercel's CDN
   - Set appropriate cache headers
   - Use ISR for static content

### Supabase Optimizations

1. **Database Indexes**:
   - Add indexes for frequently queried columns
   - Monitor query performance
   - Use connection pooling

2. **RLS Optimization**:
   - Keep policies simple
   - Use indexes in policy conditions
   - Monitor policy performance

## 🔒 Security Checklist

- [ ] Environment variables are secure
- [ ] RLS policies are properly configured
- [ ] HTTPS is enabled (automatic with Vercel/Cloudflare)
- [ ] CORS is properly configured
- [ ] Input validation is implemented
- [ ] Error messages don't leak sensitive data
- [ ] Regular security updates

## 📈 Scaling Considerations

### Horizontal Scaling

- Vercel automatically scales
- Supabase handles database scaling
- Cloudflare provides global CDN

### Vertical Scaling

- Upgrade Vercel plan for more resources
- Consider Supabase Pro for advanced features
- Monitor usage and upgrade as needed

### Cost Optimization

- Use Vercel's free tier for development
- Monitor Supabase usage
- Optimize database queries
- Use Cloudflare's free tier

---

**Your Multi-Tenant SaaS platform is now live! 🎉**

For additional support, check the main README.md or create an issue in the repository.
