"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { emailSchema } from "../lib/validation";
import { createUserWithCredentials } from "../actions/actions";

interface FormInputs {
  email: string;
}

const CreateUserByEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    const validatedData = emailSchema.safeParse(formData);

    if (validatedData.success) {
      createUserWithCredentials(validatedData.data);
    }
  };

  return (
    <form
      className="flex flex-col justify-baseline gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label>Create e-mail</Label>
      <div className="flex flex-row gap-4 justify-between">
        <Input {...register("email")} placeholder="E-mail" />
        <Button>Create and login</Button>
      </div>
    </form>
  );
};

export default CreateUserByEmail;
