import Image from "next/image";
import { HorizonLines } from "@/components/ui/HorizonLines";
import type { Product } from "@/core/data/products";

const DEFAULT_LOGO_SIZE = { width: 320, height: 220 };

const LOGO_SHADOW = "shadow-[0_12px_28px_rgba(7,26,43,0.35)]";

function LogoImage({
  product,
  className,
}: {
  product: Product;
  className: string;
}) {
  if (!product.image) return null;

  return (
    <Image
      src={product.image}
      alt={product.name}
      width={product.imageSize?.width ?? DEFAULT_LOGO_SIZE.width}
      height={product.imageSize?.height ?? DEFAULT_LOGO_SIZE.height}
      className={`h-auto object-contain ${className}`}
    />
  );
}

export function ProductVisual({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const lineColor =
    product.tone === "light" ? "text-pacific-night/20" : "text-cloud/15";
  const nameColor =
    product.tone === "light" ? "text-pacific-night" : "text-cloud";
  const noteColor =
    product.tone === "light" ? "text-pacific-night/80" : "text-cloud/80";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${product.accentColor} ${className}`}
    >
      <HorizonLines
        className={`absolute inset-x-0 bottom-0 w-full h-2/3 ${lineColor}`}
      />

      {product.image && product.logoBg ? (
        <div className={`relative z-10 rounded-md p-5 ${LOGO_SHADOW} ${product.logoBg}`}>
          <LogoImage product={product} className="w-36 sm:w-40" />
        </div>
      ) : product.image ? (
        // A logo já tem fundo próprio: ela é o cartão, sem moldura em volta.
        <LogoImage
          product={product}
          className={`relative z-10 w-44 rounded-md sm:w-48 ${LOGO_SHADOW}`}
        />
      ) : (
        // Sem logo nem telas: o nome vira a arte. O texto repete o título da
        // página, então fica fora do leitor de tela.
        <div aria-hidden="true" className="relative z-10 px-6 text-center">
          <p
            className={`font-display text-5xl font-extrabold leading-none tracking-tighter sm:text-6xl ${nameColor}`}
          >
            {product.name}
          </p>
          <p
            className={`mt-4 font-mono text-xs uppercase tracking-widest ${noteColor}`}
          >
            [ Em desenvolvimento ]
          </p>
        </div>
      )}
    </div>
  );
}
