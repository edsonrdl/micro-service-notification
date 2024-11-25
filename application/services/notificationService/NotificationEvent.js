class NotificationEvent {
    constructor() {
      this.listeners = [];
    }
  
    subscribe(listener) {
      this.listeners.push(listener);
    }
  
    async notify(notification) {
      for (const listener of this.listeners) {
        await listener(notification);
      }
    }
  }
  
  module.exports = NotificationEvent;
  