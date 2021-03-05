import {storeState} from "./character.js"


export const enemy = storeState({ "gold": 5, "weapon": 3, "health": 5 });

export class Enemy{
  constructor(){
    this.gold = 5;
    this.weapon = 3;
    this.health = 5;
  }
}