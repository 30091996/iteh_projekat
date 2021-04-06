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
import CartPage from './pages/Cart';
import { Cart, Order, Product, ProductCategory, User } from './model';
import Loading from './components/Loading';
import axios from 'axios'
import { SERVER_URL } from './constants';
import Orders from './pages/Orders';
axios.defaults.withCredentials = true;
function App() {

  const [user, setUser] = useState<User | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState<Cart[]>([])
  const [items, setItems] = useState<Order[]>([])
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  const getProduct = (id: number) => {
    return products.find(element => element.id === id);
  }
  const addOrder = (product: Product, ammount = 1) => {
    setItems(prev => {
      if (prev.find(element => element.product === product)) {
        return prev.map(element => {
          if (element.product !== product) {
            return element;
          }
          return { ...element, ammount: element.ammount + ammount };
        })
      } else {
        return [...prev, { product, ammount }]
      }
    })
  }
  const deleteOrder = (order: Order) => {
    setItems(prev => {
      return prev.filter(element => element !== order);
    })
  }
  const updateOrder = (order: Order, ammount: number) => {
    setItems(prev => {
      return prev.map(element => {
        if (element === order) {
          return { ...element, ammount: ammount }
        }
        return element;
      })
    })
  }
  const orderUp = async (phone: string, adress: string) => {
    const cart = {
      phone: phone,
      adress: adress,
      items: items
    };
    await axios.post(SERVER_URL + '/cart', cart);
    setItems([]);
  }
  const updateProduct = async (id: number, name: string, price: number, category: number, description: string) => {
    await axios.patch(SERVER_URL + '/product/' + id, {
      name: name,
      price: price,
      description: description,
      productCategory: category
    });
    setProducts(prev => {
      return prev.map(element => {
        if (element.id === id) {
          return { ...element, name, price, description, productCategory: categories.find(elem => elem.id === category)! }
        }
        return element;
      })
    })
  }
  const createProduct = async (data: FormData) => {
    const res = await axios.post(SERVER_URL + '/product', data);
    setProducts(prev => {
      return [...prev, res.data];
    })
  }
  useEffect(() => {
    (async function () {
      try {
        const resUser = await axios.post(SERVER_URL + '/check', {

        }, { withCredentials: true });
        setUser(resUser.data);
      } catch (error) {

      }
      try {

        const resProduct = await axios.get(SERVER_URL + '/product')
        setProducts(resProduct.data);

        const resCat = await axios.get(SERVER_URL + '/category');
        setCategories(resCat.data);

        const cartsRes = await axios.get(SERVER_URL + '/cart')
        setCarts(cartsRes.data);


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
              <ProductPage getProduct={getProduct} addOrder={addOrder} />
            ) : (
              <Login setUser={setUser} />
            )
          }

        </Route>
        <Route path='/products'>
          {
            user ? (
              <Products products={products} addOrder={addOrder} categories={categories} />
            ) : (
              <Login setUser={setUser} />
            )
          }
        </Route>
        <Route path='/admin'>
          {
            (user && user.category === 'admin') ? (
              <Admin carts={carts} products={products} createProduct={createProduct} updateProduct={updateProduct} categories={categories} />
            ) : (
              <Login setUser={setUser} />
            )
          }
        </Route>
        <Route path='/orders'>
          {
            (user && user.category === 'admin') ? (
              <Orders carts={carts} />
            ) : (
              <Login setUser={setUser} />
            )
          }
        </Route>
        <Route path='/cart'>
          {
            user ? (
              <CartPage orders={items} deleteOrder={deleteOrder} orderUp={orderUp} changeOrder={updateOrder} />
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
