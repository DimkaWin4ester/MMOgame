import { useLocation, useNavigate } from 'react-router';
import style from './Header.module.css';

export default function Header() {
  const locations = useLocation();
  const navigate = useNavigate();

  return (
    <div className={style.header}>
      <div className={style.header_button_wrapper}>
        {locations.pathname === '/products' && (
          <button type="button" onClick={() => navigate('/create-product')}>Добавить</button>
        )}

        {locations.pathname !== '/products' && (
          <button type="button" onClick={() => navigate('/products')}>
            На главную
          </button>
        )}
      </div>
      <h1 onClick={() => navigate('/products')}>MMOgame</h1>
    </div>
  );
}
