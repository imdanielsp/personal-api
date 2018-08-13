
export default class Profile {
  constructor(name, profilePic, title, about, email, resume, location,
    education, languages, links, website) {
    this.name = name;
    this.profilePic = profilePic;
    this.title = title;
    this.about = about;
    this.email = email;
    this.resume = resume;
    this.location = location;
    this.links = links;
    this.website = website;
    this.languages = languages;
    this.education = education;
  }
}
