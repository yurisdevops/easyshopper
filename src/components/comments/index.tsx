import { ProductProps } from "../../utils/product.type";
import styles from "./styles.module.scss";

interface ProductInfo {
  product: ProductProps;
}

export function Comments({ product }: ProductInfo) {
  return (
    <div className={styles.container}>
      <h2>Comentários</h2>
      {product.reviews.map((review, index) => (
        <div key={index} className={styles.content}>
          <div className={styles.commentInfo}>
            <span>Nome:</span>
            <p>{review.reviewerName}</p>
          </div>
          <div className={styles.commentInfo}>
            <span>Email:</span>
            <p>{review.reviewerEmail}</p>
          </div>
          <div className={styles.commentInfo}>
            <span>Resenha:</span>
            <p>{review.comment}</p>
          </div>
          <div className={styles.commentInfo}>
            <span>Avaliação:</span>
            <p>{review.rating}</p>
          </div>
          <div className={styles.commentInfo}>
            <span>Data:</span>
            <p>{new Date(review.date).toLocaleDateString("pt-BR")}</p>
          </div>
          <div className={styles.divisor}></div>
        </div>
      ))}
    </div>
  );
}
