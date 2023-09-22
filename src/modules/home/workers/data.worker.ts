/// <reference lib="webworker" />

const COLORS: string[] = [
  'rgb(255, 182, 193)', // LightPink
  '#FFE4E1', // MistyRose
  'rgba(240, 255, 240, 0.7)', // Honeydew
  'rgb(240, 248, 255)', // AliceBlue
  'beige', // Beige
  'rgb(255, 228, 225)', // MistyRose
  'rgb(255, 239, 213)', // PapayaWhip
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
  'rgb(255, 240, 245)', // LavenderBlush
  '#FFEBCD', // BlanchedAlmond
];

const generatedIds = new Set<string>();
let handle: number | undefined;

addEventListener('message', ({ data }) => {
  const { arraySize, intervalMs } = data;
  startEmittingData(arraySize, intervalMs);
});

function startEmittingData(arraySize: number, intervalMs: number) {
  if (handle) {
    clearInterval(handle);
  }
  handle = setInterval(() => {
    const dataArray: any[] = [];
    const maxId: number =
      arraySize < Number.MAX_SAFE_INTEGER / 100 ? arraySize * 100 : Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < arraySize; i++) {
      dataArray.push({
        id: generateUniqueId(maxId),
        int: getRandomNumber(1, 1000),
        float: parseFloat(`${getRandomNumber(1, 1000)}.${getRandomNumber(1, 100)}`),
        color: getRandomElementFromArray(COLORS),
        child: { id: generateUniqueId(maxId), color: getRandomElementFromArray(COLORS) },
      });
    }
    generatedIds.clear();
    postMessage(dataArray);
  }, intervalMs) as unknown as number;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUniqueId(maxId: number): string {
  let id: string;
  do {
    id = getRandomNumber(1, maxId).toString();
  } while (generatedIds.has(id));
  generatedIds.add(id);
  return id;
}

function getRandomElementFromArray<T = any>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
