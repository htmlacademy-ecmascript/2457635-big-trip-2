import EventPresenter from '../src/presenter/event-presenter.js';

const pageMainElement = document.querySelector('.page-body__page-main');

const eventPresenter = new EventPresenter({listContainer: pageMainElement});

eventPresenter.init();
