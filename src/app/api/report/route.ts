const REPORT_SERVICE_URL = process.env.REPORT_SERVICE_URL || "0.0.0.0:8005"

export async function POST(request: Request) {
  const {
    doctor_id,
    doctor_name,
    patient_id,
    patient_name,
    consultation_date,
    consultation_id,
    diagnosis,
    observations,
  } = await request.json();

  const body = {
    doctor_id: String(doctor_id),
    doctor_name,
    patient_id: String(patient_id),
    patient_name,
    consultation_date,
    consultation_id,
    diagnosis,
    observations,
  };

  const response = await fetch(`http://${REPORT_SERVICE_URL}/api/v1/reports/`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  if (!response.id) {
    return Response.json({ error: 'Ocorreu um erro ao criar o relatório' });
  }

  return Response.json({ data: response });
}
