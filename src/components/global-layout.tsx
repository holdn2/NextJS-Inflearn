import { ReactNode } from "react";
import Link from "next/link";
import styles from "./global-layout.module.css";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={"/"}>📚 ONEBITE BOOKS</Link>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>제작 @uchan0</footer>
    </div>
  );
}
