import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SyntaxRun – JavaScript Learning Adventure Game',
  description: 'A 2D adventure game where your code is your controller. Learn JavaScript by writing actual code to navigate worlds, solve puzzles, and defeat epic bosses!',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚔️</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0F19] text-slate-100 antialiased selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

