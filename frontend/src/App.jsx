import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBlogPage from "./pages/AddBlogPage";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import ManageArticles from "./pages/ManageArticles";
import Header from "./components/Header";
import Signup from "./pages/SignUp";
import Signin from "./pages/SignIn";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./route/PrivateRoute";
import ProtectedRoute from "./route/ProtectedRoute";
import SetAdmin from "./pages/SetAdmin";
import Panel from "./pages/Panel";
import Footer from "./components/Footer";
import Favorites from "./pages/Favorites";

function App() {
  const publicRoutes = [
    { path: "/", component: Articles },
    { path: "/articles/:id", component: Article },
    { path: "/signup", component: Signup },
    { path: "/signin", component: Signin },
  ];
  const privateRoutes = [{ path: "/favorites", component: Favorites }];
  const protectedRoute = [
    { path: "/panel", component: Panel },
    { path: "/add-article", component: AddBlogPage },
    { path: "/manage-articles", component: ManageArticles },
    { path: "/set-admin", component: SetAdmin },
  ];

  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          {protectedRoute.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute>
                  <route.component />
                </ProtectedRoute>
              }
            />
          ))}
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PrivateRoute>
                  <route.component />
                </PrivateRoute>
              }
            />
          ))}
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
