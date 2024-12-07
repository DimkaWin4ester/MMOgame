import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL, API_KEY, API_HOST } from 'const';
import { jsonParseOrNull } from 'utils/json-try-parse';
import { Product } from './productsSlice';

export interface ProductOne {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  screenshots: {
    id: number;
    image: string;
  }[];
}

export interface ProductOneState {
  productOne: ProductOne | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductOneState = {
  productOne: null,
  loading: false,
  error: null,
};

export const fetchProductOne = createAsyncThunk(
  'product/fetchProductOne',
  async (id: number, { signal, rejectWithValue }) => {
    const productsFromLocalStorage = jsonParseOrNull(localStorage.getItem('myProducts'));
    const dataFromLocalStorage = productsFromLocalStorage?.find((product: Product) => product.id === id);

    if (dataFromLocalStorage) {
      dataFromLocalStorage.description = dataFromLocalStorage.short_description;
      return dataFromLocalStorage;
    }

    const response = await fetch(`${API_URL}/game?id=${id}`, {
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

export const productOneSlice = createSlice({
  name: 'productOne',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductOne.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductOne.fulfilled, (state, action) => {
        state.loading = false;
        state.productOne = action.payload;
      })
      .addCase(fetchProductOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productOneSlice.reducer;
