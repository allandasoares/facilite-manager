export type ProductCategoryInterface = {
  id: number;
  name: string;
  image?: string;
  parentId?: number;
  active?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};
