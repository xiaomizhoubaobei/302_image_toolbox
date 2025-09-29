import { Navbar } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="root-layout" className="min-h-screen flex flex-col">
          <Navbar />
          <div id="layout-main" className="flex grow py-12">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
