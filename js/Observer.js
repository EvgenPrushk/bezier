class Observer {
  constructor() {
    // слушатели
    this.handlers = [];
  }
  // сообщает, что объект изменился
  dispatch() {
    for (const handler of this.handlers) {
      handler();
    }
  }
  // возможность прослушивать
  subscribe(handler) {
    this.handlers.push(handler);
    // отписка от события
    return () => {
      // если это событие есть в списке
      if (this.handlers.includes(handler)) {
        // процесс удаления события из спискс
        const index = this.handlers.indexOf(handler);
        this.handlers.splice(index, 1);
      }
    };
  }
}
