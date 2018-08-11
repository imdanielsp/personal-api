export default class Skill {
  static knowledgeMap(){
    return {
      1: "Beginner",
      2: "Beginner",
      3: "Beginner",
      4: "Intermidate",
      5: "Intermidate",
      6: "Fluent",
      7: "Fluent",
      8: "Pro",
      9: "Alien",
      10: "God"
    }
  }

  /**
   * 
   * @param {String} name
   * @param {Integer} knowledge an integer from 1 to 10
   */
  constructor(name, knowledge) {
    this.name = name;
    this.knowledge = knowledge;
    this.text = "OOTW"; // Out of this world :) 

    if (knowledge > 0 && knowledge <= 10) {
      this.text = Skill.knowledgeMap[knowledge];
    }
  }

  get knowledgePercentage() {
    return this.knowledge / 10;
  }
}
