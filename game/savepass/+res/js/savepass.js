"use strict";

//записываем весь наш код в специальную переменную, чтобы потом можно было удалить
window.CGS = {
  // обработчик игровых событий
  on_event(event) {
    // в e.detail.name будет имя события (test_event или event_with_args из примере выше)
    // в e.detail.args будeт массив дополнительных аргументов (в event_with_args это [1, "test"])
    if (event.detail.name === 'scroll-down') {
  		const block = document.querySelector('div[data-qsp="main"]');
  		block.scrollTop = block.scrollHeight;
  	}
  },
  // обработчик выгрузки игры
  unload() {
    // отписываемся от событий
    window.removeEventListener('game-unload', window.CGS.unload);
    window.removeEventListener("qspider-event", window.CGS.on_event);
    // удаляем переменные
    delete window.CGS;
    delete window.avsPromptObserver;
    delete window.avsRootDiv;
  },
  // собственный обработчик, который убирает псевдомодальное окошко
  hideMessage(event) {
  	const block = document.querySelector('#avs-message');
  	block.removeEventListener('click', window.CGS.hideMessage);
    block.remove();
  	document.querySelector('[data-qsp="msg"]').querySelector('[data-qsp="msg-buttons"]').querySelector('button').click();
  },
  // функция для перебора изменений
  avsSearchPrompt(mutations) {mutations.forEach(window.CGS.avsSearchInput);},
  // функция, обрабатывающая каждое отдельное изменение
  avsSearchInput(mutation) {
    let nodesList = mutation.addedNodes;
    for (let i=0; i<nodesList.length; i+=1) {
      if (!(nodesList[i] instanceof HTMLElement)) continue;
      if (nodesList[i].getAttribute('data-qsp')=='msg') {
        let msgWindow = nodesList[i];
        let avsMyWindow = msgWindow.querySelector('#avs-message');
        if (avsMyWindow!==null) {
          document.querySelector('body').appendChild(avsMyWindow);
          msgWindow.style.display = 'none';
          let msgOverlay = document.querySelector('[data-qsp="msg-overlay"]');
          msgOverlay.style.display = 'none';
          avsMyWindow.addEventListener('click', window.CGS.hideMessage);
        }
        break;
      }
    }
  }
};
// добавляем слушатель на специальное событие, вызываемое при выгрузке игры
window.addEventListener('game-unload', window.CGS.unload);
// добавляем слушатель на событие, вызываемое из игры через exec
window.addEventListener("qspider-event", window.CGS.on_event);

// создаём наблюдателя
window.avsPromptObserver = new MutationObserver(window.CGS.avsSearchPrompt);
window.avsRootDiv = document.querySelector('#root');
window.avsPromptObserver.observe(window.avsRootDiv, {childList: true, subtree: true});
