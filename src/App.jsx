import NavigationBar from "./components/navigation/NavigationBar";
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Main from "./components/Main";
import Footer from "./components/navigation/Footer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Management from "./components/Management";

import { store, persistor } from "./features/store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route 
              path="/manager/*"
              element={ <Management /> }
            />
            <Route 
              path="*" 
              element={
                <>
                  <NavigationBar />
                  <Main />
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
