import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sphutbwepbqtsnqoqgiz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwaHV0YndlcGJxdHNucW9xZ2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0MzM0MjgsImV4cCI6MjAxNTAwOTQyOH0.FuTPoeSGe4kBmxn8IJVfS4L2cSYl5bBhaezuOLww8UE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
