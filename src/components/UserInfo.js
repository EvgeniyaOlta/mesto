export class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  } 

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._name.textContent;
    this._userInfo.description = this._description.textContent;
    this._userInfo.avatar = this._avatar.src;
    return this._userInfo;
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._description.textContent = about
  }

  setAvatar(avatar) {
    this._avatar.src = avatar;
  }
}