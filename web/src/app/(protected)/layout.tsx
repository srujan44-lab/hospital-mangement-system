import { Header } from "@/components/headers/header";
import { Sidebar } from "@/components/sidebar";
import AuthUserProvider from "@/contexts/auth-user.context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthUserProvider>
      <div className="flex h-dvh w-screen">
        <Sidebar />
        <section className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-scroll overflow-x-hidden p-8">
            {children}
          </main>
        </section>
      </div>
    </AuthUserProvider>
  );
}
