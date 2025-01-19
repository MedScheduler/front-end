'use client';

import { UserForm, UserFormData } from '@/components/forms/user-form/user-form';
import React from 'react';
import {
  FeedbackModal,
  FeedbackModalProps,
} from '@/components/modals/success-modal/success-modal';
import { useRouter } from 'next/navigation';

export default function AddDoctorPage() {
  const [modal, setModal] = React.useState<FeedbackModalProps>({});
  const { push } = useRouter();

  const onSubmit = async (data: UserFormData) => {
    const createUser = await fetch('/api/user/', {
      method: 'POST',
      body: JSON.stringify({ ...data, role: 'doctor' }),
    }).then((response) => response.json());

    if (createUser.error) {
      return setModal({
        label: 'Ocorreu um erro ao cadastrar o médico',
        status: 'failure',
      });
    }

    setModal({
      label: 'Cadastro efetuado com sucesso',
      status: 'success',
    });
  };

  return (
    <>
      <h1 className="text-2xl mb-4 font-bold">Cadastro de médico</h1>
      <UserForm onSubmit={onSubmit} />
      <FeedbackModal
        label={modal.label}
        status={modal.status}
        open={!!modal.label && !!modal.status}
        onClose={modal.status === 'success' ? () => push('/') : undefined}
      />
    </>
  );
}
