import "./styles/main.css";
import launchPageHTML from '../src/pages/launchPageHTML.html';

export const injectTemplate = (htmlString) => {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    document.body.append()
}
