"use strict";

//записываем весь наш код в специальную переменную, чтобы потом можно было удалить
window.CGS = {
  // обработчик игровых событий
  on_event(event) {
    // в event.detail.name будет имя события (test_event или event_with_args из примере выше)
    // в event.detail.args будeт массив дополнительных аргументов (в event_with_args это [1, "test"])
    if (event.detail.name === 'show-stat-modal') {
      // слушатель событий отслеживает клики, всплывающие до root-div
      if (window.CGS.avsRootDiv === null) {
        window.CGS.avsRootDiv = document.querySelector('#root');
      }
      window.CGS.avsRootDiv.addEventListener('click', window.CGS.hideMessage);
      // если блок скрыт, показываем его
      const block = document.querySelector('#avs-stat-modal');
      if (block !== null) {
        window.CGS.readyToHide = true;
        if (block.classList.contains('avs-hide-this')) {
          block.classList.replace('avs-hide-this', 'avs-stats-modaling');
        }
      } 
    }
  },
  // обработчик выгрузки игры
  unload() {
    // отписываемся от событий
    window.removeEventListener('game-unload', window.CGS.unload);
    window.removeEventListener("qspider-event", window.CGS.on_event);
    window.avsRootDiv.removeEventListener('click', window.CGS.hideMessage);
    // удаляем переменные
    delete window.CGS;
  },
  // собственный обработчик, который убирает псевдомодальное окошко
  hideMessage(event) {
  	const block = document.querySelector('#avs-stat-modal');
    if (block !== null) {
      if (block.classList.contains('avs-stats-modaling') && window.CGS.readyToHide) {
        block.classList.replace('avs-stats-modaling', 'avs-hide-this');
      }
      window.CGS.readyToHide = false;
    }
    window.CGS.avsRootDiv.removeEventListener('click', window.CGS.hideMessage);
  },
  readyToHide: false,
  avsRootDiv: null,
};
// добавляем слушатель на специальное событие, вызываемое при выгрузке игры
window.addEventListener('game-unload', window.CGS.unload);
// добавляем слушатель на событие, вызываемое из игры через exec
window.addEventListener("qspider-event", window.CGS.on_event);


