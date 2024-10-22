import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import styles from "../resources/styles/pageMain.module.css";
import Sidebar from "./component/SideBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tienda Mates",
  description: "Aquí encontrará nuestro catálogo de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.container}>
            <Sidebar/>

          {/* <div className={styles.cont}> */}
            

            {children}

          {/* </div> */}
        
      </div>
        
      <footer >

  
</footer>
      </body>
    </html>
  );
}
