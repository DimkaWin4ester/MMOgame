import Layout from 'components/Layout/Layout';
import CreateProduct from 'pages/CreateProduct/CreateProduct';
import Product from 'pages/Product/Product';
import Products from 'pages/Products/Products';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { store } from 'store/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="*" element={<Navigate to="/products" />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
