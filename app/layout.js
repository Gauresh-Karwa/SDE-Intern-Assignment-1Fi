import "./globals.css";
import Nav from "@/components/layout/Nav";
import OfflineBanner from "@/components/layout/OfflineBanner";

export const metadata = {
  title: "1Fi Marketplace",
  description: "1Fi SDE Intern Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <OfflineBanner />
        <Nav />
        <main className="pb-20 md:pb-8 max-w-5xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
