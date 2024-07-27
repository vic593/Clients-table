import { createContactItem } from "./createContact.js";
import { SvgSpinner } from "./svg.js";

// создаем общее модальное окно
export const createClientsForm = () => {
  const $modalTitle = document.createElement('h2');
  const $modalClose = document.createElement('button');
  const $form = document.createElement('form');
  const $inputName = document.createElement('input');
  const $LabelName = document.createElement('label');
  const $inputSurname = document.createElement('input');
  const $labelSurname = document.createElement('label');
  const $inputLastName = document.createElement('input');
  const $labelLastName = document.createElement('label');
  const $reqiiredName = document.createElement('span');
  const $reqiiredSurname = document.createElement('span');
  const $addContactBtn = document.createElement('button');
  const $saveBtn = document.createElement('button');
  const $cancelBtn = document.createElement('button');
  const $contactsBlock = document.createElement('div');
  const $formFloatingName = document.createElement('div');
  const $formFloatingSurname = document.createElement('div');
  const $formFloatingLastname = document.createElement('div');

  const errorBlock = document.createElement('p')
  const unacceptableLetter = document.createElement('span')
  const writeName = document.createElement('span')
  const writeSurname = document.createElement('span')
  const writeLastName = document.createElement('span')
  const reqiuredValue = document.createElement('span')
  const reqiuredContacts = document.createElement('span')
  const saveSpinner = document.createElement('span')

  $modalTitle.classList.add('modal__title');
  $modalClose.classList.add('modal__close', 'btn-reset');
  $form.classList.add('modal__form');
  $inputName.classList.add('modal__input');
  $LabelName.classList.add('modal__label');
  $inputSurname.classList.add('modal__input');
  $labelSurname.classList.add('modal__label');
  $inputLastName.classList.add('modal__input');
  $labelLastName.classList.add('modal__label');
  $reqiiredName.classList.add('modal__label-star');
  $reqiiredSurname.classList.add('modal__label-star');
  $addContactBtn.classList.add('modal__btn-contact', 'modal__btn-contact-active');
  $saveBtn.classList.add('modal__btn-save', 'btn-reset', 'site-btn');
  $cancelBtn.classList.add('modal__btn-back', 'btn-reset');
  $contactsBlock.classList.add('modal__contact');
  $formFloatingName.classList.add('form-floating');
  $formFloatingSurname.classList.add('form-floating');
  $formFloatingLastname.classList.add('form-floating');
  saveSpinner.classList.add('modal__spinner')

  $LabelName.for = 'floatingName';
  $labelSurname.for = 'floatingSurname';
  $labelLastName.for = 'floatinglLastName';
  $inputName.id = 'floatingName';
  $inputSurname.id = 'floatingSurname';
  $inputLastName.id = 'floatinglLastName';
  $inputName.type = 'text';
  $inputSurname.type = 'text';
  $inputLastName.type = 'text';
  $addContactBtn.type = 'button'
  $cancelBtn.type = 'button'
  $inputName.placeholder = 'Имя';
  $inputSurname.placeholder = 'Фамилия';
  $inputLastName.placeholder = 'Отчество';

  errorBlock.classList.add('modal__error')
  unacceptableLetter.id = 'unacceptableLetter'
  writeName.id = 'writeName'
  writeSurname.id = 'writeSurname'
  writeLastName.id = 'writeLastName'
  reqiuredValue.id = 'reqiuredValue'
  reqiuredContacts.id = 'reqiuredContacts'

  saveSpinner.innerHTML = SvgSpinner
  $modalTitle.textContent = 'Новый клиент';
  $LabelName.textContent = 'Имя';
  $labelSurname.textContent = 'Фамилия';
  $labelLastName.textContent = 'Отчество';
  $addContactBtn.textContent = 'Добавить контакт';
  $saveBtn.textContent = 'Сохранить';
  $cancelBtn.textContent = 'Отмена';
  $reqiiredName.textContent = '*';
  $reqiiredSurname.textContent = '*';

  $LabelName.append($reqiiredName)
  $labelSurname.append($reqiiredSurname)
  $formFloatingName.append($inputName, $LabelName)
  $formFloatingSurname.append($inputSurname, $labelSurname)
  $formFloatingLastname.append($inputLastName, $labelLastName)
  $contactsBlock.append($addContactBtn)
  errorBlock.append(unacceptableLetter, writeName, writeSurname, writeLastName, reqiuredValue, reqiuredContacts)
  $saveBtn.prepend(saveSpinner)
  $form.append(
    $formFloatingSurname,
    $formFloatingName,
    $formFloatingLastname,
    $contactsBlock,
    errorBlock,
    $saveBtn,
    $cancelBtn
  )

  // добавляем контакты контакты, больше 10 контактов удаляем кнопку
  $addContactBtn.addEventListener('click', () => {
    const contactsItems = document.getElementsByClassName('contact')
    if (contactsItems.length < 9) {
      const contactItem = createContactItem();
      $contactsBlock.prepend(contactItem.$contact);
      $contactsBlock.style.backgroundColor = 'var(--color-athens-gray)'
      if (contactsItems.length > 7) {
        document.querySelector('.site-modal__content').style.top = '55%'
      } else {
        document.querySelector('.site-modal__content').style.top = '50%'
      }
    } else {
      const contactItem = createContactItem();
      $contactsBlock.prepend(contactItem.$contact)
      $addContactBtn.classList.remove('modal__btn-contact-active')
    }
  })

  return {
    $form,
    $modalTitle,
    $modalClose,
    $cancelBtn,
    $inputName,
    $inputSurname,
    $inputLastName,
    $LabelName,
    $labelSurname,
    $labelLastName,
    $contactsBlock,
    $addContactBtn
  }
}