import ProductCard from 'components/ProductCard/ProductCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from 'store/products/productsSlice';
import { AppDispatch, RootState } from 'store/store';
import style from './Products.module.css';

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={style.main_wrapper}>
      
      <div className={style.product_cards_wrapper}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
