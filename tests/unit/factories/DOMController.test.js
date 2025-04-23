import DOMControllerFactory from "../../../src/ui/factories/domManagerFactory";

describe('DOM Controller Factory', () => {
    let domManager;

    beforeEach(() => {
        domManager = DOMControllerFactory();
    });

    afterEach(() => {
        domManager = null;
        document.body.innerHTML = '';
    });

    describe('Get Launch Page Elements', () => {
        it('retreives the launch button from the launch page', () => {
            document.body.innerHTML = `
            <div id="app">
              <button id="launch-game"></button>
            </div>
          `;

          const btn = domManager.getLaunchPageElements().start
          expect(btn).toBeInstanceOf(HTMLButtonElement);
        });

        it('throws when the button isnt found', () => {
            expect(() => domManager.getLaunchPageElements()).toThrow();
        })
    })

    describe('Get Set Up Page Elements', () => {
        it('retreives a single element from the set up page', () => {
            document.body.innerHTML = `
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

            const playerName = domManager.getSetupPageElements().inputs.playerName;
            expect(playerName).toBeInstanceOf(HTMLInputElement);
        });

        it('Retreives multiple elements from the set up page', () => {
            document.body.innerHTML = `
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

            const btns = domManager.getSetupPageElements().difficultyOptions;
            expect(Object.keys(btns)).toEqual([ 'easy', 'medium', 'hard' ]);
        });

        it('throws when called incorrectly', () => {
            expect(() => domManager.getSetupPageElements()).toThrow();
        });
    });
});
