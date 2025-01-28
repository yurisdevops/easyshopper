import { useEffect, useState } from "react";
import api from "../../services/api";
import { ProductProps } from "../../utils/product.type";
import { CardProduct } from "../../components/card";
import styles from "./styles.module.scss";
import { Carousel } from "../../components/carousel";

export function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const getDataProduct = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Erro ao buscar os produto:", error);
      }
    };
    getDataProduct();
  }, []);

  return (
    <main className={styles.main}>
      <Carousel />
      <h1>Produtos em Destaque...</h1>
      <section className={styles.content}>
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
