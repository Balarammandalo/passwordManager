import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const colorHexCodes = ['#0b69ff', '#94a3b8', '#b6c3ca']

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    nameInput: '',
    passwordInput: '',
    isChecked: false,
    yourPasswordList: [],
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddNewPassword = event => {
    event.preventDefault()
    const {websiteInput, nameInput, passwordInput} = this.state
    const newPassword = {
      id: uuidv4(),
      website: websiteInput,
      username: nameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      yourPasswordList: [...prevState.yourPasswordList, newPassword],
      websiteInput: '',
      nameInput: '',
      passwordInput: '',
    }))
  }

  renderAddNewPassword = () => {
    const {websiteInput, nameInput, passwordInput} = this.state
    return (
      <form className="add-password-container">
        <h1 className="add-heading">Add New Password</h1>
        <div className="input-item-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            alt="website"
            className="website-img"
          />
          <input
            type="text"
            className="websiteInput"
            value={websiteInput}
            placeholder="Enter Website"
            onChange={this.onChangeWebsiteInput}
          />
        </div>
        <div className="input-item-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
            className="website-img"
          />
          <input
            type="text"
            className="websiteInput"
            value={nameInput}
            placeholder="Enter Username"
            onChange={this.onChangeNameInput}
          />
        </div>
        <div className="input-item-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            alt="password"
            className="website-img"
          />
          <input
            type="password"
            className="websiteInput"
            value={passwordInput}
            placeholder="Enter Password"
            onChange={this.onChangePasswordInput}
          />
        </div>
        <button
          className="add-buton"
          type="submit"
          onClick={this.onAddNewPassword}
        >
          Add
        </button>
      </form>
    )
  }

  onSearchPassword = event => {
    const searchValue = event.target.value
    const {yourPasswordList} = this.state
    const filterPassword = yourPasswordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchValue.toLowerCase()),
    )
    this.setState({yourPasswordList: filterPassword})
  }

  onChecked = () => {
    this.setState(prevCheck => ({isChecked: !prevCheck.isChecked}))
  }

  onDeletePassword = id => {
    const {yourPasswordList} = this.state
    const deleteItem = yourPasswordList.filter(eachItem => eachItem.id !== id)
    this.setState({yourPasswordList: deleteItem})
  }

  render() {
    const {yourPasswordList, isChecked} = this.state
    const passwordLength = yourPasswordList.length !== 0
    console.log(yourPasswordList)
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="appImage"
        />
        <div className="input-container">
          {this.renderAddNewPassword()}
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manag-image"
          />
        </div>
        <div className="your-password-container">
          <div className="search-container">
            <div className="password-count-container">
              <h1 className="password-para">Your Passwords</h1>
              <p className="length-count">{yourPasswordList.length}</p>
            </div>
            <div className="input-item-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="website-img"
              />
              <input
                type="search"
                className="websiteInput"
                placeholder="Search"
                onChange={this.onSearchPassword}
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="check-box-container">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={this.onChecked}
            />
            <label htmlFor="checkbox" className="password-label">
              Show Passwords
            </label>
          </div>
          {passwordLength ? (
            <ul className="password-items-container">
              {yourPasswordList.map(eachPassword => (
                <PasswordItem
                  passwordDetails={eachPassword}
                  key={eachPassword.id}
                  isChecked={isChecked}
                  colorHexCodes={colorHexCodes}
                  deletePassword={this.onDeletePassword}
                />
              ))}
            </ul>
          ) : (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="no-password-image"
                alt="no passwords"
              />
              <p className="no-password-heading">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
