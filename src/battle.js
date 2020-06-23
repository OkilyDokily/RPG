export class Battle{
  constructor(){

  }
  rollDie(){
    return {character: Math.floor (6 * Math.random()),enemy: Math.floor (6 * Math.random())}
  }
  extractGoldFromEnemy(character,enemy){
    character.gold += enemy.gold;
  }
  subtractEnemyHealth(){

  }
  subtractCharacterHealth(){

  }
  

} 