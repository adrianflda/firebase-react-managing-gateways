import AuthProvider from "./components/Auth/AuthProvider";
import Router from "./router/Router";

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}