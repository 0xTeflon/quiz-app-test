import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quiz App",
  description: "Simple quiz app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className="app-header">
          <div className="app-header-inner">
            <h1 className="app-title">Quiz App</h1>

            <nav className="app-nav">
              <a href="/">Home</a>
              <a href="/leaderboard">Leaderboard</a>
            </nav>
          </div>
        </header>

        <main className="app-container">{children}</main>
      </body>
    </html>
  );
}
