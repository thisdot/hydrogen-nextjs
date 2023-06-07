import "./globals.css";
import "./custom-font.css";
import { Inter } from "next/font/google";

import { getLayoutData } from "@/lib/shopify";
import Footer from "./compoents/Footer";
import Header from "./compoents/Header";
import AnalyticsClient from "@/components/AnalyticsClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getLayoutData();
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <div className="">
            <a href="#mainContent" className="sr-only">
              Skip to content
            </a>
          </div>
          <Header
            menu={data.body.data.headerMenu}
            title={data.body.data.shop.name}
          />
          <AnalyticsClient />
          <main role="main" id="mainContent" className="flex-grow">
            {children}
          </main>
        </div>
        <Footer footerMenu={data.body.data.footerMenu} />
      </body>
    </html>
  );
}
