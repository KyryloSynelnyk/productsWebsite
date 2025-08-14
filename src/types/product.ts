export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  images?: string[];
  rating?: number;
  brand?: string;
  category?: string;
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
