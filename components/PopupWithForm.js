import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, submitHandler }) {
    super({ selector });
    this._submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputList = this._formElement.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const values = this._getInputValues();
      this._submitHandler(values);
    });
  }
}
