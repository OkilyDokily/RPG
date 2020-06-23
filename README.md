
# _RPG_

#### _This demonstrates knowledge of JavaScript and Jest._

#### By _**Matthew**_


## Description

_A page demonstrates basic ES6 and Jest knowledge_
_Page determines if soduku values are valid_

## Spec
| Spec                                                   | Input                            | Output                                                                                       |
|--------------------------------------------------------|----------------------------------|----------------------------------------------------------------------------------------------|
| create new Character                                   | new Character                    | Character{intelligence:20, strength: 20, health: 20,level:1,exppoints: 0,gold: 0, weapon: 3} |
| create a new item                                      | new Item                         | Item{strength: 5,}, Item{resilience: 10}                                                     |
| create an enemy                                        | new Enemy                        | Enemy{strength: 20: intelligence: 10, gold: 5, health: 10}                                   |
| create a function that adds items to character stats   | addItem                          | Character{strength: 20 + 5}                                                                  |
| automatically level up when exp points go up by 100,   | if (exppoints > level * 100)     | Character{exppoints: 101, level: 0 +1} increase health to 20 + 5 etc....                     |
| create a game Object                                   | new Game                         | Game {currentPlayer: "computer", gameSwitchTurn()}                                           |
| create a battle Object                                 | new Battle                       | Battle{}                                                                                     |
| if player wins battle extract gold from player         | ifWon()                          | Character{gold:0 + 5}                                                                        |
| create a battle system                                 |                                  |                                                                                              |
| roll die and whoever gets the higher value wins        | battle.RoleDie()                 | user and monster both roll a die if equal the monster wins                                   |
| decrease health according to monster or user hit value | battle.decreaseHealth(character) | Character{health: 20 - 3}                                                                    |
| create a Store Object                                  | new Store{}                      | Store {items:[club:15, shield: 24,sword: 27] }                                               |
| create a buy function on store objects                 | store.buy(club)                  | add club to users inventory                                                                  |

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