import ProductCard from 'components/ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, Product } from 'store/products/productsSlice';
import { AppDispatch, RootState } from 'store/store';
import style from './Products.module.css';
import { jsonParseOrNull } from 'utils/json-try-parse';

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const [isLiked, setIsLiked] = useState(false);

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const currentProducts = isLiked ? selectLikedProducts() : products;

  const handleLikeProducts = () => {
    setIsLiked(!isLiked);
  };

  function selectLikedProducts() {
    const likedProducts = jsonParseOrNull(localStorage.getItem('like'));
    return products.filter((product: Product) =>
      likedProducts.includes(product.id)
    );
  }
console.log(products)
  return (
    <div className={style.main_wrapper}>
        <div>
          {loading && <h1>Loading...</h1>}
          {error && <span>{error}</span>}
        </div>
      <div className={style.filter_box}>
        <button
          type="button"
          className={style.filter_like_button}
          onClick={handleLikeProducts}
        >
          {isLiked ? 'Все' : 'Избранное'}
        </button>
      </div>
      <div className={style.product_cards_wrapper}>
        {currentProducts?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {currentProducts.length === 0 && !loading && <h1>Нет избранных</h1>}
    </div>
  );
}
