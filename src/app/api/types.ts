export type ApiAppointment = {
  _id: string;
  user_id: string;
  service_id: string;
  date: string;
  status: string;
  created_at: string;
  updated_at: string;
  doctor_id: string;
};

export type ApiAvailability = {
  _id: string;
  doctor_id: string;
  available_times: string[];
  created_at: string;
  updated_at: string;
};

export type ApiReport = {
  doctor_id: string;
  doctor_name: string;
  patient_id: string;
  patient_name: string;
  consultation_date: string;
  diagnosis: string;
  observations: string;
};
