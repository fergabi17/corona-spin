# Corona Spin

This game is an adaptation of the tradicional slot-machine games with a corona virus tematic. In Corona Spin, each slot is considered to be an action. The order of these actions is very importat to the final score of the game.

The website has three sections: How to play, New game and Leaderboard. 
In the how to play section you can find an explanation for the main idea of the game, as well as information about your initial score and how to multiply your bet. This section also shows the function of each action that can appear in the game.

In the New game tab is where we can find the slot machine. In here, there are three slots that will change after each spin. Each spin has a cost of 2 points, but this can be multiplied by the bet multiplier buttons. The slot machine shows 2 scores: the one at the left shows the result of the last spin, and the one on the right the player's score. At the bottom, you can also find 2 more buttons: restart and put this score on the leaderboard. The restart button will refresh the page, and you start your game from the beginning. If you chose to put your score on the leaderboard, the game will end and you will be redirected to the leaderboard page, which will have your name and score added.

The leaderboard section is a local scoreboard that uses the local storage to rank the results of the games played on that browser. If no game was played, it only shows some fantasy initial score information.
 
## UX

![1](resources/ux/responsive.png)


### PROJECT IDEA: Corona Spin Game
The users of this website are gamers, curious about casino games or simply people in quarentine. 

### STRATEGY PLANE

This is a typical slot machine game we can find in regular casinos. The main difference is that it uses themes related to the COVID-19 pandemic and the combinations can save or kill the player. This will be set in a fun way to remind players of the daily precautions we need to take to avoid the virus spread. 

Users with some free time in this time of pandemic can spend some time to see if they are lucky, have some fun as we reinforce the measures to be taken during these hard times.

Basic website objectives:
- Reinforce good actions about the pandemic in a fun way
- Attract younger people to talk about social responsibility
- Bring amusement
- Give the opportunity to curious people to see how a slot machine works

User needs:
- People in quarentine get bored and look for entertainment
- People in quarentine get extra time and look for time killers
- Gamers interested in a new way of playing with a slot machine
- Parents looking to bring the COVID-19 social information for their children
- Curious people that would like to know how to play in a slot machine

### SCOPE PLANE

Functions:
- Spinning slot machine with 3 slots
- Matching one of the possible right combinations gives you points
- Matching the wrong combinations gives you nothing
- The cost 2 points per spin can be multiplied
- Adding score into local leaderboard

Features:
- COVID-19 related slot-images
- Player's name
- Player's initial score
- Leaderboard
- How to Play section

Slots:
- Washing hands
- Cough
- Álcool
- Hand to face
- Not respecting social distance
- Mask

Future implementation
- Customise slots
- Set a custom joker to your game
- Set a personal bonus combination
- Set an online leaderboard



### STRUCTURE PLANE

Find Here the wire frames for the information architecture:

[Wireframes](https://fergabi17.github.io/corona-spin/resources/wireframes/wireframes.html)

### SKELETON PLANE

Website main colors:

![Colors](resources/ux/colors.png)

Website fonts:
![Itim](resources/ux/font-Itim.png)
![Roboto](resources/ux/font-Roboto.png)
![Roboto](resources/ux/font-Roboto-Cond.png)
![Roboto](resources/ux/font-Alfa.png)
![Roboto](resources/ux/font-VT323.png)


### SURFACE

Find the project live on https://fergabi17.github.io/corona-spin/

User Stories:
- A user doesn't know how to play: they can access the "How to play" section from any page in the website
- A user wants to start a new game: the new game page is the inicial page in the website. If the user navigates to other pages, they can always start the game going to the "New Game" tab - accessible from any page in the website
- 

## Technologies Used

- [Html](https://html.com)
    - The project uses --HTML5-- standard markup language for creating Web pages.

- [CSS](https://www.css3.info)
    - The project uses --CSS3-- to style the website.

- [BOOTSTRAP](https://getbootstrap.com)
    - The project uses the grid system from --BOOTSTRAP-- and also other tools to get the website responsive.

- [Google Chrome](https://www.google.com/chrome/)
    - Browser and developer tools

- [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new)
    - Browser and developer tools

- [Safari](https://www.apple.com/safari/)
    - Browser and developer tools

- [Visual Studio Code](https://code.visualstudio.com/)
    - This project was built using Visual Studio Code IDE

- [Git](https://git-scm.com/)
    - Used for Version Control

- [GitHub](https://github.com/)
    - Used for Repository

- [Am I Responsive](http://ami.responsivedesign.is)
    - Testing responsiveness of the website

- [Html validator](https://validator.w3.org/nu/#textarea)
    - Validating HTML code

- [Css validator](https://jigsaw.w3.org/css-validator/validator)
    - Validating CSS code 

- [Css gradient generator](https://cssgradient.io/)
    - CSS gradient used across website, buttons and slotmachine backgrounds
    
- [Free sound](https://freesound.org/)
    - Sound effects for the slot machine

## Testing

Manual tests were made by the developer, the project's mentor and also by potencial users. 
The following browsers were used:
- Google chrome
- Mozilla Firefox
- Safari

The tests included: 
- Functional links
- Links to other websites open on a new tab
- Information easily found
- Readability

The CSS and the HTML codes were validated on jigsaw.w3.org and validator.w3.org

![Html validation](ux/html-validation.png)
![CSS validation](ux/css-validation.png)

The website is responsive, presenting the content in a different way according to the size of the screen.
Phones and tablets will present:
- A shorter introduction text
- A smaller hero image
- No navigation menu - all navigation is made scrolling the page down
- No access to CV download
- All columns are presented ocuping the full width of the screen

Large screens will show:
- A complete intrudution text
- The full picture for the hero-image section
- A Naviagation menu, to jump straigh away to the content of your interested
- CV download
- Columns can be grouped side by side

## Deployment

This project is hosted on [GitHub](https://github.com/fergabi17/portfolio/)

The git repository contains:
 - README file
 - index.html - that's your homepage
 - Assets folder with images and styles for the website
 - Resurces folder with resources found on the website
 - Wireframes folder that explains the creation process
 
To deploy your own version of the website:
- Have git installed
- Visit the [repository]([GitHub](https://github.com/fergabi17/portfolio/))
- Click 'Clone or download' and copy the code for http
- Open your chosen IDE (Cloud9, VS Code, etc.)
- Open a terminal in your root directory
- Type 'git clone ' followed by the code taken from github repository
    - ```git clone https://github.com/fergabi17/portfolio/```
- When this completes you have your own version of the website
- The website can be run by opening one of the HTML files within a web browser

This site was developed in GitPod.

## Credits

### Media
- The photos used in this site were obtained from Bruna Gosta creations https://www.brunagosta.com/

### Acknowledgements

- I received inspiration for this project from Elizapeth Lin's website https://www.elizabethylin.com/
- Other websites that helped the process with reseach:
    - https://css-tricks.com/
    - https://www.w3schools.com/
    - https://stackoverflow.com/
    - https://github.com/Pattern-Projects/oireachtas-ifd-project/

Thank you for mentorint and suport:
 - Code institute
 - Seun Owonikoko
 - Code institude tutors