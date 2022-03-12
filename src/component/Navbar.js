import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Menu, Typography, Avatar, Button } from "antd";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import icon from "../Images/cryptocurrency.png";

const Navbar = () => {

   const [sidebarMenu, setSidebarMenu] = useState(true);
   const [screenSize, setScreenSize] = useState(null);
   
   useEffect(() => {
     const handleResize = ()=>{
       return setScreenSize(window.innerWidth);
     }
        window.addEventListener("resize", handleResize)
        handleResize()
     return () => {
       window.removeEventListener("resize", handleResize)
     }
   }, [])

   useEffect(()=>{
     if(screenSize < 768){
       setSidebarMenu(false)
     }else{
       setSidebarMenu(true)
     }
   }, [screenSize])
   
   
   
   

  
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoglobe</Link>
        </Typography.Title>
      <Button className="menu-control-container" onClick={()=>{
        setSidebarMenu(!sidebarMenu)
      }}><MenuOutlined></MenuOutlined></Button>

      </div>
      { sidebarMenu && (<Menu theme="dark">
        <Menu.Item key ="1" icon={<HomeOutlined />}>
          <Link to ="/">Home</Link>
        </Menu.Item>
        <Menu.Item key ="2" icon={<FundOutlined />}>
          <Link to ="/cryptocurrencies">Cryptocurrencies</Link></Menu.Item>
       
        <Menu.Item key ="3" icon={<MoneyCollectOutlined/>}>
          <Link to ="/exchanges">Exchanges</Link></Menu.Item>
       
        <Menu.Item key ="4" icon={<BulbOutlined />}>
        <Link to ="/news">News</Link></Menu.Item>
      </Menu>)}
    </div>
  );
};

export default Navbar;
