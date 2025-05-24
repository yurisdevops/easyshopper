import { useDispatch } from "react-redux";
import { addItemCart } from "../../features/cart/cartSlice";
import { ProductProps } from "../../utils/product.type";
import { Comments } from "../comments";
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
    <div className={styles.container}>
      <h2 className={styles.title}>Detalhes do produto...</h2>
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
              <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.divisor}></div>
      <div className={styles.comments}>
        <Comments product={product} />
      </div>
    </div>
  );
}
