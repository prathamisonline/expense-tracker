import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import TransactionPage from "./components/pages/TransactionPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import SignUpPage from "./components/pages/SignUpPage";
import Header from "./components/ui/Header";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { useQuery } from "@apollo/client";

function App() {
  const authUser = true;

  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER);
  console.log("get", loading, error, data);

  if (loading) return null;
  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data?.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            data?.authUser ? <TransactionPage /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
