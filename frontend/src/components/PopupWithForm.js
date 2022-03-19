function PopupWithForm(props) {
  return (
      <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`} onClick={props.onOverlayClick}>
        <div className="popup__container">
          <button type="button" className="popup__close-button" onClick={props.onClose} aria-label="Закрыть окно" title="Закрыть окно"/>
          <form action="#" className="form popup__form form_profile" name={props.name} onSubmit={props.onSubmit}>
            <h3 className="form__title popup__title">{props.title}</h3>
            <fieldset className="form__input-container">
            {props.children}
            </fieldset>
          <button type="submit" className="form__save-button popup__save-button" aria-label={props.buttonText} title={props.buttonText}>{props.buttonText}</button>
          </form>
        </div>
      </div>
  )
}

export default PopupWithForm;