import PopupWithForm from "./PopupWithForm";

export function DeleteConfirmationPopup(props) {
  function handleFormSubmit(evt) {
    evt.preventDefault();
    props.onDeleteClick();
  }

  return <PopupWithForm name={"delete"} title={"Вы уверены?"} buttonText={props.isLoading ? 'Удаляется...' : 'Да'} isOpen={props.isOpen} onClose={props.onClose} onOverlayClick={props.onOverlayClick} onSubmit={handleFormSubmit}/>;
}