import store from "./store";
import functional from "./functional.js";
const clonedeep = require('lodash/clonedeep');


let characterObj = { "store": store, "weaponIems": ["sword", "mace"], "shieldItems": ["shield", "steel shield"], "health": 20, "gold": 0, "XP": 0, "level": 1, "weapon": 3, "defense": 0, "items": [], "equipped": [] };

let { addFunction, storeState, changeState, replaceState } = functional();
let character = storeState(characterObj);

addCharacterFunctions(character);

function addCharacterFunctions(character) {
  character(addFunction(addExperiencePoints.bind(null, character), "addExperiencePoints"));
  character(addFunction(healthLevelUp.bind(null, character), "healthLevelUp"));
  character(addFunction(levelUp.bind(null, character), "levelUp"));
  character(addFunction(sellItem.bind(null, character), "sellItem"));
  character(addFunction(unequip.bind(null, character), "unequip"));
  character(addFunction(equipItem.bind(null, character), "equipItem"));
}

const addOnePoint = (x) => x + 1;

const addExperiencePointsFunc = changeState("XP", addOnePoint);


export function addExperiencePoints(character) {
  let result = character(addExperiencePointsFunc);
  if (result.XP >= (result.level * 100)) {
    this.levelUp();
  }
}

function addOnePointFunctionToArray(arr) {
  return arr.map(x => {
    return changeState(x, addOnePoint);
  });
};

function runFuncArray(arr, character) {
  arr.forEach(x => {
    character(x);
  });
}

function healthLevelUp(character) {
  let healthLevel = 10 + ((character().level - 1) * 5);
  let changeHealth = changeState("health", () => healthLevel);
  character(changeHealth);
}


function levelUp(character) {
  let funcArray = addOnePointFunctionToArray(["level", "weapon", "defense"]);
  runFuncArray(funcArray, character);
  this.healthLevelUp();
}

function sellItem(character, item) {
  let obj = clonedeep(character());
  obj.gold += obj.store()[item].cost;
  let index = obj.items.indexOf(item);
  obj.items.splice(index, 1);
  obj.store().items.push(item);
  character(replaceState(clonedeep(obj)));
}

function unequip(character, item) {
  let obj = clonedeep(character());
  if (obj.equipped.includes(item)) {
    obj.items.push(item);
    var index = obj.equipped.indexOf(item);
    obj.equipped.splice(index, 1);

    let keys = Object.keys(obj.store()[item]);
    obj[keys[1]] = obj[keys[1]] - obj.store()[item][keys[1]];
  }
  character(replaceState(clonedeep(obj)));
}

function equipItem(character, item) {
  let obj = clonedeep(character());
  if (obj.weaponItems.includes(item) && obj.equipped.some(item => obj.weaponItems.includes(item))) {
    return;
  }

  if (obj.shieldItems.includes(item) && obj.equipped.some(item => obj.shieldItems.includes(item))) {
    return;
  }

  if (obj.items.includes(item)) {
    obj.equipped.push(item);
    var index = obj.items.indexOf(item);
    obj.items.splice(index, 1);

    let keys = Object.keys(obj.store()[item]);
    obj[keys[1]] = obj[keys[1]] + obj.store()[item][keys[1]];
  }
  character(replaceState(clonedeep(obj)))
}


import { Store } from "./store";

export class Character {
  constructor() {
    this.store = new Store();
    //used to determine if item is already equipped.
    this.weaponItems = ["sword", "mace"];
    this.shieldItems = ["shield", "steel shield"];
    //player stats
    this.health = 20;
    this.gold = 0;
    this.XP = 0;
    this.level = 1;
    this.weapon = 3;
    this.defense = 0;
    this.items = [];
    this.equipped = [];
  }

  addExperiencePoints() {
    this.XP++;
    if (this.XP >= this.level * 100) {
      this.levelUp();
    }
  }

  equipItem(item) {
    if (this.weaponItems.includes(item) && this.equipped.some(item => this.weaponItems.includes(item))) {
      return;
    }

    if (this.shieldItems.includes(item) && this.equipped.some(item => this.shieldItems.includes(item))) {
      return;
    }

    if (this.items.includes(item)) {
      this.equipped.push(item);
      var index = this.items.indexOf(item);
      this.items.splice(index, 1);

      let keys = Object.keys(this.store[item]);
      this[keys[1]] = this[keys[1]] + this.store[item][keys[1]];
    }
  }

  unequip(item) {
    if (this.equipped.includes(item)) {
      this.items.push(item);
      var index = this.equipped.indexOf(item);
      this.equipped.splice(index, 1);

      let keys = Object.keys(this.store[item]);
      this[keys[1]] = this[keys[1]] - this.store[item][keys[1]];
    }
  }

  levelUp() {
    this.level++;
    this.weapon++;
    this.defense++;
    this.health = 20 + ((this.level - 1) * 5);
  }

  sellItem(item) {
    this.gold += this.store[item].cost;
    var index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.store.items.push(item);
  }
}


export default character;
