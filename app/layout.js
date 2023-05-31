
import './globals.css'
import Header from './components/Header'
import { AuthProvider } from './providers/AuthProvider'
import { FilesProvider } from './providers/FilesProvider';

export const metadata = {
  title: "Files Send",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className='md:w-3/4 m-auto min-h-screen bg-gray-100'>
        <AuthProvider>
          <FilesProvider>
            <Header />
            {children}
          </FilesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
