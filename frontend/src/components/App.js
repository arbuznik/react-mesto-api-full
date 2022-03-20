import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import {useEffect, useState} from 'react';
import ImagePopup from './ImagePopup.js';
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {EditProfilePopup} from "./EditProfilePopup";
import {EditAvatarPopup} from "./EditAvatarPopup";
import {AddPlacePopup} from "./AddPlacePopup";
import {DeleteConfirmationPopup} from "./DeleteConfirmationPopup";
import {Route, Routes, useNavigate} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isRegistrationStatusPopupOpen, setIsRegistrationStatusPopupOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);


  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(api.handleApiError);

    // api.getUserInfo()
    //   .then(user => {
    //     setCurrentUser(user)
    //   })
    //   .catch(api.handleApiError);
    //
    // api.getInitialCards()
    //   .then(cards => setCards(cards))
    //   .catch(api.handleApiError);

    function handleEscPress(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    }
  }, [])

  useEffect(() => {
    if (!loggedIn) {
      handleUserLogin()
    }
  }, [])

  function handleAuthorization(userData) {
    auth.login(userData)
      .then(res => {
        if (res.message === 'Auth successfull') {
          // localStorage.setItem('token', res.token)
          handleUserLogin()
        }
      })
      .catch(err => auth.handleApiError(err))
  }

  function handleUserLogin() {
    auth.getLoggedInUser()
      .then(user => {
        setLoggedIn(true);
        setLoggedInUser(user);
        navigate("/")
      })
      .catch(api.handleApiError);
  }

  function handleRegistration(userData) {
    auth.register(userData)
      .then(_ => {
        setIsRegistered(true)
        setIsRegistrationStatusPopupOpen(true)
        setTimeout(() => {
          navigate("/sign-in")
        }, 2000)
      })
      .catch(err => {
        auth.handleApiError(err)
        setIsRegistrationStatusPopupOpen(true)
      })
  }

  function handleLogoutClick() {
    auth.logout()
      .then(() => navigate('/sign-in'))
      .catch(api.handleApiError)
  }

  function handleLikeClick(card) {
    const isLikedByOwner = card.likes.some(like => like === currentUser._id);

    api.changeLikeCardStatus(card._id, isLikedByOwner)
      .then(newCard => {
        setCards(state => state.map(c => c._id === card._id ? newCard : c))
      })
      .catch(api.handleApiError)
  }

  function handleCardDelete() {
    setIsLoading(true);

    api.deleteCard(selectedCard._id)
      .then(_ => {
        setCards(state => state.filter(c => c._id !== selectedCard._id));
        closeAllPopups();
      })
      .finally(() => setIsLoading(false))
      .catch(api.handleApiError)
  }

  function handleCardDeleteClick(card) {
    setDeleteCardPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setImagePopupOpen(false);
    setIsRegistrationStatusPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);

    api.editUserInfo(userInfo)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .finally(() => setIsLoading(false))
      .catch(api.handleApiError)
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);

    api.editUserAvatar(avatar)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .finally(() => setIsLoading(false))
      .catch(api.handleApiError)
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);

    api.addNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .finally(() => setIsLoading(false))
      .catch(api.handleApiError);
  }

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={{currentUser, loggedInUser}}>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <div className='page'>
              <Header handleLogoutClick={handleLogoutClick}/>
              <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}
                    onLikeClick={handleLikeClick} onDeleteClick={handleCardDeleteClick}/>
              <Footer/>
              <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} onOverlayClick={handleOverlayClick}/>
              <EditProfilePopup isOpen={isEditProfilePopupOpen} isLoading={isLoading} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} onOverlayClick={handleOverlayClick}/>
              <AddPlacePopup isOpen={isAddPlacePopupOpen} isLoading={isLoading} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} onOverlayClick={handleOverlayClick}/>
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} isLoading={isLoading} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} onOverlayClick={handleOverlayClick}/>
              <DeleteConfirmationPopup isOpen={isDeleteCardPopupOpen} isLoading={isLoading} onClose={closeAllPopups} onOverlayClick={handleOverlayClick} onDeleteClick={handleCardDelete}/>
            </div>
          </ProtectedRoute>
        }/>
        <Route path="/sign-up" element={
          <>
            <Register handleRegistration={handleRegistration}/>
            <InfoTooltip isOpen={isRegistrationStatusPopupOpen} isRegistered={isRegistered} onClose={closeAllPopups} onOverlayClick={handleOverlayClick}/>
          </>
        }/>
        <Route path="/sign-in" element={<Login onLogin={handleAuthorization} />}/>
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;