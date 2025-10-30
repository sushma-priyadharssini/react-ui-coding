import styles from "./page.module.css";
import Home from "@/libs/home";


export default function App() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <Home />
      </div>
    </div>
  );
}
