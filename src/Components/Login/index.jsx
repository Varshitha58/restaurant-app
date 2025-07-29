import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const [state, setState] = useState({
    username: '',
    password: '',
    showErrMsg: false,
    errMsg: '',
  })

  const {username, password, showErrMsg, errMsg} = state

  const onChangeHandler = e => {
    const {id, value} = e.target
    setState(prev => ({...prev, [id]: value}))
  }

  const onSuccessLogin = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  const onFailedLogin = err => {
    setState(prev => ({...prev, showErrMsg: true, errMsg: err}))
  }

  const onSubmitLogin = async e => {
    e.preventDefault()
    const userDetails = {username, password}
    const loginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApi, options)
    const data = await response.json()
    if (response.ok) {
      onSuccessLogin(data.jwt_token)
    } else {
      onFailedLogin(data.error_msg)
    }
  }

  if (Cookies.get('jwt_token')) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={onSubmitLogin} className="login-form">
      <h1 className="login-heading">Login</h1>
      <label htmlFor="username">USERNAME</label>
      <input
        type="text"
        id="username"
        className="input"
        onChange={onChangeHandler}
        value={username}
      />

      <label htmlFor="password">PASSWORD</label>
      <input
        type="password"
        id="password"
        className="input"
        onChange={onChangeHandler}
        value={password}
      />

      <button className="submit-btn" type="submit">
        Login
      </button>

      {showErrMsg && <p className="err-msg">{errMsg}</p>}
    </form>
  )
}

export default Login
