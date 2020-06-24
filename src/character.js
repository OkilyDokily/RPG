export class Character {
  constructor(){
    this.health = 20;
    this.gold = 0;
    this.XP = 0;
    this.level = 1;
    this.weapon = 3;
    this.defense = 0;
    this.items =[];
  }

  addExperiencePoints(){
    this.XP++;
    if(this.XP >= this.level * 100){
      this.level++;
    }
  }
}

