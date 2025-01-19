'use client';

import React from 'react';
import {
  FeedbackModal,
  FeedbackModalProps,
} from '@/components/modals/success-modal/success-modal';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import {
  ReportForm,
  ReportFormData,
} from '@/components/forms/report-form/report-form';

export default function AddReportPage() {
  const [modal, setModal] = React.useState<FeedbackModalProps>({});
  const { push } = useRouter();

  const { id } = useParams();

  const onSubmit = async (data: ReportFormData) => {
    const createReport = await fetch('/api/report/', {
      method: 'POST',
      body: JSON.stringify({
        doctor_id: data.appointment.doctor.id,
        doctor_name: data.appointment.doctor.name,
        patient_id: data.appointment.patient.id,
        patient_name: data.appointment.patient.name,
        consultation_id: id,
        consultation_date: data.appointment.date,
        diagnosis: data.diagnosis,
        observations: data.observations,
      }),
    }).then((response) => response.json());

    if (createReport.error) {
      return setModal({
        label: 'Ocorreu um erro ao cadastrar o relatório médico',
        status: 'failure',
      });
    }

    setModal({
      label: 'Relatório cadastrado com sucesso',
      status: 'success',
    });
  };

  return (
    <>
      <h1 className="text-2xl mb-4 font-bold">Cadastro de relatório</h1>
      <ReportForm onSubmit={onSubmit} />
      <FeedbackModal
        label={modal.label}
        status={modal.status}
        open={!!modal.label && !!modal.status}
        onClose={
          modal.status === 'success'
            ? () => {
                push('/');
                setModal({});
              }
            : undefined
        }
      />
    </>
  );
}
