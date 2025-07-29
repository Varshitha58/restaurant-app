import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import CartContext from '../../Context/CartContext'

import './index.css'

const Header = props => {
  const {cartList, restaurantName} = useContext(CartContext)

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <header className="nav-header">
      <Link to="/">
        <h1 className="logo-heading">{restaurantName}</h1>
      </Link>

      <div className="cart-icon-link">
        <p className="my-orders-text">My Orders</p>

        <Link to="/cart">
          <button type="button" className="cart-icon-btn" data-testid="cart">
            <AiOutlineShoppingCart className="cart-icon" />
            {cartList.length > 0 && (
              <span className="cart-count-badge">{cartList.length}</span>
            )}
          </button>
        </Link>

        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default withRouter(Header)
