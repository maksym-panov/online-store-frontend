import NavigationBar from "./components/navigation/NavigationBar";
import { 
  Routes,
  Route
} from 'react-router-dom';
import Main from "./components/Main";
import Footer from "./components/navigation/Footer";
import Management from "./components/Management";

function App() {
  return (
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
  );
}

export default App;
