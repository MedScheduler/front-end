export async function POST(request: Request) {
  const {
    doctor_id,
    doctor_name,
    patient_id,
    patient_name,
    consultation_date,
    diagnosis,
    observations,
  } = await request.json();

  const body = {
    doctor_id: String(doctor_id),
    doctor_name,
    patient_id: String(patient_id),
    patient_name,
    consultation_date,
    diagnosis,
    observations,
  };

  const response = await fetch('http://0.0.0.0:8005/api/v1/reports/', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log(response);

  if (!response.id) {
    return Response.json({ error: 'Ocorreu um erro ao criar o relatório' });
  }

  return Response.json({ data: response });
}
