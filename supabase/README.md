# Supabase Database Setup

## Initial Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of the migration file from `migrations/20240101000000_create_profiles_table.sql`
4. Paste and execute the SQL in the Supabase SQL Editor

## Database Structure

### Profiles Table

The profiles table stores user information with the following structure:

- `id` (uuid, primary key): References auth.users
- `full_name` (text): User's full name
- `email` (text, unique): User's email address
- `role` (text): User's role (gp, specialist, patient, or admin)
- `created_at` (timestamp): Record creation time
- `updated_at` (timestamp): Record last update time

## Security

- Row Level Security (RLS) is enabled
- Policies are set up to:
  - Allow public reading of profiles
  - Restrict profile creation to authenticated users
  - Restrict profile updates to profile owners

## Indexes

Optimized queries with indexes on:
- `email`
- `role`