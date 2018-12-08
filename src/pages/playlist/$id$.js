import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { WingBlank } from 'antd-mobile';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';
import { Tag, List, Button, NavBar, Icon, WhiteSpace } from 'antd-mobile';


import styles from './index.less';

const mapStateToProps = (state) => (state);

@connect(mapStateToProps)

class playlist extends Component {
  state = {};


  createIndexedDB = (ev) => {
    let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    if (!indexedDB) {
      console.log('你的浏览器不支持IndexedDB');
    } else {
      //使用 IndexedDB 的第一步是打开数据库，使用indexedDB.open()方法。
      let request = indexedDB.open('zhenfeng', 1);
      //error事件表示打开数据库失败。
      request.onerror = function(e) {
        console.log('数据库打开报错！');
      };
      //success事件表示成功打开数据库
      request.onsuccess = function(e) {
        window.db = e.target.result;
        console.log('成功打开DB');
      };
      //如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded。
      let objectStore;
      request.onupgradeneeded = function(event) {
        window.db = event.target.result;
        if (!window.db.objectStoreNames.contains('person')) {
          objectStore = window.db.createObjectStore('person', { keyPath: 'id', autoIncrement: true });
          objectStore.createIndex('name', 'name', { unique: false });
        }
      };


    }
  };
  handleIndexedDB = () => {
    console.log(window.db);

    let request = window.db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .add({ id: 1, name: '张三1', age: 214, email: 'zhangsan@example.com111' });

    request.onsuccess = function(e) {
      console.log('数据写入成功');
    };

    request.onerror = function(e) {
      console.log('数据写入失败');
    };
  };
  handleadIndexedDB = () => {
    var transaction = window.db.transaction(['person']);
    var objectStore = transaction.objectStore('person');
    var request = objectStore.get(1);
    console.log(objectStore,request);
    request.onerror = function(event) {
      console.log('事务失败');
    };

    request.onsuccess = function(event) {
      if (request.result) {
        console.log('Name: ' + request.result.name);
        console.log('Age: ' + request.result.age);
        console.log('Email: ' + request.result.email);
      } else {
        console.log('未获得数据记录');
      }
    };
  };

  render() {
    const { props, state } = this;
    return (
      <Fragment>
        <WhiteSpace size={'xl'}/>
        <Button type="ghost" size="small" inline onClick={this.createIndexedDB}>建表</Button>
        <WhiteSpace size={'xl'}/>
        <Button type="ghost" size="small" inline onClick={this.handleIndexedDB}>存数据</Button>
        <WhiteSpace size={'xl'}/>
        <Button type="ghost" size="small" inline onClick={this.handleadIndexedDB}>读数据</Button>
      </Fragment>
    );
  }

}


export default playlist;
