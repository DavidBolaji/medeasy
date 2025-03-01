export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        padding: '16px 16px 150px 16px',
      }}
    >
      {children}
    </div>
  );
}
