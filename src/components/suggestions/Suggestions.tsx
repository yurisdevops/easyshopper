import { ProductProps } from "../../utils/@types/product.type";
import { CardProduct } from "../card/Card";
import styles from "./styles.module.scss";

export function Suggestions({
  suggested = [],
  currentProductId,
}: {
  suggested?: ProductProps[];
  currentProductId: number;
}) {
  const filterSuggestions = suggested
    .filter((product) => product.id !== currentProductId)
    .slice(0, 10);

  return (
    <section className={styles.suggestions__container}>
      <h2 className={styles.suggestions__title}>Você também pode gostar</h2>
      <div
        className={
          filterSuggestions.length === 0
            ? `${styles.suggestions__slider} ${styles["suggestions__slider--empty"]}`
            : styles.suggestions__slider
        }
      >
        {filterSuggestions.length === 0
          ? [...Array(4)].map((_, index) => (
              <div
                key={index}
                className={styles.suggestions__slider__placeholder}
              ></div>
            ))
          : filterSuggestions.map((product) => (
              <div
                key={product.id}
                className={styles.suggestions__slider__item}
              >
                <CardProduct product={product} />
              </div>
            ))}
      </div>
    </section>
  );
}
