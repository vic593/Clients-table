// Валидация формы
export const validateClientForm = () => {
  const userName = document.getElementById('floatingName');
  const userSurname = document.getElementById('floatingSurname');
  const userLastName = document.getElementById('floatinglLastName');
  const unacceptableLetter = document.getElementById('unacceptableLetter');
  const writeName = document.getElementById('writeName');
  const writeSurname = document.getElementById('writeSurname');
  const writeLastName = document.getElementById('writeLastName');
  const reqiuredValue = document.getElementById('reqiuredValue');

  // массив с ошибками
  const validateArray = [unacceptableLetter, writeName, writeSurname, writeLastName, reqiuredValue];

  // ввод ФИО только кирилица
  const regexp = /[^а-яА-ЯёЁ]+$/g;

  const onInputValue = input => {
    input.addEventListener('input', () => {
      input.style.borderColor = 'var(--color-gray-suit)';
      for (const item of validateArray) {
        item.textContent = '';
      }
    });
    input.oncut = input.oncopy = input.onpaste = () => {
      input.style.borderColor = 'var(--color-gray-suit)';
      for (const item of validateArray) {
        item.textContent = '';
      }
    };
    input.onchange = () => {
      input.style.borderColor = 'var(--color-gray-suit)';

      if (userSurname.value && userName.value && userLastName.value) {
        for (const item of validateArray) {
          item.textContent = '';
        }
      }
    };
  };

  onInputValue(userName);
  onInputValue(userSurname);
  onInputValue(userLastName);

  const checkRequiredName = (input, message, name) => {
    if (!input.value) {
      input.style.borderColor = 'var(--color-burnt-sienna)';
      message.textContent = `Введите ${name} клиента!`;
      return false;
    } else {
      message.textContent = '';
    }
    return true
  }

  const checkByRegexp = (input, regexp) => {
    if (regexp.test(input.value)) {
      input.style.borderColor = 'var(--color-burnt-sienna)';
      unacceptableLetter.textContent = `Недопустимые символы!`;
      return false
    }
    return true
  }

  if (!checkRequiredName(userSurname, writeSurname, 'Фамилию')) {return false};
  if (!checkRequiredName(userName, writeName, 'Фамилию')) {return false};
  if (!checkByRegexp(userSurname, regexp)) {return false};
  if (!checkByRegexp(userName, regexp)) {return false};
  if (!checkByRegexp(userLastName, regexp)) {return false};

  return true
}