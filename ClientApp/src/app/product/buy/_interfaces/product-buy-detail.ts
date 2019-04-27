import { PhotoForProduct } from 'src/app/photo/_interfaces/photo-for-product';

export interface ProductBuyDetail {
  productId: number;
  productName: string;
  specification: string;
  categoryId: number;
  categoryName: string;

  photos: PhotoForProduct[];
}
