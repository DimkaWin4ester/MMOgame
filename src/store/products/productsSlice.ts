import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL, API_KEY, API_HOST } from 'const';
import { jsonParseOrNull } from 'utils/json-try-parse';

export interface Product {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  like: number[];
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  like: localStorage.getItem('like')
    ? JSON.parse(localStorage.getItem('like') as string)
    : [],
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { signal, rejectWithValue }) => {
    const response = await fetch(`${API_URL}/games`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': `${API_HOST}`,
        'x-rapidapi-key': `${API_KEY}`,
      },
      signal,
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    }
    return rejectWithValue(data.message);
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      const myProductsFromLocalStorage =
        jsonParseOrNull(localStorage.getItem('myProducts')) || [];
      localStorage.setItem(
        'myProducts',
        JSON.stringify(
          myProductsFromLocalStorage.filter(
            (product: Product) => product.id !== action.payload
          )
        )
      );
    },
    switchLikeProduct: (state, action) => {
      if (state.like.includes(action.payload)) {
        state.like = state.like.filter((id) => id !== action.payload);
      } else {
        state.like = [...state.like, action.payload];
      }
      localStorage.setItem('like', JSON.stringify(state.like));
    },
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
      console.log(state.products);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        const myProductsFromLocalStorage =
          jsonParseOrNull(localStorage.getItem('myProducts')) || [];
        state.products = [...myProductsFromLocalStorage, ...state.products];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { removeProduct, switchLikeProduct, addProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
