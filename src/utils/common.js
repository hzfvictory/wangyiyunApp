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
export const debounce = function(callback, interval = 300) {
  let timer = null;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback();
    }, interval);
  };
};

//节流函数
export const throttle = function(callback, waitTime = 50) {
  let lastTime = null;
  return () => {
    let startTime = +new Date();
    if (startTime - lastTime > waitTime || !lastTime) {
      callback();
      lastTime = startTime;
    }
  };
};

//格式化
export const brandPinYin = (data) => {
  let cloneData = [];
  cloneData = data.map(i => ({
    value: i.brand_id,
    label: i.name,
    spell: i.sx_name,
  })).sort((a, b) => {
    return a.spell.localeCompare(b.spell);
  });

  const transData = {};
  cloneData.forEach((item) => {
    const qf = item.spell[0].toUpperCase();
    transData[qf] = transData[qf] || [];
    transData[qf].push(item);
  });
  return transData;
};
//表单序列化
export const objToForm = (obj) => {
  let str = '';
  for (let key in obj) {
    str += key + '=' + obj[key] + '&';
  }
  str = str.substring(0, str.length - 1);
  return str;
};
