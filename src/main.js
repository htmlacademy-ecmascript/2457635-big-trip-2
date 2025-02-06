// import FilterView from './view/filter-view.js';
// import {render} from './render.js';

import EventPresenter from './presenter/event-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import PointsModel from './model/point-model.js';

const siteMainElement = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-main');

const pointModel = new PointsModel();
const eventPresenter = new EventPresenter({container: siteMainElement, pointModel});
const headerPresenter = new HeaderPresenter({container: siteHeaderElement});

headerPresenter.init();
eventPresenter.init();
