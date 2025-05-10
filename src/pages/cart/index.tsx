import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  decrementItemCart,
  incrementItemCart,
  removeItemCart,
} from "../../features/cart/cartSlice";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { ProductCartProps } from "../../utils/product.type";

export function Cart() {
  const { cart, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId: number) => {
    const itemToRemove = cart.find((item) => item.id === itemId);
    if (itemToRemove) {
      dispatch(removeItemCart(itemToRemove));
    }
  };

  const handleIncrementItem = (item: number) => {
    dispatch(incrementItemCart(item));
  };
  const handleDecrementItem = (item: number) => {
    dispatch(decrementItemCart(item));
  };

  return (
    <main className={styles.main}>
      <section>
        <h1 className={styles.title}>Meu Carrinho</h1>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className={styles.content}>
              <div className={styles.cartItem}>
                <Link to={`/products/${item.id}`}>
                  <img src={item.image} alt={item.title} />
                </Link>
                <div className={styles.cartInfo}>
                  <div className={styles.cartDetails}>
                    <h2>{item.title}</h2>
                    <p className={styles.price}>
                      {item.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    <div className={styles.quantity}>
                      <p>Quantidade:</p>
                      <button
                        className={styles.button}
                        onClick={() => handleDecrementItem(item.id)}
                      >
                        -
                      </button>
                      <p className={styles.quantityText}> {item.quantity}</p>
                      <button
                        className={styles.button}
                        onClick={() => handleIncrementItem(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className={styles.buttonRemove}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.span}>Seu carrinho está vazio.</div>
        )}
        {cart.length > 0 ? (
          <div className={styles.totalPrice}>
            <p>Total: {total}</p>
            <button className={styles.button}>Finalizar Compra</button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
