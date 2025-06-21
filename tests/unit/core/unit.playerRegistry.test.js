import {
    mockPlayers,
    getMockPlayerEntry,
    mockNames,
    mockIDs
 } from "../../__mocks__/mock.playerRegistry.js";
import playerRegistry from "../../../src/core/singletons/playerRegistry";

describe('[Unit] Player Registry', () => {
    beforeEach(() => {
        playerRegistry.clearRegistry();
    });

    it('adds a valid player', () => {
        expect(playerRegistry.addPlayer(mockNames.alpha)).toBeTruthy();
        const players = playerRegistry.getAllPlayers();
        expect(players).toHaveLength(1);
        expect(playerRegistry.addPlayer('1')).toBeFalsy();
        expect(playerRegistry.addPlayer('1'.repeat(30))).toBeFalsy();
        expect(playerRegistry.addPlayer(123)).toBeFalsy();
    })

    it('gets a player by ID', () => {
        playerRegistry.addPlayer(mockNames.beta);
        const players = playerRegistry.getAllPlayers();
        const id = players[0].id;
        expect(playerRegistry.getPlayer(id)).toBeTruthy();
        expect(playerRegistry.getPlayer('1234')).toBeFalsy();
    });

    it('deletes a player', () => {
        playerRegistry.addPlayer(mockNames.charlie);
        const players = playerRegistry.getAllPlayers();
        const id = players[0].id;
        expect(playerRegistry.deletePlayer(id)).toBeTruthy();
        expect(playerRegistry.deletePlayer('1234')).toBeFalsy();
        expect(playerRegistry.getAllPlayers()).toHaveLength(0);
    });
})
