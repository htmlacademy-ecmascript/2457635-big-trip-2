import SortView from '../view/sort-view.js';
import ListView from '../view/list.view.js';
import PointView from '../view/point-view.js';
import EditPointFormView from '../view/edit-point-form-view.js';
import { render, replace } from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';
export default class EventPresenter {
  #boardContainer;
  #pointsModel;

  #listOfTrips = new ListView();

  #tripPoints = [];

  constructor({container, pointsModel}) {
    this.#boardContainer = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    if(this.#tripPoints.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderBoard();
  }

  #renderNoPoint() {
    render(new NoPointView(), this.#boardContainer);
  }

  #renderBoard() {
    render(new SortView(), this.#boardContainer);
    render(this.#listOfTrips, this.#boardContainer);

    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderPoint(this.#tripPoints[i]);
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new PointView({
      point: point,
      offers: [...this.#pointsModel.getOffersByTypeAndIds(point.type, point.offers)],
      destination: this.#pointsModel.getDestinationId(point.destination),
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPointFormView({
      point: point,
      checkedOffers: [...this.#pointsModel.getOffersByTypeAndIds(point.type, point.offers)],
      offers: this.#pointsModel.getOfferByType(point.type),
      allDestinations: this.#pointsModel.getDestination(point.destination),
      destination: this.#pointsModel.getDestinationId(point.destination),
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });
    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }
    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }
    render(pointComponent, this.#listOfTrips.element);
  }
}

