import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { ProductProps } from "../../utils/product.type";
import { ProductDetails } from "../../components/product";
import styles from "./styles.module.scss";
import { Suggestions } from "../../components/suggestions";

export function Products() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<ProductProps | null>(
    null
  );
  const [suggestedProducts, setSuggestedProducts] = useState<ProductProps[]>(
    []
  );

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProductDetails(response.data);

        const categoryResponse = await api.get(
          `/products/category/${response.data.category}`
        );
        setSuggestedProducts(
          Array.isArray(categoryResponse.data.products)
            ? categoryResponse.data.products
            : []
        );
        console.log(categoryResponse.data);
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
          <>
            <div>
              <ProductDetails product={productDetails} />
            </div>
            <div>
              <Suggestions
                suggested={suggestedProducts}
                currentProductId={productDetails?.id}
              />
            </div>
          </>
        ) : (
          <div>Carregando detalhes do produto...</div>
        )}
      </section>
    </main>
  );
}
