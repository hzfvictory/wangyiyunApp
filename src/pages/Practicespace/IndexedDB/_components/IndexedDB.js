import React, { Component } from 'react';

export default (Target, storeDB = 'zhenfeng', nameDB = 'defaultDB') => {
  return class IndexedDB extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.db = '';
    }


    componentDidMount() {
      this.createIndexedDB();
    }

    //TODO:创建DB
    createIndexedDB = () => {
      //库名字 ， 表名字
      let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

      if (!indexedDB) {
        console.log('你的浏览器不支持IndexedDB');
      } else {

        //使用 indexedDB 的第一步是打开数据库，使用indexedDB.open()方法。
        let request = indexedDB.open(storeDB, 1);

        //error事件表示打开数据库失败。
        request.onerror = (e) => {
          console.log('数据库打开报错！');
        };

        //success事件表示成功打开数据库
        request.onsuccess = (e) => {
          this.db = e.target.result;
          console.log('成功打开DB');

        };

        //如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded。
        let objectStore;
        request.onupgradeneeded = (event) => {
          this.db = event.target.result;
          if (!this.db.objectStoreNames.contains(nameDB)) {
            objectStore = this.db.createObjectStore(nameDB, { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('name', 'name', { unique: false });
            objectStore.createIndex('age', 'age', { unique: false });
          }
        };


      }
    };

    //TODO:添加数据
    addIndexedDB = (data = []) => {
      let getStoreByName = this.getStoreByName();
      let request;
      for (let i = 0; i < data.length; i++) {
        request = getStoreByName.add(data[i]);
      }

      request.onsuccess = (e) => {
        console.log('数据写入成功');
      };

      request.onerror = (e) => {
        console.log('数据写入失败');
      };
    };

    //TODO:取数据
    getIndexedDB = () => {
      let transaction = this.db.transaction(nameDB);
      let objectStore = transaction.objectStore(nameDB);
      let index = objectStore.index('name');
      let request = index.get('wangwu');
      // let request = objectStore.get('foo');
      request.onerror = (e) => {
        console.log('事务失败');
      };

      request.onsuccess = (event) => {
        if (request.result) {
          console.log(request.result);
        }
        else {
          console.log('未获得数据记录');
        }
      };
    };

    //TODO:遍历数据
    readAll = () => {
      let objectStore = this.db.transaction(nameDB).objectStore(nameDB);

      objectStore.openCursor().onsuccess = (event) => {
        let cursor = event.target.result;

        if (cursor) {
          console.log(cursor);
          console.log('Id: ' + cursor.key);
          console.log('Name: ' + cursor.value.name);
          console.log('Age: ' + cursor.value.age);
          cursor.continue();
        } else {
          console.log('没有更多数据了！');
        }
      };
    };

    //TODO:删除一条数据（根据主键key(id)）默认全部删除
    deleteDataByKey = (key) => {
      let store = this.getStoreByName();
      let request;
      if (key) {
        request = store.delete(key);
      } else {
        request = store.clear();
      }

      request.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
          console.log('数据删除成功');
        } else {
          console.log('数据删除失败');
        }
      };
      request.onerror = (e) => {
        console.log('数据删除失败');
      };
    };

    //TODO:通过游标获取所有数据
    fetchStoreByCurser = () => {
      let store = this.getStoreByName();
      let request = store.openCursor();

      request.onsuccess = (e) => {
        let cursor = e.target.result;
        console.log(cursor);
        if (cursor) {
          let currentStudent = cursor.value;
          console.log(currentStudent);
          //curson.contine()会使游标下移，直至没有数据则返回undefined
          cursor.continue();
        }
      };
    };

    //TODO:指定游标范围查询
    getDataBetweenTwoData = (indexName, start, end, isStartOpen, isEndOpen) => {
      let store = this.getStoreByName();
      let indexStore = store.index(indexName);
      //true是不包括，false是包括
      let request = indexStore.openCursor(IDBKeyRange.bound(start, end, isStartOpen, isEndOpen));
      request.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
          let student = cursor.value;
          console.log(student.name);
          cursor.continue();
        }
      };
    };

    //TODO:根据键值修改数据
    updateDataByKey = (key, age) => {
      let store = this.getStoreByName();
      let request = store.get(key);
      request.onsuccess = (e) => {
        let student = e.target.result;
        if( student.age === age){
          console.log('没发生改变');
        }else{
          student.age = age;
          store.put(student);
          console.log('修改成功');
        }
      };
    };

    //TODO:关闭数据库
    closeDB = () => {
      this.db.close();
      console.log(this.db.name + ' database is already closed!');
    };
    render() {
      const { props, state } = this;

      return (
        <Target {...this.props}
                IndexedDB={{
                  addIndexedDB: this.addIndexedDB,
                  createIndexedDB: this.createIndexedDB,
                  getIndexedDB: this.getIndexedDB,
                  readAll: this.readAll,
                  deleteDataByKey: this.deleteDataByKey,
                  fetchStoreByCurser: this.fetchStoreByCurser,
                  getDataBetweenTwoData: this.getDataBetweenTwoData,
                  closeDB: this.closeDB,
                  updateDataByKey: this.updateDataByKey,
                }}
        />
      );
    }

    //封装事务transaction
    getStoreByName = () => {
      return this.db.transaction(nameDB, 'readwrite').objectStore(nameDB);

    };

  };
};

