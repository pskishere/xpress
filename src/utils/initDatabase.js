
import { supabase } from '../integrations/supabase/supabase';

const initDatabase = async () => {
  console.log('Starting database initialization...');
  
  try {
    // Check if the news table exists
    const { data, error } = await supabase
      .from('news')
      .select('count(*)', { count: 'exact', head: true });
    
    if (error && error.code === '42P01') {
      console.log('News table does not exist. Creating it...');
      
      // Execute SQL to create table structure
      const { error: sqlError } = await supabase.rpc('execute_sql', {
        sql_query: `
          -- Create extension for UUID generation if it doesn't exist
          CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
          
          -- Create the news table
          CREATE TABLE IF NOT EXISTS public.news (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            title_zh TEXT,
            description_zh TEXT,
            url TEXT UNIQUE NOT NULL,
            urltoimage TEXT,
            publishedat TIMESTAMP WITH TIME ZONE,
            source TEXT,
            category TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          
          -- Create indexes
          CREATE INDEX IF NOT EXISTS idx_news_category ON public.news(category);
          CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news(publishedat);
          
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
        `
      });
      
      if (sqlError) {
        console.error('Error creating database schema:', sqlError);
        throw sqlError;
      } else {
        console.log('Database schema created successfully');
      }
    } else if (error) {
      console.error('Error checking if news table exists:', error);
    } else {
      console.log(`News table exists with ${data.count} records`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Database initialization failed:', error);
    return { success: false, error };
  }
};

export default initDatabase;
