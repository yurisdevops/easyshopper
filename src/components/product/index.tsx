import { ProductProps } from "../../utils/product.type";
import { Comments } from "../comments";
import styles from "./styles.module.scss";

interface ProductInfo {
  product: ProductProps;
}

export function ProductDetails({ product }: ProductInfo) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalhes do produto</h1>
      <div className={styles.details}>
        <img src={product.images[0]} alt={product.title} />
        <div className={styles.detailsInfo}>
          <h2>{product.title}</h2>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.contentInfo}>
            <div className={styles.content}>
              <div className={styles.price}>
                <span>Preço:</span>
                <p>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <div className={styles.rating}>
                <span>Disponibilidade:</span>
                <p>{product.stock ? "Em estoque" : "Esgotado"}</p>
              </div>
              <div className={styles.available}>
                <span>Avaliação:</span>
                <p> {product.rating}</p>
              </div>
              <button>Adicionar ao carrinho</button>
            </div>{" "}
            <div className={styles.comments}>
              <Comments product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
