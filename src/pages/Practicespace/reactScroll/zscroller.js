import React from 'react';
import ReactDOM from 'react-dom';
import ZScroller from 'zscroller';
import './index.less'
let zscroller;

const mockAry = [...new Array(100).keys()];

class zscroll extends React.Component {
  state = {};

  start = (e) => {
    zscroller = new ZScroller(document.getElementById('roots'), {
      scrollbars: false,
      zooming:false,//缩放
      animating:true,
      // animationDuration:9250,
      // bouncing:false,//nice
      scrollingX: true,
      snapping:true,
      // paging:true,
      locking:true,
      scrollingY: document.getElementById('scrollingY').checked,
      onScroll() {
        console.log(zscroller.getValues());
      },
    }).scroller;
    zscroller.scrollTo(0, 3321,false)
    // zscroller.scroller.scrollBy(0, 200,false)
  };


  destroy = () => {
    if (zscroller) {
      zscroller.destroy();
    }
  };

  render() {
    return (
      <div id='content'>
        <div>
          locking: <input type="checkbox" id="locking" defaultChecked/>
          <br/>
          scrollingX: <input type="checkbox" id="scrollingX" defaultChecked/>
          <br/>
          scrollingY: <input type="checkbox" id="scrollingY" defaultChecked/>
          <br/>
          <button id="start" onClick={this.start}>start</button>
          <button id="destroy" onClick={this.destroy}>destroy</button>
          <div
            style={{
              width: 1000,
              height: 1000,
              border: '1px solid green',
              padding: 10,
              overflow: 'hidden',
              margin: '10px auto',
              position: 'relative',
            }}
          >
            <div id="roots" style={{ height: 2000, width: 1200, border: '1px solid red' }}>
              <div id='content'>

                {mockAry.map((item, index) => {
                  return <div key={index}>{item}</div>;
                })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default zscroll;
