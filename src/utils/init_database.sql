-- Check if the table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'news') THEN
        -- Create the news table
        CREATE TABLE public.news (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            url TEXT UNIQUE NOT NULL,
            urlToImage TEXT,
            publishedAt TIMESTAMP WITH TIME ZONE,
            source TEXT,
            category TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        -- Create an index on the URL column
        CREATE UNIQUE INDEX idx_news_url ON public.news(url);

        -- Create an index on the category column for faster filtering
        CREATE INDEX idx_news_category ON public.news(category);

        -- Create an index on the publishedAt column for sorting
        CREATE INDEX idx_news_published_at ON public.news(publishedAt);

        -- Enable Row Level Security
        ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

        -- Create a policy that allows all operations for authenticated users
        CREATE POLICY "Allow all operations for authenticated users" ON public.news
            FOR ALL USING (auth.role() = 'authenticated');

        RAISE NOTICE 'News table created successfully.';
    ELSE
        RAISE NOTICE 'News table already exists.';
    END IF;
END
$$;

-- Create or replace the function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger on the news table
DROP TRIGGER IF EXISTS update_news_updated_at ON public.news;
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();