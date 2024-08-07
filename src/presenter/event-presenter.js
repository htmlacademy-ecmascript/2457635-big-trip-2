import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListItemView  from '../view/event-list-item-view.js';
import AddNewPointFormView from '../view/add-new-point-form-view.js';
import EditPointFormView from '../view/edit-point-form-view.js';
import WaypointView  from '../view/event-list-view.js';

import {render} from '../render.js';

const POINTS_NUMBER = 3;

export default class EventPresenter {
  sortComponent = new SortView();
  tripListComponent = new WaypointView();

  constructor({ listContainer }) {
    this.listContainer = listContainer;
  }

  init() {
    render(new FilterView(), this.listContainer.getElement());
    render(this.sortComponent, this.listContainer);
    render(this.tripListComponent, this.listContainer);
    render(new EditPointFormView(), this.listContainer.getElement());
    render(new AddNewPointFormView(), this.listContainer.getElement());

    for (let i = 0; i < POINTS_NUMBER; i++) {
      render(new EventListItemView(), this.listContainer.getElement());
    }
  }
}
