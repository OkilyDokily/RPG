import {Character} from '../src/character.js'


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