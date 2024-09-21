import { supabase } from './supabaseClient';

const initDatabase = async () => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .limit(1);

  if (error && error.code === '42P01') {
    console.log('News table does not exist. Creating it now...');
    
    const { error: createError } = await supabase
      .rpc('create_news_table');

    if (createError) {
      console.error('Error creating news table:', createError);
    } else {
      console.log('News table created successfully.');
    }
  } else if (error) {
    console.error('Error checking news table:', error);
  } else {
    console.log('News table already exists.');
  }
};

export default initDatabase;