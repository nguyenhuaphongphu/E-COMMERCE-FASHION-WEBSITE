import NavbarAdmin from "../../components/NavbarAdmin";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import callApi from '../../apicaller'
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from "styled-components";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';

const Container = styled.div`
  height: 35px;
  background-color: #D8C3A5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
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
export default function AdTag() {

  const [data, setData] = useState([]);
  useEffect(() => {
    callApi('suppliers', 'get', null).then(res => {
      setData(res.data)
    });
  }, []);

  const [openChange, setOpenChange] = useState(false);
  const [findData, setFindData] = useState('');
  const handleOpenChange = (id) => {
    callApi(`suppliers/${id}`, 'get', null).then(res => {
      setFindData(res.data)
    });
    setOpenChange(true);
  }

  const handleCloseChange = () => setOpenChange(false);
  const [nameSupplierChange, setNameSupplierChange] = useState('');
  const [sdtSupplierChange, setSDTSupplierChange] = useState('');
  const [emailSupplierChange, setEmailSupplierChange] = useState('');
  const [addressSupplierChange, setAddressSupplierChange] = useState('');
  const handleChange = () => {
    const changeData = {
      name: nameSupplierChange,
      phone: sdtSupplierChange,
      email: emailSupplierChange,
      address: addressSupplierChange,
    };
    callApi(`suppliers/${findData.id}`, 'put', changeData)
  }


  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [nameSupplierAdd, setNameSupplierAdd] = useState('');
  const [sdtSupplierAdd, setSDTSupplierAdd] = useState('');
  const [emailSupplierAdd, setEmailSupplierAdd] = useState('');
  const [addressSupplierAdd, setAddressSupplierAdd] = useState('');
  const handleAdd = () => {
    const dataAdd = {
      name: nameSupplierAdd,
      phone: sdtSupplierAdd,
      email: emailSupplierAdd,
      address: addressSupplierAdd,
    };
    callApi('suppliers', 'post', dataAdd)
  }

  const handleDelete = (id) => {
    callApi(`suppliers/${id}`, 'delete', null)
    window.location.reload();
  };

  return (
    <>
    <DivParent>
        <NavbarAdmin />
      </DivParent>
      <DivChild>
      <Container><h2>Nhà cung cấp</h2>&nbsp;&nbsp;<AddCircleOutlineIcon onClick={handleOpenAdd} style={{ height: '30px', width: '30px' }} /></Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell align="right"><b>Tên nhà cung cấp</b></TableCell>
              <TableCell align="right"><b>Số điện thoại</b></TableCell>
              <TableCell align="right"><b>Email</b></TableCell>
              <TableCell align="right"><b>Địa chỉ</b></TableCell>
              <TableCell align="right"><b>Hành động</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0).reverse().map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell align="right">{supplier.name}</TableCell>
                <TableCell align="right">{supplier.phone}</TableCell>
                <TableCell align="right">{supplier.email}</TableCell>
                <TableCell align="right">{supplier.address}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Sửa nhà cung cấp">
                    <ModeOutlinedIcon onClick={() => handleOpenChange(supplier.id)} />
                  </Tooltip>
                  &nbsp;&nbsp;
                  <Tooltip title='Xóa nhà cung cấp'>
                    <DeleteOutlineOutlinedIcon onClick={() => handleDelete(supplier.id)} />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </DivChild>
    
      {/* form thêm loại sản phẩm */}
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
      >
        <Box sx={style}>
          <Title>Thêm nhà cung cấp</Title>
          <Form>
            <Input placeholder="Tên nhà cung cấp"
              onChange={e => setNameSupplierAdd(e.target.value)} />
            <Input placeholder="Số điện thoại"
              onChange={e => setSDTSupplierAdd(e.target.value)} />
            <Input placeholder="Địa chỉ"
              onChange={e => setAddressSupplierAdd(e.target.value)} />
            <Input placeholder="Email"
              onChange={e => setEmailSupplierAdd(e.target.value)} />
            <Button onClick={handleAdd}>Đồng ý</Button>
          </Form>
        </Box>
      </Modal>
      {/* form sửa loại sản phẩm */}
      <Modal
        open={openChange}
        onClose={handleCloseChange}
      >
        <Box sx={style}>
          <Title>Thay đổi nhà cung cấp</Title>
          <Form>
            <Input placeholder={findData.name}
              onChange={e => setNameSupplierChange(e.target.value)} />
            <Input placeholder={findData.phone}
              onChange={e => setSDTSupplierChange(e.target.value)} />
            <Input placeholder={findData.address}
              onChange={e => setAddressSupplierChange(e.target.value)} />
            <Input placeholder={findData.email}
              onChange={e => setEmailSupplierChange(e.target.value)} />
            <Button onClick={handleChange}>Thay đổi</Button>
          </Form>
        </Box>
      </Modal>
    </>
  );
}


