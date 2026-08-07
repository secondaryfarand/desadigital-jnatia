import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variantClass = styles[variant] || styles.primary;

  return (
    <button className={`${styles.btn} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}