import styles from "./styles.module.scss";
import logoEasy from "../../assets/logo/logoEasy.png";
import { Link } from "react-router-dom";

interface SidebarProps {
  menuOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
}

export function Sidebar({ menuOpen, setMenuOpen }: SidebarProps) {
  return (
    <div
      className={`${styles.mobileMenu} ${
        menuOpen ? styles.mobileMenuOpen : ""
      }`}
    >
      <div className={styles.logoMobile}>
        <h1>
          <img src={logoEasy} alt="" className={styles.logoEasy} />
        </h1>
        <button
          className={styles.closeButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span>✖</span>
        </button>
      </div>
      <div className={styles.categories}>
        <h2>Categorias</h2>
        <ul className={styles.categoriesList}>
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
      <div className={styles.actionsMobile}>
        <h2>Ajuda</h2>
        <ul className={styles.actionsList}>
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
