import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/cauders/Header';
import Footer from '@/components/cauders/Footer';
import { Montserrat, Lato } from 'next/font/google';
import { cn } from '@/lib/utils';
import CustomCursor from '@/components/cauders/CustomCursor';
import Chatbot from '@/components/cauders/Chatbot';
import SplashScreen from '@/components/cauders/SplashScreen';
import { ConditionalLayout } from '@/components/cauders/ConditionalLayout';
import { ClientOnlyBeams } from '@/components/cauders/ClientOnlyBeams';


export const metadata: Metadata = {
  title: 'Cauders | Innovative Digital Solutions',
  description: 'Cauders crafts premium, modern, and dynamic websites and applications.',
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-headline',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="dark" style={{colorScheme: 'dark'}}>
      <body className={cn(montserrat.variable, lato.variable, 'antialiased font-body flex flex-col min-h-screen bg-background')}>
        <SplashScreen />
        <ConditionalLayout>
            <ClientOnlyBeams />
        </ConditionalLayout>
        
        <CustomCursor />
        <Header />
        <main className="flex-grow pt-16 bg-transparent">
          {children}
        </main>
        <Footer />
        <Toaster />
        <Chatbot />
      </body>
    </html>
  );
}
