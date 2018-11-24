import React, { Component } from 'react';
import { connect } from 'dva';
import { ImagePicker, SegmentedControl } from 'antd-mobile';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import styles from './index.less';

const mapStateToProps = (score) => (score);

@connect(mapStateToProps)

class index extends Component {
  state = {
    files: [],
    multiple: false,
  };
  static defaultProps = {};
  static propTypes = {};


  render() {
    const { props: { score: { result } }, state: { files, multiple } } = this;
    const { face_list = [], face_num = 1 } = result;
    console.log(face_list, face_num);
    return (
      <>
        <i className="iconfont">&#xe698;</i>
        <SegmentedControl
          values={['切换到单选', '切换到多选']}
          selectedIndex={this.state.multiple ? 1 : 0}
          onChange={this.onSegChange}
        />
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 7}
          multiple={multiple}
        />
        <div>心动分数 &nbsp;
          <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96"/>
        </div>
        {
          !!face_list.length && face_list[0]['beauty']
        }
      </>
    );
  }

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });

    if (type === 'remove') return;
    const image = files[files.length - 1]['url'];
    const { dispatch } = this.props;
    console.log(image.length, '图片的长度');

    dispatch({
      type: 'score/getImage',
      payload: {
        image,
      },
    });

  };
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1,
    });
  };
}


export default index;
