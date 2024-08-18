import SortView from '../view/sort-view.js';
import ListView from '../view/list.view.js';
import PointView  from '../view/point-view.js';
import EditPointFormView from '../view/edit-point-form-view.js';
import {render} from '../render.js';
export default class EventPresenter {
  listComponent = new ListView();
  pointComponent = new PointView();

  constructor({boardContainer, pointsModel, offersModel, destinationsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    render(this.listComponent, this.boardContainer);
    render(new SortView(), this.listComponent.getElement());
    render(this.pointComponent, this.listComponent.getElement());
    render(new EditPointFormView(), this.pointComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView (), this.pointComponent.getElement());
    }
  }
}
