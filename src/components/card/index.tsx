import { Link } from "react-router-dom";
import { ProductProps } from "../../utils/product.type";
import styles from "./styles.module.scss";

interface ProductInfo {
  product: ProductProps;
}

export function CardProduct({ product }: ProductInfo) {
  return (
    <div className={styles.card}>
      <Link className={styles.cardImage} to={`/products/${product.id}`}>
        <img src={product.images[0]} alt={product.title} />
      </Link>

      <div className={styles.cardInfo}>
        <h2>{product?.title}</h2>
        <div className={styles.description}>
          <span>Descrição:</span>
          <p>{product?.description}</p>
        </div>
        <div className={styles.price}>
          <span>Preço:</span>
          <p>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
        <button>Adicionar ao carrinho</button>
      </div>
    </div>
  );
}
