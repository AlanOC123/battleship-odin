import createNode from '../../../src/core/factories/board/createNode';
import helpers from '../../../src/core/utils/boardHelpers';

jest.mock('../../../src/core/utils/boardHelpers', () => ({
  getBoardNodeID: jest.fn((x, y) => (x * 10) + y),
}));

describe('[Unit] Create Board Node', () => {
  let node;
  const x = 4;
  const y = 2;
  const id = helpers.getBoardNodeID(x, y);

  beforeEach(() => {
    node = createNode(x, y);
  });

  it('creates a node with valid coordinates', () => {
    expect(node).toBeDefined();
    expect(node.getID()).toBe(id);
  });

  it('initially has no ship data', () => {
    expect(node.hasShip()).toBe(false);
    expect(node.getShipData()).toBe(false);
  });

  it('sets ship data correctly', () => {
    const dummyPart = { name: 'TestPart', index: 0 };
    expect(node.setShipData(dummyPart)).toBe(true);
    expect(node.hasShip()).toBe(true);
    expect(node.getShipData()).toEqual(dummyPart);
  });

  it('fails gracefully on invalid ship data', () => {
    expect(node.setShipData(null)).toBe(false);
    expect(node.setShipData('invalid')).toBe(false);
    expect(node.hasShip()).toBe(false);
  });

  it('adds edges correctly', () => {
    const dummyNode = createNode(5, 3);
    expect(node.addEdge(dummyNode.getID(), dummyNode)).toBe(true);
  });

  it('fails gracefully on invalid edge data', () => {
    expect(node.addEdge(null, null)).toBe(false);
  });

  describe('Coordinate validation', () => {
    it('throws on NaN coordinates', () => {
      expect(() => createNode(NaN, NaN)).toThrow();
    });

    it('throws on out-of-range x coordinate', () => {
      expect(() => createNode(0, 10)).toThrow();
      expect(() => createNode(101, 10)).toThrow();
    });

    it('throws on out-of-range y coordinate', () => {
      expect(() => createNode(10, 0)).toThrow();
      expect(() => createNode(10, 101)).toThrow();
    });
  });
});
