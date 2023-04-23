import { Clear } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { mobile } from "../../responsive";
import { useState } from "react";
import callApi from "../../apicaller";

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
const Textarea = styled.textarea`
  flex: 1;
  margin: 10px 0px 0px 0px;
  padding: 10px;
  width: 50px;
  height: 40px;
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
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 40px;
  height: 76vh;
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
const SummaryItemText = styled.span`
`;
const SummaryItemPrice = styled.span`
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Input = styled.input`
  flex: 1;
  margin: 10px 10px 0px 0px;
  padding: 10px;
  width: 50px;
  height: 20px;
  text-align: center;
`;
const Cart = () => {

  const items = JSON.parse(localStorage.getItem("item")) || []
  const [totalPrice, setTotalPrice] = useState(items?.reduce((a, b) => a + b.price, 0));

  const clearAllItem = () => {
    localStorage.removeItem('item');
    window.location.reload();
  }

  const removeItem = (id) => {
    const newItems = items.filter(item => item._id !== id)
    localStorage.setItem("item", JSON.stringify(newItems));
    window.location.reload();
  }

  const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const user = JSON.parse(localStorage.getItem("user"))

  const [detailBill, setDetailBill] = useState('')
  const handleAdd = () => {
    const _items = items.map(item => {
      return {
        ...item,
        amount: document.getElementById(item.id).value
      };
    });
    const dataAdd = {
      totalPrice: totalPrice + totalPrice * 10 / 100 + 50000,
      product: _items,
      customer: user.id,
      description: detailBill
    };
    callApi('bills', 'post', dataAdd)
    const minusQuantity = items.map(item => {
      return {
        ...item,
        amount: item.amount - Number(document.getElementById(item.id).value)
      };
    });
    minusQuantity.map(item => {
      callApi(`products/${item.id
        }`, 'put', item);
    })
    localStorage.removeItem('item');
    window.location.reload();
  }

  const onChangeQty = () => {
    let totalVal = 0;
    for (let i = 0; i < items.length; i++) {
      totalVal = totalVal + (items[i].price * (window.document.getElementById(items[i].id).value))
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
                        <Input type="number" id={product.id} size="large" defaultValue={1} min={1} max={product.amount} onChange={() => onChangeQty()} />
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
            <SummaryTitle>HÓA ĐƠN</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Thuế (10%)</SummaryItemText>
              <SummaryItemPrice>{numberFormat.format(totalPrice * 10 / 100)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Phí giao hàng</SummaryItemText>
              <SummaryItemPrice>{numberFormat.format(50000)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Giảm giá</SummaryItemText>
              <SummaryItemPrice>{numberFormat.format(0)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Trang phục</SummaryItemText>
              <SummaryItemPrice>{numberFormat.format(totalPrice)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Tổng</SummaryItemText>
              <SummaryItemPrice>{numberFormat.format(totalPrice + totalPrice * 10 / 100 + 50000)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <Textarea value={detailBill} onChange={(e) => setDetailBill(e.target.value)} placeholder="Ghi chú cho đơn hàng ..." />
            </SummaryItem>
            <Button onClick={handleAdd}>ĐẶT HÀNG NGAY</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
