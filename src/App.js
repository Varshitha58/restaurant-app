import {useState} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './Components/Home'
import Login from './Components/Login'
import Cart from './Components/Cart'
import NotFound from './Components/NotFound'

import ProtectedRoute from './Components/ProtectedRoute'
import CartContext from './Context/CartContext'

import './App.css'

// write your code here
const App = () => {
  const [cartList, setCartList] = useState([])
  const [restaurantName, setRestaurantName] = useState('')

  const addCartItem = dish => {
    const isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)

    if (!isAlreadyExists) {
      setCartList(prev => [...prev, dish])
    } else {
      setCartList(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : item,
        ),
      )
    }
  }

  const removeCartItem = dishId => {
    setCartList(prevState => prevState.filter(item => item.dishId !== dishId))
  }

  const removeAllCartItems = () => setCartList([])

  const incrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
        restaurantName,
        setRestaurantName,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
