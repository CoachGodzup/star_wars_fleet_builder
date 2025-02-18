import styles from "./page.module.css";
import GlobalForm, { DetailFormProps } from "@/components/globalForm";

export default function Home() {
  const onSubmit = (data: DetailFormProps) => {
    console.log(data);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section>
          <div>
            <h1>Create fleet</h1>
          </div>
          <GlobalForm onSubmit={onSubmit}/>
        </section>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
