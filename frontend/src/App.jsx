import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import TransactionPage from "./components/pages/TransactionPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import SignUpPage from "./components/pages/SignUpPage";
import Header from "./components/ui/Header";

function App() {
  const authUser = true;
  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
