"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import ModalComponent from "@/app/components/modals/ModalComponent";
import HeadingComponent from "@/app/components/HeadingComponent";
import InputComponent from "@/app/components/input/InputComponent";
import Button from "@/app/components/ButtonComponent";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

export default function RegisterModalComponent() {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then((response) => {
        console.log(response.data);
        toast.success("register success", {
          position: "top-center",
        });
        registerModal.onClose();
      })
      .catch((error: AxiosError) => {
        toast.error(error.message, {
          position: "top-center",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <HeadingComponent
        title="Welcome to Airbnb"
        subtitle="Create an account!"
      />
      <InputComponent
        id="email"
        label="Email"
        disabled={isLoading}
        formRegister={register}
        errors={errors}
        required
        type="email"
      />
      <InputComponent
        id="name"
        label="Name"
        disabled={isLoading}
        formRegister={register}
        errors={errors}
        required
        type="text"
      />
      <InputComponent
        id="password"
        label="Password"
        disabled={isLoading}
        formRegister={register}
        errors={errors}
        required
        type="password"
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={<FcGoogle size={24} />}
        onClick={() => {}}
        disabled={isLoading}
      />
      <Button
        outline
        label="Continue with Github"
        icon={<AiFillGithub size={24} />}
        onClick={() => {}}
        disabled={isLoading}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>Already have an account ?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline font-bold"
            onClick={registerModal.onClose}
          >
            Log In
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ModalComponent
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
