import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Checking push_subscriptions table...");
  const { data: pushData, error: pushError } = await supabase.from('push_subscriptions').select('*').limit(5);
  console.log("Checking push_subscriptions...");
  const { data: allPushData } = await supabase.from('push_subscriptions').select('*');
  console.log("Tokens:", allPushData);
}

check();
