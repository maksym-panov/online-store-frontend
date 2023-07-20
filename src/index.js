import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { 
  QueryClient, 
  QueryClientProvider 
} from "@tanstack/react-query";
import { Provider } from 'react-redux';
import { 
  store, 
  persistor 
} from "./features/store";
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={ client }>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PersistGate>
        </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);