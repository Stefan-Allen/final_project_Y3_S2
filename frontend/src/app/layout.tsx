import {ReactNode} from "react";
import "./globals.css";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <html lang="en">
        <body style={{fontFamily: 'Fira Code, monospace'}}>
        {children}
        </body>
        </html>
    );
}