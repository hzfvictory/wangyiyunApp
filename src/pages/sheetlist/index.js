import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'dva/router';
import router from 'umi/router';
import { Tag, List ,Button ,NavBar ,Icon} from 'antd-mobile';


import styles from './index.less';

const Item = List.Item;
const Brief = Item.Brief;


const data = [...Array(100).keys()];
const mapStateToProps = (state) => (state);

@connect(mapStateToProps)

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allChecked: [],
    };
  }

  handleMap = () => {
    this.setState({
      allChecked: [],
    });
  };

  handleCheckAll = () => {
    let val = [];
    data.map((item, index) => {
      val.push(index);
    });
    this.setState({
      allChecked: val,
    });
  };
  handleClick = (index, type) => {
    const { allChecked } = this.state;
    if (type) {
      let ary = allChecked.filter(item => {
        return item !== index;
      });
      this.setState({
        allChecked: ary,
      }, () => {
        console.log(this.state.allChecked);
      });
    } else {
      allChecked.push(index);
      this.setState({
        allChecked: allChecked,
      }, () => {
        console.log(this.state.allChecked);
      });
    }
  };

  render() {
    return (
      <div>
        <NavBar
          className="fixed"
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {this.props.history.goBack()}}
          rightContent={[
          ]}
        />

        <Button type="ghost" size="small" inline onClick={this.handleMap}>
          X
        </Button>

        <Button type="ghost" size="small" inline onClick={this.handleCheckAll}>
          ✔
        </Button>


        {data.map((item, index) => (
          <div key={index}>
            <List renderHeader={() => '测试'} className="my-list">
              <Item extra={`标签${index}`}>
                <Tag selected={this.state.allChecked.includes(index)}
                     onChange={() => {
                       this.handleClick(index, this.state.allChecked.includes(index));
                     }}>{item}</Tag>
              </Item>
            </List>

          </div>
        ))}
      </div>
    );
  }

}


export default index;



