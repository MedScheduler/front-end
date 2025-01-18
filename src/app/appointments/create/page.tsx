'use client';

import {
  AppointmentForm,
  AppointmentFormData,
} from '@/components/forms/appointment-form/appointment-form';
import React, { useEffect } from 'react';
import { useUserInfo } from '@/contexts/user-context';
import {
  FeedbackModal,
  FeedbackModalProps,
} from '@/components/modals/success-modal/success-modal';
import { useRouter } from 'next/navigation';
import { Availability, Doctor } from '@/types';

export default function CreateAppointmentPage() {
  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [availability, setAvailability] = React.useState<Availability>({});
  const [selectedDoctor, setSelectedDoctor] = React.useState<string>('');
  const [selectedDate, setSelectedDate] = React.useState<string>('');
  const [modal, setModal] = React.useState<FeedbackModalProps>({});

  const { user } = useUserInfo();
  const { push } = useRouter();

  const getDoctors = async () => {
    const response = await fetch('/api/doctors').then((response) =>
      response.json(),
    );
    setDoctors(response);
  };

  const updateDoctor = async ({
    doctorId,
    date,
  }: {
    doctorId: string;
    date: string;
  }) => {
    setSelectedDoctor(doctorId);
    setSelectedDate(date);
  };

  const onSubmit = async (data: AppointmentFormData) => {
    const createAppointment = await fetch('/api/appointments/', {
      method: 'POST',
      body: JSON.stringify({ ...data, userId: user?.id }),
    }).then((response) => response.json());

    if (createAppointment.error) {
      return setModal({
        label: 'Ocorreu um erro ao criar o agendamento',
        status: 'failure',
      });
    }

    setModal({
      label: 'Agendamento criado com sucesso',
      status: 'success',
    });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  useEffect(() => {
    const getAvailabilities = async () => {
      const response = await fetch('/api/availability/' + selectedDoctor).then(
        (response) => response.json(),
      );
      setAvailability(response);
    };

    if (selectedDoctor) {
      getAvailabilities();
    }
  }, [selectedDoctor]);

  return (
    <>
      <AppointmentForm
        dates={Object.keys(availability)}
        times={availability[selectedDate]}
        doctors={doctors}
        onChange={updateDoctor}
        onSubmit={onSubmit}
      />
      <FeedbackModal
        label={modal.label}
        status={modal.status}
        open={!!modal.label && !!modal.status}
        onClose={modal.status === 'success' ? () => push('/') : undefined}
      />
    </>
  );
}
