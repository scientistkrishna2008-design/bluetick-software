import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Checking push_subscriptions table...");
  const { data: pushData, error: pushError } = await supabase.from('push_subscriptions').select('*').limit(5);
  console.log("Push Subscriptions:", pushData);
  if (pushError) console.error("Push Subscriptions Error:", pushError);

  console.log("Inserting Admin into users table...");
  const adminId = '64e4d108-ac38-4188-8625-32692a4c2cbb';
  const { data: insertData, error: insertError } = await supabase.from('users').insert({
    id: adminId,
    name: 'Admin User',
    role: 'Administrator',
    status: 'Approved'
  }).select();
  
  if (insertError) {
    console.error("Failed to insert:", insertError);
  } else {
    console.log("Successfully inserted Admin:", insertData);
  }
}

check();
