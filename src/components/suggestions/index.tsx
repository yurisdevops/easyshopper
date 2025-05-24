import { ProductProps } from "../../utils/product.type";
import { CardProduct } from "../card";
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
    .slice(0, 10); // Pode mostrar até 10 produtos

  return (
    <section className={styles.suggestionsContainer}>
      <h2>Você também pode gostar</h2>
      <div className={styles.sliderWrapper}>
        {filterSuggestions.map((product) => (
          <div key={product.id} className={styles.sliderItem}>
            <CardProduct product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
