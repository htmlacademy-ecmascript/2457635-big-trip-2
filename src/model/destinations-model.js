import { mockDestinations } from '../mock/mock-destinations.js';

export default class DestinationsModel {
  destinations = mockDestinations;

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    const destinations = this.getDestinations();

    return destinations.find((destination) => destination.id === id);
  }
}
