import styles from './FeatureList.module.css';

const FEATURES = [
  {
    id: 1,
    title: 'Feature-Based Architecture',
    description: 'Kode terorganisir per domain fitur (Users, Payment, Landing) untuk kemudahan maintenance.'
  },
  {
    id: 2,
    title: 'MongoDB Integration',
    description: 'Arsitektur lengkap dengan layer Schema, Repository, Service, Actions, dan Queries.'
  },
  {
    id: 3,
    title: 'Vercel Deployment Ready',
    description: 'Ringan, terisolasi dengan CSS Modules, serta teroptimasi untuk performa serverless.'
  }
];

export default function FeaturesList() {
  return (
    <section className={styles.container}>
      <div className={styles.sectionHeader}>
        <h2>Fitur Utama Arsitektur</h2>
      </div>
      <div className={styles.grid}>
        {FEATURES.map((item) => (
          <div key={item.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}