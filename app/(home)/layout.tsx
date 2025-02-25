import NavBar from '../_components/navbar/navbar';
import Footer from '../_components/footer/footer';

export default function StartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
