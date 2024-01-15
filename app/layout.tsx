import './globals.css'

import Footer from './components/Footer'

export default function RootLayout({ children, }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
