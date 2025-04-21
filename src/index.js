import "./ui/styles/main.css";
import eventHub from "./core/events/eventHub";
import startApp from './ui/pages/onAppStart';
import screenManager from './ui/managers/screenManager';

startApp();
document.addEventListener('DOMContentLoaded', () => eventHub.emit('App Started', {}));
