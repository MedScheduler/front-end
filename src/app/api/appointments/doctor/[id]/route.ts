const APPOINTMENTS_SERVICE_URL = process.env.APPOINTMENTS_SERVICE_URL || "0.0.0.0:8000";

import { ApiAppointment } from '@/app/api/types';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const response: ApiAppointment[] = await fetch(
    `http://${APPOINTMENTS_SERVICE_URL}/api/v1/appointments/doctor/` + id,
  ).then((res) => res.json());

  const appointmentsByDate = response.reduce(
    (acc, value) => {
      const date = value.date.split('T')[0];

      if (!acc[date]) acc[date] = [];
      acc[date].push(value);

      return acc;
    },
    {} as Record<string, ApiAppointment[]>,
  );

  return Response.json({ appointments: response, appointmentsByDate });
}
