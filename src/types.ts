export type User = {
  id: number;
  name: string;
  email: string;
  role: {
    description: 'doctor' | 'admin' | 'patient';
  };
};

export type Doctor = User;
export type Patient = User;

export type Review = {
  _id: string;
  appointment_id: string;
  rating: number;
  comment: string;
};

export type Appointment = {
  _id: string;
  user_id: string;
  service_id: string;
  date: string;
  status: string;
  created_at: string;
  updated_at: string;
  doctor_id: string;
  patient: Patient;
  doctor: Doctor;
  review: Review;
};

export type Availability = Record<string, string[]>;
