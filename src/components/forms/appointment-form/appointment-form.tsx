import React, { FormEvent, useState } from 'react';
import { Button, Label, Select } from 'flowbite-react';
import { Doctor } from '@/types';

export type AppointmentFormData = {
  doctorId: string;
  date: string;
  time: string;
};

type Props = {
  doctors: Doctor[];
  dates: string[];
  times: string[];
  onChange?: (formData: AppointmentFormData) => void;
  onSubmit?: (formData: AppointmentFormData) => void;
};

export const AppointmentForm: React.FC<Props> = ({
  doctors,
  dates,
  times,
  onChange,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    doctorId: '',
    date: '',
    time: '',
  });

  const updateForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    onChange?.(newFormData);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <>
      <h1 className="text-2xl mb-4 font-bold">Solicitação de agendamento</h1>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="doctors" value="Médico" />
          </div>
          <Select
            name="doctorId"
            id="doctors"
            value={formData.doctorId}
            onChange={updateForm}
          >
            <option hidden disabled value="">
              Selecione um médico
            </option>
            {doctors?.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </Select>
        </div>
        {formData.doctorId && (
          <div className="mb-2 block">
            <Label htmlFor="dates" value="Data" />
            <Select
              name="date"
              id="dates"
              value={formData.date}
              onChange={updateForm}
            >
              <option hidden disabled value="">
                Selecione uma data
              </option>
              {dates?.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </Select>
          </div>
        )}
        {formData.date && (
          <div className="mb-2 block">
            <Label htmlFor="times" value="Hora" />
            <Select
              name="time"
              id="times"
              value={formData.time}
              onChange={updateForm}
            >
              <option hidden disabled value="">
                Selecione a hora
              </option>
              {times?.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Select>
          </div>
        )}
        <Button type="submit">Enviar</Button>
      </form>
    </>
  );
};
