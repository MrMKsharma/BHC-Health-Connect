import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dtpluchwcgqbrjufrvwa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0cGx1Y2h3Y2dxYnJqdWZydndhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MzEyNDcsImV4cCI6MjA1OTUwNzI0N30.MNZw6XtA15Hp66gFgePqwZ9oRCCOJ5q9SZ2mZ3LxHVM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    role?: 'gp' | 'specialist' | 'patient' | 'admin';
  };
};

export type AuthError = {
  message: string;
};

export type AuthResponse = {
  data: { user: User | null; session: any } | null;
  error: AuthError | null;
};