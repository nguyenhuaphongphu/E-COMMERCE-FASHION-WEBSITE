import NavbarAdmin from "../../components/NavbarAdmin";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import callApi from '../../apicaller'
import * as React from 'react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import styled from "styled-components";
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
    callApi('importOrders', 'get', null).then(res => {
      setData(res.data)
    });
  }, []);

  const handleDelete = (id) => {
    callApi(`importOrders/${id}`, 'delete', null)
    window.location.reload();
  };

  const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

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
              <TableCell><b>Ngày nhập hàng</b></TableCell>
              <TableCell align="right"><b>Tổng tiền nhập</b></TableCell>
              <TableCell align="right"><b>Hành động</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(0).reverse().map((importBill, index) => (
              <TableRow key={index}>
                <TableCell>{moment.utc(importBill.time).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="right"> {numberFormat.format(importBill.totalPrice)}</TableCell>
                <TableCell align="right">
                <Tooltip title='Chi tiết hóa đơn'>
                <Link to={`/detailimport/${importBill.id}`} style={{ textDecoration: 'none', color: 'black' }}><ReadMoreOutlinedIcon /></Link>
                  </Tooltip>
                  &nbsp;&nbsp;
                  <Tooltip title='Xóa hóa đơn'>
                  <DeleteOutlineOutlinedIcon onClick={() => handleDelete(importBill.id)} />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </DivChild>
    </>
  );
}


