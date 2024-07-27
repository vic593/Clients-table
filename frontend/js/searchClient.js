import { findClient } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";

// Фильтрация
export const searchClients = (clients) => {
  const findList = document.querySelector('.find-list');
  const input = document.querySelector('.header__input');
  let debounceTimeout;

  // Обновление списка найденных клиентов
  const updateFindList = (filteredClients, searchTerm) => {
    findList.innerHTML = '';
    filteredClients.forEach(client => {
      const findItem = document.createElement('li');
      const findLink = document.createElement('a');

      findItem.classList.add('find-list__item');
      findLink.classList.add('find-list__link');

      const fullName = `${client.name} ${client.surname} ${client.lastName}`;
      const pos = fullName.toLowerCase().indexOf(searchTerm);
      findLink.innerHTML = insertMark(fullName, pos, searchTerm.length);
      findLink.href = '#';

      findItem.append(findLink);
      findList.append(findItem);
    });

    // Показать или скрыть список в зависимости от наличия результатов
    if (filteredClients.length > 0) {
      findList.classList.remove('hide');
    } else {
      findList.classList.add('hide');
    }
  };

  // Перерисовываем таблицу с совпадающими клиентами
  const rewriteTable = async (str) => {
    const response = await findClient(str);
    const tbody = document.querySelector('.clients__tbody');
    tbody.innerHTML = '';

    for (const client of response) {
      tbody.append(createClientItem(client));
    }
  };

  // Обработчик ввода в поле поиска с задержкой
  input.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      const value = input.value.trim().toLowerCase();

      if (value !== '') {
        const foundClients = clients.filter(client =>
          `${client.name} ${client.surname} ${client.lastName}`.toLowerCase().includes(value)
        );

        updateFindList(foundClients, value);
        await rewriteTable(value);
      } else {
        findList.classList.add('hide');
        const tbody = document.querySelector('.clients__tbody');
        tbody.innerHTML = '';
        clients.forEach(client => tbody.append(createClientItem(client)));
      }
    }, 300);
  });

  const insertMark = (str, pos, len) => {
    return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + len) + '</mark>' + str.slice(pos + len);
  };
};