import mestoLogo from "../images/logo.svg";
import {Link} from "react-router-dom";
import {useState} from "react";

const Register = ({handleRegistration}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleFormSubmit(evt) {
    evt.preventDefault()

    handleRegistration({password, email})

    setEmail('')
    setPassword('')
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  return (
    <div className='page page__login'>
      <header className="header page__header">
        <div className="header__main">
          <img className="logo" src={mestoLogo} alt="Логотип Место" />
          <div className="header__content">
            <Link to="/sign-in" className="header__link">Войти</Link>
          </div>
        </div>
      </header>

      <main className="main page__main">
        <form action="#" className="form page__form form_theme_dark" name="register" onSubmit={handleFormSubmit}>
          <h3 className="form__title">Регистрация</h3>
          <fieldset className="form__input-container">
            <input type="email" className="form__input form__input_type_email" id="user-email-input" name="email"
                   placeholder="Email" value={email} onChange={handleEmailChange} required />
            <span className="form__input-error user-email-input-error"/>
            <input type="password" className="form__input form__input_type_password" id="user-password-input" name="password"
                   placeholder="Пароль" value={password} onChange={handlePasswordChange} required />
            <span className="form__input-error user-password-input-error"/>
          </fieldset>
          <button type="submit" className="form__save-button popup__save-button" aria-label="Зарегистрироваться" title="Зарегистрироваться">Зарегистрироваться</button>
          <p className="form__text">Уже зарегистрированы? <Link to="/sign-in" className="form__link">Войти</Link></p>
        </form>
      </main>
    </div>
  )
}

export default Register