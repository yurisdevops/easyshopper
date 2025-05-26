import { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoSearchCircle } from "react-icons/io5";
import { RiShoppingBag2Fill, RiUser3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import logoEasy from "../../assets/logo/logoEasy.png";
import { clearSearch, searchProduct } from "../../features/search/searchSlice";
import { Sidebar } from "../sidebar/Sidebar";
import styles from "./styles.module.scss";

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [top, setTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  );
  const product = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setTop(window.scrollY <= 10);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setSearchTerm("");
    dispatch(clearSearch());
  }, [location.pathname]);

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
    if (searchTerm.trim() !== "") {
      dispatch(searchProduct({ products: product, term: searchTerm }));
      navigate(`/products/${encodeURIComponent(searchTerm)}`);
      dispatch(clearSearch());
      setSearchTerm("");
    } else {
      dispatch(clearSearch());
    }
  };

  const handleSelectProduct = (productId: number) => {
    navigate(`/product/${productId}`);
    setSearchTerm("");
    dispatch(clearSearch());
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    dispatch(clearSearch());
  };
  return (
    <>
      <header
        className={`${styles.header} ${
          !top ? styles["header--fixed"] : styles["header--background"]
        }`}
      >
        <div className={styles["header__menu"]}>
          <div className={styles["header__logo"]}>
            <button
              className={styles["header__menu-button"]}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <HiMenuAlt3 size={32} />
            </button>
            <Link
              to={"/"}
              onClick={() => {
                window.scrollTo(0, 0);
                handleResetSearch();
              }}
            >
              <img
                src={logoEasy}
                alt="Logo Easy"
                className={styles["header__logo-image"]}
              />
            </Link>
          </div>

          <div className={styles["header__actions"]}>
            <div className={styles["header__cart"]}>
              <Link to={""}>
                <RiUser3Fill size={32} color="#f39c12" />
              </Link>
              <Link
                to={"/cart"}
                className={styles["header__cart-icon"]}
                aria-label="Carrinho"
              >
                <RiShoppingBag2Fill size={32} color="#f39c12" />
                {cart.length > 0 && (
                  <span className={styles["header__cart-count"]}>
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <div className={styles["header__search"]}>
          <div className={styles["header__search-container"]}>
            <input
              type="text"
              placeholder="Digite o que você procura..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles["header__search-input"]}
            />
            <button onClick={handleSearchButton} aria-label="buscar">
              <IoSearchCircle size={44} color="#148f77" />
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className={styles["header__search-results"]}>
              {searchResults.map((product) => (
                <p
                  key={product.id}
                  className={styles["header__search-result"]}
                  onClick={() => handleSelectProduct(product.id)}
                >
                  {product.title}
                </p>
              ))}
            </div>
          )}
        </div>
      </header>

      <div
        className={`${styles["header__overlay"]} ${
          menuOpen ? styles["header__overlay--visible"] : ""
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
    </>
  );
}
