import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isChecked, colorHexCodes, deletePassword} = props
  const {website, username, password, id} = passwordDetails

  const initailLetter = website[0].toUpperCase()

  const colorNumber = Math.ceil(Math.random() * colorHexCodes.length - 1)

  const onDeletePassword = () => {
    deletePassword(id)
  }

  return (
    <li className="password-item-container">
      <div className="details-container">
        <p
          className="initial-text"
          style={{backgroundColor: `${colorHexCodes[colorNumber]}`}}
        >
          {initailLetter}
        </p>
        <div className="password-details">
          <p className="website-name">{website}</p>
          <p className="username">{username}</p>
          {isChecked ? (
            <p className="password">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="star-img"
            />
          )}
        </div>
        <button
          data-testid="delete"
          type="button"
          className="delete-button"
          onClick={onDeletePassword}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
