import './globals.css';

export const metadata = {
  title: 'Mithila Makhana 3D Store - Premium Lotus Seeds',
  description: 'Experience authentic Mithila makhana with immersive 3D shopping. Premium quality lotus seeds, organic certified, and delivered fresh. Shop now!'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
