/// <reference lib="webworker" />

const COLORS: string[] = [
  'rgb(255, 182, 193)', // LightPink
  '#FFE4E1', // MistyRose
  'rgba(240, 255, 240, 0.7)', // Honeydew
  'rgb(240, 248, 255)', // AliceBlue
  'beige', // Beige
  'rgb(255, 228, 225)', // MistyRose
  '#FFF8DC', // Cornsilk
  'rgb(255, 250, 205)', // LemonChiffon
  'rgba(250, 250, 210, 0.9)', // LightGoldenrodYellow
  'rgb(245, 255, 250)', // MintCream
  'rgb(240, 255, 255)', // Azure
  '#FFF0F5', // LavenderBlush
  'rgb(255, 222, 173)', // NavajoWhite
  'rgb(255, 228, 196)', // Bisque
  'rgba(255, 248, 220, 0.5)', // Cornsilk
  'lavender', // Lavender
  'rgb(253, 245, 230)', // OldLace
  '#FFEBCD', // BlanchedAlmond
];
const INTEGERS: number[] = [];
const FLOATS: number[] = [];

let handle: number;

let colorIndex: number = 0;
let numberIndex: number = 0;

for (let i = 0; i < 95; i++) {
  INTEGERS.push(getRandomNumber(1, 1000));
  FLOATS.push(parseFloat(`${getRandomNumber(1, 1000)}.${getRandomNumber(1, 100)}`));
}

addEventListener('message', ({ data }) => {
  const { arraySize, intervalMs } = data;
  startEmittingData(arraySize, intervalMs);
});

function startEmittingData(arraySize: number, intervalMs: number) {
  if (handle) {
    clearInterval(handle);
  }
  handle = setInterval(() => {
    const dataArray = [];
    let startId: number = getRandomNumber(1, 10000);
    const idIncrement: number = getRandomNumber(1, 10);
    for (let i = 0; i < arraySize; i++) {
      const child = { id: startId.toString(), color: COLORS[colorIndex++] };
      startId += idIncrement;
      if (colorIndex >= COLORS.length) {
        colorIndex = 0;
      }

      dataArray.push({
        id: startId.toString(),
        int: INTEGERS[numberIndex],
        float: FLOATS[numberIndex],
        color: COLORS[colorIndex++],
        child,
      });
      startId += idIncrement;
      numberIndex++;
      if (colorIndex >= COLORS.length) {
        colorIndex = 0;
      }
      if (numberIndex >= INTEGERS.length) {
        numberIndex = 0;
      }
    }
    postMessage(dataArray);
  }, intervalMs) as unknown as number;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
