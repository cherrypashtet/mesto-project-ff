// Валидация форм

const showInputError = (inputElement, errorMessage, validationConfig) => {
    const errorElement = inputElement
        .closest(validationConfig.formSelector)
        .querySelector(`.${inputElement.id}-error`);  // по id инпута находим ошибку span 
    
    inputElement.classList.add(validationConfig.inputErrorClass);   // добавляем класс инпуту формы
    errorElement.textContent = errorMessage;                    // передаем текст ошибки
    errorElement.classList.add('form__input-error_active');     // добавляем класс span'у
};
  
const hideInputError = (inputElement, validationConfig) => {
    const errorElement = inputElement
        .closest(validationConfig.formSelector)
        .querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};
    
// проверка на валидность 

const checkInputValidity = (inputElement, validationConfig) => {

    if (inputElement.validity.valueMissing) {
        showError(inputElement, 'Это обязательное поле', validationConfig);

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
    
    formElement.addEventListener('input', (evt) => {
        const inputElement = evt.target;
        const isFormValid = inputElement.validity.valid;
        
        checkInputValidity(inputElement, validationConfig);
        toggleButtonState(isFormValid, buttonElement, validationConfig);
    })    
    formElement.addEventListener('reset', () => {
        clearValidation(formElement, validationConfig);
    });    
};
  
const enableValidation = (validationConfig) => {
    const formsElement = document.querySelectorAll(validationConfig.formSelector);
    formsElement.forEach((formElement) => setEventListeners(formElement, validationConfig))
};

const toggleButtonState = (isValid, button, validationConfig) => {
    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.remove(validationConfig.inactiveButtonClass);
    } else {
        button.disabled = true;
        button.classList.add(validationConfig.inactiveButtonClass);
    }
}
  
  /* Сбросить валидацию */
  
const clearValidation = (form, validationConfig) => {
    const inputs = form.querySelectorAll(validationConfig.inputSelector);
  
    inputs.forEach((input) => hideError(input, validationConfig));
}

  
export { enableValidation, clearValidation }