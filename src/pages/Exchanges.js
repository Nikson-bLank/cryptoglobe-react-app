import React from "react";
import { Typography, Collapse, Row, Col, Avatar, Progress } from "antd";
import { useGetCryptoExchangeQuery } from "../services/cryptoExchangeApi";
import millify from "millify";
import Loader from "../component/Loader";

const Exchanges = () => {
  const { data, isFetching } = useGetCryptoExchangeQuery();
  console.log(data);
  const { Panel } = Collapse;

  if (isFetching) {
    return <Loader></Loader>;
  }

  return (
    <>
      <Col span={24}>
        <Row>
          <Col span={2}>
            <strong>#Ranks</strong>
          </Col>
          <Col span={6}>
            <strong>Exchanges</strong>
          </Col>
          <Col span={4}>
            <strong>24h Trade Volume</strong>
          </Col>
          <Col span={4}>
            <strong>Trust Score</strong>
          </Col>
          <Col span={4}>
            <strong>Website</strong>
          </Col>
        </Row>
      </Col>
      {/* <hr style={{margin:"10px"}}></hr> */}
      <Row>
        {data?.map((exchanges) => {
          const {
            id,
            name,
            image,
            description,
            trade_volume_24h_btc: volume,
            trust_score,
            trust_score_rank: rank,
            url,
          } = exchanges;

          return (
            <Col span={24} key={id}>
              <Collapse>
                <Panel
                  key={id}
                  showArrow={false}
                  header={
                    <>
                      <Col span={2}>
                        <Typography.Text>{rank}</Typography.Text>
                      </Col>
                      <Col span={6}>
                        <Avatar className="exchange-image" src={image} />
                        <Typography.Text>
                          <strong>{name}</strong>
                        </Typography.Text>
                      </Col>
                      <Col span={4}>{millify(volume)}</Col>
                      <Col style={{ marginRight: "15px" }} span={4}>
                        <strong>
                          <Progress
                            percent={trust_score * 10}
                            format={(percent) => percent / 10}
                            strokeColor="#0071bd"
                          />
                        </strong>
                      </Col>
                      <Col span={6}>
                        <a href={url} target="_blank" rel="noreferrer">
                          {url}
                        </a>
                      </Col>
                    </>
                  }
                >
                  {description || (
                    <Typography.Text>Sorry! No data Available</Typography.Text>
                  )}
                </Panel>
              </Collapse>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Exchanges;
