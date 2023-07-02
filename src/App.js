import NavigationBar from "./components/navigation/NavigationBar";
import { BrowserRouter } from 'react-router-dom';
import { Main } from "./components/Main";
import { Footer } from "./components/navigation/Footer";

function App() {
  return (
    <BrowserRouter>
        <NavigationBar />
        <Main />
        <Footer />
    </BrowserRouter>
  );
}

export default App;
