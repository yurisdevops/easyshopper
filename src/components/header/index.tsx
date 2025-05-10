import { RiShoppingBag2Fill } from "react-icons/ri";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import logoEasy from "../../assets/logo/logoEasy.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IoSearchCircle } from "react-icons/io5";
import { searchProduct, clearSearch } from "../../features/search/searchSlice";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [selectProductId, setSelectProductId] = useState<number | null>(null);
  const [top, setTop] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  );
  const product = useSelector((state: RootState) => state.products.products);

  const navigate = useNavigate();

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      dispatch(clearSearch());
    } else {
      dispatch(searchProduct({ products: product, term }));
    }
  };

  const handleSearchButton = () => {
    if (searchTerm.trim() !== "" && selectProductId) {
      dispatch(searchProduct({ products: product, term: searchTerm }));
      navigate(`/products/${selectProductId}`);
      dispatch(clearSearch()); // Limpa a pesquisa após a navegação
    } else {
      dispatch(clearSearch()); // Limpa a pesquisa se não houver termo válido
    }
  };

  const handleSelectProduct = (productId: number, productName: string) => {
    setSearchTerm(productName);
    setSelectProductId(productId);
    dispatch(clearSearch()); // Limpa a pesquisa após a seleção
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    dispatch(clearSearch());
  };
  return (
    <header
      className={`${styles.header} ${!top ? styles.fixed : styles.background}`}
    >
      <div className={styles.menu}>
        <div className={styles.logo}>
          <Link
            to={"/"}
            onClick={() => {
              window.scrollTo(0, 0);
              handleResetSearch();
            }}
          >
            <img src={logoEasy} alt="" className={styles.logoEasy} />
          </Link>
        </div>
        <div className={styles.search}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="O que procura?"
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <button onClick={handleSearchButton}>
              <IoSearchCircle size={32} color="#148f77" />{" "}
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className={styles.searchResults}>
              {searchResults.map((product) => (
                <p
                  key={product.id}
                  className={styles.searchResult}
                  onClick={() => handleSelectProduct(product.id, product.title)}
                >
                  {product.title}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className={styles.actions}>
          <div className={styles.actionsLinks}>
            <Link to={"/products"}>Produtos</Link>
            <Link to={"/about"}>Sobre</Link>
          </div>
          <Link to={"/cart"} className={styles.logoCart}>
            <RiShoppingBag2Fill size={32} color="#f39c12" />
            {cart.length > 0 && (
              <span className={styles.cartCount}>{cart.length}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
