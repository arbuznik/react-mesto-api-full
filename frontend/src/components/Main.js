import React, {useContext} from 'react';
import Card from './Card.js';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
  const {currentUser} = useContext(CurrentUserContext);

  return (
    <main className="main page__main">
      <section className="profile page__profile">
        <div className="profile__avatar-overlay" onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватарка" className="profile__avatar" />
        </div>
        <div className="profile__content-wrapper">
          <div className="profile__title-wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile} aria-label="Редактировать профиль" title="Редактировать профиль"/>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace} aria-label="Добавить карточку" title="Добавить карточку"/>
      </section>

      <section className="places page__places">
        {props.cards.map(card => {
          return <Card key={card._id}  card={card} onCardClick={props.onCardClick} onLikeClick={props.onLikeClick} onDeleteClick={props.onDeleteClick}/>
        })}
      </section>
    </main>
  )
}

export default Main;