"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "@/app/types";
import useFavorite from "@/app/hooks/useFavorite";

interface HearButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

export default function HeartButtonComponent({
  listingId,
  currentUser,
}: HearButtonProps) {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={`
        ${hasFavorited ? "fill-rose-500" : "fill-neutral-500"}
      `}
      />
    </div>
  );
}
