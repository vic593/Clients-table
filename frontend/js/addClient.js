import { sendClientData } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { createClientsForm } from "./createModalForm.js"
import { validateClientContact } from "./validateContact.js";
import { validateClientForm } from "./validateForm.js";
// создаем модальное окно добавления клиента
export const addClientModal = () => {
  const createForm = createClientsForm();
  const $modal = document.createElement('div');
  const $modalContent = document.createElement('div');

  $modal.classList.add('modal', 'site-modal', 'modal-active');
  $modalContent.classList.add('modal__content', 'site-modal__content', 'modal-active');
  createForm.$form.classList.add('add-client')

  $modal.append($modalContent);
  $modalContent.append(createForm.$modalClose, createForm.$modalTitle, createForm.$form);

  // добваляем клиента
  createForm.$form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateClientForm()) {
      return false
    }

    const contactTypes = document.querySelectorAll('.contact__name')
    const contactValues = document.querySelectorAll('.contact__input')
    let contacts = [];
    let clientObj = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value
      })
    }

    clientObj.name = createForm.$inputName.value.trim().substring(0, 1).toUpperCase() + createForm.$inputName.value.substring(1).toLowerCase();
    clientObj.surname = createForm.$inputSurname.value.trim().trim().substring(0, 1).toUpperCase() + createForm.$inputSurname.value.substring(1).toLowerCase();
    clientObj.lastName = createForm.$inputLastName.value.trim().trim().substring(0, 1).toUpperCase() + createForm.$inputLastName.value.substring(1).toLowerCase();
    clientObj.contacts = contacts;

    const spinner = document.querySelector('.modal__spinner')
    try {
      spinner.style.display = 'block'
      const data = await sendClientData(clientObj, 'POST')
      setTimeout(() => {
        if (data) {
          document.querySelector('.clients__tbody').append(createClientItem(data));
          $modal.remove()
        }
      }, 300)

    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => spinner.style.display = 'none', 300)
    }

  })

  // закрывваем модальное окно по крестику
  createForm.$modalClose.addEventListener('click', () => {
    $modal.remove()
  })
  // закрывваем модальное окно при клике вне блока
  document.addEventListener('click', (e) => {
    if (e.target === $modal) {
      $modal.remove()
    }
  })
  // по клику на отмена
  createForm.$cancelBtn.addEventListener('click', () => {
    $modal.remove()
  })
  return $modal
}