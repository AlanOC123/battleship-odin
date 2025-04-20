import eventHubFactory from "../factories/eventHubFactory";
import { validateEvent } from "./eventSchemas";
const eventHub = eventHubFactory(validateEvent);

export default eventHub;
