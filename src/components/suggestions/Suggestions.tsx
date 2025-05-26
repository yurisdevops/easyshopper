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
    <section className={styles.suggestionsContainer}>
      <h2 className={styles.suggestionsTitle}>Você também pode gostar</h2>
      <div className={styles.sliderWrapper}>
        {filterSuggestions.length === 0
          ? [...Array(4)].map((_, index) => (
              <div key={index} className={styles.placeholderCard}></div>
            ))
          : filterSuggestions.map((product) => (
              <div key={product.id} className={styles.sliderItem}>
                <CardProduct product={product} />
              </div>
            ))}
      </div>
    </section>
  );
}
