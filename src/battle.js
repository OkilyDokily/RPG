import {replaceState,addExperiencePoints,clonedeep} from "./character.js"

export class Battle{
  constructor(){

  }
  rollDie(){
    return {character: Math.floor (6 * Math.random()),enemy: Math.floor (6 * Math.random())}
  }
  extractGoldFromEnemy(character,enemy){
    let characterObj = clonedeep(character());
    characterObj.gold += enemy().gold;
    character(replaceState(clonedeep(characterObj)))
  }
  subtractEnemyHealth(character, enemy){
    let enemyObj = clonedeep(enemy());
    enemy.health = enemy.health - character.weapon;
    enemy(replaceState(clonedeep(enemyObj)))
  }
  subtractCharacterHealth(character,enemy){
    let characterObj = clonedeep(character());
    let enemyAttack = enemy().weapon - character().defense;
    if (enemyAttack < 0){
      enemyAttack = 0;
    }
    characterObj.health = characterObj.health - enemyAttack;
    character(replaceState(clonedeep(characterObj)));
  }

  attack(attacker,character,enemy){
    if(attacker === "character"){
      this.subtractEnemyHealth(character,enemy);
    }
    else{
      this.subtractCharacterHealth(character,enemy);
    }
    addExperiencePoints(character);
  }
  
  whoWinsAttack(){
    let roll = this.rollDie();
    if(roll.enemy >= roll.character){
       return "enemy";
    }
    else{
       return "character";
    }
  }

  hasCharacterDied(character){
    if (character().health <= 0){
      return true;
    }
    return false;
  }

  hasEnemyDied(enemy){
    if (enemy().health <= 0){
      return true;
    }
    return false;
  }

  extractGoldFromEnemyIfEnemyIsDead(character,enemy){
    if(this.hasEnemyDied(enemy)){
      this.extractGoldFromEnemy(character,enemy);
    }
  }

  determineIfBattleHasEnded(character,enemy){
    return this.hasEnemyDied(enemy) || this.hasCharacterDied(character)
  }

  startBattle(character,enemy){
    while(!this.determineIfBattleHasEnded(character,enemy)){
      let winner = this.whoWinsAttack(character,enemy);
      this.attack(winner,character,enemy);
    }
    if(this.hasCharacterDied(character)){
      return "game over";
    }
    this.extractGoldFromEnemyIfEnemyIsDead(character,enemy);
    return "You won this battle."
  }
} 