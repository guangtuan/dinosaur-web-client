const last = <T extends any>(arr: Array<T>): T => {
  return arr[arr.length - 1];
};

export default last;
