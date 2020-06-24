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
    character.health = character.health - enemy.weapon;
  }

  attack(attacker,character,enemy){
    if(attacker === "character"){
      this.subtractEnemyHealth(character,enemy);
    }
    else{
      this.subtractCharacterHealth(character,enemy);
    }
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


} 