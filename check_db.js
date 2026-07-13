import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Checking push_subscriptions table...");
  const { data: pushData, error: pushError } = await supabase.from('push_subscriptions').select('*').limit(5);
  console.log("Push Subscriptions:", pushData);
  if (pushError) console.error("Push Subscriptions Error:", pushError);

  console.log("Checking all users...");
  const { data: users, error: usersError } = await supabase.from('users').select('*');
  console.log("Users:", users);
  if (usersError) console.error("Users Error:", usersError);
}

check();
