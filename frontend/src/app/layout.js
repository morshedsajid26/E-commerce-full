import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gadget Land BD - Leading Computer, Laptop & Gaming PC Shop in Bangladesh",
  description: "Buy Desktop PC, Laptop, Graphics Card, Processor, Monitor, Gaming Gear & Components at Best Price in Bangladesh with Official Warranty from Gadget Land.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
