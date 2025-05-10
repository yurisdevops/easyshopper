import { Link } from "react-router-dom";
import { ProductProps } from "../../utils/product.type";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { addItemCart } from "../../features/cart/cartSlice";

interface ProductInfo {
  product: ProductProps;
}

export function CardProduct({ product }: ProductInfo) {
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
        <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
      </div>
    </div>
  );
}
