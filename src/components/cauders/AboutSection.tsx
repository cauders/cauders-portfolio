
'use client';

import ScrollFadeIn from "./ScrollFadeIn";
import StandardizedHeading from "./StandardizedHeading";

export default function AboutSection() {
    return (
        <section className="py-12 sm:py-16">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <StandardizedHeading text={"We don't just build\nWe create experiences."} />
                </div>
            </div>
        </section>
    )
}
