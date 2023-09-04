# Wildflower Odyssey - Endless Escape

Welcome to the **Wildflower Odyssey - Endless Escape game**! 🎉 We worked on our newest endless runner game and we need your help to finish it. 🙏

## What is an Endless Runner Game?

An **endless runner game** is a type of video game where the player character is constantly moving forward through a theoretically endless game world. The **goal** is to **avoid the obstacles** and to **survive as long as possible**.

### How to Play the Game?

- The player can **start the game** by pressing any key.
- The player can **control the avatar** by pressing the `space` key to jump.
- The **game is over** when the player hits an obstacle.
- The player can **restart the game** by pressing the any key.

### Project Setup

We have already created the project for you and used **HTML**, **CSS** and **JavaScript** to make the game work.

#### What is HTML?

**HTML (Hyper Text Markup Language)** is used to express text in a structured way. **HTML tags** indicate what kind of element is displayed on the website.

#### What is CSS?

**CSS (Cascading Style Sheets)** is used to style the HTML elements. We will use CSS to make our game look nice. Most of the stylings are already done for you, but you can change some of the colors of the game if you want to. We will show you how to do this later and we will do this by using JavaScript. 🤓

#### What is JavaScript?

**JavaScript** is used to make our game interactive. Some examples:

- We use JavaScript to add the player and the obstacles to our game.
- We use JavaScript to make the player jump and to make the obstacles and the grounds move.
- We also use JavaScript to make the game more challenging by increasing the speed of the game over time.
- And we use JavaScript to update the score of the player.

These functionalities are already implemented for you, but we need to write the correct HTML to make the JavaScript code work. And we also need to decide on some configurations for our game that we also need to write in JavaScript.

## Help to Build an Endless Runner Game

Almost everything has been done for you: The game setup and the game logic is implemented and also the general stylings are finished. **But** we need your help with writing the correct structure for our game and we also need to decide on some configurations for our game. _Let us begin!_ 🚀

**Note:** As we have created much of the game logic and styling beforehand, we need to be precise with the code we are writing. Please follow our instructions carefully and do not change the existing code (unless we say to do so). If you have any questions, please ask your coaches. **But** feel free to adjust the code **after** we have finished the game. 🤓

### Steps

### 1 - Create the World

The first thing we need to do is to create the **world**. The world is the main container for our game. It is the place where the player and the obstacles are placed.

To add the world to our project we need to write **HTML code**. We need to create a `main` element with the class `world` and the attribute `data-js="world"`:

```html
<main class="world" data-js="world"></main>
```

Some elements require some more information in order to work properly. This information is specified via **attributes**, like we did with our `main` element: `class="world"` and `data-js="world"`.

- The `class` attribute is used to specify one or more class names for an element. We will use this attribute to style the element with CSS.
- The `data-js` attribute is used to specify the JavaScript code for the element. We will use this attribute to select the element in our JavaScript code.

### 2 - Add the Ground(s)

```html
<main class="world" data-js="world">
  <div class="ground" data-js="ground"></div>
  <div class="ground ground-two" data-js="ground"></div>
</main>
```

### 3 - Add the Player

```html
<div class="player" data-js="image-container">
  <img data-js="player" src="./assets/gw_1.png" alt="avatar" />
</div>
```

```js
export const figure = {
  run1: "/assets/gw_1.png",
  run2: "/assets/gw_2.png",
  jumping: "/assets/gj.png",
  lose: "/assets/gh.png",
  rotate: true,
  jumpToTheMoon: false,
};
```

### 4 - Add the Obstacle

```html
<img
  class="obstacle"
  data-js="obstacle"
  src="./assets/rock.png"
  alt="obstacle"
/>
```

### 5 - Let the Player speak when the player loses

```html
<main class="world" data-js="world">
  <div class="ground" data-js="ground"></div>
  <div class="ground ground-two" data-js="ground"></div>
  <div class="player" data-js="image-container">
    <img data-js="player" src="./assets/gw_1.png" alt="avatar" />
  </div>
  <img
    class="obstacle"
    data-js="obstacle"
    src="./assets/rock.png"
    alt="obstacle"
  />
</main>
```

```html
<span class="text hide" data-js="text">Ouch!</span>
```

### 6 - Add a Start Screen Text

```html
<p class="start-screen" data-js="start-screen">Press Any Key To Start</p>
```

### 7 - Add the Score

```html
<p class="score">No damage for: <span data-js="score">0</span> seconds</p>
```

### 8 - Change the Theme

```js
export const theme = "night";
```

### 9 - Choose Your Own Colors

```js
export const customColors = {
  textColor: "midnightblue",
  textBackgroundColor: "papayawhip",
  skyColor: "lightsalmon",
  gameBackgroundColor: "midnightblue",
};
```

### 10 - Results

```html
<main class="world" data-js="world">
  <p class="score">No damage for: <span data-js="score">0</span> seconds</p>
  <p class="start-screen" data-js="start-screen">Press Any Key To Start</p>
  <div class="ground" data-js="ground"></div>
  <div class="ground ground-two" data-js="ground"></div>
  <span class="text hide" data-js="text">Ouch!</span>
  <div class="player" data-js="image-container">
    <img data-js="player" src="./assets/gw_1.png" alt="avatar" />
  </div>
  <img
    class="obstacle"
    data-js="obstacle"
    src="./assets/rock.png"
    alt="obstacle"
  />
</main>
```

## Credits
