const index = (props) => {
  const { dom_scroll} = props;

  let step = 250;
  const handleScrollTop = () => {
    let product_content =  document.getElementById(dom_scroll);
    let progress = product_content.scrollTop;
    step = progress / 15;
    if (progress > 0) {
      window.requestAnimationFrame(goTop);
    }
  };
  const goTop = () => {
    let product_content = document.getElementById(dom_scroll);
    let progress = product_content.scrollTop;
    if (progress > 0) {
      progress -= step;
      product_content.scrollTop = progress;
      window.requestAnimationFrame(goTop);
    } else {
      window.cancelAnimationFrame(goTop);
    }
  };
  return (
    <i className="iconfont" style={{fontSize:"9vw"}} onClick={handleScrollTop}>&#xe60b;</i>
  );
};

export default (index);



