'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Label, Textarea } from 'flowbite-react';
import { useParams } from 'next/navigation';
import { Appointment } from '@/components/appointment';
import { RatingInput } from '@/components/rating/rating-input';
import { Appointment as AppointmentType } from '@/types';

export type ReviewFormData = {
  comment: string;
  rating: number;
  appointmentId: string;
  doctorId: string;
  userId: string;
};

type Props = {
  onSubmit?: (formData: ReviewFormData) => void;
};

export const ReviewForm: React.FC<Props> = ({ onSubmit }) => {
  const [appointment, setAppointment] = useState<AppointmentType>();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const { id } = useParams();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (appointment) {
      onSubmit?.({
        comment,
        rating,
        appointmentId: appointment?._id,
        doctorId: appointment?.doctor_id,
        userId: appointment?.user_id,
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
      <h1 className="text-2xl mb-4 font-bold">Avalie sua consulta</h1>
      {appointment && (
        <Appointment
          id={appointment._id}
          date={appointment.date}
          status={appointment.status}
        />
      )}
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nota" />
          </div>
          <RatingInput onChange={setRating} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Comentário" />
          </div>
          <Textarea id="comment" onChange={(e) => setComment(e.target.value)} />
        </div>
        <Button type="submit">Enviar</Button>
      </form>
    </>
  );
};
