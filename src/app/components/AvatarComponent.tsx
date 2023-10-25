"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string | null;
}

export default function AvatarComponent({ src }: AvatarProps) {
  return (
    <div>
      <Image
        src={src || "/images/placeholder.jpeg"}
        alt="Avatar"
        width={30}
        height={30}
        className="rounded-full"
      />
    </div>
  );
}
