import { Store } from "./store";

export class Character {
  constructor(){
    //used to determine item is already equipped.
    this.weaponItems = ["sword","mace"];
    this.shieldItems = ["shield"];
    
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
    if(this.weaponItems.includes(item) && this.equipped.some(item => this.weaponItems.includes(item)) ){
      return;
    }


    if(this.items.includes(item)){
      this.equipped.push(item);
      var index = this.items.indexOf(item);
      this.items.splice(index, 1);

      let store = new Store();
      let keys = Object.keys(store[item]);
      this[keys[1]] = this[keys[1]] + store[item][keys[1]];
    }
  }

  unequip(item){
    if(this.equipped.includes(item)){
      this.items.push(item);
      var index = this.equipped.indexOf(item);
      this.equipped.splice(index, 1);

      let store = new Store();
      let keys = Object.keys(store[item]);
      this[keys[1]] = this[keys[1]] - store[item][keys[1]];
    }
  }

  levelUp(){
    this.level++;
    this.weapon++;
    this.defense++;
    this.health = 20 + ((this.level - 1) * 5)
  }
}

