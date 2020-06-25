export class Battle{
  constructor(){

  }
  rollDie(){
    return {character: Math.floor (6 * Math.random()),enemy: Math.floor (6 * Math.random())}
  }
  extractGoldFromEnemy(character,enemy){
    character.gold += enemy.gold;
  }
  subtractEnemyHealth(character, enemy){
    enemy.health = enemy.health - character.weapon;
  }
  subtractCharacterHealth(character,enemy){
    let enemyAttack = enemy.weapon - character.defense;
    if (enemyAttack < 0){
      enemyAttack = 0;
    }
    character.health = character.health - enemyAttack;
  }

  attack(attacker,character,enemy){
    if(attacker === "character"){
      this.subtractEnemyHealth(character,enemy);
    }
    else{
      this.subtractCharacterHealth(character,enemy);
    }
    character.addExperiencePoints()
  }
  
  whoWinsAttack(character,enemy){
    let roll = this.rollDie();
    if(roll.enemy >= roll.character){
       return "enemy";
    }
    else{
       return "character";
    }
  }

  hasCharacterDied(character){
    if (character.health <= 0){
      return true;
    }
    return false;
  }

  hasEnemyDied(enemy){
    if (enemy.health <= 0){
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
      return "game over"
    }
    this.extractGoldFromEnemyIfEnemyIsDead(character,enemy);
    return "You won this battle."
  }
} 