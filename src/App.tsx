import { GlobalContextProvider } from "./context/globalContext";
import { RouterPage } from "./router/routes";

function App() {
  return (
    <GlobalContextProvider>
      <RouterPage />
    </GlobalContextProvider>
  );
}

export default App;
