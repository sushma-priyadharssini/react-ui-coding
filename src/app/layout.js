import "./globals.css";

export const metadata = {
  title: "React Nuggets",
  description: "A collection of small yet powerful React apps built to sharpen skills and share knowledge.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
