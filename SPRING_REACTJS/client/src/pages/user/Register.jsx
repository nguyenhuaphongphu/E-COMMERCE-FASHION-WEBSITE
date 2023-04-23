import styled from "styled-components";
import { mobile } from "../../responsive";
import callApi from "../../apicaller";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Button } from 'antd';
import validator from 'validator'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  heigth: 20px
`;

const Register = () => {
  const [dataAdmin, setDataAdmin] = useState();
  const [dataUser, setDataUser] = useState();

  const navigate = useNavigate();
  const [nameCustomerAdd, setNameCustomerAdd] = useState('');
  const [sdtCustomerAdd, setSDTCustomerAdd] = useState('');
  const [emailCustomerAdd, setEmailCustomerAdd] = useState('');
  const [addressCustomerAdd, setAddressCustomerAdd] = useState('');
  const [accountCustomerAdd, setAccountCustomerAdd] = useState('');
  const [passwordCustomerAdd, setPasswordCustomerAdd] = useState('');
  const handleAdd = () => {
    if (nameCustomerAdd === '' || sdtCustomerAdd === '' || emailCustomerAdd === '' || addressCustomerAdd === '' || accountCustomerAdd === '' || passwordCustomerAdd === '') {
      message.warning('Vui lòng nhập đầy đủ thông tin !');
    } else if (validator.isEmail(emailCustomerAdd) === false) {
      message.warning('Email không hợp lệ !');
    } else {
      const dataAdd = {
        fullname: nameCustomerAdd,
        phone: sdtCustomerAdd,
        email: emailCustomerAdd,
        address: addressCustomerAdd,
        username: accountCustomerAdd,
        password: passwordCustomerAdd,
      };
      callApi('api/auth/signup', 'post', dataAdd)
      navigate('/login')
    }
  }
  return (
    <Container>
      <Wrapper>
        <Title>TẠO TÀI KHOẢN</Title>
        <Form>
          <Input placeholder="Tên khách hàng"
            onChange={e => setNameCustomerAdd(e.target.value)} />
          <Input placeholder="Số điện thoại"
            onChange={e => setSDTCustomerAdd(e.target.value)} />
          <Input placeholder="Địa chỉ"
            onChange={e => setAddressCustomerAdd(e.target.value)} />
          <Input placeholder="Email"
            onChange={e => setEmailCustomerAdd(e.target.value)} />
          <Input placeholder="Tài khoản"
            onChange={e => setAccountCustomerAdd(e.target.value)} />
          <Input
            type='password'
            placeholder="Mật khẩu"
            onChange={e => setPasswordCustomerAdd(e.target.value)} />
          <Button
            style={{
              width: 100,
              border: 'none',
              backgroundColor: 'teal',
              color: 'white',
              cursor: 'pointer',
              marginTop: 20,
              height: 40
            }}
            onClick={handleAdd}>ĐỒNG Ý
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
