import { SvgSpinner } from "./svg.js";

export const deleteClientModal = () => {
  const $deleteModalContent = document.createElement('div');
  const $modalClose = document.createElement('button');
  const $deleteModalTitle = document.createElement('h2');
  const $deleteModalText = document.createElement('p');
  const $deleteModal = document.createElement('div');
  const $deleteModalDelete = document.createElement('button');
  const $deleteModalBack = document.createElement('button');
  const deleteSpinner = document.createElement('span')

  deleteSpinner.classList.add('modal__spinner')
  $deleteModalContent.classList.add('delete-modal__content', 'site-modal__content', 'modal-active');
  $modalClose.classList.add('modal__close', 'btn-reset');
  $deleteModalTitle.classList.add('delete-modal__title', 'modal__title');
  $deleteModalText.classList.add('delete-modal__text');
  $deleteModal.classList.add('delete-modal', 'site-modal', 'modal-active');
  $deleteModalDelete.classList.add('delete-modal__delete', 'btn-reset', 'site-btn');
  $deleteModalBack.classList.add('delete-modal__back', 'btn-reset');

  deleteSpinner.innerHTML = SvgSpinner
  $deleteModalTitle.textContent = 'Удалить клиента';
  $deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
  $deleteModalDelete.textContent = 'Удалить';
  $deleteModalBack.textContent = 'Отмена';

  $deleteModalDelete.append(deleteSpinner)
  $deleteModalContent.append(
    $modalClose,
    $deleteModalTitle,
    $deleteModalText,
    $deleteModalDelete,
    $deleteModalBack
  )
  $deleteModal.append($deleteModalContent);

  // закрываем модальное окно
$modalClose.addEventListener('click', () => $deleteModal.remove())
$deleteModalBack.addEventListener('click', () => $deleteModal.remove())
// закрываем модальное окно при клике вне его
  window.addEventListener('click', (e) => {
    if (e.target === $deleteModal) {
      $deleteModal.remove()
    }
  })

  return {
    $deleteModal,
    $deleteModalContent,
    $deleteModalDelete,
    deleteSpinner
  }
}