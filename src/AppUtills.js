export const get = (a, b, c) => {
    let retValue = c !== undefined ? c : null;
    return a.reduce(
      (obj, key) =>
        obj && key && obj[key] !== null && obj[key] !== undefined
          ? obj[key]
          : retValue,
      b
    );
  };