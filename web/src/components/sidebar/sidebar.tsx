"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import userImage from "@/assets/images/user-img.avif";
import { useAuth } from "@/contexts/auth-user.context";
import { sidebarList } from "./sidebar.strings";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Sidebar = (): JSX.Element => {
  const user = useAuth();
  const path = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL + "/auth/logout";

    const responce = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (responce.status === 200) router.push("/login");
  };

  return (
    <aside className="p-8 border-r space-y-4">
      <header className="border-b pb-8 space-y-6">
        <section className="flex items-center gap-4">
          <Image
            alt="user-image"
            className="rounded-full"
            height={75}
            src={userImage}
            width={75}
          />
          <div>
            <h3 className="text-2xl font-semibold">
              {user?.email.endsWith("@admin.com") ? "Adminitrator" : user?.name}
            </h3>
            <p className="text-sm text-secondary-foreground">{user?.email}</p>
          </div>
        </section>
        <Button
          className="w-full font-semibold"
          onClick={() => handleLogout()}
          variant="secondary"
        >
          Log out
        </Button>
      </header>
      <ul>
        {user &&
          sidebarList(user.email).map(({ url, value }) => (
            <li
              className={`p-4 grid ${
                path.startsWith(url) &&
                (path === url ||
                  !["/admin", "/doctor", "/patient"].includes(url))
                  ? "text-primary border-r-4 border-primary font-semibold"
                  : ""
              }`}
              key={url}
            >
              <Link href={url}>{value}</Link>
            </li>
          ))}
      </ul>
    </aside>
  );
};
