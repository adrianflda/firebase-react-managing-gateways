import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import 'papercss/dist/paper.min.css';
import AuthProvider from "./components/Auth/AuthProvider";
import Router from "./router/Router";
import rootReducer from './reducers';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider >
  );
}