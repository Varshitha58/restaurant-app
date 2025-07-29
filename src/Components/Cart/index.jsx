import {useContext} from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

import Header from '../Header'
import CartItem from '../CartItem'
import CartContext from '../../Context/CartContext'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  // Render when cart is empty
  const renderEmptyCart = () => (
    <div className="empty-cart-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="cart empty"
        className="empty-view-image"
      />
      <h2 className="empty-heading">Your cart is empty</h2>
      <p className="empty-description">Add items to get started</p>
    </div>
  )

  // Render all cart items
  const renderCartItems = () => (
    <>
      <div className="cart-view-header d-flex justify-content-between align-items-center">
        <h1 className="cart-heading">My Cart</h1>
        <button
          type="button"
          className="remove-all-btn"
          onClick={removeAllCartItems}
        >
          <FaRegTrashAlt style={{marginRight: '6px'}} />
          Remove All
        </button>
      </div>

      <ul className="cart-list">
        {cartList.map(dish => (
          <CartItem key={dish.dishId} cartItemsDetails={dish} />
        ))}
      </ul>
    </>
  )

  // Calculate total amount
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
          <div className="cart-total-container mt-4">
            <h3 className="total-amount">
              Total: <span>{totalAmount.toFixed(2)}</span>
            </h3>
            <button type="button" className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
