/**
 * title: 浏览器数据库
 */
import React, { Component, Fragment } from 'react';
import { Tag, List, Button, NavBar, Icon, WhiteSpace, WingBlank } from 'antd-mobile';
import IndexedDB from './_components/IndexedDB';

import styles from './index.less';

@IndexedDB
class index extends Component {
  state = {};

  componentDidMount() {
    // console.log(this,'index');
  }

  createIndexedDB = () => {
    const { IndexedDB: { createIndexedDB } } = this.props;
    createIndexedDB();
  };
  //存数据
  handleIndexedDB = () => {
    const { IndexedDB: { addIndexedDB } } = this.props,
      datas = [{
        id: 11,
        name: 'zhangsan',
        age: 24,
      }, {
        id: 12,
        name: 'lisi',
        age: 30,
      }, {
        id: 13,
        name: 'wangwu',
        age: 26,
      }, {
        id: 14,
        name: 'zhaoliu',
        age: 26,
      }];
    addIndexedDB(datas);
  };
  //取数据
  handleadIndexedDB = () => {
    const { IndexedDB: { getIndexedDB } } = this.props;
    getIndexedDB();
  };
  //遍历数据
  readAll = () => {
    const { IndexedDB: { readAll } } = this.props;
    readAll();
  };
  //删除一条
  deleteDataByKey = () => {
    const { IndexedDB: { deleteDataByKey } } = this.props;
    deleteDataByKey(11);
  };
  //游标cursor
  fetchStoreByCurser = () => {
    const { IndexedDB: { fetchStoreByCurser } } = this.props;
    fetchStoreByCurser();
  };
  //指定游标
  getDataBetweenTwoData = () => {
    const { IndexedDB: { getDataBetweenTwoData } } = this.props;
    getDataBetweenTwoData('age', 26, 29, false, false);
  };
  //关闭数据库
  closeDB = () => {
    const { IndexedDB: { closeDB } } = this.props;
    closeDB();
  };
  //根据键值修改数据
  updateDataByKey = () => {
    const { IndexedDB: { updateDataByKey } } = this.props;
    updateDataByKey(12, 444444);
  };

  render() {
    const { props, state } = this;
    return (
      <Fragment>
        <NavBar
          className="fixed"
          mode="dark"
          icon={<Icon type="left"/>}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
          rightContent={[]}
        />
        <WhiteSpace size={'xl'}/>
        <Button type="ghost" size="small" inline onClick={this.createIndexedDB}>建表</Button>
        <WhiteSpace size={'xl'}/>
        <Button type="ghost" size="small" inline onClick={this.handleIndexedDB}>存数据</Button>
        <WhiteSpace size={'xl'}/>
        <Button type="ghost" size="small" inline onClick={this.handleadIndexedDB}>取数据</Button>
        <WhiteSpace size={'xl'}/>
        <Button type="ghost" size="small" inline onClick={this.readAll}>遍历数据</Button>
        <WhiteSpace size={'xl'}/>
        <Button type="ghost" size="small" inline onClick={this.deleteDataByKey}>删除一条</Button>
        <WhiteSpace size={'xl'}/>
        <Button type="ghost" size="small" inline onClick={this.fetchStoreByCurser}>游标cursor </Button>
        <WhiteSpace size={'xl'}/>
        <Button type="ghost" size="small" inline onClick={this.getDataBetweenTwoData}>指定游标 </Button>
        <WhiteSpace size={'xl'}/>
        <Button type="ghost" size="small" inline onClick={this.updateDataByKey}>修改数据 </Button>
        <WhiteSpace size={'xl'}/>
        <Button type="ghost" size="small" inline onClick={this.closeDB}>关闭数据库 </Button>
      </Fragment>
    );
  }

}


export default index;
