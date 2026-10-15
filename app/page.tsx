import { CustomWorkPaused } from "@/components/sections/CustomWorkPaused";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { Products } from "@/components/sections/Products";

// Foco nos apps próprios. O sob medida está pausado: CustomWork, HowWeWork e
// Contact continuam em components/sections para voltar quando reabrir.
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-pacific-night">
      <Navbar />
      <main className="flex-1 pt-16">
        <Hero />
        <Products />
        <CustomWorkPaused />
      </main>
      <Footer />
    </div>
  );
}
