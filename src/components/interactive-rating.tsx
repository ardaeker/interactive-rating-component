"use client";

import Image from "next/image";

import { useEffect, useState, useTransition } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { RadioGroup } from "radix-ui";
import star from "@/assets/images/star.svg";
import illustration from "@/assets/images/thanks-illustration.svg";

type State = "form" | "success";

const RatingSchema = z.object({
  rating: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Please select a rating from 1 to 5",
  }),
});

type FormProps = {
  setState: (state: State) => void;
  setRating: (rating: string) => void;
};

function Form({ setState, setRating }: FormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof RatingSchema>>({
    resolver: zodResolver(RatingSchema),
  });

  useEffect(() => {
    if (errors.rating) {
      toast.error(errors.rating.message);
    }
  }, [errors]);

  function onSubmit(values: z.infer<typeof RatingSchema>) {
    startTransition(() => {
      setState("success");
      setRating(values.rating);
    });
  }

  return (
    <div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-800 pt-px pl-px md:h-12 md:w-12">
        <div className="relative h-4 w-4" aria-hidden>
          <Image src={star} alt="" priority fill />
        </div>
      </div>
      <div className="mt-4 space-y-2 md:mt-8">
        <h1 className="text-[1.5rem] leading-[1.875rem] font-bold text-white md:text-[1.75rem] md:leading-[2.1875rem]">
          How did we do?
        </h1>
        <p className="text-[0.875rem] leading-[1.375rem] text-gray-500 md:text-[0.9375rem] md:leading-[1.5rem]">
          Please let us know how we did with your support request. All feedback is appreciated to
          help us improve our offering!
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6 md:space-y-8">
        <RadioGroup.Root
          className="flex items-center justify-between"
          onValueChange={(value) => setValue("rating", value as "1" | "2" | "3" | "4" | "5")}
          disabled={isPending}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <RadioGroup.Item
              key={value}
              id={`rating-${value}`}
              value={`${value}`}
              className="group relative flex h-10.5 w-10.5 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-blue-800 transition-colors hover:bg-orange-800 md:h-12 md:w-12"
            >
              <RadioGroup.Indicator className="absolute inset-0 bg-white" />
              <label
                htmlFor={`rating-${value}`}
                className="relative cursor-pointer pt-0.5 pl-px text-[0.875rem] leading-[1.5rem] font-bold text-gray-500 transition-colors group-hover:text-blue-800 group-data-[state='checked']:text-blue-800"
              >
                {value}
              </label>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full cursor-pointer items-center justify-center rounded-3xl bg-orange-800 p-3.5 text-[0.875rem] leading-[1.125rem] font-bold tracking-[2px] text-blue-900 uppercase transition-colors hover:bg-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

type SuccessProps = {
  rating: string;
};

function Success({ rating }: SuccessProps) {
  return (
    <div className="flex flex-col items-center gap-y-6 text-center">
      <div className="relative h-24 w-36 md:h-27 md:w-40.5">
        <Image src={illustration} alt="Thank you illustration" priority fill />
      </div>
      <div className="rounded-3xl bg-blue-800 px-3 py-1 md:px-5">
        <p className="text-[0.875rem] leading-[1.375rem] text-orange-800 md:text-[0.9375rem] md:leading-[1.5rem]">
          You selected {rating} out of 5
        </p>
      </div>
      <div className="space-y-3">
        <h1 className="text-[1.5rem] leading-[1.875rem] font-bold text-white md:text-[1.75rem] md:leading-[2.1875rem]">
          Thank you!
        </h1>
        <p className="text-[0.875rem] leading-[1.375rem] text-balance text-gray-500 md:text-[0.9375rem] md:leading-[1.5rem]">
          We appreciate you taking the time to give a rating. If you ever need more support, don’t
          hesitate to get in touch!
        </p>
      </div>
    </div>
  );
}

export function InteractiveRating() {
  const [state, setState] = useState<State>("form");
  const [rating, setRating] = useState("5");

  return (
    <section className="bg-gradient max-w-103 rounded-2xl p-6 md:rounded-4xl md:p-8">
      {state === "form" && <Form setState={setState} setRating={setRating} />}
      {state === "success" && <Success rating={rating} />}
    </section>
  );
}
