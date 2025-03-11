import { getRandomPoint } from '../mock/mock-points.js';
import { mockDestinations } from '../mock/mock-destinations.js';
import { mockOffers } from '../mock/mock-offers.js';
import { POINT_COUNT } from '../const.js';

export default class PointsModel {
  #points = getRandomPoint;
  #destinations = mockDestinations;
  #offers = mockOffers;

  get points() {
    return this.#points;
  }

  getDestination() {
    return this.#destinations;
  }

  getDestinationId(id) {
    const allDestinations = this.getDestination();
    return allDestinations.find((item) => item.id === id);
  }

  getOffers() {
    return this.#offers;
  }

  getOfferByType(type) {
    const allOffers = this.getOffers();
    return allOffers.find((offer) => offer.type === type);
  }

  getOffersByTypeAndIds(type, itemIds) {
    const offersOfType = this.getOfferByType(type);
    return offersOfType?.offers.filter((item) => itemIds.includes(item.id)) || [];
  }
}
