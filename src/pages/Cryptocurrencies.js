import React, { useEffect,  useState } from 'react';
import millify from 'millify';
import {Row, Col, Card, Typography} from "antd";
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import Loader from '../component/Loader';


const Cryptocurrencies = ({only10}) => {
  const uptoCount = only10? 10:100;
  const {data: cryptoCoinsList , isFetching} = useGetCryptosQuery(uptoCount);
  const [cryptoCoins, setCryptoCoins] =useState([])
  const [searchText, setSearchText] = useState("")
 


 useEffect(()=>{
  //  setCryptoCoins(cryptoCoinsList?.data?.coins)
   const filtered = cryptoCoinsList?.data?.coins.filter((cryptoCoin)=>{ 
    
    return cryptoCoin.name.toLowerCase().includes(searchText.toLowerCase())
   })
   
  
    setCryptoCoins(filtered)

     
  
 },[cryptoCoinsList, searchText])

  if(isFetching){
    return <Loader />
  }
  
   if(cryptoCoins?.length < 1){
     return<> 
     <div className="search-crypto">
     <input  placeholder="Search Cryptocurrency" onChange={(e)=>{
      setSearchText(e.target.value)
     }}/>
   </div>
     <Typography.Title level={2} style={{textAlign:"center"}}>Sorry Matching Cryptocurrency Not Found!</Typography.Title>
     </>
   }
  // console.log(cryptoCoinsList);

  return (
   <>
   {!only10 && <div className="search-crypto">
     <input placeholder="Search Cryptocurrency" style={{padding:"5px", border: "1px solid #ccc", borderRadius:"10px", display: "inline-block", }} onChange={(e)=>{
      setSearchText(e.target.value)
     }}/>
   </div>}
   <Row gutter={[32,32]}>
     {cryptoCoins?.map((cryptoCoin)=>{
       const {uuid, name, rank, price, iconUrl, change, marketCap}=cryptoCoin
       return <Col xs={24} sm={12} lg={6} className="crypto-card" key={uuid}>
         <Link to={`/cryptocurrencies/${uuid}`}>
        
         <Card title={`${rank }. ${ name }`} extra={
           <img src = {iconUrl} alt={name} className="crypto-image"></img>
           
         } hoverable>
           <p><strong>Price: ₹ </strong>{millify(price)}</p>
           <p><strong>Market Cap:</strong> {millify(marketCap)} </p>
           <p><strong>Daily Change:</strong> {millify(change)}%</p>
           </Card>
         </Link>
       </Col>
     })}
     </Row>
   </>
  )
}

export default Cryptocurrencies