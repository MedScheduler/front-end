const APPOINTMENTS_SERVICE_URL = process.env.APPOINTMENTS_SERVICE_URL || "0.0.0.0:8000";

import { ApiAppointment } from '@/app/api/types';

export async function GET() {
  const response: ApiAppointment[] = await fetch(
    `http://${APPOINTMENTS_SERVICE_URL}/api/v1/appointments/`,
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

export async function POST(request: Request) {
    const { userId, doctorId, date, time } = await request.json();

    const body = {
        user_id: String(userId),
        doctor_id: doctorId,
        service_id: 'appointment',
        date: `${date}T${time}`,
        status: 'Aguardando Confirmação',
    };

    const response = await fetch(`http://${APPOINTMENTS_SERVICE_URL}/api/v1/appointments/`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());

    if (response.message !== 'Appointment created successfully') {
        return { error: 'Ocorreu um erro ao criar o agendamento' };
    }

    return Response.json({ data: response.message });
}
