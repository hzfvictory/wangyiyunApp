/**
 * 验证必填
 */
const require = (message) => {
  const msg = message || '必填';
  return { required: true, message: msg };
};

/**
 * 数字，中英文，中横线，下划线，utf-8中文
 */
const phone = (message) => {
  const msg = message || '请输入正确的手机号码';
  return { pattern: /^[1]\d{2} \d{4} \d{4}$/, message: msg };
};

/**
 * 验证参数组件必填
 */
const password = (message, fn) => {
  const msg = message || '只能由英文,数组,下划线组成,不超过16位';
  return { pattern: /^\w{6,16}$/, message: msg };
};


export default {
  require,
  phone,
  password,
};
