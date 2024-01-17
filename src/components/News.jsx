import React, {  useState } from 'react';
import {
  Select, Typography, Row, Col, Avatar, Card,
} from 'antd';
import moment from 'moment';
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi.js';
import { useGetCryptosQuery } from '../services/cryptoApi.js';
import Loader from './Loader.jsx';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({simplified}) => {

	const [categories, setNewsCategory] = useState('')

  const { data: cryptoNews, isFetching } = useGetCryptosNewsQuery({ categories});

  const { data } = useGetCryptosQuery(100);

  console.log('Fetched Data:', cryptoNews);

  if(isFetching) return <Loader/>; 

  // useEffect(() => {
  //   console.log('Fetched Data:', cryptoNews);
  // }, [cryptoNews]);

  return (
   <Row gutter={[24, 24]}>

{
				!simplified && (
					<Col span={24}>
						<Select
							showSearch
							className="selet-news"
							placeholder="Select a Crypto"
							optionFilterProp="children"
							onChange={(value) => setNewsCategory(value)}
							filterOption={
								(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)
							}
						>
							<Option value="BTC">Cryptocurrency</Option>
							{
								data?.data?.coins
									.map((coin) => <Option key={coin.uuid} value={coin.name}>{coin.name}</Option>)
							}

						</Select>
					</Col>
				)
			}

    {cryptoNews.Data.map((news, i)=>(
      <Col xs={24} sm={12} lg={8} key={i}>

            <Card hoverable className='news-card'>
              <a href={news.url} target="_blank" rel="noreferrer">

                <div className="news-image-container">
                  <Title className='news-title' level={4}>{news.title}</Title>
                  <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news.imageurl} alt={news.title}/>
                </div>

                <p>
                {
										news.body.length > 150
											? `${news.body.substring(0, 150)} ...`
											: news.body
									}
                </p>

                <div className="provider-container">
                <div>

                  <Avatar src={news.source_info.img} alt=''></Avatar>
                  <Text className='provider-name'>{news.source_info.name}</Text>
                </div>
                <Text>{moment(news.published_on * 1000).fromNow()}</Text>


                </div>
              </a>
            </Card>
      </Col>
    ))} 
   </Row>
  // <div>news</div>
  );
};

export default News;
