import eventLogFactory from "./factories/eventLogFactory";
import uniqueCoreEvents from "./core/events/coreEventNames";
import uniqueUIEvents from "./ui/events/uiEventNames";

const eventLog = eventLogFactory([ ...uniqueCoreEvents, ...uniqueUIEvents ]);

export default eventLog;
