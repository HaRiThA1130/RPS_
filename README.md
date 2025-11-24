**Rock-Paper-Scissors Game ✨**

This is a simple Rock-Paper-Scissors game that I built using HTML, CSS, and JavaScript.
I created this project mainly to improve my frontend development skills and also to make something fun and interactive.

**📝 Why I Made This**

I wanted to practice writing clean JavaScript logic, handling user interactions, updating the UI using DOM manipulation, and making the interface look modern.
Instead of keeping it plain, I tried adding:

Animations

Sounds

Confetti effects

Score saving

so the game feels more like a real mini app instead of just a simple script.

**🧠 How It Works**

The game follows the normal Rock-Paper-Scissors rules:

Rock beats Scissors

Scissors beats Paper

Paper beats Rock

When the user clicks an option, the computer randomly selects one, and the result is shown on the screen along with sound and effects.
The score is stored using localStorage, so refreshing the page won’t reset the score.

**🛠️ What I Used**
Part	What I Used
Structure	HTML
Styling & Animations	CSS
Game Logic	JavaScript
Storage	LocalStorage
Extras	Sound effects + confetti animation
**🚀 What I Learned**

While making this project, I learned:

How to manipulate the DOM dynamically

How to add audio inside a website

How to store data in the browser so it doesn’t reset on refresh

How to make UI responsive and user-friendly

I also understood how much design improves user experience — even simple logic feels more fun with animation and UI polish.

**🎮 Game Rules**

The game is based on the classic rules of Rock-Paper-Scissors.
When you choose an option, the computer also picks one randomly. The winner is decided based on these conditions:

| Player Choice       | Computer Choice   | Result              |
|-------------------- |-------------------|----------------------|
| 🪨 Rock            | ✂️ Scissors       | ✅ Player Wins       |
| 🪨 Rock            | 📄 Paper          | ❌ Computer Wins     |
| 🪨 Rock            | 🪨 Rock           | 🤝 Draw              |
| 📄 Paper           | 🪨 Rock           | ✅ Player Wins       |
| 📄 Paper           | ✂️ Scissors       | ❌ Computer Wins     |
| 📄 Paper           | 📄 Paper          | 🤝 Draw              |
| ✂️ Scissors        | 📄 Paper          | ✅ Player Wins       |
| ✂️ Scissors        | 🪨 Rock           | ❌ Computer Wins     |
| ✂️ Scissors        | ✂️ Scissors       | 🤝 Draw              |


If both choices are the same, the result is a draw.

So in short:

Rock beats Scissors

Scissors beats Paper

Paper beats Rock

The score updates after every round, and in my version, the score also stays saved even if the page is refreshed (thanks to localStorage).

**📌 How To Run**

You don’t need anything special:

Download the project

Open index.html in a browser

Play 🎉

**🔮 Future Improvements**

If I continue improving this project, I would like to add:

Difficulty levels (easy, medium, hard)

Multiple themes (dark mode, neon, anime style)

Online multiplayer mode

Leaderboard system

**❤️ Credits**

This project was made completely by me while learning and experimenting.
It’s simple, but I’m proud of how it came out.
