import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Dashboard from './pages/Dashboard'
import TransactionForm from "./pages/TransactionForm";

const App = () => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transaction" element={<TransactionForm />} />
      </Routes>
    </BrowserRouter>
);

export default App;
