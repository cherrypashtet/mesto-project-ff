// Валидация форм

const showInputError = (inputElement, errorMessage, validationConfig) => {
    const errorElement = inputElement
        .closest(validationConfig.formSelector)
        .querySelector(`.${inputElement.id}-error`);  // по id инпута находим ошибку span 
    
    inputElement.classList.add(validationConfig.inputErrorClass);   // добавляем класс инпуту формы
    errorElement.textContent = errorMessage;                    // передаем текст ошибки
    errorElement.classList.add(validationConfig.inputErrorActiveClass);     // добавляем класс span'у
};
  
const hideInputError = (inputElement, validationConfig) => {
    const errorElement = inputElement
        .closest(validationConfig.formSelector)
        .querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.inputErrorActiveClass);
    errorElement.textContent = '';
};
    
// проверка на валидность 

const checkInputValidity = (inputElement, validationConfig) => {

    if (inputElement.validity.valueMissing) {
        showInputError(inputElement, 'Это обязательное поле', validationConfig);

        return false;
    }  

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(inputElement, validationConfig);
    }

};

// обработчики событий для инпутов

const setEventListeners = (formElement, validationConfig) => {
    const buttonElement = formElement
    .querySelector(validationConfig.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', ()=> {
            const isFormValid = hasInvalidInput(inputList);
            checkInputValidity(inputElement, validationConfig);
            toggleButtonState(isFormValid, buttonElement, validationConfig);
        })
    })
    formElement.addEventListener('reset', () => {
        clearValidation(formElement, validationConfig);
        toggleButtonState(true, buttonElement, validationConfig);
    });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return (!inputElement.validity.valid)
    })
}

const enableValidation = (validationConfig) => {
    const formsElement = document.querySelectorAll(validationConfig.formSelector);
    formsElement.forEach((formElement) => setEventListeners(formElement, validationConfig))
};

const toggleButtonState = (isInvalid, button, validationConfig) => {
    if (isInvalid) {
        button.disabled = true;
        button.classList.add(validationConfig.inactiveButtonClass);
    } else {
        button.removeAttribute('disabled');
        button.classList.remove(validationConfig.inactiveButtonClass);
    }
}

// сброс валидации

const clearValidation = (form, validationConfig) => {
    const inputs = form.querySelectorAll(validationConfig.inputSelector);

    inputs.forEach((input) => hideInputError(input, validationConfig));
}

export { enableValidation, clearValidation, toggleButtonState }