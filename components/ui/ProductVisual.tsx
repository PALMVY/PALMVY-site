import Image from "next/image";
import { HorizonLines } from "@/components/ui/HorizonLines";
import type { Product } from "@/core/data/products";

const DEFAULT_LOGO_SIZE = { width: 320, height: 220 };

export function ProductVisual({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const lineColor =
    product.tone === "light" ? "text-pacific-night/20" : "text-cloud/15";
  const emptyTextColor =
    product.tone === "light" ? "text-pacific-night/60" : "text-cloud/60";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${product.accentColor} ${className}`}
    >
      <HorizonLines
        className={`absolute inset-x-0 bottom-0 w-full h-2/3 ${lineColor}`}
      />

      {product.image ? (
        <div
          className={`relative z-10 rounded-md p-5 shadow-[0_12px_28px_rgba(7,26,43,0.35)] ${product.logoBg}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            width={product.imageSize?.width ?? DEFAULT_LOGO_SIZE.width}
            height={product.imageSize?.height ?? DEFAULT_LOGO_SIZE.height}
            className="h-auto w-36 sm:w-40 object-contain"
          />
        </div>
      ) : (
        <p
          className={`relative z-10 font-mono text-sm ${emptyTextColor}`}
        >
          Em breve
        </p>
      )}
    </div>
  );
}
