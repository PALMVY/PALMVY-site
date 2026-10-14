import { HorizonLines } from "@/components/ui/HorizonLines";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import type { Product, ProductScreenshot } from "@/core/data/products";

/**
 * - `square`: painel quadrado com borda (abertura das landing pages).
 * - `wide`: faixa no topo de um card, celulares cortados embaixo.
 * - `fill`: ocupa a altura do pai no desktop (card em destaque da home).
 */
export type PhoneStageShape = "square" | "wide" | "fill";

type PhoneStageProps = {
  screenshots: ProductScreenshot[];
  accentColor: Product["accentColor"];
  tone: Product["tone"];
  shape?: PhoneStageShape;
  preload?: boolean;
  className?: string;
};

type ShapeLayout = {
  container: string;
  back: string;
  front: string;
  backSizes: string;
  frontSizes: string;
};

// Sobe os celulares quando o card (com a classe `group`) recebe hover.
const LIFT_ON_HOVER =
  "transition-transform duration-500 ease-out group-hover:-translate-y-2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0";

const SHAPE_LAYOUTS: Record<PhoneStageShape, ShapeLayout> = {
  // Os celulares nascem do pé do painel: a borda esconde o corte da imagem.
  square: {
    container: "aspect-square rounded-3xl border border-cloud/10",
    back: "bottom-[-20%] left-[6%] w-[40%] brightness-75",
    front: "bottom-[-9%] right-[8%] w-[50%]",
    backSizes: "(min-width: 768px) 220px, 40vw",
    frontSizes: "(min-width: 768px) 276px, 50vw",
  },
  wide: {
    container: "aspect-video",
    back: "top-[14%] left-[16%] w-[30%] -rotate-6",
    front: "top-[22%] right-[18%] w-[32%]",
    backSizes: "(min-width: 768px) 180px, 30vw",
    frontSizes: "(min-width: 768px) 190px, 32vw",
  },
  fill: {
    container: "aspect-square md:aspect-auto md:h-full md:min-h-128",
    back: "top-[10%] left-[10%] w-[38%] -rotate-6",
    front: "top-[16%] right-[10%] w-[42%]",
    backSizes: "(min-width: 768px) 230px, 38vw",
    frontSizes: "(min-width: 768px) 250px, 42vw",
  },
};

export function PhoneStage({
  screenshots,
  accentColor,
  tone,
  shape = "square",
  preload = false,
  className = "",
}: PhoneStageProps) {
  const [front, back] = screenshots;
  if (!front) return null;

  const layout = SHAPE_LAYOUTS[shape];
  const lineColor =
    tone === "light" ? "text-pacific-night/20" : "text-cloud/15";

  return (
    <div
      className={`relative overflow-hidden ${layout.container} ${accentColor} ${className}`}
    >
      <HorizonLines
        className={`absolute inset-x-0 bottom-0 h-2/3 w-full ${lineColor}`}
      />

      {back && (
        <div className={`absolute ${layout.back} ${LIFT_ON_HOVER}`}>
          <PhoneFrame screenshot={back} sizes={layout.backSizes} />
        </div>
      )}

      <div className={`absolute ${layout.front} ${LIFT_ON_HOVER}`}>
        <PhoneFrame
          screenshot={front}
          sizes={layout.frontSizes}
          preload={preload}
        />
      </div>
    </div>
  );
}
