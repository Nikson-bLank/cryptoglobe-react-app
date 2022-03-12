import { Typography, Col, Row } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    const timeStamp = coinHistory?.data?.history[i].timestamp * 1000;
    coinTimeStamp.push(new Date(timeStamp).toLocaleDateString("en-IN"));
  }

  //  console.log(coinTimeStamp,coinPrice)

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in INR",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  // const options = {
  //   scales: {
  //     y: {
  //       ticks: {
  //         beginAtZero: true,
  //       },
  //     },
  //   },
  // };

  return (
    <>
      <Row className="chart-header">
        <Typography.Title className="chart-title" level={2}>
          {coinName}
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Typography.Title>
          <Typography.Title level={5} className="current-price">
            Current {coinName} price: ₹ {currentPrice} 
          </Typography.Title>
        </Col>
      </Row>
      
      <Line data={data} ></Line>
    </>
  );
};



export default LineChart;
