import { Link } from "react-router-dom";
import logoEasy from "../../assets/logo/logoEasy.png";
import styles from "./styles.module.scss";

interface SidebarProps {
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
}

export function Sidebar({ menuOpen, setMenuOpen }: SidebarProps) {
  return (
    <div
      className={`${styles["mobile-menu"]} ${
        menuOpen ? styles["mobile-menu--open"] : ""
      }`}
    >
      <div className={styles["mobile-menu__logo"]}>
        <h1>
          <img
            src={logoEasy}
            alt=""
            className={styles["mobile-menu__logo-img"]}
          />
        </h1>
        <button
          className={styles["mobile-menu__close-button"]}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>✖</span>
        </button>
      </div>
      <div className={styles["mobile-menu__categories"]}>
        <h2>Categorias</h2>
        <ul className={styles["mobile-menu__categories-list"]}>
          <li>
            <Link to="" onClick={() => setMenuOpen(false)}>
              Todos
            </Link>
          </li>
          <li>
            <Link to="" onClick={() => setMenuOpen(false)}>
              Smartphones
            </Link>
          </li>
          <li>
            <Link to="" onClick={() => setMenuOpen(false)}>
              Tablets
            </Link>
          </li>
          <li>
            <Link to="" onClick={() => setMenuOpen(false)}>
              Notebooks
            </Link>
          </li>
          <li>
            <Link to="" onClick={() => setMenuOpen(false)}>
              Relógios
            </Link>
          </li>
          <li>
            <Link to="" onClick={() => setMenuOpen(false)}>
              Acessórios
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles["mobile-menu__actions"]}>
        <h2>Ajuda</h2>
        <ul className={styles["mobile-menu__actions-list"]}>
          <li>
            <Link to="" onClick={() => setMenuOpen(false)}>
              Fale Conosco
            </Link>
          </li>
          <li>
            <Link to="" onClick={() => setMenuOpen(false)}>
              Trocas e Devoluções
            </Link>
          </li>
          <li>
            <Link to="" onClick={() => setMenuOpen(false)}>
              Dúvidas Frequentes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
