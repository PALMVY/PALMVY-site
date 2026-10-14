import { safezone } from "./products/safezone";
import { sossegue } from "./products/sossegue";
import type { Product, ProductPlatform } from "./products/types";
import { tunelab } from "./products/tunelab";

export type {
  Product,
  ProductFaq,
  ProductPlatform,
  ProductScreenshot,
  ProductSpotlight,
  ProductStep,
} from "./products/types";

export const PLATFORM_LABELS: Record<ProductPlatform, string> = {
  ios: "iOS",
  android: "Android",
  web: "Web",
};

export const LANDING_ROUTE_BASE = "/produtos";

// O conteúdo de cada produto fica em core/data/products/<id>.ts.
export const products: Product[] = [sossegue, tunelab, safezone];

export const findProductByLandingSlug = (slug: string): Product | undefined =>
  products.find(
    (product) => product.landingPage === `${LANDING_ROUTE_BASE}/${slug}`,
  );

export const getLandingSlugs = (): string[] =>
  products.flatMap((product) =>
    product.landingPage
      ? [product.landingPage.slice(LANDING_ROUTE_BASE.length + 1)]
      : [],
  );
