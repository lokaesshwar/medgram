/*
  # Initial Schema Setup for MedGram

  1. New Tables
    - profiles
      - id (uuid, primary key)
      - full_name (text)
      - student_id (text)
      - created_at (timestamp)
    
    - appointments
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - doctor_name (text)
      - date (date)
      - time (text)
      - status (text)
      - reason (text)
      - created_at (timestamp)
    
    - medical_records
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - date (date)
      - doctor_name (text)
      - diagnosis (text)
      - prescription (text)
      - notes (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  student_id text,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  doctor_name text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  reason text,
  created_at timestamptz DEFAULT now()
);

-- Create medical_records table
CREATE TABLE medical_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  date date NOT NULL,
  doctor_name text NOT NULL,
  diagnosis text NOT NULL,
  prescription text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own medical records"
  ON medical_records FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert some dummy data
INSERT INTO profiles (id, full_name, student_id)
SELECT 
  auth.uid(),
  'John Doe',
  'STU001'
FROM auth.users
WHERE email = 'demo@example.com'
ON CONFLICT (id) DO NOTHING;