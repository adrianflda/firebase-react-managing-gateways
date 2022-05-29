import { Provider } from 'react-redux';
import AuthProvider from "./components/Auth/AuthProvider";
import Router from "./router";
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider >
  );
}