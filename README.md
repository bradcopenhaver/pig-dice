# Pig Dice

#### Pig Dice is a game of luck and intrigue where players roll a die until they get a one or choose to stop and bank their total. First player to bank 100 points wins. {November 2016}

#### By _**{Brad Copenhaver and Jonathan Thom}**_

## Description

Specifications

* Display a random number between 1 and 6.
 * Input: "Roll"
 * Output: 4

* Add the number from each roll to a total.
 * Input: 4, 2, 5
 * Output: 11

* If 1 is rolled, reset total to 0 and end turn.
  * Input: 4, 2, 5, 1
  * Output: 0

* End turn manually and add "turn total" to bank.
  * Input: 4, 2, 5, stop
  * Output: 11 = 11

* Switch to another player and keep a separate bank.
 * Input: player 1 stops at 11
 * Output: player 2 starts at 0

* End game when one player's bank reaches 100.
 * Input: player 2 bank = 101
 * Output: Congratulations player 2!

## Setup/Installation Requirements

Source code available at _repository_

## Known Bugs

win state does not trigger when computer wins

turnTotal does not display on second roll on computer's turn.

## Support and contact details

Contact one of the authors at: bradcopenhaver@gmail.com or jonathan.thom1990@gmail.com

## Technologies Used

* jquery
* Bootstrap
* javascript
* html/css

### License

This project is licensed under the MIT license.

Copyright (c) 2016 **_{Brad Copenhaver, Jonathan Thom}_**
