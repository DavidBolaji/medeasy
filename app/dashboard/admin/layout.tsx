import { Overlay } from './(routes)/_components/overlay/overlay';

export default function DahboardAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Overlay />
    </div>
  );
}
