import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListItemView  from '../view/event-list-item-view.js';
import AddNewPointFormView from '../view/add-new-point-form-view.js';
import EditPointFormView from '../view/edit-point-form-view.js';

import {render} from '../render.js';

export default class EventPresenter {
  constructor(siteMainElement) {
    this.siteMainElement = siteMainElement;
  }

  init() {
    render(new FilterView(), this.siteMainElement.querySelector('.trip-controls__filters'));
    render(new SortView(), this.siteMainElement.querySelector('.trip-events'));
    const tripEventListElement = this.siteMainElement.querySelector('.trip-events__list');
    render(new AddNewPointFormView(), tripEventListElement);
    render(new EditPointFormView(), tripEventListElement);

    for (let i = 0; i < 3; i++) {
      render(new EventListItemView(), tripEventListElement);
    }
  }
}
