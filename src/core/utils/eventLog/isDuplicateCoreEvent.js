import coreEvents from "../../data/coreEvents.js";

const coreEventNames = coreEvents.map(([name, fn]) => name);

const isCoreEvent = (name) => coreEventNames.includes(name);

const isDuplicateCoreEvent = (current, last) => last ? false : isCoreEvent(current) && current === last;

export default isDuplicateCoreEvent;
