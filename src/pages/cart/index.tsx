import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import {
  decrementItemCart,
  incrementItemCart,
  removeItemCart,
} from "../../features/cart/cartSlice";
import styles from "./styles.module.scss";

export function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state: RootState) => state.cart);

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

  const handleToCheckout = () => {
    if (cart.length > 0) {
      navigate("/checkout");
    } else {
      alert("Seu carrinho está vazio.");
    }
  };

  return (
    <main className={styles.cart}>
      <section className={styles["cart__container"]}>
        {cart.length > 0 ? (
          <h1 className={styles["cart__title"]}>Meu Carrinho...</h1>
        ) : null}

        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className={styles["cart__content"]}>
              <div className={styles["cart__item"]}>
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.title} />
                </Link>
                <div className={styles["cart__info"]}>
                  <div className={styles["cart__details"]}>
                    <h2>{item.title}</h2>
                    <p className={styles["cart__price"]}>
                      {item.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    <div className={styles["cart__quantity"]}>
                      <p>Quantidade:</p>
                      <div className={styles["cart__amount"]}>
                        <button
                          className={styles["cart__button"]}
                          onClick={() => handleDecrementItem(item.id)}
                        >
                          -
                        </button>
                        <p className={styles["cart__quantity-text"]}>
                          {item.quantity}
                        </p>
                        <button
                          className={styles["cart__button"]}
                          onClick={() => handleIncrementItem(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className={styles["cart__button--remove"]}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remover
                  </button>
                  <div className={styles["cart__divider"]}></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles["cart__empty"]}>Seu carrinho está vazio.</div>
        )}

        {cart.length > 0 ? (
          <div className={styles["cart__total"]}>
            <span>
              <p>Total:</p> {total}
            </span>
            <button
              onClick={handleToCheckout}
              className={styles["cart__button--finish"]}
            >
              Finalizar Compra
            </button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
