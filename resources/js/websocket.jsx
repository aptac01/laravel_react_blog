import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',

    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,

    // порт может быть только числом, если строка - оно перестаёт работать!!
    wsPort: parseInt(import.meta.env.VITE_REVERB_PORT),

    // wssPort: parseInt(import.meta.env.VITE_REVERB_PORT),         // для HTTPS
    forceTLS: false,                                             // для HTTPS

    scheme: window.location.protocol.slice(0, -1),
    disableStats: true,
    encrypted: false,
    enabledTransports: ['ws', 'wss'],
    enableClientEvents: true,

    debug: false,
});

export default echo;
