import NavigationBar from "./components/navigation/NavigationBar";
import { BrowserRouter } from 'react-router-dom';
import { Main } from "./components/Main";
import { Footer } from "./components/navigation/Footer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./features/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <NavigationBar />
          <Main />
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
