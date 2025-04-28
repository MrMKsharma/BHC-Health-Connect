import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmoxeryhienprptmmbjx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttb3hlcnloaWVucHJwdG1tYmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjE3NDksImV4cCI6MjA2MTQzNzc0OX0.POAojEX2f7RQKUorSKcWu3eGrsuFqcBBqi8VPQzBlnU';

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