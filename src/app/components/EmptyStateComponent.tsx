"use client";

import { useRouter } from "next/navigation";
import HeadingComponent from "@/app/components/HeadingComponent";
import ButtonComponent from "./ButtonComponent";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export default function EmptyStateComponent({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}: EmptyStateProps) {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <HeadingComponent title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        <ButtonComponent
          outline
          label="Remove all filters"
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
}
