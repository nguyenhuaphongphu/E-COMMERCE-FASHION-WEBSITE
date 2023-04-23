import styled from "styled-components";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { mobile } from "../../responsive";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import callApi from "../../apicaller";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Input = styled.input`
  flex: 1;
  margin: 10px 10px 0px 0px;
  padding: 10px;
  width: 50px;
  height: 20px;
  text-align: center;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;
const Info = styled.div`
  flex: 2.5;
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
const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1.5;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 40px;
  height: 68vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
  text-align: center
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span`
font-weight: 600;
`;
const SummaryItemPrice = styled.span``;
const DetailBill = () => {
    const { id } = useParams();
    const [data, setData] = useState('');
    useEffect(() => {
        callApi(`importOrders/${id}`, 'get', null).then(res => {
            setData(res.data)
        });
    }, []);

    const numberFormat = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });


    return (
        <Container>
            <Navbar />
            <Hr />
            <Wrapper>
                <Bottom>
                    <Info>
                        {(data.product)?.map((product, index) => {
                            return (
                                <>
                                    <Product>
                                        <ProductDetail>
                                            <Image src={(product.image)[0]} />
                                            <Details>
                                                <ProductName>
                                                    <b>Tên sản phẩm: </b> {product.name}
                                                </ProductName>
                                            </Details>
                                        </ProductDetail>
                                        <PriceDetail>
                                            <ProductAmountContainer>
                                                <Input value={product.amount} type='text' />
                                            </ProductAmountContainer>
                                            <ProductPrice>
                                                {numberFormat.format(product.price)}
                                            </ProductPrice>
                                        </PriceDetail>
                                    </Product>
                                    <Hr />
                                </>
                            )
                        })}
                    </Info>
                    <Summary>
                        <SummaryTitle>HÓA ĐƠN NHẬP</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Tên nhà cung cấp :</SummaryItemText>
                            <SummaryItemPrice>{(data.supplier)?.name}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Số điện thoại :</SummaryItemText>
                            <SummaryItemPrice>{(data.supplier)?.phone}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Địa chỉ :</SummaryItemText>
                            <SummaryItemPrice>{(data.supplier)?.address}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Email :</SummaryItemText>
                            <SummaryItemPrice>{(data.supplier)?.email}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Tổng</SummaryItemText>
                            <SummaryItemPrice>{numberFormat.format(data.totalPrice)}</SummaryItemPrice>
                        </SummaryItem>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    );
};

export default DetailBill;
