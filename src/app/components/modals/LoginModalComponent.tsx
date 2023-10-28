"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import ModalComponent from "@/app/components/modals/ModalComponent";
import HeadingComponent from "@/app/components/HeadingComponent";
import InputComponent from "@/app/components/input/InputComponent";
import Button from "@/app/components/ButtonComponent";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useLoginModal from "@/app/hooks/useLoginModal";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginModalComponent() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Login success");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <HeadingComponent
        title="Welcome back!"
        subtitle="Login to your account!"
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
        onClick={() => signIn("google")}
        disabled={isLoading}
      />
      <Button
        outline
        label="Continue with Github"
        icon={<AiFillGithub size={24} />}
        onClick={() => signIn("github")}
        disabled={isLoading}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>{"Doesn't have an account ?"}</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline font-bold"
            onClick={toggle}
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ModalComponent
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Login"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
