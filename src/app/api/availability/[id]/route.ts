import { ApiAvailability } from '@/app/api/types';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const response: ApiAvailability[] = await fetch(
    'http://0.0.0.0:8004/api/v1/availability/doctor/' + id,
  ).then((res) => res.json());

  const result: Record<string, string[]> = {};

  for (const { available_times } of response) {
    for (const time of available_times) {
      const [date, hour] = time.split('T');
      const formattedTime = hour.split('.')[0];

      if (!result[date]) {
        result[date] = [];
      }

      result[date].push(formattedTime);
    }
  }

  return Response.json(result);
}
