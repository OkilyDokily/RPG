export class Store{
  constructor(){
    this.items= ["sword","shield","heart"];
    this.sword = {cost:5, weapon:2};
    this.shield = {cost: 5, defense:2};
    this.heart = {cost: 5, health: 1};
  }

  buyItem(character,item){
    if(character.gold >= this[item].cost){
      character.gold = character.gold - this[item].cost;
      character.items.push(item);
    }
  }
 
}