"use client";

interface MenuItemProps {
  label: String;
  onClick: () => void;
}

export default function MenuItemComponent({ label, onClick }: MenuItemProps) {
  return (
    <div
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
      onClick={onClick}
    >
      {label}
    </div>
  );
}
