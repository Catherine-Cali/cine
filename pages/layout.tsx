
//essai

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<div className="flex h-screen w-screen justify-center items-center bg">
        {children}
        </div>
  );
}
