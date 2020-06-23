import {Character} from '../src/character.js'
import {Enemy} from '../src/enemy.js'
import {Battle} from '../src/battle.js'

describe('Character', () => {
  test('should correctly create a character object', () => {
    const character = new Character();
   
    expect(character.health).toEqual(20);
    expect(character.gold).toEqual(0);
    expect(character.level).toEqual(1);
    expect(character.XP).toEqual(0);
    expect(character.weapon).toEqual(3);
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
});

