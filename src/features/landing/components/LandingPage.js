import Hero from './Hero/Hero';
import FeaturesList from './FeatureList/FeatureList';
import Footer from './Footer/Footer';
import styles from './LandingPage.module.css';

export default function LandingPage() {
  return (
    <main className={styles.wrapper}>
      <Hero />
      <FeaturesList />
      <Footer />
    </main>
  );
}