import React, { FormEvent, useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';

export type UserFormData = {
  name: '';
  email: '';
  password: '';
};

type Props = {
  onSubmit?: (formData: UserFormData) => void;
};

export const UserForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
  });

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Nome Completo" />
        </div>
        <TextInput
          name="name"
          id="name"
          placeholder=""
          required
          onChange={updateForm}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="E-mail" />
        </div>
        <TextInput
          name="email"
          id="email"
          type="email"
          placeholder=""
          required
          onChange={updateForm}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Senha" />
        </div>
        <TextInput
          name="password"
          id="password"
          type="password"
          required
          onChange={updateForm}
        />
      </div>
      <Button type="submit">Enviar</Button>
    </form>
  );
};
