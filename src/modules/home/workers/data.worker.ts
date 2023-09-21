/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const { interval, size } = data;
  startEmittingData(interval, size);
});

const generatedIds = new Set<string>();
let handle: number | undefined;

function startEmittingData(interval: number, size: number) {
  if (handle) {
    clearInterval(handle);
  }
  handle = setInterval(() => {
    const dataArray: any[] = [];
    const maxId: number = size < Number.MAX_SAFE_INTEGER / 100 ? size * 100 : Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < size; i++) {
      dataArray.push({
        id: generateUniqueId(maxId),
        int: 100,
        float: 10.5,
        color: '#eee',
        child: { id: generateUniqueId(maxId), color: '#aaa' },
      });
    }
    generatedIds.clear();
    postMessage(dataArray);
  }, interval) as unknown as number;
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
