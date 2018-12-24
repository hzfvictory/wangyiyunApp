/*
* title: 手机震动
*/
import React, { Fragment } from 'react';
import { Button ,NavBar,Icon} from 'antd-mobile';


window.addEventListener('online',()=>{
  alert('网络正常')
});
window.addEventListener('offline',()=>{
  alert('网络已经断开')
});
document.addEventListener('visibilitychange', ()=> {
  document.title = document.hidden ? '您已经离开' : '手机震动';
});



function Vibrate(props) {
  const startFn = () => {
    if ('vibrate' in navigator) {
      window.navigator.vibrate([3000, 2000, 1000]);
    } else {
      alert('你的设备不支持震动！');
    }
  };

  const stopFn = () => {
    window.navigator.vibrate(0);
  };

  window.addEventListener('pageshow', (e)=> {

    console.log(222,e.persisted);
    if (e.persisted) {
      // window.location.reload();
    }
  });

  return (
    <Fragment>
      <NavBar
        className="fixed"
        mode="dark"
        icon={<Icon type="left"/>}
        onLeftClick={() => {
          props.history.goBack();
        }}
        rightContent={[]}
      />
      <h1>vibrate</h1>
      <Button onClick={startFn}>点击震动</Button>
      <Button onClick={stopFn}>点击停止</Button>
    </Fragment>
  );
}

export default Vibrate;
