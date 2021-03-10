
import functional from "./functional.js";
export const clonedeep = require('lodash/clonedeep');

let { addFunction, storeState, replaceState } = functional();

export function makeBattle(character,enemy){
  const battle = storeState();
  addBattleFunction(battle,character, enemy);
  return battle;
}


function addBattleFunction(battle,character, enemy) {
  battle(addFunction(rollDie,"rollDie"));
  battle(addFunction(extractGoldFromEnemy.bind(null, character, enemy),"extractGoldFromEnemy"));
  battle(addFunction(subtractEnemyHealth.bind(null, character, enemy),"subtractEnemyHealth"));
  battle(addFunction(subtractCharacterHealth.bind(null, character, enemy),"subtractCharacterHealth"));
  battle(addFunction(attack.bind(null,battle,character),"attack"));
  battle(addFunction(whoWinsAttack,"whoWinsAttack"));
  battle(addFunction(hasCharacterDied.bind(null,character),"hasCharacterDied"));
  battle(addFunction(hasEnemyDied.bind(null, enemy),"hasEnemyDied"));
  battle(addFunction(extractGoldFromEnemyIfEnemyIsDead,"extractGoldFromEnemyIfEnemyIsDead"));
  battle(addFunction(determineIfBattleHasEnded,"determineIfBattleHasEnded"));
  battle(addFunction(startBattle,"startBattle"));
}

function rollDie() {
  return ({ character: Math.floor(6 * Math.random()), enemy: Math.floor(6 * Math.random()) });
}
function extractGoldFromEnemy(character, enemy) {
  let characterObj = clonedeep(character());
  characterObj.gold += enemy().gold;
  character(replaceState(clonedeep(characterObj)));
}
function subtractEnemyHealth(character, enemy) {
  let enemyObj = clonedeep(enemy());
  enemyObj.health = enemyObj.health - character().weapon;
  enemy(replaceState(clonedeep(enemyObj)));
}
function subtractCharacterHealth(character, enemy) {
  let characterObj = clonedeep(character());
  let enemyAttack = enemy().weapon - characterObj.defense;
  if (enemyAttack < 0) {
    enemyAttack = 0;
  }
  characterObj.health = characterObj.health - enemyAttack;
  character(replaceState(clonedeep(characterObj)));
}

function attack(battle,character, winner) {
  if (winner === "character") {
    battle().subtractEnemyHealth();
  }
  else {
    battle().subtractCharacterHealth();
  }
  character().addExperiencePoints();
}

function whoWinsAttack() {
  let roll = this.rollDie();
  if (roll.enemy >= roll.character) {
    return "enemy";
  }
  else {
    return "character";
  }
}

function hasCharacterDied(character) {
  if (character().health <= 0) {
    return true;
  }
  return false;
}

function hasEnemyDied(enemy) {
  if (enemy().health <= 0) {
    return true;
  }
  return false;
}

function extractGoldFromEnemyIfEnemyIsDead() {
  if (this.hasEnemyDied()) {
    this.extractGoldFromEnemy();
  }
}

function determineIfBattleHasEnded() {
  return this.hasEnemyDied() || this.hasCharacterDied();
}

function startBattle() {
  while (!this.determineIfBattleHasEnded()) {
    let winner = this.whoWinsAttack();
    this.attack(winner);
  }
  if (this.hasCharacterDied()) {
    return "game over";
  }
  this.extractGoldFromEnemyIfEnemyIsDead();
  return "You won this battle.";
}


export class Battle {
  constructor() {

  }
  rollDie() {
    return { character: Math.floor(6 * Math.random()), enemy: Math.floor(6 * Math.random()) }
  }
  extractGoldFromEnemy(character, enemy) {
    character.gold += enemy.gold;
  }
  subtractEnemyHealth(character, enemy) {
    enemy.health = enemy.health - character.weapon;
  }
  subtractCharacterHealth(character, enemy) {
    let enemyAttack = enemy.weapon - character.defense;
    if (enemyAttack < 0) {
      enemyAttack = 0;
    }
    character.health = character.health - enemyAttack;
  }

  attack(attacker, character, enemy) {
    if (attacker === "character") {
      this.subtractEnemyHealth(character, enemy);
    }
    else {
      this.subtractCharacterHealth(character, enemy);
    }
    character.addExperiencePoints()
  }

  whoWinsAttack() {
    let roll = this.rollDie();
    if (roll.enemy >= roll.character) {
      return "enemy";
    }
    else {
      return "character";
    }
  }

  hasCharacterDied(character) {
    if (character.health <= 0) {
      return true;
    }
    return false;
  }

  hasEnemyDied(enemy) {
    if (enemy.health <= 0) {
      return true;
    }
    return false;
  }

  extractGoldFromEnemyIfEnemyIsDead(character, enemy) {
    if (this.hasEnemyDied(enemy)) {
      this.extractGoldFromEnemy(character, enemy);
    }
  }

  determineIfBattleHasEnded(character, enemy) {
    return this.hasEnemyDied(enemy) || this.hasCharacterDied(character)
  }

  startBattle(character, enemy) {
    while (!this.determineIfBattleHasEnded(character, enemy)) {
      let winner = this.whoWinsAttack(character, enemy);
      this.attack(winner, character, enemy);
    }
    if (this.hasCharacterDied(character)) {
      return "game over"
    }
    this.extractGoldFromEnemyIfEnemyIsDead(character, enemy);
    return "You won this battle."
  }
}