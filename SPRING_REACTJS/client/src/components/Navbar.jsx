import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { useEffect } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import callApi from '../apicaller';
import { Drawer,Row,Col } from 'antd';
import validator from 'validator';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Center = styled.div`
  flex: 2;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem1 = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  
`;
const Input = styled.input`
  flex: 1;
  margin: 20px 10px 20px 0px;
  padding: 10px;
`;
const Button = styled.button`
  margin: 30px 10px 20px 155px;
  width: 20%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  padding: 10px;
`;
const TextInfor = styled.p`
  padding : 10px;
  font-size: medium;
`;
const TextInforErr = styled.p`
color: red;
font-style: italic;
font-size: small;
text-align: center;
`;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 360,
  bgcolor: 'background.paper',
  p: 4,
};

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [information, setInformation] = useState('');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function logOut() {
    localStorage.clear()
    navigate('/')
  }

  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState();

  // useEffect(() => {
  //   setInterval(() => {
  //     setCount(JSON.parse(localStorage.getItem("item"))?.length || 0)
  //   }, 2000)
  //   callApi('admins', 'get', null).then(res => {
  //     setData(res.data)
  //   });
  //   callApi('customers', 'get', null).then(res => {
  //     setDataUser(res.data)
  //   });
  // }, [information])

  function backHome() {
    navigate('/')
  }

  const user = JSON.parse(localStorage.getItem('user')) || ''

  const [openChange, setOpenChange] = useState(false);
  const handleOpenChange = () => setOpenChange(true);
  const handleCloseChange = () => setOpenChange(false);
  const [nameCustomerChange, setNameCustomerChange] = useState('');
  const [sdtCustomerChange, setSDTCustomerChange] = useState('');
  const [emailCustomerChange, setEmailCustomerChange] = useState('');
  const [addressCustomerChange, setAddressCustomerChange] = useState('');
  const [accountCustomerChange, setAccountCustomerChange] = useState('');
  const [passwordCustomerChange, setPasswordCustomerChange] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    if (nameCustomerChange === '' || sdtCustomerChange === '' || emailCustomerChange === '' || addressCustomerChange === '' || accountCustomerChange === '' || passwordCustomerChange === '') {
      setInformation("Vui lòng nhập đầy đủ thông tin !")
    } else if (validator.isEmail(emailCustomerChange) === false) {
      setInformation('Email không hợp lệ !')
    } else if (dataUser.find(el => el.email === emailCustomerChange) || data.find(el => el.email === emailCustomerChange)) {
      setInformation('Email đã được đăng ký!')
    } else if (dataUser.find(el => el.phone === sdtCustomerChange) || data.find(el => el.phone === sdtCustomerChange)) {
      setInformation('Số điện thoại bị trùng khớp !')
    } else if (dataUser.find(el => el.account === accountCustomerChange) || data.find(el => el.account === accountCustomerChange)) {
      setInformation('Tài khoản đã được sử dụng !')
    }
    const changeData = {
      name: nameCustomerChange,
      phone: sdtCustomerChange,
      email: emailCustomerChange,
      address: addressCustomerChange,
      account: accountCustomerChange,
      password: passwordCustomerChange,
    };
    callApi(`customers/${user.id}`, 'put', changeData)
    localStorage.clear()
    navigate('/login')
  }

  function login() {
    if (localStorage.getItem('user')) {
      return (
        <>
          <MenuItem1>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={showDrawer}>Thông tin cá nhân</MenuItem>
              <MenuItem onClick={() => handleOpenChange()}>Thay đổi thông tin</MenuItem>
              <Link to='/historybought' style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem>Lịch sử mua hàng</MenuItem>
              </Link>
              <MenuItem onClick={logOut}>Đăng xuất</MenuItem>
            </Menu>
          </MenuItem1>
          <MenuItem1>
            <Link to='/cart' style={{ textDecoration: 'none', color: 'black' }}>
              <Badge
                badgeContent={count} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem1>
        </>
      )
    } if (localStorage.getItem('admin')) {
      return (
        <>
          <MenuItem1>XIN CHÀO: {JSON.parse(localStorage.getItem("admin")).name}</MenuItem1>
          <MenuItem1 onClick={logOut}>Đăng xuất</MenuItem1>
        </>
      )
    } else return (
      <>
        <MenuItem1><Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>ĐĂNG NHẬP</Link></MenuItem1>
        <MenuItem1><Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>ĐĂNG KÝ</Link></MenuItem1>
      </>
    )
  }

  return (
    <>
      <Container>
        <Wrapper>

          <Center>
            <Logo onClick={backHome}>P&P SHOP</Logo>
          </Center>
          <Right>
            {login()}
          </Right>
        </Wrapper>
      </Container>
      <Modal
        open={openChange}
        onClose={handleCloseChange}
      >
        <Box sx={style}>
          <Title>Thay đổi thông tin</Title>
          <Form>
            <Input placeholder="Họ tên khách hàng"
              onChange={e => setNameCustomerChange(e.target.value)} />
            <Input placeholder="Số điện thoại"
              onChange={e => setSDTCustomerChange(e.target.value)} />
            <Input placeholder="Địa chỉ"
              onChange={e => setAddressCustomerChange(e.target.value)} />
            <Input placeholder="Email"
              onChange={e => setEmailCustomerChange(e.target.value)} />
            <Input placeholder="Tài khoản"
              onChange={e => setAccountCustomerChange(e.target.value)} />
            <Input
              type='password'
              placeholder="Mật khẩu"
              onChange={e => setPasswordCustomerChange(e.target.value)} />
            <Button onClick={handleChange}>Đồng ý</Button>
          </Form>
          <TextInforErr>{information}</TextInforErr>
        </Box>
      </Modal>

      <Drawer title="Thông tin cá nhân" placement="left" onClose={onClose} open={open}>
        <TextInfor><b>Họ và Tên : </b>{user.name}</TextInfor>
        <TextInfor><b>Số điện thoại : </b>{user.phone}</TextInfor>
        <TextInfor><b>Email : </b>{user.email}</TextInfor>
        <TextInfor><b>Địa chỉ : </b>{user.address}</TextInfor>
        <TextInfor><b>Tên tài khoản : </b>{user.account}</TextInfor>
      </Drawer>

    </>
  );
};
