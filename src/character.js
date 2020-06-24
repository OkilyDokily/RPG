export class Character {
  constructor(){
    this.health = 20;
    this.gold = 0;
    this.XP = 0;
    this.level = 1;
    this.weapon = 3;
  }

  addExperiencePoints(){
    this.XP++;
  }
}

