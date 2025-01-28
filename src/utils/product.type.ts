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
  images: string[]; // Alterado para array de strings
  price: number;
  rating: number;
  stock: number;
  title: string;
  brand: string;
  reviews: Review[]; // Alterado para utilizar a interface Review
  tags: string[]; // Alterado para array de strings
}
