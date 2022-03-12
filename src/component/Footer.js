import React from 'react';
import { Typography, Space } from 'antd';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
          <Typography.Title level={5} style={{color:"white", textAlign: "center"}}>
            Cryptoglobe<br></br>
            All right reserved
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              {/* <Link to="/">Cryptocurrencies</Link> */}
              <Link to="/">Exchanges</Link>
              <Link to="/">News</Link>
            </Space>
      </div>
  )
}

export default Footer