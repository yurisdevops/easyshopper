import { RiShoppingBag2Fill } from "react-icons/ri";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import logoEasy from "../../assets/logoEasy.png";
import { useEffect, useState } from "react";
export function Header() {
  const [top, setTop] = useState(true);

  useEffect(() => {
    let ticking = false; // Variável para controlar o ticking

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setTop(window.scrollY <= 10);
          ticking = false;
        });

        ticking = true; // Marcar que estamos em um ciclo de animação
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Para definir o estado inicial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`${styles.header} ${!top ? styles.fixed : styles.background}`}
    >
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
            <img src={logoEasy} alt="" className={styles.logoEasy} />
          </Link>
        </div>

        <div className={styles.actions}>
          <div className={styles.actionsLinks}>
            <Link to={"/products"}>Produtos</Link>
            <Link to={"/about"}>Sobre</Link>
          </div>
          <Link to={"/cart"}>
            <RiShoppingBag2Fill
              size={32}
              color="#f39c12"
              className={styles.logoCart}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
