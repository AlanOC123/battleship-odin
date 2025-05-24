import stateManagerFactory from "../factories/stateManagerFactory";
import eventHub from "../../eventHub";
import eventReducerFactory from "../../factories/eventReducerFactory";

const stateManager = stateManagerFactory(eventHub, eventReducerFactory);

export default stateManager;
