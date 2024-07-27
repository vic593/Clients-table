// валидация контактов
export const validateClientContact = (contactType, contactInput) => {
  const writeValue = document.getElementById('writeName');
  const onlyNumbers = /[^0-9|+]+$/g;
  const onlyEnglish = /[^a-zA-Z|0-9|@|.]+$/g;

  const onInputValue = input => {
    input.addEventListener('input', () => {
      input.style.borderBottomColor = 'var(--color-gray-suit)';
      writeValue.textContent = '';

    });
    input.oncut = input.oncopy = input.onpaste = () => {
      input.style.borderBottomColor = 'var(--color-gray-suit)';
      writeValue.textContent = '';
    };
  };

  const showErrorMessage = (message, block, input) => {
    block.textContent = message;
    input.style.borderBottomColor = 'var(--color-burnt-sienna)'
  };

  onInputValue(contactInput);

  if (!contactInput.value) {
    showErrorMessage('Заполните все поля контактов!', writeValue, contactInput);
    return false
  }

  switch (contactType.innerHTML) {
    case 'Телефон':
    case 'Доп. телефон':
      if (onlyNumbers.test(contactInput.value)) {
        showErrorMessage('Допустимы только цифры и знак +', writeValue, contactInput);
        return false
      }
      return true
    case 'Email':
      if (onlyEnglish.test(contactInput.value)) {
        showErrorMessage('Допустима только латиница', writeValue, contactInput);
        return false
      }
      return true
    default:
      return true
  }

};