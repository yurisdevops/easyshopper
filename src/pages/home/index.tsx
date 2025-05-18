import { useEffect, useState } from "react";
import api from "../../services/api";
import { ProductProps } from "../../utils/product.type";
import { CardProduct } from "../../components/card";
import styles from "./styles.module.scss";
import { Slider } from "../../components/carousel";
import image01 from "../../assets/carouselImages/01.jpg";
import image02 from "../../assets/carouselImages/02.jpg";
import image03 from "../../assets/carouselImages/03.jpg";
import image04 from "../../assets/carouselImages/04.jpg";
import image05 from "../../assets/carouselImages/05.jpg";

import { useDispatch } from "react-redux";

import { setProduct } from "../../features/products/productsSlice";

export function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const images = [
    { alt: "Imagem 01", url: image01 },
    { alt: "Imagem 02", url: image02 },
    { alt: "Imagem 03", url: image03 },
    { alt: "Imagem 04", url: image04 },
    { alt: "Imagem 05", url: image05 },
  ];

  useEffect(() => {
    const getDataProduct = async () => {
      try {
        const smartResponse = await api.get("/products/category/smartphones");
        const laptopsResponse = await api.get("/products/category/laptops");
        const mobileAcessoriesResponse = await api.get(
          "/products/category/mobile-accessories"
        );
        const tabletsResponse = await api.get("/products/category/tablets");
        const mensWatchesResponse = await api.get(
          "/products/category/mens-watches"
        );

        const allProducts = [
          ...smartResponse.data.products,
          ...laptopsResponse.data.products,
          ...mobileAcessoriesResponse.data.products,
          ...tabletsResponse.data.products,
          ...mensWatchesResponse.data.products,
        ];

        setProducts(allProducts);

        dispatch(setProduct(allProducts));
      } catch (error) {
        setError("Erro ao carregar produtos, tente novamente!");
      }
    };
    getDataProduct();
  }, []);

  return (
    <main className={styles.main}>
      <Slider images={images} />
      {error && <p className={styles.error}>{error}</p>}

      <h1>Produtos em Destaque...</h1>
      <section className={styles.content}>
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
