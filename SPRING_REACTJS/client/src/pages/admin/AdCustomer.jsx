import NavbarAdmin from "../../components/NavbarAdmin";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import callApi from '../../apicaller'
import * as React from 'react';
import { useEffect, useState } from 'react'
import styled from "styled-components";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Checkbox, Col, Row, Select, Space } from 'antd';
import { Link } from "react-router-dom";


const Button = styled.button`
  margin: 30px 10px 20px 155px;
  width: 20%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  padding: 10px;
`;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 260,
  bgcolor: 'background.paper',
  p: 4,
};
const DivParent = styled.div`
width: 15%;                                
float: left;
`;
const DivChild = styled.div`
width: 85%;
float: right;
`;

const options = [
  {
    value: 'gold',
  },
  {
    value: 'lime',
  },
  {
    value: 'green',
  },
  {
    value: 'cyan',
  },
];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function AdCustomer() {

  const [data, setData] = useState([]);
  const [checkboxes, setCheckBoxes] = useState('')
  useEffect(() => {
    callApi('api/auth', 'get', null).then(res => {
      setData(res.data)
    });
  });

  const handleDelete = (id) => {
    callApi(`api/auth/${id}`, 'delete', null)
    window.location.reload();
  };

  const onChange = (checkedValues) => {
    setCheckBoxes(checkedValues);
  };

  const [openChange, setOpenChange] = useState(false);
  const [idChange, setIdChange] = useState('');

  const handleOpenChange = (id) => {
    setOpenChange(true);
    setIdChange(id);
  }

  const handleCloseChange = () => setOpenChange(false);
  const handleChange = (id) => {
    const dataChange = {
      roles: checkboxes
    }
    callApi(`api/auth/${idChange}`, 'patch', dataChange).then(res => {
      setOpenChange(false);
    })
  }

  return (
    <>
      <DivParent>
        <NavbarAdmin />
      </DivParent>
      <DivChild>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right"><b>Tên khách hàng</b></TableCell>
                <TableCell align="right"><b>Số điện thoại</b></TableCell>
                <TableCell align="right"><b>Email</b></TableCell>
                <TableCell align="right"><b>Địa chỉ</b></TableCell>
                <TableCell align="right"><b>Hành động</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.filter((user) => {
                return user.roles[0].name === "ROLE_USER";
              })
                .slice(0).reverse().map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="right">{user.fullname}</TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.address}</TableCell>
                    <TableCell align="right">
                    <Link to={`/grantaccess/${user.id}`} style={{ textDecoration: 'none', color: 'black' }}><AccessibilityNewIcon/></Link>
                      &nbsp;&nbsp;
                      <DeleteOutlineOutlinedIcon onClick={() => handleDelete(user.id)} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DivChild>
      <Modal
        open={openChange}
        onClose={handleCloseChange}
      >
        <Box sx={style}>
          <Checkbox.Group style={{ width: '100%', zIndex: '1500', }} onChange={onChange}>
            <Checkbox value="updater">Updater</Checkbox>
            <Checkbox value="seller">Seller</Checkbox>
            <Checkbox value="admin">Admin</Checkbox>
            <Space
              style={{
                width: '100%',
                zIndex: '1500',
              }}
              direction="vertical"
            >
              <Select
                mode="multiple"
                style={{
                  width: '100%',
                }}
                placeholder="Please select"
                onChange={handleChange}
                options={options}
              />
            </Space>

          </Checkbox.Group>
          <Button onClick={handleChange}>Thay đổi</Button>
        </Box>
      </Modal>
    </>
  );
}


