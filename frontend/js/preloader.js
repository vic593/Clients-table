import { svgPreloaderMain } from "./svg.js";

export const createPreloader = () => {
  const preloaderBlock = document.createElement('div');
  const preloaderCricle = document.createElement('span');

  preloaderBlock.classList.add('preloader');
  preloaderCricle.id = 'loader';
  
  preloaderCricle.innerHTML = svgPreloaderMain;

  preloaderBlock.append(preloaderCricle);
  
  return preloaderBlock;
}