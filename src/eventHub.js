import eventHubFactory from "./core/factories/eventHubFactory.js";
import coreEventValidator from "./core/events/coreEventValidator.js";
import uiEventValidator from "./ui/events/uiEventValidator.js";
const eventHub = eventHubFactory(coreEventValidator, uiEventValidator);

export default eventHub;
