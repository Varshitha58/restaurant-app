import {useContext} from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

import CartContext from '../../Context/CartContext'

import './index.css'

const CartItem = ({cartItemsDetails}) => {
  const {removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity} =
    useContext(CartContext)

  const {dishId, dishName, dishImage, quantity, dishCurrency, dishPrice} =
    cartItemsDetails

  const onIncQty = () => incrementCartItemQuantity(dishId)

  const onDecQty = () => decrementCartItemQuantity(dishId)

  const onRemCartItem = () => removeCartItem(dishId)

  return (
    <li className='cart-item'>
      <img src={dishImage} alt={dishName} className='cart-item-img' />
      <div className='cart-item-details'>
        <p className='cart-item-name'>{dishName}</p>
        <p className='cart-item-price'>
          {dishCurrency} {(dishPrice * quantity).toFixed(2)}
        </p>
      </div>

      <div className='control-btn-grp'>
        <button type='button' className='control-btn' onClick={onDecQty}>
          -
        </button>
        <p className='quantity'>{quantity}</p>
        <button type='button' className='control-btn' onClick={onIncQty}>
          +
        </button>
      </div>

      <button type='button' className='remove-item-btn' onClick={onRemCartItem}>
        <FaRegTrashAlt size={30} />
      </button>
    </li>
  )
}

export default CartItem
