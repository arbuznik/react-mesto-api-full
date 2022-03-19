import mestoLogo from './../images/logo.svg';
import {useContext, useRef} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Header({handleLogoutClick}) {
  const {loggedInUser} = useContext(CurrentUserContext);
  const userInfoRef = useRef();
  const menuButtonRef = useRef();
  const closeButtonRef = useRef();

  function handleMenuClick() {
    userInfoRef.current.className = 'header__user-info header__user-info_visible';
    menuButtonRef.current.className = 'header__menu-button header__menu-button_hidden';
    closeButtonRef.current.className = 'header__close-user-info-button header__close-user-info-button_visible';
  }

  function handleCloseButtonClick() {
    userInfoRef.current.className = 'header__user-info';
    menuButtonRef.current.className = 'header__menu-button';
    closeButtonRef.current.className = 'header__close-user-info-button';
  }

  return (
    <header className="header page__header">
      <div ref={userInfoRef} className="header__user-info">
        <p className="header__text header__text_visible">{loggedInUser.email}</p>
        <button onClick={handleLogoutClick} className="header__button header__button_visible header__button_type_logout">Выйти</button>
      </div>
      <div className="header__main">
        <img className="logo" src={mestoLogo} alt="Логотип Место" />
        <div className="header__content">
          <p className="header__text">{loggedInUser.email}</p>
          <button onClick={handleLogoutClick} className="header__button header__button_type_logout">Выйти</button>
          <button ref={menuButtonRef} onClick={handleMenuClick} className="header__menu-button"/>
          <button ref={closeButtonRef} onClick={handleCloseButtonClick} className="header__close-user-info-button"/>
        </div>
      </div>
    </header>
  );
}

export default Header;