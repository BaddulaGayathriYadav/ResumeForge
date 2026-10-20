// ResumeForge - Supabase Configuration

const SUPABASE_URL = "https://amjxzhhzqzcphkdywzlg.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_7VIgmHoRevSnBHDnw-aKHw_1ArZlTpi";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);