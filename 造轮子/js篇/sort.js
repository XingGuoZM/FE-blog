/**
 * 冒泡排序
 * @param {*} arr 需要排序的数组
 */
const bubbleSort = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let tpm = arr[i];
        arr[i] = arr[j];
        arr[j] = tpm;
      }
    }
  }
  return arr;
}
/**
* 快速排序
* @param {*} arr 需要排序的数组
*/
const quickSort = function (arr) {
  let left = [], right = []

  if (arr.length <= 1) return arr
  let flag = arr.splice(0, 1)[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > flag) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return quickSort(left).concat(flag, quickSort(right))
}
/**
 * 插入排序
 * @param {*} arr 需要排序的数组
 */
const insertSort = function (arr) {
  let temp;
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    temp = arr[i];
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
}

/**
 * 希尔排序
 * @param {*} arr 需要排序的数组
 */
const sheelSort = function (arr) {
  let len = arr.length;
  let wid = Math.floor(len / 2);
  while (wid > 0) {
    for (let i = wid; i < len; i++) {
      let temp = arr[i], j;
      for (j = i - wid; j >= 0 && arr[j] > temp; j -= wid) {
        arr[j + wid] = arr[j];
      }
      arr[j + wid] = temp;
    }
    wid = Math.floor(wid / 2);
  }
  return arr;
}
/**
 * 简单选择排序
 * @param {*} arr 需要排序的数组
 */
const selectSort = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    let key = arr[i];
    let value = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < key) {
        key = arr[j];
        value = j;
      }
    }
    arr[value] = arr[i];
    arr[i] = key;
  }
}
/**
 * 堆排序
 * @param {*} arr 需要排序的数组
 */
const heapSort = function (arr) {
  let len = arr.length;

  for (let i = len / 2 - 1; i >= 0; i--) {
    adjustHeap(arr, i, len);
  }
  for (let j = len - 1; j > 0; j--) {
    swap(arr, 0, j);
    adjustHeap(arr, 0, j);
  }
}
const adjustHeap = function (arr, i, len) {
  let temp = arr[i];
  for (let k = 2 * i + 1; k < len; k = 2 * k + 1) {
    if (k + 1 < len && arr[k] < arr[k + 1]) {
      k++;
    }
    if (arr[k] > temp) {
      arr[i] = arr[k];
      i = k;
    } else {
      break;
    }
  }
  arr[i] = temp;
}
const swap = function (arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


/**
 * 归并排序
 * @param {*} arr 需要排序的数组
 */
const mergeSort = function (arr) {
  let mid = Math.floor(arr.length / 2),
    left = arr.slice(0, mid),
    right = arr.slice(mid);

  if (arr.length === 1) {
    return arr;
  }
  return merge(mergeSort(left), mergeSort(right));
}
const merge = function (left, right) {
  let tmp = [];

  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      tmp.push(left.shift());
    } else {
      tmp.push(right.shift());
    }
  }
  return tmp.concat(left, right);
}

/**
 * 计数排序
 * @param {*} arr 需要排序的数组 
 */

const countSort = function (arr) {
  let len = arr.length;
  let min = max = arr[0];
  let result = [], count = [];
  for (let i = 0; i < len; i++) {
    min = min <= arr[i] ? min : arr[i];
    max = max >= arr[i] ? max : arr[i];
    count[arr[i]] = count[arr[i]] ? count[arr[i]] + 1 : 1;
  }
  for (let j = min; j < max; j++) {
    count[j + 1] = (count[j] || 0) + (count[j + 1] || 0);
  }
  for (let k = 0; k < len; k++) {
    result[count[arr[k]] - 1] = arr[k];
    count[arr[k]]--;
  }
  return result;
}
/**
 * 桶排序
 * @param {*} arr 需要排序的数组
 * @param {*} bucketCount 桶数量，默认10
 */
const bucketSort = function (arr, bucketCount) {
  if (arr.length <= 1) return arr;
  
  bucketCount = bucketCount || 10;
  //初始化桶
  let len = arr.length,
    buckets = [],
    result = [],
    max = arr[0],
    min = arr[0];
  for (let i = 1; i < len; i++) {
    min = min <= arr[i] ? min : arr[i];
    max = max >= arr[i] ? max : arr[i];
  }
  //求出每一个桶的数值范围
  let space = (max - min + 1) / bucketCount;
  //将数值装入桶中
  for (let i = 0; i < len; i++) {
    //找到相应的桶序列
    let index = Math.floor((arr[i] - min) / space);
    //判断是否桶中已经有数值
    if (buckets[index]) {
      //数组从小到大排列
      let bucket = buckets[index];
      let k = bucket.length - 1;
      while (k >= 0 && buckets[index][k] > arr[i]) {
        buckets[index][k + 1] = buckets[index][k];
        k--
      }
      buckets[index][k + 1] = arr[i];
    } else {
      //新增数值入桶，暂时用数组模拟链表
      buckets[index] = [];
      buckets[index].push(arr[i]);
    }
  }
  //开始合并数组
  let n = 0;
  while (n < bucketCount) {
    if (buckets[n]) {
      result = result.concat(buckets[n]);
    }
    n++;
  }
  return result;
};

/**
 * 基数排序
 * @param {*} arr 需要排序的数组 
 * @param {*} maxDigit 最大位数
 */
function radixSort(arr, maxDigit) {
  let mod = 10;
  let dev = 1;
  let content = [];
  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {

    for (let k = 0; k < arr.length; k++) {
      let bucket = parseInt((arr[k] % mod) / dev);
      if (content[bucket] == null) {
        content[bucket] = [];
      };
      content[bucket].push(arr[k]);
    }
    let pos = 0;
    for (let j = 0; j < content.length; j++) {
      let value = null;
      if (content[j] != null) {
        while ((value = content[j].shift()) != null)
          arr[pos++] = value;
      }
    }
  }
  return arr;
}
