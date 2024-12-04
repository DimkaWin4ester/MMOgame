import styles from './ProductCard.module.css';
import type { Product } from 'store/products/productsSlice';

export default function ProductCard({product}:{product:Product}) {
  return (
    <div className={styles.card}>
        <img src={product.thumbnail} alt="card_image" />
      <h3>{product.title}</h3>
      <p>{product.short_description}</p>
      <div className={styles.card_button_wrapper}>
        <button type="button" className="card_like_button">
          Like
        </button>
        <button type="button" className={styles.card_delete_button}>
          Delete
        </button>
      </div>
    </div>
  );
}
