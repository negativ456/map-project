import { makeAbsolute, parseSVG } from 'svg-path-parser'

export const convertSvgPath = (svgPath: string): [number, number][] => {
  const commands = makeAbsolute(parseSVG(svgPath));
  const coordinates: [number, number][] = [];
  let currentX = 0;
  let currentY = 0;

  commands.forEach(command => {
    if (command.code === 'M' || command.code === 'L' || command.code === 'C' || command.code === 'H' || command.code === 'V') {
      currentX = command.x !== undefined ? command.x : currentX;
      currentY = command.y !== undefined ? command.y : currentY;
      coordinates.push([currentY, currentX]); // Leaflet uses [lat, lng] format
    }
  });

  return coordinates;
}