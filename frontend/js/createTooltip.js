export const contactTooltip = (type, value) => {
  const tooltip = document.createElement('div');
  const tooltipType = document.createElement('span');
  const tooltipValye = document.createElement('a');

  tooltip.classList.add('contact-tooltip', 'site-tooltip');
  tooltipType.classList.add('contact-tooltip__type');
  tooltipValye.classList.add('contact-tooltip__value');

  tooltipType.textContent = type + ': ';
  tooltipValye.textContent = value;

  tooltip.append(tooltipType, tooltipValye)

  return {
    tooltip,
    tooltipType,
    tooltipValye
  }
}