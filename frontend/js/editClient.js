import { sendClientData } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";
import { createContactItem } from "./createContact.js";
import { deleteClientModal } from "./createDeleteModal.js";
import { createClientsForm } from "./createModalForm.js";
import { validateClientContact } from "./validateContact.js";
import { validateClientForm } from "./validateForm.js";


export const editClientModal = (data) => {
  const $editModal = document.createElement('div');
  const $editModalContent = document.createElement('div');
  const createForm = createClientsForm();
  const $titleId = document.createElement('span')

  $titleId.classList.add('modal__id')
  $editModal.classList.add('modal-edit', 'site-modal', 'modal-active');
  $editModalContent.classList.add('edit-modal__content', 'site-modal__content', 'modal-active');

  $titleId.textContent = 'ID: ' + data.id.substr(3, 6);
  createForm.$modalTitle.textContent = 'Изменить данные';
  createForm.$cancelBtn.textContent = 'Удалить клиента';

  createForm.$modalTitle.append($titleId)
  $editModalContent.append(createForm.$modalClose, createForm.$modalTitle, createForm.$form);
  $editModal.append($editModalContent)

  // заполняем данные клиента в форму изменения
  createForm.$inputName.value = data.name
  createForm.$inputSurname.value = data.surname
  createForm.$inputLastName.value = data.lastName

  // проходим по массиву с контактами и выводим в форму
  for (const contact of data.contacts) {
    const createContact = createContactItem();

    createContact.$contactName.textContent = contact.type;
    createContact.$contactInput.value = contact.value;

    createForm.$contactsBlock.prepend(createContact.$contact)
    createForm.$contactsBlock.style.backgroundColor = 'var(--color-athens-gray)'
  }
  // если контактов 10 тогда скрываем кнопку добавления
  if (data.contacts.length === 10) {
    createForm.$addContactBtn.classList.remove('modal__btn-contact-active')
  }

  if (data.contacts.length > 7) {
    $editModalContent.style.top = '55%'
  } else {
    $editModalContent.style.top = '50%'
  }


  // изменяем данные клиента
  createForm.$form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateClientForm()) {
      return false
    }

    const contactTypes = document.querySelectorAll('.contact__name')
    const contactValues = document.querySelectorAll('.contact__input')
    let contacts = [];
    let client = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!validateClientContact(contactTypes[i], contactValues[i])) {
        return;
      }
      contacts.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value
      });
    }

    client.surname = createForm.$inputSurname.value.trim().trim().substring(0, 1).toUpperCase() + createForm.$inputSurname.value.substring(1).toLowerCase();
    client.name = createForm.$inputName.value.trim().substring(0, 1).toUpperCase() + createForm.$inputName.value.substring(1).toLowerCase();
    client.lastName = createForm.$inputLastName.value.trim().trim().substring(0, 1).toUpperCase() + createForm.$inputLastName.value.substring(1).toLowerCase();
    client.contacts = contacts

    const spinner = document.querySelector('.modal__spinner');

    try {
      spinner.style.display = 'block'
      const editedData = await sendClientData(client, 'PATCH', data.id)
      setTimeout(() => {
        document.getElementById(editedData.id).remove();
        document.querySelector('.clients__tbody').append(createClientItem(editedData));
        $editModal.remove()
      }, 300)

    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => spinner.style.display = 'none', 300)
    }

  });

  // закрыть модальное окно по крестику
  createForm.$modalClose.addEventListener('click', () => $editModal.remove())

  // вызываем модальное окно удаления клиента
  createForm.$cancelBtn.addEventListener('click', () => {
    const deleteModal = deleteClientModal();
    document.body.append(deleteModal.$deleteModal);
    // удаляем клиента


    import('./clientsApi.js').then(({ deleteClientItem }) => {
      deleteModal.$deleteModalDelete.addEventListener('click', () => {
        try {
          deleteModal.deleteSpinner.style.display = 'block'
          setTimeout(() => {
            deleteClientItem(data.id)
            document.getElementById(data.id).remove()
            deleteModal.$deleteModal.remove()
            $editModal.remove()
          }, 300)

        } catch (error) {
          console.log(error);
        } finally {
          setTimeout(() => deleteModal.deleteSpinner.style.display = 'none', 300)
        }

      })
    })
  })

  // удаляем модальное окно при клике вне его
  window.addEventListener('click', (e) => {
    if (e.target === $editModal) $editModal.remove()
  })

  return {
    $editModal,
    $editModalContent
  }
}
