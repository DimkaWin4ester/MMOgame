import { useEffect } from 'react';
import style from './Product.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import { fetchProductOne } from 'store/products/productOneSlice';
import { useParams } from 'react-router';

export default function Product() {
  const dispatch = useDispatch<AppDispatch>();
  const { productOne, loading, error } = useSelector(
    (state: RootState) => state.productOne
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductOne(Number(id)));
  }, [dispatch, id]);

  return (
    <div className={style.main_wrapper}>
      <div>
        {loading && <h1>Loading...</h1>}
        {error && <span>{error}</span>}
      </div>
      <h1>{productOne?.title}</h1>
      <img src={productOne?.thumbnail} alt="card_image" />
      <div className={style.box1}>
        <div
          className={style.box2}
          dangerouslySetInnerHTML={{ __html: productOne?.description || '' }}
        />
        <div className={style.box3}>
          <a href={productOne?.game_url} target="_blank">
            Сайт игры
          </a>
          <p>Жанр игры: {productOne?.genre}</p>
          <p>Платформа: {productOne?.platform}</p>
          <p>Издатель: {productOne?.publisher}</p>
          <p>Разработчик: {productOne?.developer}</p>
          <p>Дата выхода: {productOne?.release_date}</p>
        </div>
      </div>

      {productOne?.screenshots?.length !== 0 &&  productOne?.screenshots && <h2>Скриншоты</h2>}
      <div className={style.box4}>
        {productOne?.screenshots?.map((screenshot) => (
          <img key={screenshot.id} src={screenshot.image} alt="screenshot" />
        ))}
      </div>
    </div>
  );
}
