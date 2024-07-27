// создаем header
export const createClientsHeader = () => {
  const header = document.createElement('header')
  const container = document.createElement('div')
  const wrapper = document.createElement('div');
  const logo = document.createElement('a');
  const logoImg = document.createElement('img');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const inner = document.createElement('div');
  const findList = document.createElement('ul')

  header.classList.add('header');
  container.classList.add('container', 'header__container');
  logo.classList.add('logo', 'header__logo');
  logoImg.classList.add('logo__img');
  logoImg.src = 'img/logo.svg';
  logoImg.alt = 'Логотип';
  form.classList.add('header__form');
  input.classList.add('header__input');
  input.placeholder = 'Введите запрос'
  wrapper.classList.add('header__wrapper');
  inner.classList.add('header__inner');
  findList.classList.add('find-list', 'hide')

  inner.append(input, findList);
  header.append(container);
  logo.append(logoImg);
  form.append(inner);
  container.append(logo, form);

  return header
}
