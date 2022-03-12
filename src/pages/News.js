import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Row, Select, Col, Typography, Card, Avatar, } from 'antd';
import moment from 'moment';
import Loader from '../component/Loader';
 


const News = ({only6}) => {

  const [cryptoSelect, setCryptoSelect] = useState("Cryptocurrency")
  
  const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({newsCategory: cryptoSelect, uptoCount: only6? 6 : 15})
  const {data} = useGetCryptosQuery(100) 
  
  const {Title, Text} = Typography
  const demoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mdGN5s8oseLHmPyP9HqXw6FdYF8Aa0-b6Q&usqp=CAU"

  if(isFetching){
   return <Loader />
  }
  
  return (
    <>
    
    <Row gutter={[24, 24]}>
    {!only6 && <Col span={24}>
    <Select className="select-news"
      showSearch
      placeholder = "Select a cryptocurrency"
      optionFilterProp="children"
      onChange={(value) => setCryptoSelect(value)}
      filterOption = {(input, option )=> option.children.toLowerCase().indexOf(input.toLowerCase())} 
    >
      <Select.Option value="Cryptocurrency">
       All Cryptocurrency
      </Select.Option>
      {data?.data?.coins.map((coin)=>{
        return <Select.Option key = {coin.uuid} value={coin.name}>
        {coin.name}
      </Select.Option>
      })}
      </Select></Col>}
      {cryptoNews?.value?.map((news, index)=>{
        const{name, url, description, provider, datePublished, image} = news
        const {image:providerImage, name: providerName} = provider[0]

        return <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="new-title" level={4}>{name}</Title>
                <img  style = {{maxHeight:100, maxWidth:100}} src={image?.thumbnail?.contentUrl || demoUrl} alt="" />
                </div>
                <p>
                  {description.length>100 ? `${description.substring(0,100)}...`:description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={providerImage?.thumbnail?.contentUrl||demoUrl} alt={providerName} />
                    <Text className='provider-name'>{providerName}</Text>
                  </div>
                 <Text>{moment(datePublished).startOf("ss").fromNow()}</Text>
                </div>
                </a>
            </Card>
          </Col>
      })}
    </Row>
    </>
  )
}

export default News