export class Store{
  constructor(){
    this.items= ["sword","shield","mace","heart"];
    this.sword = {cost:5, weapon:2};
    this.mace = {cost:10, weapon:3};
    this.shield = {cost: 5, defense:2};
    this.heart = {cost: 5, health: 1};
  }

  buyItem(character,item){
    if(this.items.includes(item)){
      if(character.gold >= this[item].cost){
        character.gold = character.gold - this[item].cost;
        if(!(item === "heart")){
          character.items.push(item);
          var index = this.items.indexOf(item);
          this.items.splice(index, 1);
          
      
        }
        else{
        //automatically apply hearts rather than equip them
        character.health++;
        }
      }
    }
  }
 
}