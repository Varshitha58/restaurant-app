import {useContext} from 'react'
import Header from '../Header'
import CartItem from '../CartItem'

import CartContext from '../../Context/CartContext'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const renderEmptyCart = () => (
    <div className="empty-cart-view">
      {cartList.length === 0 && (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
          alt="cart empty"
          className="empty-view-image"
        />
      )}
    </div>
  )

  const renderCartItems = () => (
    <>
      <div className="cart-view">
        <h1 className="cart-heading">My Cart</h1>
        {cartList.length > 0 && (
          <button
            type="button"
            className="remove-all-btn"
            onClick={removeAllCartItems}
          >
            Remove All
          </button>
        )}
      </div>
      <ul className="cart-list">
        {cartList.map(dish => (
          <CartItem key={dish.dishId} cartItemsDetails={dish} />
        ))}
      </ul>
    </>
  )

  const totalAmount = cartList.reduce(
    (acc, item) => acc + item.dishPrice * item.quantity,
    0,
  )

  return (
    <div className="cart-page-container">
      <Header />
      <div className="cart-body-container">
        {cartList.length > 0 ? renderCartItems() : renderEmptyCart()}
        {cartList.length > 0 && (
          <p className="total-amount">Total : {totalAmount.toFixed(2)}</p>
        )}
      </div>
    </div>
  )
}

export default Cart
