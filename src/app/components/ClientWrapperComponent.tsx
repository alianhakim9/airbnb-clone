"use client";

import { useEffect, useState } from "react";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapperComponent({
  children,
}: ClientWrapperProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  });

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}
