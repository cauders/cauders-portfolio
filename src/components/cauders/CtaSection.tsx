
'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import StandardizedHeading from './StandardizedHeading';

export default function CtaSection() {
    return (
        <section className="relative py-20 md:py-32 overflow-hidden h-screen flex items-center justify-center">
            <div className="relative container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <StandardizedHeading text={"Let's make great\nwork together"} />
                    <div className="mt-12">
                        <Button asChild size="lg" variant="default">
                            <Link href="https://cauders.com/contact">Get in touch</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
