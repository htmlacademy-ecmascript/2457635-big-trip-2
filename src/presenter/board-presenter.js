import SortView from '../view/sort-view.js';
import ListView from '../view/list.view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
// import { updateItem } from '../utils/common.js';
// import { SortType } from '../const.js';
// import { sortPointByDay, sortPointByTime, sortPointByPrice } from '../utils/point.js';
import NewPointPresenter from './new-point-presenter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortPointByDay, sortPointByTime, sortPointByPrice } from '../utils/point.js';
import { filter } from '../utils/filter';
export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #noPointComponent = null;
  #newPointPresenter = null;

  #boardComponent = new ListView();

  // #tripPoints = [];
  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({container, pointsModel, filterModel, onNewPointDestroy}) {
    this.#boardContainer = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    // this.#tripPoints = [...this.#pointsModel.points];

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#boardComponent.element,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        filteredPoints.sort(sortPointByDay);
        break;
      case SortType.TIME:
        filteredPoints.sort(sortPointByTime);
        break;
      case SortType.PRICE:
        filteredPoints.sort(sortPointByPrice);
        break;
    }

    return filteredPoints;
  }

  init() {
    // this.#sourcedBoardPoints = [...this.#pointsModel.points];
    // this.#sortPoints(this.#currentSortType);
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  // #handlePointChange = (updatedPoint) => {
  //   this.#tripPoints = [...updateItem(this.#tripPoints, updatedPoint)];
  //   // this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
  //   this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  // };

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  // #sortPoints(sortType) {
  //   switch (sortType) {
  //     case SortType.DAY:
  //       this.#tripPoints.sort(sortPointByDay);
  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      // case SortType.TIME:
      //   this.#tripPoints.sort(sortPointByTime);
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      // case SortType.PRICE:
      //   this.#tripPoints.sort(sortPointByPrice);
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
    // this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    // this.#sortPoints(sortType);
    // this.#clearPointList();
    // this.#renderPointList();

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  // #renderNoPoint() {
  //   render(this.#noPointComponent, this.#boardContainer);
  // }
  #clearBoard({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  // #renderPointList() {
  //   render(this.#listOfTrips, this.#boardContainer);
  //   this.#renderPoints();
  // }

  #renderNoPoint() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#boardContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      // listOfTrips: this.#listOfTrips.element,
      boardComponent: this.#boardComponent.element,
      pointsModel: this.#pointsModel,
      // onDataChange: this.#handlePointChange,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  // #renderPoints() {
  //   for (let i = 0; i < this.#tripPoints.length; i++) {
  //     this.#renderPoint(this.#tripPoints[i]);
  //   }
  // }

  // #clearPointList() {
  //   this.#pointPresenters.forEach((presenter) => presenter.destroy());
  //   this.#pointPresenters.clear();
  // }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderBoard() {
    // this.#renderPointList();
    render(this.#boardComponent, this.#boardContainer);
    const pointCount = this.points.length;
    const points = this.points.slice(0, pointCount);

    // if(this.#tripPoints.length === 0) {
    if(pointCount === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    render(this.#boardComponent, this.#boardContainer);
    this.#renderPoints(points);
  }
}


