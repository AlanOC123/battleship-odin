import eventHubFactory from "./factories/eventHubFactory.js";
import coreEventValidator from "./core/events/coreEventValidator.js";
import uiEventValidator from "./ui/events/uiEventValidator.js";
import eventLog from "./eventLog.js";
const eventHub = eventHubFactory(eventLog, coreEventValidator, uiEventValidator);
export default eventHub;
