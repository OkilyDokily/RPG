import functional from "./functional.js";



const storeState = functional().storeState;


export function makeEnemy()
{
  const enemy = storeState({ "gold": 5, "weapon": 3, "health": 5 });
  return enemy;
}


export class Enemy{
  constructor(){
    this.gold = 5;
    this.weapon = 3;
    this.health = 5;
  }
}

