import styles from "./page.module.css";
import Home from "@/libs/home";


export default function App() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Home />
      </main>
    </div>
  );
}
