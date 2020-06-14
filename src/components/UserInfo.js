'use strict';

export class UserInfo {
    constructor({nameSelector, descriptionSelector}) {
      this._name = document.querySelector(nameSelector);
      this._description = document.querySelector(descriptionSelector);
    }
  
    getUserInfo() {
      this._userInfo = {};
      this._userInfo.name = this._name.textContent;
      this._userInfo.description = this._description.textContent;
      return this._userInfo;
    }
  
    setUserInfo({name, description}) {
      this._name.textContent = name;
      this._description.textContent = description;
    }
  }