"use client";

import Image from "next/image";

export default function AvatarComponent() {
  return (
    <div>
      <Image
        src="/images/placeholder.jpeg"
        alt="Avatar"
        width={30}
        height={30}
        className="rounded-full"
      />
    </div>
  );
}
