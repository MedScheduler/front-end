import { ApiReport } from '@/app/api/types';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const response: ApiReport = await fetch(
    'http://0.0.0.0:8005/api/v1/reports/consultation/' + id,
  ).then((res) => res.json());

  return Response.json(response);
}
