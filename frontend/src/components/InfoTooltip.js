import statusOkImage from './../images/icon-status-ok.svg';
import statusErrorImage from './../images/icon-status-error.svg';

function InfoTooltip(props) {
  let image, statusText;

  if (props.isRegistered) {
    image = statusOkImage;
    statusText = `Вы успешно
    зарегистрировались!`;
  } else {
    image = statusErrorImage;
    statusText = `Что-то пошло не так!
    Попробуйте ещё раз.`
  }

  return (
    <div className={`popup popup_info ${props.isOpen && 'popup_opened'}`} onClick={props.onOverlayClick}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose} aria-label="Закрыть окно" title="Закрыть окно"/>
        <div className="popup__content">
          <img src={image} alt={statusText} className="popup__image"/>
          <p className="popup__text">{statusText}</p>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;