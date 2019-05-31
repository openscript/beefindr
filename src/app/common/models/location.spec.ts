import { Location } from './location';

describe('Location', () => {
  const POINTS = [{
    name: 'Hegibachplatz to Bellevue',
    point1: [47.361773, 8.560301],
    point2: [47.367081, 8.545112],
    distance: 1287.2607248838888,
  }, {
    name: 'Uetliberg nach Altstetten',
    point1: [47.349352, 8.492218],
    point2: [47.387702, 8.486684],
    distance: 4284.642982341028,
  }];

  it('should calculate distances correctly', () => {

    for (const point of POINTS) {
      const point1 = new Location({latitude: point.point1[0], longitude: point.point1[1], accuracy: 0});
      const point2 = new Location({latitude: point.point2[0], longitude: point.point2[1], accuracy: 0});
      const expDistance = point.distance;
      const calcDistance = point1.distanceTo(point2);

      expect(calcDistance).toBe(
        expDistance,
        point.name + ': ' + point1 + ' was expected to calculate a distance of ' +
        expDistance + 'm to ' + point2 + ' but actually calculated a distance of ' + calcDistance + 'm, deviating ' +
        Math.abs(expDistance - calcDistance).toFixed(14) + 'm!'
      );
    }
  });
});
