import { render, replace, remove} from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointFormView from '../view/edit-point-form-view.js';
import { Mode } from '../const.js';
import { getDestinationId, getOffersByType, getOffersByTypeAndIds } from '../utils/point.js';


export default class PointPresenter {
  #listOfTrips = null;
  #handleDataChange = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #pointsModel;
  #point = null;
  #offer = null;
  #destination = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({listOfTrips, pointsModel, onDataChange, onModeChange}) {
    this.#listOfTrips = listOfTrips;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;
    this.#point = point;
    this.#offer = getOffersByType(point.type) || {};
    this.#destination = getDestinationId(point.destination) || {};


    this.#pointComponent = new PointView({
      point: point,
      offers: [...getOffersByTypeAndIds(point.type, point.offers)],
      destination: getDestinationId(point.destination),
      onEditClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditPointFormView({

      point: this.#point,
      offers: getOffersByType(point.type) || {},
      destination: getDestinationId(point.destination),
      allDestinations: this.#pointsModel.destination,
      onFormSubmit: this.#handleFormSubmit,
    });

    if(prevPointEditComponent === null || prevPointComponent === null) {
      render(this.#pointComponent, this.#listOfTrips);
      return;
    }

    if(this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point, this.#offer, this.#destination);
      this.#replaceFormToCard();

    }
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point, this.#offer, this.#destination);
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToCard();
  };

}
