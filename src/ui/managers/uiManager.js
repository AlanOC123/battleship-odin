import uiManagerFactory from "../factories/uiManagerFactory";
import eventHub from "../../eventHub";
import eventReducerFactory from '../../core/factories/eventReducerFactory';

const uiManager = uiManagerFactory(eventHub, eventReducerFactory);

export default uiManager;
