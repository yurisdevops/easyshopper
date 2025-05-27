import styles from "./styles.module.scss";

export function ModalProfile() {
  return (
    <div className={styles.modal}>
      <ul className={styles.modal__list}>
        <li className={styles.modal__item}>Perfil</li>
        <li className={styles.modal__item}>Meus Pedidos</li>
        <li className={styles.modal__item}>Meus Favoritos</li>
        <li className={styles.modal__item}>Configurações</li>
        <li className={styles.modal__item}>Logout</li>
      </ul>
    </div>
  );
}
