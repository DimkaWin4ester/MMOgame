import { useNavigate } from 'react-router';
import styles from './ProductCard.module.css';
import type { Product } from 'store/products/productsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';
import { switchLikeProduct, removeProduct } from 'store/products/productsSlice';
import { jsonParseOrNull } from 'utils/json-try-parse';

export default function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const likeHandler = () => {
    dispatch(switchLikeProduct(product.id));
  };

  const removeHandler = () => {
    dispatch(removeProduct(product.id));
  };

  return (
    <div
      className={styles.card}
      onClick={() => {
        navigate(`/product/${product.id}`);
      }}
    >
      <img
        src={product.thumbnail}
        alt="card_image"
        className={styles.card_like_image}
      />
      <h3>{product.title}</h3>
      <p>{product.short_description}</p>
      <div className={styles.card_button_wrapper}>
        <button
          type="button"
          className={
            jsonParseOrNull(localStorage.getItem('like'))?.includes(product.id)
              ? styles.card_like_button_active
              : styles.card_like_button
          }
          onClick={(e) => {
            e.stopPropagation();
            likeHandler();
          }}
        >
          {jsonParseOrNull(localStorage.getItem('like'))?.includes(product.id)
            ? 'Из избранного'
            : 'В избранное'}
        </button>
        <button
          type="button"
          className={styles.card_delete_button}
          onClick={(e) => {
            e.stopPropagation();
            removeHandler();
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
