module.exports = () => document.body.innerHTML = `
<div id="app">
  <input id="player-name" />
  <input id="ai-name" />
  <button class="difficulty-btn">Easy</button>
  <button class="difficulty-btn">Medium</button>
  <button class="difficulty-btn">Hard</button>
  <button class="game-type-btn">PvE</button>
  <button class="game-type-btn">PvP</button>
  <button id="start-game"></button>
  <button id="return-to-launch"></button>
</div>
`;
