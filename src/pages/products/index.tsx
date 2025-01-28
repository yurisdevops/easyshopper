import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { ProductProps } from "../../utils/product.type";
import { ProductDetails } from "../../components/product";
import styles from "./styles.module.scss";

export function Products() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<ProductProps | null>(
    null
  );

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do produto:", error);
      }
    };

    getProductDetails();
  }, [id]);

  return (
    <main className={styles.main}>
      <section>
        {productDetails ? (
          <ProductDetails product={productDetails} />
        ) : (
          <div>Carregando detalhes do produto...</div>
        )}
      </section>
    </main>
  );
}
