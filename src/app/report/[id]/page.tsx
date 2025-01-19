'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';
import { ApiReport } from '@/app/api/types';

export default function AddReportPage() {
  const [report, setReport] = React.useState<ApiReport | undefined>();
  const { back } = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const getReport = async () => {
      const report = await fetch('/api/report/' + id).then((response) =>
        response.json(),
      );
      setReport(report);
    };

    getReport();
  }, [id]);

  return (
    <>
      <h1 className="text-2xl mb-4 font-bold">Visualização de relatório</h1>
      <div>
        <h2 className="text-xl">Diagnóstico:</h2>
        <p>{report?.diagnosis}</p>
      </div>
      <div className="pt-4">
        <h2 className="text-xl">Observações:</h2>
        <p>{report?.observations}</p>
      </div>
      <Button onClick={back} className="w-full mt-6">
        Voltar
      </Button>
    </>
  );
}
