import { Provider } from "react-redux";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/GlobalStyle";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { store } from "./store/store";
import { ToastProvider } from "./components/ToastProvider/ToastProvider";

function App() {
  return (
    <>
      <Provider store={store}>
        <FluentProvider theme={webLightTheme}>
          <GlobalStyle />
          <ToastProvider>
            <Router />
          </ToastProvider>
        </FluentProvider>
      </Provider>
    </>
  );
}

export default App;
