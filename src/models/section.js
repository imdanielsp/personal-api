export default class Section {
  constructor(title, category, ...objs) {
    this.title = title;
    this.category = category;
    this.objects = objs;
  }
}