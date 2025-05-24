import screenManagerFactory from "../factories/screenManagerFactory";
import eventHub from "../../eventHub";
import eventReducerFactory from '../../factories/eventReducerFactory';

const screenManager = screenManagerFactory(eventHub, eventReducerFactory);
export default screenManager;
