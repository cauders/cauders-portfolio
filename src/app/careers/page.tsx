import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
          Careers at Cauders
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
          We are always looking for talented individuals to join our team. If you are passionate about building great products, we would love to hear from you.
        </p>
      </section>

      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-headline text-3xl font-bold mb-4">Current Openings</h2>
        <p className="text-muted-foreground mb-8">
          We do not have any open positions at the moment, but we are always interested in hearing from talented people. Feel free to send us your resume.
        </p>
        <Button asChild>
          <Link href="https://cauders.com/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}
