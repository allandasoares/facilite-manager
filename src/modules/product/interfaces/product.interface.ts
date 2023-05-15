export type ProductInterface = {
  id: number;
  name: string;
  description: string;
  subtitle: string;
  image: string;
  rating?: number;
  minimumToEstimate?: number;
  price: number;
  priceUpdatedAt: string | Date;
  supplierId: number;
  productCategoryId: number;
  active?: boolean;
};
