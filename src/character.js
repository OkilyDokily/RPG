import { Store } from "./store";

export class Character {
  constructor(){
    this.health = 20;
    this.gold = 0;
    this.XP = 0;
    this.level = 1;
    this.weapon = 3;
    this.defense = 0;
    this.items = [];
    this.equipped = [];
  }

  addExperiencePoints(){
    this.XP++;
    if(this.XP >= this.level * 100){
      this.levelUp();
    }
  }

  equipItem(item){
    if(this.items.includes(item)){
      this.equipped.push(item);
    }
    let store = new Store();
    let keys = Object.keys(store[item]);
    this[keys[1]] = this[keys[1]] + store[item][keys[1]];
  }

  levelUp(){
    this.level++;
    this.weapon++;
    this.defense++;
    this.health = 20 + ((this.level - 1) * 5)
  }
}

