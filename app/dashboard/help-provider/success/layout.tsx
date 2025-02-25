import StartNav from '@/app/start/_components/start-nav';

export default function HelpProviderSuccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <StartNav />
      <div className="flex flex-col items-center justify-center w-full md:px-0 px-5 min-h-screen">
        {children}
      </div>
    </div>
  );
}
