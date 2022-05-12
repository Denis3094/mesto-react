import {useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, name, setName, description, setDescription, isLoading}) {

    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);


    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='edit-profile'
            buttonText={isLoading ? 'Идет сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input defaultValue={name} onChange={handleChangeName} id="username" type="text"
                   className="popup__input popup__input_type_name"
                   placeholder="Имя" name="name" required minLength={2} maxLength={40}/>
            <span id="error-username" className="popup__error"/>
            <input defaultValue={description} onChange={handleChangeDescription} id="about" type="text"
                   className="popup__input popup__input_type_job"
                   placeholder="О себе" name="aboutMe" required minLength={2} maxLength={200}/>
            <span id="error-about" className="popup__error"/>
        </PopupWithForm>
    )
}

export default EditProfilePopup