import { deleteClientModal } from "./createDeleteModal.js";
import { editClientModal } from "./editClient.js";
import { SvgSpinner } from "./svg.js";
import { createContactItemByType, formatDate, formatTime } from "./utils.js";

// создаем содержимое tbody
export const createClientItem = (data) => {
  const $clientTr = document.createElement('tr');
  const $clientId = document.createElement('td');
  const $clientFullName = document.createElement('td');
  const $clientName = document.createElement('span');
  const $clientSurname = document.createElement('span');
  const $clientLastname = document.createElement('span');
  const $clientCreated = document.createElement('td');
  const $createdDate = document.createElement('span');
  const $createdTime = document.createElement('span');
  const $createChanged = document.createElement('td');
  const $changedDate = document.createElement('span');
  const $cgangeTime = document.createElement('span');
  const $clientContacts = document.createElement('td');
  const $clientActions = document.createElement('td');
  const $clientEdit = document.createElement('button');
  const $clientDelete = document.createElement('button');
  const deleteClient = deleteClientModal();
  const editClient = editClientModal(data);
  const editSpinner = document.createElement('span');
  const deleteSpinner = document.createElement('span');

  editSpinner.classList.add('actions__spinner');
  deleteSpinner.classList.add('actions__spinner');
  $clientTr.classList.add('clients__item');
  $clientTr.id = data.id;
  $clientId.classList.add('clients__id');
  $clientFullName.classList.add('clients__full-name');
  $clientName.classList.add('clients__name');
  $clientSurname.classList.add('clients__surname');
  $clientLastname.classList.add('clients__lastname');
  $clientCreated.classList.add('clients__created');
  $createdDate.classList.add('created__date');
  $createdTime.classList.add('created__time');
  $createChanged.classList.add('clients__changed');
  $changedDate.classList.add('changed__date');
  $cgangeTime.classList.add('changed__time');
  $clientContacts.classList.add('clients__contacts');
  $clientActions.classList.add('clients__actions');
  $clientEdit.classList.add('clients__edit', 'clients__button', 'btn-reset');
  $clientDelete.classList.add('clients__delete', 'clients__button', 'btn-reset');

  editSpinner.innerHTML = SvgSpinner;
  deleteSpinner.innerHTML = SvgSpinner;

  for (const contact of data.contacts) {
    createContactItemByType(contact.type, contact.value, $clientContacts)
  }

  // вызываем модальное окно изминения клиента
  $clientEdit.addEventListener('click', () => {
    editSpinner.style.display = 'block'
    $clientEdit.classList.add('action-wait')

    setTimeout(() => {
      document.body.append(editClient.$editModal)
      editSpinner.style.display = 'none'
      $clientEdit.classList.remove('action-wait')
    }, 300)
  })

  // вызываем модальное окно удаления клиента
  $clientDelete.addEventListener('click', () => {
    deleteSpinner.style.display = 'block'
    $clientDelete.classList.add('action-wait')
    setTimeout(() => {
      deleteById()
      document.body.append(deleteClient.$deleteModal)
      deleteSpinner.style.display = 'none'
      $clientDelete.classList.remove('action-wait')
    }, 300)

  })

  // удаляем клиента
  const deleteById = () => {
    import('./clientsApi.js').then(({ deleteClientItem }) => {
      deleteClient.$deleteModalDelete.addEventListener('click', () => {
        try {
          deleteClient.deleteSpinner.style.display = 'block'
          setTimeout(() => {
            deleteClientItem(data.id);
            document.getElementById(data.id).remove()
            deleteClient.$deleteModal.remove()
          }, 300)
        } catch (error) {
          console.log(error);
        } finally {
          setTimeout(() => deleteClient.deleteSpinner.style.display = 'none', 300)
        }
      })
    })

  }

  $clientId.textContent = data.id.substr(3, 6);
  $clientName.textContent = data.name;
  $clientSurname.textContent = data.surname;
  $clientLastname.textContent = data.lastName;
  $createdDate.textContent = formatDate(data.createdAt)
  $createdTime.textContent = formatTime(data.createdAt)
  $changedDate.textContent = formatDate(data.updatedAt)
  $cgangeTime.textContent = formatTime(data.updatedAt)
  $clientEdit.textContent = 'Изменить';
  $clientDelete.textContent = 'Удалить';
  $clientFullName.textContent = $clientSurname.textContent + ' ' + $clientName.textContent + ' ' + $clientLastname.textContent;

  $clientEdit.append(editSpinner);
  $clientDelete.append(deleteSpinner);
  $clientCreated.append($createdDate, $createdTime);
  $createChanged.append($changedDate, $cgangeTime);
  $clientActions.append($clientEdit, $clientDelete);
  $clientTr.append(
    $clientId,
    $clientFullName,
    $clientCreated,
    $createChanged,
    $clientContacts,
    $clientActions
  );

  return $clientTr
}