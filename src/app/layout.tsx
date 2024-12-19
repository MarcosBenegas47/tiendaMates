import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import NavBar from "./component/NavBar";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

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

  const cookie = cookies().get("accessToken");
  let estado = false
  if(cookie){
   
    if(verify(cookie?.value, 'ClaveSecreta'))  {
      estado= true;
    }
    // else{
    //   estado= false;
    // }
  }
  return (
    <html lang="en">
      <head>
      <link rel= "stylesheet" href= "https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css" ></link>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>

            <header>
              <NavBar estado = {estado}/>
            </header>
            {children}
           
            <SpeedInsights />
  
        
      <footer >

  
      </footer>
      </body>
    </html>
  );
}
