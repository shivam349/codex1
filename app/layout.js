import './globals.css';

export const metadata = {
  title: 'Mithila Makhana 3D Store',
  description: 'Premium Mithila Makhana with immersive 3D shopping experience'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
