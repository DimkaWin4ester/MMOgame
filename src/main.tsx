import Products from 'pages/Products/Products';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { store } from 'store/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/products" />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
