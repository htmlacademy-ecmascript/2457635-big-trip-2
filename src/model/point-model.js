import { getRandomPoint } from '../mock/mock-points.js';
import { mockDestinations } from '../mock/mock-destinations.js';
import { mockOffers } from '../mock/mock-offers.js';

export default class PointsModel {
  #points = getRandomPoint;
  #destinations = mockDestinations;
  #offers = mockOffers;

  get points() {
    return this.#points;
  }

  get destination() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
