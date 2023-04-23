import Navbar from "../../components/Navbar";
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

export default function HistoryBuy() {

  const [data, setData] = useState();

  useEffect(() => {
    callApi('bills', 'get', null).then(res => {
      setData(res.data)
    });
  });
  const handleDelete = (id) => {
    callApi(`bills/${id}`, 'delete', null)
  };
  const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const user = JSON.parse(localStorage.getItem('user')) || ''

  return (
    <>
    <Navbar/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Ngày mua</b></TableCell>
              <TableCell align="right"><b>Tổng tiền</b></TableCell>
              <TableCell align="right"><b>Trạng thái</b></TableCell>
              <TableCell align="right"><b>Đã giao</b></TableCell>
              <TableCell align="right"><b>Hành động</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.filter((bill)=>{
                return(
                    bill.customer === user.id
                )
              })
              .slice(0).reverse().map((bill, index) => (
              <TableRow key={index}>
                <TableCell>{moment.utc(bill.time).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="right"> {numberFormat.format(bill.totalPrice)}</TableCell>
                <TableCell align="right">
                  <button
                    style={{
                      backgroundColor: bill.status ? '#e7e7e7' : "#f44336",
                      border: 'aliceblue',
                      borderRadius: 15,
                      color: 'white',
                      padding: 7
                    }}>
                    {bill.status ? 'Đã nhận đơn' : 'Nhận đơn'}
                  </button>
                </TableCell>
                <TableCell align="right">
                  <button
                    style={{
                      backgroundColor: bill.delivered ? '#e7e7e7' : "#f44336",
                      border: 'aliceblue',
                      borderRadius: 15,
                      color: 'white',
                      padding: 7
                    }}>
                    {bill.delivered ? 'Đã giao hàng' : 'Chưa giao hàng'}
                  </button>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title='Chi tiết hóa đơn'>
                  <Link to={`/detailbill/${bill.id}`} style={{ textDecoration: 'none', color: 'black' }}><ReadMoreOutlinedIcon /></Link>
                  </Tooltip>
                  &nbsp;&nbsp;
                  <Tooltip title='Hủy đặt hàng'>
                  <DeleteOutlineOutlinedIcon onClick={() => handleDelete(bill.id)} />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}


