import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
  const card = props.card;
  const {currentUser} = useContext(CurrentUserContext);

  const isOwnCard = card.owner === currentUser._id;
  const deleteButtonClassName = (
    `place__delete-button ${isOwnCard ? 'place__delete-button_visible' : 'place__delete-button_hidden'}`
  )

  const isLikedByOwner = card.likes.some(like => like === currentUser._id);
  const placeLikeButtonClassName = (
    `place__like-button ${isLikedByOwner && 'place__like-button_active'}`
  )

  return (
    <article className="place">
      <img className="place__cover" src={card.link} alt={card.name} onClick={() => props.onCardClick(card)} />
      <button type="button" className={deleteButtonClassName} onClick={() => props.onDeleteClick(card)} aria-label="Удалить" title="Удалить"/>
      <div className="place__content">
        <h2 className="place__title">{card.name}</h2>
        <button type="button" className={placeLikeButtonClassName} onClick={() => props.onLikeClick(card)} aria-label="Лайк" title="Лайк"/>
        <p className="place__like-counter">{card.likes.length}</p>
      </div>
    </article>
  )
}

export default Card;