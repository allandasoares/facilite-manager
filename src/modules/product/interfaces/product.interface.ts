export type ProductInterface = {
  id: number;
  name: string;
  description: string;
  subtitle: string;
  image: string;
  price: number;
  priceUpdatedAt: string | Date;
  supplierId: number;
  productCategoryId: number;
  active?: boolean;
};
