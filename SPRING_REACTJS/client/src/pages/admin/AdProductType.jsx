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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
export default function AdProductType() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    callApi(`typeOfProduct/?page=${page}`, 'get', null).then(res => {
      setData(res.data)
    });
  }, [page]);

  const [openChange, setOpenChange] = React.useState(false);
  const [findData, setFindData] = useState('');
  const handleOpenChange = (id) => {
    callApi(`typeOfProduct/${id}`, 'get', null).then(res => {
      setFindData(res.data)
    });
    setOpenChange(true);
  }

  const handleCloseChange = () => setOpenChange(false);
  const [nameProductTypeChange, setNameProductTypeChange] = useState('');
  const handleChange = () => {
    if (nameProductTypeChange) {
      const changeData = {
        name: nameProductTypeChange,
      };
      callApi(`typeOfProduct/${findData.id}`, 'put', changeData)
    }
  }


  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [nameProductType, setNameProductType] = useState('');
  const handleAdd = () => {
    const dataAdd = {
      name: nameProductType,
    };
    callApi('typeOfProduct', 'post', dataAdd)
  }

  const handleDelete = (id) => {
    callApi(`typeOfProduct/${id}`, 'delete', null)
    window.location.reload();
  };

  const handleChangePage = (event, value) => {
    setPage(value - 1);
  };
  return (
    <>
      <DivParent>
        <NavbarAdmin />
      </DivParent>
      <DivChild>
        <Container><h2>Loại sản phẩm</h2>&nbsp;&nbsp;<AddCircleOutlineIcon onClick={handleOpenAdd} style={{ height: '30px', width: '30px' }} /></Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Mã loại sản phẩm</TableCell>
                <TableCell align="right"><b>Tên loại sản phẩm</b></TableCell>
                <TableCell align="right"><b>Hành động</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items?.slice(0).reverse().map((producttype) => (
                <TableRow key={producttype.id}>
                  <TableCell>{producttype.id}</TableCell>
                  <TableCell align="right">{producttype.name}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Sửa loại sản phẩm">
                      <ModeOutlinedIcon onClick={() => handleOpenChange(producttype.id)} />
                    </Tooltip>
                    &nbsp;&nbsp;
                    <Tooltip title='Xóa loại sản phẩm'>
                      <DeleteOutlineOutlinedIcon onClick={() => handleDelete(producttype.id)} />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Stack spacing={3} style={{ textAlign: "right" }}>
          <Pagination onChange={handleChangePage} count={data.totalPages} color="primary" />
        </Stack>
      </DivChild>
      {/* form thêm loại sản phẩm */}
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
      >
        <Box sx={style}>
          <Title>Thêm loại sản phẩm</Title>
          <Form>
            <Input placeholder="Tên loại sản phẩm"
              value={nameProductType}
              onChange={e => setNameProductType(e.target.value)} />
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
          <Title>Thay đổi loại sản phẩm</Title>
          <Form>
            <Input
              placeholder={findData.name}
              onChange={e => setNameProductTypeChange(e.target.value)}
            />
            <Button onClick={handleChange}>Đồng ý</Button>
          </Form>
        </Box>
      </Modal>
    </>
  );
}


