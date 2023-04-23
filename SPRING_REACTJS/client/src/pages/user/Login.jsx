import { useEffect, useState } from 'react';
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useNavigate } from "react-router-dom";
import callApi from "../../apicaller";
import { Link } from "react-router-dom";
import { message } from 'antd';
import { CallEndRounded } from '@mui/icons-material';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;
const Link1 = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

export default function Login() {
  const [TaiKhoan, setTaiKhoan] = useState('');
  const [MatKhau, setMatKhau] = useState('');
  const [AccessToken, setDataUser] = useState('');
  // useEffect(() => {
  //   callApi('customers', 'get', null).then(res => {
  //     setUserTaiKhoan(res.data)
  //   });
  //   callApi('admins', 'get', null).then(res => {
  //     setAdminTaiKhoan(res.data)
  //   });
  // }, []);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataAdd = {
      username: TaiKhoan,
      password: MatKhau
    };
    callApi('api/auth/signin', 'post', dataAdd).then(res => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      if (JSON.parse(localStorage.getItem("user")).roles.includes("ROLE_USER")) {
        navigate("/productlist")
        message.success(` Chào khách hàng đến với P&P shop `);
      } else {
          navigate("/adproduct")
        message.success(`Chào quản trị viên  của P&P shop `);
      }
    }).catch(error => {
      message.warning('Tài khoản hoặc mật khẩu không đúng !');
      console.log(error);
    })
  };
  // const testApi = (event) => {
  //   event.preventDefault();
  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken);
  //   var requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   };
  //   fetch("http://localhost:8080/api/test/admin", requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // };
  return (
    <Container>
      <Wrapper>
        <Title>ĐĂNG NHẬP</Title>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="Tài khoản" onChange={(e) => setTaiKhoan(e.target.value)} />
          <Input placeholder="Mật khẩu" type="password" onChange={(e) => setMatKhau(e.target.value)} />
          <Button onClick={handleSubmit}>ĐĂNG NHẬP</Button>
          <Link1><Link to='/register' style={{ color: 'black' }}>TẠO TÀI KHOẢN MỚI</Link></Link1>
        </Form>
      </Wrapper>
    </Container>
  );
};
