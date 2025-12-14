import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'AI Finance Agent',
  description: 'Stub layout for AI Finance Agent',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
