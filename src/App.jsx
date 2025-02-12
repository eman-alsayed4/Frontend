import { useEffect, useState } from "react";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import { CounterSettingContext } from "./store/counterContext";
import LoginContext from "./store/loginContext";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "./store/searchContext";

function App() {
  const [counter, setCounter] = useState(0);
  const [login, setLogin] = useState(null);



  return (
    <SearchProvider>
    <CounterSettingContext.Provider value={{ counter, setCounter }}>
      <LoginContext.Provider value={{ login, setLogin }}>
        <ToastContainer />
        <LayoutComponent>
          <Router />
        </LayoutComponent>
      </LoginContext.Provider>
    </CounterSettingContext.Provider>
    </SearchProvider>
  );
}

export default App;
