export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  get items() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(items)
    );
  }

  setItem(key, value) {
    const store = this.items;

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value,
            })
        )
    );
  }

  removeItem(key) {
    const store = this.items;

    delete store[key];

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(store)
    );
  }

  setExtraData(key, data) {
    this._storage.setItem(
        key,
        JSON.stringify(data)
    );
  }

  getExtraData(key) {
    try {
      return JSON.parse(this._storage.getItem(key)) || [];
    } catch (err) {
      return [];
    }
  }
}
