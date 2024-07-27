import { addClientModal } from "./addClient.js";
import { createPreloader } from "./preloader.js";
import { svgAddClients } from "./svg.js";


export const createClientsSection = () => {
  const $section = document.createElement('section');
  const $container = document.createElement('div');
  const $main = document.createElement('main');
  const $h1 = document.createElement('h1');
  const $tableWrapper = document.createElement('div');
  const $tableClients = document.createElement('table');
  const $sortingDisplay = document.createElement('thead');
  const $theadTr = document.createElement('tr');
  const $sortingDisplayId = document.createElement('th');
  const $sortingDisplayFio = document.createElement('th');
  const $sortingDisplayFioSpan = document.createElement('span');
  const $sortingDisplayCreatedAt = document.createElement('th');
  const $sortingDisplayUpdatedAt = document.createElement('th');
  const $sortingDisplayContacts = document.createElement('th');
  const $sortingDisplayAction = document.createElement('th');
  const $tbody = document.createElement('tbody');
  const $addClientsBtn = document.createElement('botton');
  const $addClientsBtnSvg = document.createElement('span');

  const sortDisplayItems = [$sortingDisplayId, $sortingDisplayFio, $sortingDisplayCreatedAt, $sortingDisplayUpdatedAt]
  // меняем стрелку при сортировке
  for (const item of sortDisplayItems) {
    item.addEventListener('click', () => {
      if (item.classList.contains('sort-down')) {
        item.classList.remove('sort-down')
        item.classList.add('sort-up')
      } else {
        item.classList.remove('sort-up')
        item.classList.add('sort-down')
      }
    })
  }



  $section.classList.add('clients');
  $container.classList.add('container', 'clients__container');
  $main.classList.add('main');
  $h1.classList.add('clients__heading');
  $tableWrapper.classList.add('clients__wrapper');
  $tableClients.classList.add('clients__table');
  $sortingDisplay.classList.add('cliens__display', 'display-info');
  $sortingDisplayId.classList.add('display-info__item', 'display-info__item-id', 'sort-up');
  $sortingDisplayFio.classList.add('display-info__item', 'display-info__item-fio', 'sort-down');
  $sortingDisplayFioSpan.classList.add('display-fio__span');
  $sortingDisplayCreatedAt.classList.add('display-info__item', 'display-info__item-create', 'sort-down');
  $sortingDisplayUpdatedAt.classList.add('display-info__item', 'display-info__item-update', 'sort-down');
  $sortingDisplayContacts.classList.add('display-info__item', 'display-info__item-contacts');
  $sortingDisplayAction.classList.add('display-info__item', 'display-info__item-actions');
  $tbody.classList.add('clients__tbody');
  $addClientsBtn.classList.add('clients__btn', 'btn-reset');
  $addClientsBtnSvg.classList.add('clients__svg')
  $theadTr.classList.add('thead__tr')


  $sortingDisplayId.setAttribute('data-type', 'id')
  $sortingDisplayFio.setAttribute('data-type', 'text')
  $sortingDisplayCreatedAt.setAttribute('data-type', 'create')
  $sortingDisplayUpdatedAt.setAttribute('data-type', 'update')

  $h1.textContent = 'Клиенты';
  $sortingDisplayId.textContent = 'ID';
  $sortingDisplayFio.textContent = 'Фамилия Имя Отчество';
  $sortingDisplayFioSpan.textContent = 'А-Я';
  $sortingDisplayCreatedAt.textContent = 'Дата и время создания';
  $sortingDisplayUpdatedAt.textContent = 'Последние изменения';
  $sortingDisplayContacts.textContent = 'Контакты';
  $sortingDisplayAction.textContent = 'Действия';
  $addClientsBtn.textContent = 'Добавить клиента';
  $addClientsBtnSvg.innerHTML = svgAddClients;

  $addClientsBtn.addEventListener('click', () => {
    document.body.append(addClientModal())
  })

  $main.append($section);
  $section.append($container);
  $sortingDisplayFio.appendChild($sortingDisplayFioSpan);
  $theadTr.append(
    $sortingDisplayId,
    $sortingDisplayFio,
    $sortingDisplayCreatedAt,
    $sortingDisplayUpdatedAt,
    $sortingDisplayContacts,
    $sortingDisplayAction
  );
  $sortingDisplay.append($theadTr);
  $tableWrapper.append($h1, $tableClients);
  $tableClients.append($sortingDisplay, $tbody);
  $tbody.append(createPreloader());
  $addClientsBtn.prepend($addClientsBtnSvg);
  $container.append($tableWrapper, $addClientsBtn);

  return {
    $main,
    $tableClients,
    $tbody
  }
}