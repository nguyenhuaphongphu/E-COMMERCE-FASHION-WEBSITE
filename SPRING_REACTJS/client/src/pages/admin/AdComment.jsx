import NavbarAdmin from "../../components/NavbarAdmin";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import callApi from '../../apicaller'
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import moment from 'moment';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
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
    callApi('comments', 'get', null).then(res => {
      setData(res.data)
    });
  }, [data]);
  const handleDelete = (id) => {
    callApi(`comments/${id}`, 'delete', null)
  };
  return (
    <>
      <DivParent>
        <NavbarAdmin />
      </DivParent>
      <DivChild>
      <Container><h2>Bình luận</h2></Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell ><b>Ngày đăng</b></TableCell>
              <TableCell align="right"><b>Khách hàng</b></TableCell>
              <TableCell align="right"><b>Sản phẩm</b></TableCell>
              <TableCell align="right"><b>Số sao</b></TableCell>
              <TableCell align="right"><b>Nội dung</b></TableCell>
              <TableCell align="right"><b>Hành động</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.slice(0).reverse().map((comment, index) => (
              <TableRow key={index}>
                <TableCell>{moment.utc(comment.time).format('DD/MM/YYYY')}</TableCell>
                <TableCell align="right">{comment.customer.name}</TableCell>
                <TableCell align="right">
                  <Link to={`/product/${comment.product.id}`}>
                    {comment.product.name}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <Rating name="size-large" value={comment.star} size="small" readOnly />
                </TableCell>
                <TableCell align="right">{comment.comment}</TableCell>
                <TableCell align="right">
                  <Tooltip title='Xóa bình luận'>
                    <DeleteOutlineOutlinedIcon onClick={() => handleDelete(comment.id)} />
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


