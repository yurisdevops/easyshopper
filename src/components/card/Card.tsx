import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemCart } from "../../features/cart/cartSlice";
import { ProductProps } from "../../utils/@types/product.type";
import styles from "./styles.module.scss";

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
    <div className={styles.productCard}>
      <Link className={styles.productCard__image} to={`/product/${product.id}`}>
        <img src={product.images[0]} alt={product.title} />
      </Link>

      <div className={styles.productCard__info}>
        <h2>{product?.title}</h2>

        <div className={styles.productCard__description}>
          <span>Descrição:</span>
          <p>{product?.description}</p>
        </div>

        <div className={styles.productCard__price}>
          <span>Preço:</span>
          <p>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <button
          className={styles.productCard__button}
          onClick={handleAddToCart}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
