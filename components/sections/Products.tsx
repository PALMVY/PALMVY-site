import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { products } from "@/core/data/products";

export function Products() {
  const featuredProduct = products.find((product) => product.featured);
  const otherProducts = products.filter((product) => !product.featured);
  const otherOffset = featuredProduct ? 2 : 1;

  return (
    <section id="produtos" className="relative px-4 pb-24 sm:px-6 sm:pb-36 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label="Produtos"
          title="Feitos em casa."
          aside="Cada app nasce de um problema que a gente viu de perto. Nenhum é “solução em busca de problema”."
        />

        {featuredProduct && (
          <div className="mb-5">
            <ProductCard product={featuredProduct} position={1} featured />
          </div>
        )}

        {otherProducts.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {otherProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                position={index + otherOffset}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
