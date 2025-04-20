import "./ui/styles/main.css";
import screenManager from "./ui/managers/screenManager";
import launchPageString from './ui/pages/launchPage/launchPageString';

document.addEventListener('DOMContentLoaded', () => screenManager.renderScreen(launchPageString));
