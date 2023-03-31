class UserInfo {
  constructor(userNameSelector, userProfessionSelector, userAvatarSelector, api) {
    this.userNameSelector = userNameSelector
    this.userProfessionSelector = userProfessionSelector
    this.userAvatarSelector = userAvatarSelector
    this.api = api
    this.getUserInfo().then(data => {
      this.showUserData(data)
    })
  }

  showUserData(userInfoObject) {
    if (userInfoObject.name) document.querySelector(this.userNameSelector).textContent = userInfoObject.name
    if (userInfoObject.about) document.querySelector(this.userProfessionSelector).textContent = userInfoObject.about
    if (userInfoObject.avatar) document.querySelector(this.userAvatarSelector).src = userInfoObject.avatar
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.api.getUserData().then(data => {
        resolve(data)
      }).catch(error => {
        console.log(error)
      })
    })
  }

  setUserInfo(data) {
    return new Promise((resolve, reject) => {
      this.api.saveProfileData(data.name, data.about).then(resp => {
        if (resp.name && resp.about) this.showUserData({
          name: resp.name,
          about: resp.about
        })
      })
      resolve("done")
    }).catch(error => {
      reject(error)
    })
  }

  setAvatar(link) {
    return new Promise((resolve, reject) => {
      this.api.changeAvatar(link).then(resp => {
        document.querySelector(this.userAvatarSelector).src = link
        resolve('done')
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export {
  UserInfo
}
