"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { emailSchema } from "../lib/validation";
import { loginUserWithCredentials } from "../actions/actions";

interface Inputs {
  email: string;
}

const FormEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const validatedData = emailSchema.safeParse(formData);
    console.log(validatedData);

    if (validatedData.success) {
      loginUserWithCredentials(validatedData.data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 justify-center"
    >
      <Label>E-mail</Label>
      <div className="flex flex-row gap-4">
        <Input {...register("email")} placeholder="E-mail" />
        <Button>Submit</Button>
      </div>
    </form>
  );
};

export default FormEmail;
