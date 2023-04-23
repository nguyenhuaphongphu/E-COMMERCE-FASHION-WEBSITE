import styled from "styled-components";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { mobile } from "../../responsive";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import callApi from "../../apicaller";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { Tag } from 'antd';
import moment from 'moment';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
  width: 385px;
  aspect-ratio: auto 385 / 580;
  height: 580px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 30px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  ${mobile({ width: "100%" })}
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
  margin-bottom: 25px;

`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Textarea = styled.textarea`
  flex: 1;
  margin: 10px 0px 0px -8px;
  padding: 10px;
  width: 291px;
  height: 40px;
`;
const ButtonComment = styled.button`
  padding: 10px;
  background-color: black;
  color: white;
  margin: 10px 0px 0px -10px;
`;
const DivShowComment = styled.div`
width:530px;
height:200px;
overflow-x:hidden;
overflow-y:auto;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

var dataStorage = JSON.parse(localStorage.getItem("item")) || [];
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
const addDataStorege = (products) => {
  dataStorage.push(products)
  dataStorage = dataStorage.filter(onlyUnique);
  localStorage.setItem("item", JSON.stringify(dataStorage));
}

export default function Product() {
  const { id } = useParams();
  const [data, setData] = useState('');
  const [value, setValue] = useState(0);
  const [valueComment, setValueComment] = useState(0);
  const [valueRating, setValueRating] = useState(1);
  const [commentCustomer, setCommentCustomer] = useState('');
  const [dataComment, setDataComment] = useState([]);
  const [customerId, setCustomerId] = useState([]);

  useEffect(() => {
    callApi('comments', 'get', null).then(res => {
      setDataComment(res.data)
    });
    callApi(`products/${id}`, 'get', null).then(res => {
      setData(res.data)
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeComment = (event, newValue) => {
    setValueComment(newValue);
  };

  const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const user = JSON.parse(localStorage.getItem("user"))

  const handleAddComment = () => {
    const dataAdd = {
      product: data,
      star: valueRating,
      customer: user.id,
      comment: commentCustomer,
    };
    callApi('comments', 'post', dataAdd).then(res => {
      window.location.reload();
    })
  }

  const commentByID = dataComment && dataComment.filter(comment => {
    return id === comment.product?.id
  })

  const [customerName, setCustomerName] = useState('');
  const detailComment = (oj) => {
    callApi(`api/auth/${oj.customer}`, 'get', null).then(res => {
      setCustomerName(res.data.fullname)
    })
    return (
      <>
        <p style={{ fontSize: 'small', marginLeft: -8 }}>{moment.utc(oj.time).format('DD/MM/YYYY')}</p>
        <Stack style={{ marginLeft: -11 }} className="div_left">
          <Rating name="size-large" value={oj.star} size="small" readOnly />
        </Stack>
        <p style={{ marginLeft: -8 }}><b>{customerName}</b>: {oj.comment}</p>
      </>
    )
  }

  return (
    <>
      <Container>
        <Navbar />
        <Hr />
        <Wrapper>
          <ImgContainer>
            <Image src={data.image?.[0]} />
          </ImgContainer>
          <InfoContainer>
            <Title>{data.name}</Title>
            <div style={{ marginTop: 20 }}>
              {data.tag?.map(tag => {
                return (
                  <Tag color="blue">{tag}</Tag>
                )
              })}
            </div>
            <Desc>
              {data.description}
            </Desc>
            <Price>{numberFormat.format(data.price)}</Price>
            <AddContainer>
              <Button onClick={() => addDataStorege(data)}>ADD TO CART</Button>
            </AddContainer>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Loại sản phẩm" {...a11yProps(0)} />
                  <Tab label="Thương Hiệu" {...a11yProps(1)} />
                  <Tab label="Nhà cung cấp" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                {data.type}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {data.brand}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {data.supplier}
              </TabPanel>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={valueComment} onChange={handleChangeComment} aria-label="basic tabs example">
                  <Tab label="Bình luận" {...a11yProps(0)} />
                  <Tab label="Xem các bình luận" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={valueComment} index={0} className="container_swap">
                <Stack style={{ marginLeft: -11 }} className="div_left">
                  <Rating name="size-large" onClick={(e) => setValueRating(e.target.value)} defaultValue={1} size="large" />
                </Stack>
                <Textarea value={commentCustomer} onChange={(e) => setCommentCustomer(e.target.value)} placeholder="Bình luận cho sản phẩm ..." />
                <br />
                <ButtonComment className="div_right" onClick={handleAddComment}>Đăng bình luận</ButtonComment>
              </TabPanel>
              <DivShowComment>
                {commentByID && commentByID.slice(0).reverse().map((comment) => {
                  return (
                    <TabPanel value={valueComment} index={1}>
                      {detailComment(comment)}
                    </TabPanel>
                  )
                })}
              </DivShowComment>
            </Box>
          </InfoContainer>
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};
