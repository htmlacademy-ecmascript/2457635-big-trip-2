import SortView from '../view/sort-view.js';
import ListView from '../view/list.view.js';
import PointView from '../view/point-view.js';
import EditPointFormView from '../view/edit-point-form-view.js';
import { render } from '../framework/render.js';
export default class EventPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #listOfTrips = new ListView();

  #tripPoints = [];

  constructor({container, pointsModel}) {
    this.#boardContainer = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];
    render(new SortView(), this.#boardContainer);
    render(this.#listOfTrips, this.#boardContainer);
    render(new EditPointFormView ({
      point: this.#tripPoints[0],
      checkedOffers: [...this.#pointsModel.getOffersByTypeAndIds(this.#tripPoints[0].type, this.#tripPoints[0].offers)],
      offers: this.#pointsModel.getOfferByType(this.#tripPoints[0].type),
      allDestinations: this.#pointsModel.getDestination(this.#tripPoints[0].destination),
      destination: this.#pointsModel.getDestinationId(this.#tripPoints[0].destination)
    }), this.#listOfTrips.element);

    for (let i = 1; i < this.#tripPoints.length; i++) {
      render(new PointView({
        point: this.#tripPoints[i],
        offers: [...this.#pointsModel.getOffersByTypeAndIds(this.#tripPoints[i].type, this.#tripPoints[i].offers)],
        destination: this.#pointsModel.getDestinationId(this.#tripPoints[i].destination)
      }), this.#listOfTrips.element);
    }
  }
}

