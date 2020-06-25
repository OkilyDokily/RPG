import {Character} from '../src/character.js'
import {Enemy} from '../src/enemy.js'
import {Battle} from '../src/battle.js'
import {Store} from '../src/store.js'



describe('Store', () => {
  test('should correctly create a store object', () => {
    const store = new Store();
    expect(store.sword).toEqual({cost:5, weapon:2});
    expect(store.shield).toEqual({cost: 5, defense:2});
    expect(store.heart).toEqual({cost: 5, health: 1});
    expect(store.items).toEqual(["sword","shield","heart"]); 
  });

  test('store should let character buy item', () => {
    const store = new Store();
    const character = new Character();
    character.gold = 5;
    store.buyItem(character,"sword");
    const characterHasItem = character.items.includes("sword")
    expect(characterHasItem).toEqual(true);
  });

  test('can not buy item that is already owned', () => {
    const store = new Store();
    const character = new Character();
    character.gold = 10;

    store.buyItem(character,"sword");
    store.buyItem(character,"sword");
    let length = character.items.filter(item => item == "sword").length
    expect(store.items.length).toEqual(2);
    expect(length).toEqual(1);
  });  

  test('automatically apply hearts rather than equip them', () => {
    const store = new Store();
    const character = new Character();
    character.gold = 5;
    store.buyItem(character,"heart");
    expect(character.health).toEqual(21);
  });  
});

describe('Character', () => {
  test('should correctly create a character object', () => {
    const character = new Character();
    expect(character.health).toEqual(20);
    expect(character.gold).toEqual(0);
    expect(character.level).toEqual(1);
    expect(character.XP).toEqual(0);
    expect(character.weapon).toEqual(3);
  });

  test('automatically level up when experience points reach or exceed a multiple of 100', () => {
    const character = new Character();
    for(let i = 1; i <= 200;i++){
      character.addExperiencePoints()
    }
    expect(character.level).toEqual(3);
    expect(character.weapon).toEqual(5);
    expect(character.health).toEqual(30);
    expect(character.defense).toEqual(2)
  });

  test('let character equip attack item', () => {
    const character = new Character();
    character.items.push("sword");
    character.equipItem("sword");
    expect(character.weapon).toEqual(5)
  });

  test('let character equip defense item', () => {
    const character = new Character();
    character.items.push("shield");
    character.equipItem("shield");
    expect(character.defense).toEqual(2)
  });

  test('prevent character from equipping an already equipped item', () => {
    const character = new Character();
    character.items.push("shield");
    character.equipItem("shield");
    character.equipItem("shield");
    expect(character.equipped.length).toEqual(1);
    expect(character.defense).toEqual(2);
  });

  test('let character unequip an item', () => {
    const character = new Character();
    character.items.push("shield");
    character.equipItem("shield");
    character.unequip("shield")
    expect(character.defense).toEqual(0);
    expect(character.equipped.length).toEqual(0);
    expect(character.items.length).toEqual(1);
  });

});


describe('Enemy', () => {
  test('should correctly create an Enemy object', () => {
    const enemy = new Enemy();
   
    expect(enemy.health).toEqual(5);
    expect(enemy.gold).toEqual(5);
    expect(enemy.weapon).toEqual(3);  
  });
});

describe('Battle', () => {
  test('roll dice should return two values', () => {
    const battle = new Battle();
    const roll = battle.rollDie();
    expect(roll.character).toBeGreaterThanOrEqual(0);
    expect(roll.character).toBeLessThanOrEqual(6);
    expect(roll.enemy).toBeGreaterThanOrEqual(0);
    expect(roll.enemy).toBeLessThanOrEqual(6);
  });
  test('character should gain enemies gold', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    battle.extractGoldFromEnemy(character, enemy);
    expect(character.gold).toEqual(5);
  });
  test('subtract enemy health', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    battle.subtractEnemyHealth(character, enemy);
    expect(enemy.health).toEqual(2);
  });
  test('subtract character health', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    battle.subtractCharacterHealth(character, enemy);
    expect(character.health).toEqual(17);
  });

  test('apply defense to health when attacked', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    character.defense = 1;
    battle.subtractCharacterHealth(character, enemy);
    expect(character.health).toEqual(18);
  });

  test('determine who wins attack', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    let winner = battle.whoWinsAttack(character, enemy);
    expect(winner).toMatch(/(character)|(enemy)/);
  });
  test('attack with winner of attack', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    let winner = battle.whoWinsAttack(character, enemy);
    battle.attack(winner,character,enemy)
    if(winner === "character"){
      expect(enemy.health).toEqual(2);
    }
    else{
      expect(character.health).toEqual(17);
    }  
  });

  test('determine if enemy has died', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    battle.attack("character",character,enemy);
    battle.attack("character",character,enemy);
    const enemyDied = battle.hasEnemyDied(enemy);
    expect(enemyDied).toEqual(true);
  });

  test('determine if character has died', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    const characterDied = battle.hasCharacterDied(character);
    expect(characterDied).toEqual(true);
  });

  test('extract gold from character if enemy has died', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    battle.attack("character",character,enemy);
    battle.attack("character",character,enemy);
    battle.extractGoldFromEnemyIfEnemyIsDead(character,enemy);
    expect(character.gold).toEqual(5);
  });

  test('determine if battle has ended when character wins', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    battle.attack("character",character,enemy);
    battle.attack("character",character,enemy);
    const battleEnded = battle.determineIfBattleHasEnded(character,enemy);
    expect(battleEnded).toEqual(true);
  });

  test('determine if battle has ended when enemy wins', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    const battleEnded = battle.determineIfBattleHasEnded(character,enemy);
    expect(battleEnded).toEqual(true);
  });

  test('determine results of a startbattle method', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    const battleResult = battle.startBattle(character, enemy);
    expect(battleResult).toMatch(/(game over)|(You won this battle.)/);
  });

  test('add experience points after each attack', () => {
    const battle = new Battle();
    const enemy = new Enemy();
    const character = new Character();
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("enemy",character,enemy);
    battle.attack("character",character,enemy);
    battle.attack("character",character,enemy);
    battle.attack("character",character,enemy);
    
    expect(character.XP).toEqual(7);
  });

 

});

