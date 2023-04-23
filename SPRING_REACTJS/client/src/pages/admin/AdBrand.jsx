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
  margin: 20px 0px;
  width: 30%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 100,
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
export default function AdBrand() {

  const [data, setData] = useState([]);
  useEffect(() => {
    callApi('brands', 'get', null).then(res => {
      setData(res.data)
    });
  }, []);

  const [openChange, setOpenChange] = useState(false);
  const [findData, setFindData] = useState('');
  const handleOpenChange = (id) => {
    callApi(`brands/${id}`, 'get', null).then(res => {
      setFindData(res.data)
    });
    setOpenChange(true);
  }
  const handleCloseChange = () => setOpenChange(false);
  const [nameBrandChange, setNameBrandChange] = useState('');
  const handleChange = () => {
    if (nameBrandChange) {
      const changeData = {
        name: nameBrandChange,
      };
      callApi(`brands/${findData.id}`, 'put', changeData)
    }
  }


  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [nameTag, setNameTag] = useState('');
  const handleAdd = () => {
    const dataAdd = {
      name: nameTag,
    };
    callApi('brands', 'post', dataAdd)
  }

  const handleDelete = (id) => {
    callApi(`brands/${id}`, 'delete', null)
    window.location.reload();
  };
  return (
    <>
      <DivParent>
        <NavbarAdmin />
      </DivParent>
      <DivChild>
        <Container><h2>Thương hiệu</h2>&nbsp;&nbsp;<AddCircleOutlineIcon onClick={handleOpenAdd} style={{ height: '30px', width: '30px' }} /></Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><b>Mã thương hiệu</b></TableCell>
                <TableCell align="right"><b>Tên thương hiệu</b></TableCell>
                <TableCell align="right"><b>Hành động</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(0).reverse().map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>{brand.id}</TableCell>
                  <TableCell align="right">{brand.name}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Sửa thương hiệu">
                      <ModeOutlinedIcon onClick={() => handleOpenChange(brand.id)} />
                    </Tooltip>
                    &nbsp;&nbsp;
                    <Tooltip title='Xóa thương hiệu'>
                      <DeleteOutlineOutlinedIcon onClick={() => handleDelete(brand.id)} />
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
          <Title>Thêm thương hiệu</Title>
          <Form>
            <Input placeholder="Tên thương hiệu"
              onChange={e => setNameTag(e.target.value)} />
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
          <Title>Thay đổi thương hiệu</Title>
          <Form>
            <Input placeholder={findData.name}
              onChange={e => setNameBrandChange(e.target.value)}
            />
            <Button onClick={handleChange}>Đồng ý</Button>
          </Form>
        </Box>
      </Modal>
    </>
  );
}


