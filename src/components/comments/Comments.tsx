import { ProductProps } from "../../utils/@types/product.type";
import styles from "./styles.module.scss";

interface ProductInfo {
  product: ProductProps;
}

export function Comments({ product }: ProductInfo) {
  return (
    <div className={styles["comments-section"]}>
      <h2 className={styles["comments-section__title"]}>Comentários</h2>

      <div className={styles["comments-section__container"]}>
        {product.reviews.map((review, index) => (
          <div key={index} className={styles["comments-section__wrapper"]}>
            <div className={styles["comments-section__card"]}>
              <div className={styles["comments-section__details"]}>
                <div className={styles["comments-section__item"]}>
                  <span>Nome:</span>
                  <p>{review.reviewerName}</p>
                </div>
                <div className={styles["comments-section__item"]}>
                  <span>Email:</span>
                  <p>{review.reviewerEmail}</p>
                </div>
                <div className={styles["comments-section__item"]}>
                  <span>Resenha:</span>
                  <p>{review.comment}</p>
                </div>
                <div className={styles["comments-section__item"]}>
                  <span>Avaliação:</span>
                  <p>{review.rating}</p>
                </div>
                <div className={styles["comments-section__item"]}>
                  <span>Data:</span>
                  <p>{new Date(review.date).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
