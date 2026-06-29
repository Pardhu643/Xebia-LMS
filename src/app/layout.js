import "./globals.css";
import QueryProvider from "../context/QueryProvider";
import { ToastProvider } from "../context/ToastProvider";

export const metadata = {
  title: "Xebia Enterprise LMS Portal",
  description: "Enterprise learning management system portal built for Xebia Consultants and Tech Architects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full bg-background text-foreground custom-scrollbar">
        <QueryProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
