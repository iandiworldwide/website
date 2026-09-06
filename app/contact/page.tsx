import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = { title: "Contact — I&I Worldwide" };

export default function ContactPage() {
  return (
    <div className="pt-header">
      <ContactSection />
    </div>
  );
}
