import { Store } from "./store";

let characterObj = {"weaponIems":["sword","mace"],"shieldItems":["shield","steel shield"], "health": 20, "gold": 0, "XP": 0, "level": 1, "weapon": 3, "defense": 0, "items": [], "equipped": [] }


function storeState(obj = {}) {
  let state = obj;
  return function (modifyState) {
    let newState = { ...state };
    state = modifyState(newState);
    return newState
  }
}

let character = storeState(characterObj);

function changeState(prop, func)
{
  return function (state) {
    let obj = { ...state }
    state[prop] = func(state[prop] || 0);
    return obj;
  }
}

function changeState2(func, prop) {
  return function (state) {
    let obj = { ...state }
    state[prop] = func(state[prop] || 0);
    return obj;
  }
}

export function replaceState(state)
{
  return function (newState)
  {
    return state;
  }
}


const addOnePoint = (x) => x + 1;

const addExperiencePointsFunc = changeState("XP",addOnePoint);


function addExperiencePoints(character)
{
  let result = character(addExperiencePoints);
  if(result.XP >= (result.level * 100))
  {
    levelUp(character);
  }
}

function addOnePointFunctionToArray(arr)
{
 return arr.map(x =>
    {
      return changeState(x,addOnePoint);
    })
}

function runFuncArray(arr,character)
{
  arr.forEach(x => {
    character(x);    
  });
}

function healthLevelUp(character)
{
  let healthLevel = 10 + ((character().level - 1) * 5);
  let changeHealth = changeState("health",(x) => x = healthLevel);
  character(changeHealth);
}


function levelUp(character)
{
  let funcArray = addOnePointFunctionToArray(["level","weapon","defense"]);
  runFuncArray(funcArray,character);
  healthLevelUp(character);
}

function sellItem(character,item) {
  let obj = character();
  obj.gold += obj.store[item].cost;
  let index = obj.items.indexOf(item);
  obj.items.splice(index, 1);
  obj.store.items.push(item);
  character(replaceState({...obj}));
}

function unequip(character, item) {
  let obj = character();
  if (obj.equipped.includes(item)) {
    obj.items.push(item);
    var index = obj.equipped.indexOf(item);
    obj.equipped.splice(index, 1);

    let keys = Object.keys(obj.store[item]);
    obj[keys[1]] = obj[keys[1]] - obj.store[item][keys[1]];
  }
  character(replaceState({...obj}))
}

function equipItem(character,item) {
  let obj = character();
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

    let keys = Object.keys(obj.store[item]);
    obj[keys[1]] = obj[keys[1]] + obj.store[item][keys[1]];
  }
  character(replaceState({...obj}))
}


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
    this.health = 20 + ((this.level - 1) * 5)
  }

  sellItem(item) {
    this.gold += this.store[item].cost;
    var index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.store.items.push(item);
  }
}

