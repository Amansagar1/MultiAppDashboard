// Create a custom event bus for toast messages
const toastEventBus = {
    listeners: {},

    // Subscribe to an event
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);

        // Return an unsubscribe function
        return () => {
            this.listeners[event] = this.listeners[event].filter(
                (listener) => listener !== callback
            );
        };
    },

    // Emit an event with data
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((callback) => callback(data));
        }
    }
};

// Toast types
const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};

// Toast service with methods for each toast type
export const toast = {
    // Add a toast message
    add(type, message, duration = 5000) {
        const id = Date.now().toString();
        toastEventBus.emit('add', {
            id,
            type,
            message,
            duration,
        });
        return id;
    },

    // Remove a toast by ID
    remove(id) {
        toastEventBus.emit('remove', id);
    },

    // Clear all toasts
    clear() {
        toastEventBus.emit('clear');
    },

    // Toast type shortcuts
    success(message, duration) {
        return this.add(TOAST_TYPES.SUCCESS, message, duration);
    },

    error(message, duration) {
        return this.add(TOAST_TYPES.ERROR, message, duration);
    },

    warning(message, duration) {
        return this.add(TOAST_TYPES.WARNING, message, duration);
    },

    info(message, duration) {
        return this.add(TOAST_TYPES.INFO, message, duration);
    },

    // Subscribe to toast events
    subscribe(callback) {
        const unsubAdd = toastEventBus.on('add', callback.add || (() => { }));
        const unsubRemove = toastEventBus.on('remove', callback.remove || (() => { }));
        const unsubClear = toastEventBus.on('clear', callback.clear || (() => { }));

        // Return a function to unsubscribe from all events
        return () => {
            unsubAdd();
            unsubRemove();
            unsubClear();
        };
    },
};

export default toast;