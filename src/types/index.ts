export interface User {
  id: string;
  email: string;
  full_name: string;
  student_id?: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  doctor_name: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  reason: string;
  created_at: string;
}

export interface MedicalRecord {
  id: string;
  user_id: string;
  date: string;
  doctor_name: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  created_at: string;
}