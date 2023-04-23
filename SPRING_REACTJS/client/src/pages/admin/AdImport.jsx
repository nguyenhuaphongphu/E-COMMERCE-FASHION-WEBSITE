import { Clear } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { mobile } from "../../responsive";
import { useState, useEffect } from "react";
import callApi from "../../apicaller";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const Input = styled.input`
  flex: 1;
  margin: 10px 10px 0px 0px;
  padding: 10px;
  width: 50px;
  height: 20px;
  text-align: center;
`;
const CenterButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 130px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span`
margin-top: -60px
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Select = styled.select`
flex: 1;
margin-top: 20px;
padding: 10px;
padding-right: 100px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 40px;
  height: 65vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const AdImport = () => {
  const [supplier, setSupplier] = useState([])
  const [supplierAdd, setSupplierAdd] = useState()
  const [discountPrice, setDiscountPrice] = useState(0)
  useEffect(() => {
    callApi('suppliers', 'get', null).then(res => {
      setSupplier(res.data)
    })
  }, [])

  const items = JSON.parse(localStorage.getItem("products")) || []

  const clearAllItem = () => {
    localStorage.removeItem('products');
    window.location.reload();
  }

  const removeItem = (id) => {
    const newItems = items.filter(item => item.id !== id)
    localStorage.setItem("products", JSON.stringify(newItems));
    window.location.reload();
  }

  const [totalPrice, setTotalPrice] = useState(0);

  const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const handleAdd = () => {
    const _items = items.map(item => {
      return {
        ...item,
        price: document.getElementsByName(item.id)[0].value,
        amount: document.getElementById(item.id).value
      };
    });
    let _supplier = supplier.find(supplier => supplier.id === supplierAdd)
    const dataAdd = {
      totalPrice: totalPrice + 50000 - discountPrice,
      product: _items,
      supplier: _supplier,
    };
    callApi('importOrders', 'post', dataAdd)
    const _itemsAdd = items.map(item => {
      return {
        ...item,
        amount: item.amount + Number(document.getElementById(item.id).value)
      };
    });
    _itemsAdd.map(item=>{
      callApi(`products/${
        item.id
      }`, 'put', item);
    })
    localStorage.removeItem('products');
    window.location.reload();
  }

  const onChangeQty = () => {
    let totalVal = 0;
    for (let i = 0; i < items.length; i++) {
      totalVal = totalVal + ((document.getElementsByName(items[i].id)[0].value) * (document.getElementById(items[i].id).value))
    }
    setTotalPrice(totalVal);
  }
  
  return (
    <Container>
      <Navbar />
      <Hr />
      <Wrapper>
        <Top>
          <CenterButton onClick={clearAllItem}>XÓA TẤT CẢ SẢN PHẨM</CenterButton>
        </Top>
        <Bottom>
          <Info>
            {items.map((product) => {
              return (
                <>
                  <Product key={product.id}>
                    <ProductDetail>
                      <Clear onClick={() => removeItem(product.id)} />
                      <Image src={product.image[0]} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.id}
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Input id={product.id} min='1' type='number' defaultValue='1' onClick={() => onChangeQty()} />
                      </ProductAmountContainer>
                      <Box
                        component="form"
                        sx={{
                          '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField name={product.id} label="Giá nhập hàng" variant="standard" onChange={() => onChangeQty()} />
                      </Box>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </>
              )
            })}
          </Info>
          <Summary>
            <SummaryTitle>ĐƠN NHẬP HÀNG</SummaryTitle>
            <Select onChange={e => setSupplierAdd(e.target.value)}>
              <option selected hidden>Nhà cung cấp</option>
              {supplier.map((supplier) => {
                return (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                );
              })}
            </Select>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { width: '33ch', marginTop: 1.5 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField label="Giá được giảm" variant="standard" onChange={(e) => setDiscountPrice(e.target.value)} />
            </Box>
            <SummaryItem>
              <SummaryItemText>Phí nhập</SummaryItemText>
              <SummaryItemPrice>{numberFormat.format(50000)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Tiền hàng</SummaryItemText>
              <SummaryItemPrice>{numberFormat.format(totalPrice)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Tổng</SummaryItemText>
              <SummaryItemPrice>{numberFormat.format(totalPrice + 50000 - discountPrice)}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleAdd}>NHẬP HÀNG NGAY</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default AdImport;
