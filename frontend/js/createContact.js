import { svgDelete } from "./svg.js";
// кастомный селект 
export const createContactItem = () => {
  const $contact = document.createElement('div');
  const $contactType = document.createElement('div');
  const $contactName = document.createElement('button');
  const $contactList = document.createElement('ul');
  const $contactPhone = document.createElement('li');
  const $contactVk = document.createElement('li');
  const $contactFb = document.createElement('li');
  const $contactEmail = document.createElement('li');
  const $contactOther = document.createElement('li');
  const $contactInput = document.createElement('input');
  const $contactDelete = document.createElement('button');
  const $contactDeleteTooltip = document.createElement('span');

  $contact.classList.add('contact');
  $contactType.classList.add('contact__type');
  $contactName.classList.add('contact__name');
  $contactList.classList.add('contact__list', 'list-reset');
  $contactPhone.classList.add('contact__item');
  $contactVk.classList.add('contact__item');
  $contactFb.classList.add('contact__item');
  $contactEmail.classList.add('contact__item');
  $contactOther.classList.add('contact__item');
  $contactInput.classList.add('contact__input');
  $contactDelete.classList.add('contact__delete', 'btn-reset');
  $contactDeleteTooltip.classList.add('contact-tooltip', 'site-tooltip');

  $contactName.textContent = 'Телефон';
  $contactPhone.textContent = 'Доп. телефон';
  $contactVk.textContent = 'Vk';
  $contactFb.textContent = 'Facebook';
  $contactEmail.textContent = 'Email';
  $contactOther.textContent = 'Другое';
  $contactInput.placeholder = 'Введите данные контакта';
  $contactInput.type = 'text';
  $contactName.type = 'button';
  $contactDeleteTooltip.textContent = 'Удалить контакт';
  $contactDelete.innerHTML = svgDelete;

  $contactDelete.append($contactDeleteTooltip);
  $contact.append($contactType, $contactInput, $contactDelete);
  $contactType.append($contactName, $contactList);
  $contactList.append($contactPhone, $contactEmail, $contactVk, $contactFb, $contactOther);
  // удаляем контакт
  $contactDelete.addEventListener('click', () => {
    $contact.remove()
    // возвращаем кнопку удаления
    document.querySelector('.modal__btn-contact').classList.add('modal__btn-contact-active')
  })

  // открываем/закрываем селектор
  $contactName.addEventListener('click', () => {
    $contactList.classList.toggle('contact__list-active')
    $contactName.classList.toggle('contact__list-active')
  })
// закрываем селектор если курсор не на нем
  $contactType.addEventListener('mouseleave', () => {
    $contactList.classList.remove('contact__list-active')
    $contactName.classList.remove('contact__list-active')
  })

  const setType = (type) => {
    type.addEventListener('click', () => {
      $contactName.textContent = type.textContent
      $contactList.classList.remove('contact__list-active')
      $contactName.classList.remove('contact__list-active')
    })
  }
  const typeArray = [$contactEmail, $contactFb, $contactVk, $contactPhone, $contactOther];

  for (const type of typeArray) {
    setType(type)
  }

  return {
    $contact,
    $contactName,
    $contactInput,
    $contactDelete
  }
}