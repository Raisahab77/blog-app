import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LandingPage  from "./pages/LandingPage";
import Layout from './pages/Layout';
import Login from './components/login/Login';
import Register from './components/register/Register';
import BlogDtl from './components/blog-dtl/blog-dtl';
import AddBlog from './components/add-blog/AddBlog';
import {UserContextProvider} from './userContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
      <UserContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
      {/* Same as */}
      <ToastContainer />
        <div className="App">

          <Router>
            <Routes>
              {/* Syntax--
                  <Route path="url path" element={<component_name/>} />
              */}
              <Route path='/' element={<Layout/>}>
                  <Route path='/' element={<LandingPage/>} />
                  <Route path='/blog-dtl/:id' element={<BlogDtl/>} />
                  <Route path='/login' activeClassName='text-[#FF69B4]' element={<Login/>}/>
                  <Route path='/register' element={<Register/>}/>
                  <Route path='/add-blog' element={<AddBlog/>}/>
              </Route>
            </Routes>
          </Router>

        </div>
      </UserContextProvider>
  );
}      

export default App;