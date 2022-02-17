/**
 * 浅拷贝
 * 深拷贝(对象、循环引用、函数、symbol)
 */

const cloneShallow = (obj) => {
    const ans = {};
    for (let key in obj) {
        ans[key] = obj[key]
    }
    return ans;
}

const cloneDeep = (obj) => {
    if (typeof obj === 'object') {
        const ans = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
            ans[key] = cloneDeep(ans[key]);
        }
        return ans;
    } else {
        return obj;
    }
}