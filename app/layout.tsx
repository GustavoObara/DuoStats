import { ThemeProvider } from "next-themes";
import { Montserrat } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: "DuoStats Extension",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${montserrat.className} bg-black`}>
        <script src="https://extension-files.twitch.tv/helper/v1/twitch-ext.min.js" async></script>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange            
        >            
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
