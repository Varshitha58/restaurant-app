import {useState, useContext, useEffect} from 'react'
import CartContext from '../../Context/CartContext'

import './index.css'

const DishItem = ({dishDetails}) => {
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails

  const {cartList, addCartItem} = useContext(CartContext)

  const existingCartItem = cartList.find(item => item.dishId === dishId)
  const initialQty = existingCartItem ? existingCartItem.quantity : 0

  const [quantity, setQuantity] = useState(initialQty)

  useEffect(() => {
    if (existingCartItem) {
      setQuantity(existingCartItem.quantity)
    }
  }, [existingCartItem])

  const onIncreaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const onDecreaseQuantity = () => {
    if (quantity === 0) return
    setQuantity(prev => prev - 1)
  }

  const onAddItemToCart = () => {
    addCartItem({...dishDetails, quantity})
  }

  const renderControllerButton = () => (
    <div className="controller-container">
      <button
        className="button"
        type="button"
        onClick={onDecreaseQuantity}
        disabled={quantity === 0}
      >
        -
      </button>
      <p className="quantity">{quantity}</p>
      <button className="button" type="button" onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  )

  return (
    <li className="mb-3 p-3 dish-item-container d-flex">
      <div
        className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''} me-3`}
      >
        <div className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`} />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>

        {dishAvailability ? (
          renderControllerButton()
        ) : (
          <>
            <p className="quantity">0</p>
            <p className="not-availability-text">Not available</p>
          </>
        )}

        {addonCat.length !== 0 && (
          <p className="addon-availability-text">Customizations available</p>
        )}

        {quantity > 0 && (
          <button
            type="button"
            className="add-to-cart-btn mt-2"
            onClick={onAddItemToCart}
            disabled={quantity === 0}
          >
            ADD TO CART
          </button>
        )}
      </div>

      <p className="dish-calories">{dishCalories} calories</p>
      <img className="dish-image" alt={dishName} src={dishImage} />
    </li>
  )
}

export default DishItem
