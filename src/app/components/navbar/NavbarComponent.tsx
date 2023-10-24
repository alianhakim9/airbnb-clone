"use client";

import Container from "@/app/components/ContainerComponent";
import Logo from "@/app/components/navbar/LogoComponent";
import Search from "@/app/components/navbar/SearchComponent";
import UserMenu from "@/app/components/navbar/UserMenuComponent";

export default function NavbarComponent() {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
}
