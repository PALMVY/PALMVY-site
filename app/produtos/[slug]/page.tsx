import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { ProductLanding } from "@/components/sections/ProductLanding";
import {
  findProductByLandingSlug,
  getLandingSlugs,
} from "@/core/data/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getLandingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = findProductByLandingSlug(slug);

  if (!product) return {};

  const title = `${product.name} — ${product.tagline} | PALMVY`;

  return {
    title,
    description: product.description,
    alternates: { canonical: product.landingPage },
    openGraph: {
      title,
      description: product.description,
      siteName: "PALMVY",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = findProductByLandingSlug(slug);

  if (!product) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-pacific-night">
      <Navbar currentHref={product.landingPage} />
      <main className="flex-1 pt-16">
        <ProductLanding product={product} />
      </main>
      <Footer reserveStickyCtaSpace />
    </div>
  );
}
