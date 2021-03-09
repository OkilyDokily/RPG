import functional from "./functional.js";

const clonedeep = require('lodash/clonedeep');

const obj = { "items": ["sword", "shield", "mace", "heart", "steelshield", "boxinggloves"], "sword": { cost: 5, weapon: 2 }, "boxinggloves": { cost: 3, weapon: 1 }, "mace": { cost: 10, weapon: 3 }, "shield": { cost: 5, defense: 2 }, "steelshield": { cost: 10, defense: 3 }, "heart": { cost: 5, health: 1 } };

let { addFunction, storeState, replaceState } = functional();



function addFunctionsToStore(store, character) {
  store(addFunction(buyItem.bind(null, store, character),"buyItem"));
}

export function makeStore(character){
  let store = storeState(obj);
  addFunctionsToStore(store, character);
  return store;
}


function buyItem(store, character, item) {
  let storeObj = clonedeep(store());
  let characterObj = clonedeep(character());
  if (storeObj.items.includes(item) && ((characterObj.items.length + characterObj.equipped.length) < 4)) {
    if (characterObj.gold >= storeObj[item].cost) {
      characterObj.gold = characterObj.gold - storeObj[item].cost;
      if (!(item === "heart")) {
        characterObj.items.push(item);
        var index = storeObj.items.indexOf(item);
        storeObj.items.splice(index, 1);
      }
      else {
        //automatically apply hearts rather than equip them
        characterObj.health++;
      }
    }
  }
  store(replaceState(clonedeep(storeObj)));
  character(replaceState(clonedeep(characterObj)));
}

export class Store {
  constructor() {
    this.items = ["sword", "shield", "mace", "heart", "steelshield", "boxinggloves"];
    this.sword = { cost: 5, weapon: 2 };
    this.boxinggloves = { cost: 3, weapon: 1 };
    this.mace = { cost: 10, weapon: 3 };
    this.shield = { cost: 5, defense: 2 };
    this.steelshield = { cost: 10, defense: 3 };
    this.heart = { cost: 5, health: 1 };
  }

  buyItem(character, item) {
    if (this.items.includes(item) && ((character.items.length + character.equipped.length) < 4)) {
      if (character.gold >= this[item].cost) {
        character.gold = character.gold - this[item].cost;
        if (!(item === "heart")) {
          character.items.push(item);
          var index = this.items.indexOf(item);
          this.items.splice(index, 1);
        }
        else {
          //automatically apply hearts rather than equip them
          character.health++;
        }
      }
    }
  }
}

