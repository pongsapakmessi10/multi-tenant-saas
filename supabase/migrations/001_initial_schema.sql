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

-- Create indexes for better performance
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

-- Create triggers for updated_at
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tenants (public read access)
CREATE POLICY "Tenants are viewable by everyone" ON tenants
    FOR SELECT USING (true);

-- Create RLS policies for users (tenant isolation)
CREATE POLICY "Users can view their own tenant's users" ON users
    FOR SELECT USING (tenant_id IN (
        SELECT id FROM tenants WHERE subdomain = current_setting('app.current_tenant', true)
    ));

CREATE POLICY "Users can insert into their own tenant" ON users
    FOR INSERT WITH CHECK (tenant_id IN (
        SELECT id FROM tenants WHERE subdomain = current_setting('app.current_tenant', true)
    ));

CREATE POLICY "Users can update their own tenant's users" ON users
    FOR UPDATE USING (tenant_id IN (
        SELECT id FROM tenants WHERE subdomain = current_setting('app.current_tenant', true)
    ));

-- Create RLS policies for products (tenant isolation)
CREATE POLICY "Products are viewable by tenant" ON products
    FOR SELECT USING (tenant_id IN (
        SELECT id FROM tenants WHERE subdomain = current_setting('app.current_tenant', true)
    ));

CREATE POLICY "Products can be inserted by tenant" ON products
    FOR INSERT WITH CHECK (tenant_id IN (
        SELECT id FROM tenants WHERE subdomain = current_setting('app.current_tenant', true)
    ));

CREATE POLICY "Products can be updated by tenant" ON products
    FOR UPDATE USING (tenant_id IN (
        SELECT id FROM tenants WHERE subdomain = current_setting('app.current_tenant', true)
    ));

-- Insert some sample data
INSERT INTO tenants (name, subdomain, primary_color) VALUES
    ('Alice Company', 'alice', '#ef4444'),
    ('Bob Enterprises', 'bob', '#10b981'),
    ('Demo Store', 'demo', '#8b5cf6');

INSERT INTO products (tenant_id, name, description, price, image_url) VALUES
    ((SELECT id FROM tenants WHERE subdomain = 'alice'), 'Premium Widget', 'High-quality widget for all your needs', 29.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'),
    ((SELECT id FROM tenants WHERE subdomain = 'alice'), 'Basic Widget', 'Simple widget for everyday use', 9.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300'),
    ((SELECT id FROM tenants WHERE subdomain = 'bob'), 'Enterprise Solution', 'Complete enterprise package', 199.99, 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300'),
    ((SELECT id FROM tenants WHERE subdomain = 'demo'), 'Demo Product', 'This is a demo product', 19.99, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300');
