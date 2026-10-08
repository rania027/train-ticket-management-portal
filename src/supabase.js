import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase project values (Project Settings -> API)
const supabaseUrl = "https://bgihvyuuincoxtfoqscr.supabase.co";
const supabaseKey = "sb_publishable_UswjO4Xd6wPQeMGOxpjDIw_WHudyI1p";

export const supabase = createClient(supabaseUrl, supabaseKey);
