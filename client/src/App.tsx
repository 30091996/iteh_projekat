import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Redirect, Route, Switch } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/Product';
import Products from './pages/Products';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import { Product, User } from './model';
import Loading from './components/Loading';
import axios from 'axios'
import { SERVER_URL } from './constants';
axios.defaults.withCredentials = true;
function App() {

  const [user, setUser] = useState<User | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const resUser = await axios.post(SERVER_URL + '/check', {

        }, { withCredentials: true });
        setUser(resUser.data);
        const resProduct = await axios.get(SERVER_URL + '/product')
        setProducts(resProduct.data);

      } catch (error) {
        console.log(error.response);
      }


    })().then(val => {
      setLoading(false);
    })
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <>
      <Navbar full={user !== undefined} logout={() => { setUser(undefined) }} admin={user?.category === 'admin'} />

      <Switch>
        <Route path='/login'>
          {user ? (
            <Redirect to='/' />
          ) : (
            <Login setUser={setUser} />
          )}
        </Route>
        <Route path='/register'>
          {user ? (
            <Redirect to='/' />
          ) : (
            <Register setUser={setUser} />
          )}

        </Route>
        <Route path='/products/:id'>
          {
            user ? (
              <ProductPage />
            ) : (
              <Login setUser={setUser} />
            )
          }

        </Route>
        <Route path='/products'>
          {
            user ? (
              <Products products={products} />
            ) : (
              <Login setUser={setUser} />
            )
          }
        </Route>
        <Route path='/admin'>
          {
            user ? (
              <Admin />
            ) : (
              <Login setUser={setUser} />
            )
          }
        </Route>
        <Route path='/cart'>
          {
            user ? (
              <Cart />
            ) : (
              <Login setUser={setUser} />
            )
          }
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
