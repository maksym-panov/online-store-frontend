import NavigationBar from "./components/navigation/NavigationBar";
import { BrowserRouter } from 'react-router-dom';
import { Main } from "./components/Main";

function App() {
  return (
    <BrowserRouter>
        <NavigationBar />
        <Main />
    </BrowserRouter>
  );
}

export default App;
