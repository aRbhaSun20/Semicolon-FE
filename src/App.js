import "./App.css";
import { SnackbarProvider } from "notistack";
import Router from "./Pages/Router";
import { Provider } from "react-redux";
import dataStore from "./redux";

function App() {
  return (
    <div className="App">
      <Provider store={dataStore}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Router />
        </SnackbarProvider>
      </Provider>
    </div>
  );
}

export default App;
