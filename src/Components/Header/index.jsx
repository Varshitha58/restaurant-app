import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'

const Header = ({cartItems, restaurantName}) => (
  <header className="nav-header">
    <h1 className="logo-heading">{restaurantName}</h1>
    <div className="cart-icon-link">
      <p className="my-orders-text">My Orders</p>

      <button type="button" className="cart-icon-btn" data-testId="cart">
        <AiOutlineShoppingCart className="cart-icon" />
      </button>

      <p className="cart-count-badge">
        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      </p>
    </div>
  </header>
)

export default Header
