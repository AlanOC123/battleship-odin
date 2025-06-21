import createPlayer from "../../src/core/factories/createPlayer";

export const mockIDs = {
  alpha: 'p1a1p',
  beta: 'p2b2p',
  charlie: 'p3c3p',
};

export const mockNames = {
  alpha: 'Alpha',
  beta: 'Beta',
  charlie: 'Charlie',
};

export const mockPlayers = {
    alpha: createPlayer(mockNames.alpha, mockIDs.alpha),
    beta: createPlayer(mockNames.beta, mockIDs.beta),
    charlie: createPlayer(mockNames.charlie, mockIDs.charlie),
}

export const getMockPlayerEntry = (key) => [ mockIDs[key], mockNames[key] ];
