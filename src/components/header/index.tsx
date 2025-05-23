import { useEffect, useState } from "react";
import { IoSearchCircle } from "react-icons/io5";
import { RiShoppingBag2Fill, RiUser3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import logoEasy from "../../assets/logo/logoEasy.png";
import { clearSearch, searchProduct } from "../../features/search/searchSlice";
import { Sidebar } from "../sidebar";
import styles from "./styles.module.scss";

export function Header() {
  const [selectProductId, setSelectProductId] = useState<number | null>(null);
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
      dispatch(clearSearch());
    } else {
      dispatch(clearSearch());
    }
  };

  const handleSelectProduct = (productId: number, productName: string) => {
    setSearchTerm(productName);
    setSelectProductId(productId);
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
          !top ? styles.fixed : styles.background
        }`}
      >
        <div className={styles.menu}>
          <div className={styles.logo}>
            <button
              className={styles.menuButton}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span>☰</span>
            </button>
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

          <div className={styles.actions}>
            <div className={styles.cartContainer}>
              <Link to={""}>
                <RiUser3Fill size={32} color="#f39c12" />
              </Link>
              <Link to={"/cart"} className={styles.logoCart}>
                <RiShoppingBag2Fill size={32} color="#f39c12" />
                {cart.length > 0 && (
                  <span className={styles.cartCount}>{cart.length}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Digite o que você procura..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <button onClick={handleSearchButton}>
              <IoSearchCircle size={44} color="#148f77" />{" "}
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
      </header>

      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
    </>
  );
}
