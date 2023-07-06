"use client";
import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    body{
      background-color: #eee;
      padding:0;
      margin:0;
      font-family: 'Poppins', sans-serif;
    }
`;

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GlobalStyles />

      <body>
        <CartContextProvider>{children}</CartContextProvider>
      </body>
    </html>
  );
}