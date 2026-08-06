import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.title}>Membangun Aplikasi Next.js Lebih Terstruktur</h1>
      <p className={styles.description}>
        Project ini dikembangkan menggunakan Feature-Based Architecture, terhubung ke MongoDB, 
        dan siap didepoy ke Vercel secara gratis.
      </p>
      <div className={styles.buttonGroup}>
        <button className={styles.primaryBtn}>Mulai Sekarang</button>
        <button className={styles.secondaryBtn}>Pelajari Fitur</button>
      </div>
    </section>
  );
}