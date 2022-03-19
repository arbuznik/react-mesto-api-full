import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export function EditProfilePopup(props) {
  const {currentUser} = useContext(CurrentUserContext);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setUserInfo({name: currentUser.name, about: currentUser.about});
  }, [currentUser, props.isOpen]);

  function handleInputChange(evt) {
    setUserInfo({...userInfo, [evt.target.name]: evt.target.value});
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(userInfo);
  }

  return (
    <PopupWithForm name={"edit"} title={"Редактировать профиль"} buttonText={props.isLoading ? 'Сохраняется...' : 'Сохранить'} isOpen={props.isOpen}
                   onClose={props.onClose} onSubmit={handleFormSubmit} onOverlayClick={props.onOverlayClick}>
      <input type="text" value={userInfo.name || ''} onChange={handleInputChange} className="form__input form__input_type_name" id="user-name-input" name="name" placeholder="Имя"
             minLength="2" maxLength="40" required/>
      <span className="form__input-error user-name-input-error"/>
      <input type="text" value={userInfo.about || ''} onChange={handleInputChange} className="form__input form__input_type_about" id="user-job-input" name="about"
             placeholder="О себе" minLength="2" maxLength="200" required/>
      <span className="form__input-error user-job-input-error"/>
    </PopupWithForm>
  );
}