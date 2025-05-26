import { useDispatch } from "react-redux";
import { addItemCart } from "../../features/cart/cartSlice";
import { ProductProps } from "../../utils/@types/product.type";
import { Comments } from "../comments/Comments";
import styles from "./styles.module.scss";

interface ProductInfo {
  product: ProductProps;
}

export function ProductDetails({ product }: ProductInfo) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const itemToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      totalPrice: product.price,
    };

    dispatch(addItemCart(itemToAdd));
  };

  return (
    <div className={styles["product"]}>
      <h2 className={styles["product__title"]}>Detalhes do produto...</h2>
      <div className={styles["product__details"]}>
        <img
          src={product.images[0]}
          alt={product.title}
          className={styles["product__image"]}
        />
        <div className={styles["product__info"]}>
          <h2 className={styles["product__info-title"]}>{product.title}</h2>
          <p className={styles["product__description"]}>
            {product.description}
          </p>
          <div className={styles["product__content-info"]}>
            <div className={styles["product__content"]}>
              <div className={styles["product__price"]}>
                <span>Preço:</span>
                <p>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
              <div className={styles["product__stock"]}>
                <span>Disponibilidade:</span>
                <p>{product.stock ? "Em estoque" : "Esgotado"}</p>
              </div>
              <div className={styles["product__rating"]}>
                <span>Avaliação:</span>
                <p> {product.rating}</p>
              </div>
              <button
                className={styles["product__button"]}
                onClick={handleAddToCart}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["product__comments"]}>
        <Comments product={product} />
      </div>
    </div>
  );
}
