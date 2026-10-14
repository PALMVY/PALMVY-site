import { Contact } from "@/components/sections/Contact";
import { CustomWork } from "@/components/sections/CustomWork";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { Navbar } from "@/components/sections/Navbar";
import { Products } from "@/components/sections/Products";

// Ordem 80/20: produtos próprios primeiro, trabalho sob medida depois.
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-pacific-night">
      <Navbar />
      <main className="flex-1 pt-16">
        <Hero />
        <Products />
        <CustomWork />
        <HowWeWork />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
