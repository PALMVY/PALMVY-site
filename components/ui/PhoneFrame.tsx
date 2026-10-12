import Image from "next/image";
import type { ProductScreenshot } from "@/core/data/products";

type PhoneFrameProps = {
  screenshot: ProductScreenshot;
  sizes: string;
  preload?: boolean;
  className?: string;
};

export function PhoneFrame({
  screenshot,
  sizes,
  preload = false,
  className = "",
}: PhoneFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-4xl border border-cloud/15 bg-pacific-night shadow-[0_24px_48px_rgba(7,26,43,0.45)] ${className}`}
    >
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        sizes={sizes}
        preload={preload}
        className="h-auto w-full"
      />
    </div>
  );
}
