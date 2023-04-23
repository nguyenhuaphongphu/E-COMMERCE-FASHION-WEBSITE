import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu,Drawer } from 'antd';
import { useState } from 'react';
import styled from "styled-components";
import {
  AlignCenterOutlined,
  BarChartOutlined,
  BarsOutlined,
  FileImageOutlined,
  ImportOutlined,
  CommentOutlined,
  HddOutlined,
  LogoutOutlined,
  SearchOutlined,
  SolutionOutlined,
  AppstoreOutlined,
  TeamOutlined,
  SkinOutlined,
  UserOutlined,
  SelectOutlined
} from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const TextBrand = styled.div`
background: #001529;
color: white;
font-weight: 800;
font-size: 30px;
text-align: center;
padding-top: 20px;
padding-bottom: 10px;
`;
const TextInfor = styled.p`
  padding : 10px;
  font-size: medium;
`;


const NavbarAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const itemsAdmin = [
    getItem('Thông tin cá nhân', 'sub1', <AlignCenterOutlined />, [
      getItem('Xem chi tiết', '12', <Link onClick={showDrawer}><SearchOutlined /></Link>),
      getItem('Đăng xuất', '13', <Link to="/" onClick={logOut}><LogoutOutlined /></Link>),
    ]),
    getItem('Thư viện ảnh', 'sub2', <AlignCenterOutlined />, [
      getItem('Đồ bộ', '15', <Link to="/photolibrarysuits"><LogoutOutlined /></Link>),
      getItem('Quần', '16', <Link to="/photolibrarypants"><LogoutOutlined /></Link>),
      getItem('Áo', '17', <Link to="/photolibraryshirts"><LogoutOutlined /></Link>),
      getItem('Phụ kiện', '18', <Link to="/photolibrarysnippets"><LogoutOutlined /></Link>),
      getItem('Khác', '19', <Link to="/photolibraryothers"><LogoutOutlined /></Link>),
    ]),
    getItem('Sản Phẩm', '1', <Link to='/adproduct'><BarsOutlined /></Link>),
    getItem('Hóa Đơn', '2', <Link to='/bill'><SolutionOutlined /></Link>),
    getItem('Đơn Nhập Hàng', '3', <Link to='/importorder'><ImportOutlined /></Link>),
    getItem('Bình Luận', '4', <Link to='/comment'><CommentOutlined /></Link>),
    getItem('Thẻ', '5', <Link to='/tag'><AppstoreOutlined /></Link>),
    getItem('Thương Hiệu', '6', <Link to='/brand'><SkinOutlined /></Link>),
    getItem('Loại Sản Phẩm', '7', <Link to='/producttype'><HddOutlined /></Link>),
    getItem('Nhà cung cấp', '8', <Link to='/supplier'><SelectOutlined /></Link>),
    getItem('Khách Hàng', '9', <Link to='/customer'><TeamOutlined /></Link>),
    getItem('Quản Trị Viên', '10', <Link to='/admin'><UserOutlined /></Link>),
    getItem('Thống kê doanh thu', '11', <Link to='/adstatictical'><BarChartOutlined /></Link>),
  ];
  const itemsUpdate = [
    getItem('Thông tin cá nhân', 'sub1', <AlignCenterOutlined />, [
      getItem('Xem chi tiết', '12', <Link onClick={showDrawer}><SearchOutlined /></Link>),
      getItem('Đăng xuất', '14', <Link to="/" onClick={logOut}><LogoutOutlined /></Link>),
    ]),
    getItem('Thư viện ảnh', 'sub2', <AlignCenterOutlined />, [
      getItem('Đồ bộ', '15', <Link to="/photolibrarysuits"><LogoutOutlined /></Link>),
      getItem('Quần', '16', <Link to="/photolibrarypants"><LogoutOutlined /></Link>),
      getItem('Áo', '17', <Link to="/photolibraryshirts"><LogoutOutlined /></Link>),
      getItem('Phụ kiện', '18', <Link to="/photolibrarysnippets"><LogoutOutlined /></Link>),
      getItem('Khác', '19', <Link to="/photolibraryothers"><LogoutOutlined /></Link>),
    ]),
    getItem('Sản Phẩm', '1', <Link to='/adproduct'><BarsOutlined /></Link>),
    getItem('Đơn Nhập Hàng', '3', <Link to='/importorder'><ImportOutlined /></Link>),
    getItem('Bình Luận', '4', <Link to='/comment'><CommentOutlined /></Link>),
    getItem('Thẻ', '5', <Link to='/tag'><AppstoreOutlined /></Link>),
    getItem('Loại Sản Phẩm', '7', <Link to='/producttype'><HddOutlined /></Link>),
  ];
  const itemsSell = [
    getItem('Thông tin cá nhân', 'sub1', <Link onClick={showDrawer}><AlignCenterOutlined /></Link>, [
      getItem('Xem chi tiết', '12', <SearchOutlined />),
      getItem('Đăng xuất', '14', <Link to="/" onClick={logOut}><LogoutOutlined /></Link>),
    ]),
    getItem('Hóa Đơn', '2', <Link to='/bill'><SolutionOutlined /></Link>),
    getItem('Thống kê doanh thu', '11', <Link to='/adstatictical'><BarChartOutlined /></Link>),
  ];

  const itemMenu = () => {
    if (user?.roles.includes("ROLE_ADMIN")) {
      return (
        <Menu
          style={{ height: '100vh' }}
          theme="dark"
          items={itemsAdmin}
        >
        </Menu>
      )
    }
    if (user?.roles.includes("ROLE_SELLER")) {
      return (
        <Menu
          style={{ height: '100vh' }}
          theme="dark"
          items={itemsSell}
        >
        </Menu>
      )
    }
    if (user?.roles.includes("ROLE_UPDATER")) {
      return (
        <Menu
          style={{ height: '100vh' }}
          theme="dark"
          items={itemsUpdate}
        >
        </Menu>
      )
    }
  }


  function logOut() {
    localStorage.clear()
  }

  return (
    <div style={{ position: 'fixed', width: '15%' }}>
      <TextBrand>P&P SHOP</TextBrand>
      <Menu
          style={{ height: '100vh' }}
          theme="dark"
          items={itemsAdmin}
        >
        </Menu>
      {/* <Drawer title="Thông tin cá nhân" placement="right" onClose={onClose} open={open}>
        <TextInfor><b>Họ và Tên : </b>{user.name}</TextInfor>
        <TextInfor><b>Số điện thoại : </b>{user.phone}</TextInfor>
        <TextInfor><b>Email : </b>{user.email}</TextInfor>
        <TextInfor><b>Địa chỉ : </b>{user.address}</TextInfor>
        <TextInfor><b>Tên tài khoản : </b>{user.account}</TextInfor>
      </Drawer> */}
    </div>
  );
};
export default NavbarAdmin;