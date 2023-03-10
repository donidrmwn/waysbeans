import { useContext, useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'


import './App.css';
import Navibar from './components/navibar/Navibar';
import { UserContext } from './context/userContext';
import LandingPage from './pages/LandingPage';

import { API, setAuthToken } from './config/api';
import CreateProductPage from './pages/CreateProductPage';
import DetailProductPage from './pages/DetailProductPage';
import ProfilePage from './pages/ProfilePage';
import TransactionListPage from './pages/TransactionListPage';
import { PrivateRouteAdmin, PrivateRouteLogin, PrivateRouteUser } from './components/PrivateRoute';
import ProductListPage from './pages/ProductListPage';
import UpdateProductPage from './pages/UpdateProductPage';
import CartPage from './pages/CartPage';
import { useQuery } from 'react-query';


function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
 
  const [isLoading, setIsLoading] = useState(true)
  


  useEffect(() => {
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate('/');
      }
    }


  }, [isLoading])

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      
      checkUser();
     
    } else {
      setIsLoading(false);
    }

  }, []);



  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log("check user success : ", response)
      //Get user data
      let payload = response.data.data;
      //Get Token from local storage
      payload.token = localStorage.token;
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };





  return (
    <>
      <Navibar />
      {isLoading ? null :
        <>
          <Routes>
            <Route exact path='/' element={<LandingPage />} />
            <Route element={<PrivateRouteLogin />}>
              <Route element={<PrivateRouteUser />}>
                <Route path="/product/:id" element={<DetailProductPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/cart" element={<CartPage />} />
              </Route>
              <Route element={<PrivateRouteAdmin />}>
                <Route path="/list-transaction" element={<TransactionListPage />} />
                <Route path="/add-product" element={<CreateProductPage />} />
                <Route path="/update-product/:id" element={<UpdateProductPage />} />
                <Route path="/list-product" element={<ProductListPage />} />
              </Route>
            </Route>
          </Routes>
        </>
      }
    </>

  );
}

export default App;
