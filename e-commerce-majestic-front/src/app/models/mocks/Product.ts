
export interface Product {
  idProduct: string;
  image: string;
  productName: string;
  unitValue: number;
  description?: string;
  category?: string;
  stock?: number;
  supplier?: string;
  createdAt?: Date;
  updatedAt?: Date;
  discount?: number;
  tags?: string[];
}

