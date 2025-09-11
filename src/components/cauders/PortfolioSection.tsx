
"use client";

import { PortfolioGrid } from "@/components/PortfolioGrid";
import StandardizedHeading from "./StandardizedHeading";

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <StandardizedHeading text={"Our Work"} />
        </div>
        <PortfolioGrid />
      </div>
    </section>
  );
}
