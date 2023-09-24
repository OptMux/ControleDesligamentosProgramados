function* idGenerator(): Generator<number> {
  let currentId = 0;
  while (true) {
    yield currentId++;
  }
}

export function idFactory() {
  const ids = idGenerator();
  return {
    nextId(): number {
      return ids.next().value;
    },
  };
}
