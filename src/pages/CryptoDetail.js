import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Parser from "html-react-parser";
import millify from "millify";
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Col, Select, Typography, Row } from "antd";
import LineChart from "../component/LineChart";
import Loader from "../component/Loader";

function CryptoDetail() {
  const { coinId } = useParams();
  const { Title, Text } = Typography;
  const { Option } = Select;
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const {data: coinHistory} = useGetCryptoHistoryQuery({coinId, timePeriod})
  const cryptoDetails = data?.data?.coin;
  console.log(cryptoDetails);

   
  

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];
  
  const stats = [
    {
      id: 1,
      title: "Price to INR",
      value: `₹ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      id: 2,
      title: "Rank",
      value: cryptoDetails?.rank,
      icon: <NumberOutlined />,
    },
    {
      id: 3,
      title: "24h Volume",
      value: `₹ ${cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])}`,
      icon: <ThunderboltOutlined />,
    },
    {
      id: 4,
      title: "Market Cap",
      value: `₹ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      id: 5,
      title: "All-time-high(daily avg.)",
      value: `₹ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      id: 1,
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      id: 2,
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      id: 3,
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      id: 4,
      title: "Total Supply",
      value: `₹ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      id: 5,
      title: "Circulating Supply",
      value: `₹ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  if (isFetching) {
    return <Loader></Loader>;
  }

  // console.log(coinHistory);
  return (
    <Col className="coin-detail-container">
      {/* heading */}
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in Indian Rupee (INR). View value
          statistics, market cap and supply.
        </p>
      </Col>
      {/* Select time period */}
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => {
          return(
            setTimePeriod(value)
          ) 
          
         
        
        }}
      >
        {time.map((timeline) => (
          <Option key={timeline}>{timeline}</Option>
        ))}
      </Select>
     {/* line chart */}
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}></LineChart>
      {/* coin stats */}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ icon, title, value, id }) => (
            <Col key={id} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        {/* other coins stats */}
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value, id }) => (
            <Col key={id} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      {/* coin description - which is in html so we parse it using Html React Parser */}
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
          </Title>
          {Parser(cryptoDetails.description)}
        </Row>
        {/* every links for coin's detail */}
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
}

export default CryptoDetail;