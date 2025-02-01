export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh w-screen flex justify-center items-center">
      {children}
    </div>
  );
}
