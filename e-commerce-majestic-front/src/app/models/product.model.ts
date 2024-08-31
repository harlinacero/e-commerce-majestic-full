import { Category } from './category.model';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: Category;
  taxes?: number;
  disccount?: number;
  inventory?: number;
  image?: string;
  creationAt?: Date;
  updatedAt?: Date;
}


export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface UpdateProductDTO extends Product { 
  categoryId: number;
}


