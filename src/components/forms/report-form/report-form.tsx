'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Label, Textarea } from 'flowbite-react';
import { useParams } from 'next/navigation';
import { Appointment } from '@/components/appointment';
import { Appointment as AppointmentType } from '@/types';

export type ReportFormData = {
  diagnosis: string;
  observations: string;
  appointment: AppointmentType;
};

type Props = {
  onSubmit?: (formData: ReportFormData) => void;
};

export const ReportForm: React.FC<Props> = ({ onSubmit }) => {
  const [appointment, setAppointment] = useState<AppointmentType>();
  const [diagnosis, setDiagnosis] = useState('');
  const [observations, setObservations] = useState('');

  const { id } = useParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (appointment) {
      onSubmit?.({
        diagnosis,
        observations,
        appointment,
      });
    }
  };

  useEffect(() => {
    const getAppointment = async () => {
      const response = await fetch('/api/appointments/' + id).then((response) =>
        response.json(),
      );
      setAppointment(response.data);
    };

    getAppointment();
  }, [id]);

  return (
    <>
      {appointment && (
        <Appointment
          id={appointment._id}
          date={appointment.date}
          patient={appointment.patient.name}
          doctor={appointment.doctor.name}
        />
      )}
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="diagnosis" value="Diagnóstico" />
          </div>
          <Textarea
            id="diagnosis"
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="observations" value="Observações" />
          </div>
          <Textarea
            id="observations"
            onChange={(e) => setObservations(e.target.value)}
          />
        </div>
        <Button type="submit">Enviar</Button>
      </form>
    </>
  );
};
