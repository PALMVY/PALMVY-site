import { HorizonLines } from "@/components/ui/HorizonLines";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import type { Product, ProductScreenshot } from "@/core/data/products";

type PhoneStageProps = {
  screenshots: ProductScreenshot[];
  accentColor: Product["accentColor"];
  tone: Product["tone"];
  preload?: boolean;
  className?: string;
};

export function PhoneStage({
  screenshots,
  accentColor,
  tone,
  preload = false,
  className = "",
}: PhoneStageProps) {
  const [front, back] = screenshots;
  if (!front) return null;

  const lineColor =
    tone === "light" ? "text-pacific-night/20" : "text-cloud/15";

  // Os celulares nascem do pé do painel: a borda esconde o corte da imagem.
  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-md border border-soft-gray/10 ${accentColor} ${className}`}
    >
      <HorizonLines
        className={`absolute inset-x-0 bottom-0 h-2/3 w-full ${lineColor}`}
      />

      {back && (
        <div className="absolute bottom-[-20%] left-[6%] w-[40%] brightness-75">
          <PhoneFrame
            screenshot={back}
            sizes="(min-width: 768px) 220px, 40vw"
          />
        </div>
      )}

      <div className="absolute bottom-[-9%] right-[8%] w-[50%]">
        <PhoneFrame
          screenshot={front}
          sizes="(min-width: 768px) 276px, 50vw"
          preload={preload}
        />
      </div>
    </div>
  );
}
