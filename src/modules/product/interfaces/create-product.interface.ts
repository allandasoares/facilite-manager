export type CreateProductInterface = {
  name: string;
  description: string;
  subtitle: string;
  brand: string;
  image?: string | null;
  rating?: number;
  minimumToEstimate?: number;
  price: number;
  priceUpdatedAt?: string | Date;
  productCategoryId: number | null;
  supplierId: number | null;
  active?: boolean;
  productFeatures?: any[];
  productKeywords?: any[];
};
