import InfoView from '../view/info';
import PriceView from '../view/price';
import SortView from '../view/sort';
import NoPointView from '../view/no-point';
import TripListView from '../view/trip-list';
import PointPresenter from '../presenter/point';
import {getUpdatedPoints} from '../utils/common';
import {render, RenderPosition} from '../utils/render';
import {SortType} from '../const';
import {sortPriceDown, sortTimeDown} from '../utils/sort';

export default class Trip {
  constructor(tripContentContainer) {
    this._tripContentContainer = tripContentContainer;
    this._pointPresenter = {};

    this._tripListComponent = new TripListView();
    this._sortComponent = new SortView();
    this._noPointComponent = new NoPointView();

    this._onPointChange = this._onPointChange.bind(this);
    this._onModeChange = this._onModeChange.bind(this);
    this._onSortTypeClick = this._onSortTypeClick.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();

    if (points.length) {
      this._renderInfo(points);
      this._renderPrice(points);
      this._renderSort();
      this._renderTripList();
    } else {
      this._renderNoPoint();
    }
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE_DOWN:
        this._points.sort(sortPriceDown);
        break;
      case SortType.TIME_DOWN:
        this._points.sort(sortTimeDown);
        break;
      default: this._points = this._sourcedPoints.slice();
    }
    this._currentSortType = sortType;
  }

  _onSortTypeClick(sortType) {
    this._sortPoints(sortType);
    this._clearTripList();
    this._renderTripList();
  }

  _onModeChange() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.resetView());
  }

  _onPointChange(updatedPoint) {
    this._points = getUpdatedPoints(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._tripListComponent, this._onPointChange, this._onModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderSort() {
    render(this._tripContentContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeClickHandler(this._onSortTypeClick);
  }

  _renderPrice(points) {
    this._priceComponent = new PriceView(points);
    render(this._infoComponent, this._priceComponent, RenderPosition.BEFOREEND);
  }

  _renderInfo(points) {
    const tripMainElement = document.querySelector(`.trip-main`);
    this._infoComponent = new InfoView(points);
    render(tripMainElement, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoint() {
    render(this._tripContentContainer, this._noPointComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripList() {
    render(this._tripContentContainer, this._tripListComponent, RenderPosition.BEFOREEND);
    this._points.forEach((point) => this._renderPoint(point));
  }

  _clearTripList() {
    Object.values(this._pointPresenter).forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }
}
