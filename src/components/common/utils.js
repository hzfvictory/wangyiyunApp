// 播放数量
export const formatPlayCount = item => {
  return (item / 10000) > 9 ? ((item / 10000) > 10000 ? `${(item / 100000000).toFixed(1)}亿` : `${Math.ceil(item / 10000)}万`) : Math.floor(item);
};

// 补0函数
export const addZero = s => {
  return s < 10 ? '0' + s : s;
};

// 播放时间
export const formatTime = s => {
  let minute = Math.floor(s / 60);
  let second = Math.floor(s % 60);
  return `${addZero(minute)}:${addZero(second)}`;
};

/**
 * 找到并返回应项的索引
 * @param list list
 * @param music 查找对象
 */
export const findIndex = (list, music) => {
  return list.findIndex((item) => {
    return item.id === music.id;
  });
};

//函数防抖
export const debounce = function(fn, interval = 300) {
  let timer = null;
  return (arys) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn()
    }, interval);
  };
};

//节流函数
export const throttle = function(fn, waitTime = 50) {
  let lastTime = null;
  return () => {
    let startTime = +new Date();
    if (startTime - lastTime > waitTime || !lastTime) {
      fn();
      lastTime = startTime;
    }
  };
};


