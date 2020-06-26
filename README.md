
# _RPG_

#### _This demonstrates knowledge of JavaScript and Jest._

#### By _**Matthew**_


## Description

_A page demonstrates basic ES6 and Jest knowledge_
_Page determines if soduku values are valid_

## Spec
 | Spec                                                              | Input                                             | Output                                                                   |
|-------------------------------------------------------------------|---------------------------------------------------|--------------------------------------------------------------------------|
| create new Character                                              | new Character                                     | Character{health: 20,level:1,exppoints: 0,gold: 0, weapon: 3}            |
| create an enemy                                                   | new Enemy                                         | Enemy{ gold: 5, health: 10}                                              |
| add experience points after each attack                           | battle.attack                                     | Character{XP:0 + 1}                                                      |
| automatically level up when exp points go up by 100,              | if (exppoints > level * 100)                      | Character{exppoints: 101, level: 0 +1} increase health to 20 + 5 etc.... |
| create a battle Object                                            | new Battle                                        | Battle{}                                                                 |
| determine if player has won battle                                |                                                   |                                                                          |
| if player wins battle extract gold from player                    | ifWon()                                           | Character{gold:0 + 5}                                                    |
| create a battle system                                            |                                                   |                                                                          |
| roll die and whoever gets the higher value wins                   | battle.RollDie()                                  | user and monster both roll a die if equal the monster wins               |
| decrease health according to monster or user hit value            | battle.decreaseHealth(character)                  | Character{health: 20 - 3}                                                |
| apply defense to enemy hit value                                  | battle.decreaseCharacterHealth                    | Character{health: 20 - (3 - defense value)}                              |
| create a Store Object                                             | new Store{}                                       | Store {items:[club:15, shield: 24,sword: 27] }                           |
| create a buy function on store objects                            | store.buy(club)                                   | add club to users inventory                                              |
| let character equip item bought from store                        | character.equip("item")                           | apply boosts from equipped item.                                         |
| let hearts be applied immediately without being equipped          | store.buy(heart)                                  | Character{health: ++}                                                    |
| prevent character from buying item already owned                  | store.buy("sword")                                | nothing happens if already owned.                                        |
| prevent character from equipping an item that is already equipped | character.equip("sword")                          | nothing happens if already equipped.                                     |
| allow character to unequip an item                                | character.unequip("sword")                        | add sword back to items and unapply boosts                               |
| prevent user from equipping more than one attack item             | character.equip("shield") character.equip("mace") | prevent from occuring                                                    |
| limit number of items a character can have to 4.                  | character trys to buy 5 times                     | wont let him/her buy the last time                                       |
| let character sell items back to store                            | character.sell(item)                              | lose item and gain gold                                                  |                                      
## Setup/Installation Requirements

Install node and npm. Clone/download the repo and type 'npm install' inside of a terminal windows in the same directory is the the cloned repo.

## Known Bugs

_I don't think there are any bugs but please tell me if you see any._

## Support and contact details

_Open a Github issue if you see a problem or have questions_

## Technologies Used

_This is an html, css, Bootstrap, jQuery, Jest, Webpack, and ES6 thing._

### License

*Feel free to use this code as you please*

Copyright (c) 2020 **_Matthew_**
