import "./ui/styles/main.css";
import startApp from './startApp';

const DEV_MODE = true;
const PAGE = 'launch';

document.addEventListener('DOMContentLoaded', () => startApp(DEV_MODE, PAGE));
