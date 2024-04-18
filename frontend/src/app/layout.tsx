"use client"
import {Inter, Roboto} from "next/font/google";
import "./globals.css";
const robotoFont = Roboto({ weight: "400", subsets: ["latin"] });

const metadata = {
    title: "EnviroCare",
    description: "EnviroCare Application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body className={robotoFont.className}>
                {children}
            </body>
        </html>
    );
}