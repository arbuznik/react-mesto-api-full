function ImagePopup(props) {
  return (
    <div className={`popup popup_photo ${props.isOpen && 'popup_opened'}`} onClick={props.onOverlayClick}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose} aria-label="Закрыть окно" title="Закрыть окно"/>
        <figure className="popup__photo-container">
          <img src={`${props.card.link}`} alt={`${props.card.name}`} className="popup__photo" />
          <figcaption className="popup__photo-caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;