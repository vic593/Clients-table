import { contactTooltip } from "./createTooltip.js";
import { svgEmail, svgFb, svgOther, svgPhone, svgVk } from "./svg.js";

export const createContactLink = (type, value, element, svg, item) => {
  const setTooltip = contactTooltip(type, value);
  element = document.createElement('a');
  element.classList.add('contacts__link');
  element.innerHTML = svg;

  // устанавливаем href аттрибуты
  if (type == 'Email') {
    element.href = `mailto:${value.trim()}`;
  } else if (type == 'Телефон' || type == 'Доп. телефон') {
    element.href = `tel:${value.trim()}`;
    setTooltip.tooltipValye.style.color = 'var(--color-white)';
    setTooltip.tooltipValye.style.textDecoration = 'none';
  } else if (type == 'Vk') {
    element.href = `https://vk.com/${value.trim()}`;
    element.target = "_blank";
  } else if (type == 'Facebook') {
    element.href = `https://facebook.com/${value.trim()}`;
    element.target = "_blank";
  } else {
    element.href = value.trim();
  }

  element.append(setTooltip.tooltip);
  item.append(element);
};

export const createContactItemByType = (type, value, item) => {
  switch (type) {
    case 'Телефон':
    case 'Доп. телефон':
      let phone;
      createContactLink(type, value, phone, svgPhone, item);
      break;
    case 'Facebook':
      let fb;
      createContactLink(type, value, fb, svgFb, item);
      break;
    case 'Vk':
      let vk;
      createContactLink(type, value, vk, svgVk, item);
      break;
    case 'Email':
      let email;
      createContactLink(type, value, email, svgEmail, item);
      break;
    case 'Другое':
      let other;
      createContactLink(type, value, other, svgOther, item);
      break;
    default:
      break;
  }
}

// форматирование даты
export const formatDate = date => {
  const formattedDate = new Date(date)
  const corectedDate = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }
  const resultDate = formattedDate.toLocaleString('ru', corectedDate)
  return resultDate
}
// форматирование времени
export const formatTime = date => {
  const formattedTime = new Date(date)
  const corectedTime = {
    hour: 'numeric',
    minute: 'numeric',

  }
  const resultTime = formattedTime.toLocaleString('ru', corectedTime)
  return resultTime
}