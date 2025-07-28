import {useState, useEffect, useContext} from 'react'

import Header from '../Header'
import DishItem from '../DishItem'

import CartContext from '../../Context/CartContext'

import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [menuList, setMenuList] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')

  const {cartList, restaurantName, setRestaurantName} = useContext(CartContext)

  const getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  const fetchRestaurantApi = async () => {
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    try {
      const response = await fetch(apiUrl)
      const data = await response.json()

      const restaurantData = data[0]
      const updatedMenu = getUpdatedData(restaurantData.table_menu_list)

      setMenuList(updatedMenu)
      setActiveCategoryId(updatedMenu[0].menuCategoryId)
      setRestaurantName(restaurantData.restaurant_name)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching restaurant data:', error)
    }
  }

  useEffect(() => {
    fetchRestaurantApi()
  }, [])

  const renderTabMenuList = () =>
    menuList.map(eachCategory => {
      const isActive = eachCategory.menuCategoryId === activeCategoryId
      const buttonClassName = isActive
        ? 'tab-category-button active-tab-item'
        : 'tab-category-button'

      return (
        <button
          key={eachCategory.menuCategoryId}
          type="button"
          className={buttonClassName}
          onClick={() => setActiveCategoryId(eachCategory.menuCategoryId)}
        >
          {eachCategory.menuCategory}
        </button>
      )
    })

  menuList.map(eachCategory => {
    const isActive = eachCategory.menuCategoryId === activeCategoryId
    return (
      <li
        key={eachCategory.menuCategoryId}
        className={`each-tab-item ${isActive ? 'active-tab-item' : ''}`}
        onClick={() => setActiveCategoryId(eachCategory.menuCategoryId)}
      >
        <button type="button" className="tab-category-button">
          {eachCategory.menuCategory}
        </button>
      </li>
    )
  })

  const renderDishes = () => {
    const activeCategory = menuList.find(
      category => category.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="dishes-list-container">
        {activeCategory.categoryDishes.map(eachDish => (
          <DishItem key={eachDish.dishId} dishDetails={eachDish} />
        ))}
      </ul>
    )
  }

  const renderLoader = () => (
    <div className="spinner-container">
      <div className="spinner-border" role="status" />
    </div>
  )

  return isLoading ? (
    renderLoader()
  ) : (
    <div className="home-background">
      <Header restaurantName={restaurantName} cartList={cartList} />
      <ul className="tab-container">{renderTabMenuList()}</ul>
      {renderDishes()}
    </div>
  )
}

export default Home
