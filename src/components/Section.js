class Section {
  constructor(
    data, htmlSelector) {
    this.items = data.items
    this.htmlSelector = htmlSelector
    this.renderer = data.renderer
    this.renderer(data.initialCards, this.htmlSelector)
  }

  addItem(item) {
    console.log(item)
    console.log('addingItem')
    document.querySelector(this.htmlSelector).prepend(item)
  }
}

export { Section }
