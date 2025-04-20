import eventHubFactory from "../factories/eventHubFactory.js";
import { validateEvent } from "./eventSchemas";
const eventHub = eventHubFactory(validateEvent);

export default eventHub;
