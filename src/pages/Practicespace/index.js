import React from 'react';
import Link from 'umi/link';
import { WhiteSpace } from 'antd-mobile';


const index = () => {
  return (
    <>
      <Link to='/practiceSpace/IntersectionObserver'>
        Go to /practiceSpace/IntersectionObserver
      </Link>
      <WhiteSpace/>
      <Link to='/practiceSpace/IndexedDB'>
        Go to /practiceSpace/IndexedDB
      </Link>
      <WhiteSpace/>
      <Link to='/practiceSpace/reactScroll'>
        Go to /practiceSpace/reactScroll
      </Link>
      <WhiteSpace/>
      <Link to='/practiceSpace/reactVirtualized'>
        Go to /practiceSpace/reactVirtualized
      </Link>
      <WhiteSpace/>
      <Link to='/practiceSpace/Cookies'>
        Go to /practiceSpace/Cookies
      </Link>
    </>

  );
};

export default index;



