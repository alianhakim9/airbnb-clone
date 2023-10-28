"use client";

import useRentModal from "@/app/hooks/useRentModal";
import ModalComponent from "@/app/components/modals/ModalComponent";
import { useMemo, useState } from "react";
import HeadingComponent from "@/app/components/HeadingComponent";
import { categories } from "@/app/components/navbar/CategoriesComponent";
import CategoryInputComponent from "@/app/components/input/CategoryInputComponent";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelectComponent from "@/app/components/input/CountrySelectComponent";
import dynamic from "next/dynamic";
import CounterComponent from "@/app/components/input/CounterComponent";
import ImageUploadComponent from "@/app/components/input/ImageUploadComponent";
import InputComponent from "@/app/components/input/InputComponent";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModalComponent() {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../MapComponent"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("listings created");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch((err: AxiosError) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <HeadingComponent
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInputComponent
              key={item.label}
              icon={item.icon}
              onClick={(category) => setCustomValue("category", category)}
              label={item.label}
              selected={category === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <HeadingComponent
          title="Where is your place located"
          subtitle="Help guest find you!"
        />
        <CountrySelectComponent
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <HeadingComponent
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <CounterComponent
          title="Guests"
          subtitle="How many guest do you allow"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <CounterComponent
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <CounterComponent
          title="Bathroom"
          subtitle="How many bathroom do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <HeadingComponent
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like"
        />
        <ImageUploadComponent
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap8">
        <HeadingComponent
          title="How would you describe your place"
          subtitle="Short and sweet works best!"
        />
        <InputComponent
          id="title"
          label="Title"
          formRegister={register}
          errors={errors}
          disabled={isLoading}
          required
        />
        <hr className="my-6" />
        <InputComponent
          id="description"
          label="Description"
          formRegister={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <HeadingComponent
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <InputComponent
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          formRegister={register}
          errors={errors}
        />
      </div>
    );
  }

  return (
    <ModalComponent
      title="Airbnb your  home"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
}
