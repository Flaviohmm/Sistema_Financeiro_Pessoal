import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard'
import TransactionForm from "./pages/TransactionForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/transaction" element={<TransactionForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default App;
