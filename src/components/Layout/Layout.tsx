import { Outlet } from 'react-router';
import Header from 'components/Header/Header';
import style from './Layout.module.css';

export default function Layout() {
  return (
    <div className={style.main_wrapper}>
      <Header />
      <Outlet />
    </div>
  );
}
