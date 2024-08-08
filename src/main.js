import FilterView from './view/filter-view.js';
import {render} from './render.js';

import EventPresenter from '../src/presenter/event-presenter.js';

const siteMainElement = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-main');

const eventPresenter = new EventPresenter({boardContainer: siteMainElement});

render(new FilterView(), siteHeaderElement);

eventPresenter.init();
