const chunk = <T extends any> (arr: Array<T>, size: number): Array<Array<T>> => {
    const ret = [];
    for (let i = 0; i < arr.length; i = i + size) {
        ret.push([...arr.slice(i, i + size)]);
    }
    return ret;
};

export default chunk