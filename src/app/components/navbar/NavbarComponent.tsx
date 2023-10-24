"use client";

import Container from "@/app/components/ContainerComponent";
import Logo from "@/app/components/navbar/LogoComponent";
import Search from "@/app/components/navbar/SearchComponent";
import UserMenu from "@/app/components/navbar/UserMenuComponent";
import { User } from "@prisma/client";

interface NavbarProps {
  currentUser?: User | null;
}

export default function NavbarComponent({ currentUser }: NavbarProps) {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
}
