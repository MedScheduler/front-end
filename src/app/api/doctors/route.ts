const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "0.0.0.0:8006"

export async function GET() {
  const response = await fetch(`http://${USER_SERVICE_URL}/user?role=doctor`).then(
    (res) => res.json(),
  );
  return Response.json(response.data);
}
