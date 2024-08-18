import { mockOffers } from '../mock/mock-offers.js';

export default class OffersModel {
  offers = mockOffers;

  offersByType = null;

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    if (!this.offersByType) {
      this.offersByType = {};
      this.offers.forEach((offer) => {
        this.offersByType[offer.type] = offer.offers;
      });
    }
    return this.offersByType[type];
  }
}
