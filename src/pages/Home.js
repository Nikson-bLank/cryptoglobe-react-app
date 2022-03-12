import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";

import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News"
import Loader from "../component/Loader";


const Home = () => {
 



  const {data, isFetching} =useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;
  const {Title} = Typography;
 

  if(isFetching){
    return <Loader />
  }
   
  const{totalCoins, total24hVolume, totalExchanges, totalMarketCap, totalMarkets } = globalStats

  return <>
  <Title level={2} className="heading">
    Global Crytocurreny Status
    </Title>
    <Row>
      <Col span={12}><Statistic title="Total Crytocurrencies" value={totalCoins}/></Col>
      <Col span={12}><Statistic title="Total Exchanges" value={millify(totalExchanges)}/></Col>
      <Col span={12}><Statistic title="Total Market Cap" value={millify(totalMarketCap)}/></Col>
      <Col span={12}><Statistic title="Total 24hr Volume" value={millify(total24hVolume)}/></Col>
      <Col span={12}><Statistic title="Total Market" value={millify(totalMarkets)}/></Col>
    </Row>
    <div className="home-heading-container">
      <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world
      </Title>
      <Title level ={4} className="show-more"><Link to = "/cryptocurrencies" className="show-more">Show more</Link></Title>
     
      </div>
      <Cryptocurrencies only10 />
      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest News on crypto</Title>
        <Title level={4} className="show-more">
         <Link to="/news" >Show more</Link> 
        </Title>
        </div>
        <News only6></News>
  </>;
};

export default Home;
