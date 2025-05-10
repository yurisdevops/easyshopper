export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductProps {
  category: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  title: string;
  brand: string;
  reviews: Review[];
  tags: string[];
}

export interface ProductCartProps {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  totalPrice: number;
}
