import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import { routes } from "./routes";
import { useSelector } from "react-redux";
import Loading from "./components/loading/Loading";

function App() {
  const tasksLoading = useSelector(({ loader }) => loader.tasksLoading);
  return (
    <BrowserRouter>
      <main>
        <NavBar />
        <Routes>
          {routes.map((page) => (
            <Route key={page.path} path={page.path} element={page.element} />
          ))}
        </Routes>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {tasksLoading && <Loading />}
      </main>
    </BrowserRouter>
  );
}

export default App;
