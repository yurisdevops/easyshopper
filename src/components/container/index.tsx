import { ReactNode } from "react";
import styles from "./styles.module.scss";

export function Container({ children }: { children: ReactNode }) {
  return (
    <main className={styles.main}>
      <div>{children}</div>
    </main>
  );
}
