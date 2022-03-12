import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
  return (
    <div className="loader">
    <Spin indicator={<LoadingOutlined style={{fontSize: "45px"}} spin></LoadingOutlined>}></Spin>
    </div>
  )
}

export default Loader

// import { Spin } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';

// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// ReactDOM.render(<Spin indicator={antIcon} />, mountNode);