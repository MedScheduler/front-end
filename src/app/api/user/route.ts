const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "0.0.0.0:8006"

export async function GET() {
  const response = await fetch(`http://${USER_SERVICE_URL}/user/1`).then((res) =>
    res.json(),
  );
  return Response.json(response.data);
}

export async function POST(request: Request) {
  const { name, email, password, role } = await request.json();

  const body = {
    name,
    email,
    password,
    role,
  };

  const response = await fetch(`http://${USER_SERVICE_URL}/user`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  console.log(response);

  return Response.json(response);
}
