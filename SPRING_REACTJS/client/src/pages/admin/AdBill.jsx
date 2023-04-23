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
import styled from "styled-components";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { mobile } from "../../responsive";
import Tooltip from '@mui/material/Tooltip';
const Option = styled.option``;
const Filter = styled.div`
  margin: 10px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: -10px;
  text-align: right
`;
const Select = styled.select`
flex: 1;
margin: 10px 10px 20px 0px;
padding: 10px;
padding-right: 60px;
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
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
    callApi('bills', 'get', null).then(res => {
      setData(res.data)
    });
  }, []);
  const handleDelete = (id) => {
    callApi(`bills/${id}`, 'delete', null)
    window.location.reload();
  };
  const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const handleStatus = (ob) => {
    const _ob = { ...ob, status: !ob.status }
    callApi(`bills/${ob.id}`, 'put', _ob)
    window.location.reload();
  };

  const handleGiving = (ob) => {
    const _ob = { ...ob, delivered: !ob.delivered }
    callApi(`bills/${ob.id}`, 'put', _ob)
    window.location.reload();
  };

  const [giving, setGiving] = useState(undefined);
  const filterGiving = (e) => {
    setGiving(e)
  }
  return (
    <>
      <DivParent>
        <NavbarAdmin />
      </DivParent>
      <DivChild>
        <FilterContainer>
          <Filter>
            <FilterText>Lọc sản phẩm:</FilterText>
            <Select onChange={(e) => filterGiving(e.target.value)} defaultValue={'default'}>
              <Option value="default" disabled>Chưa giao hàng</Option>
              <Option value={true} >Đã giao hàng</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><b>Ngày đặt</b></TableCell>
                <TableCell align="right"><b>Tổng tiền</b></TableCell>
                <TableCell align="right"><b>Trạng thái</b></TableCell>
                <TableCell align="right"><b>Đã giao</b></TableCell>
                <TableCell align="right"><b>Hành động</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.filter((bill) => {
                if (giving) {
                  return (
                    bill.delivered === true
                  );
                } else {
                  return bill.delivered === false;
                }
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
                        }}
                        onClick={() => handleStatus(bill)}>
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
                        }}
                        onClick={() => handleGiving(bill)}>
                        {bill.delivered ? 'Đã giao hàng' : 'Chưa giao hàng'}
                      </button>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title='Chi tiết hóa đơn'>
                        <Link to={`/detailbill/${bill.id}`} style={{ textDecoration: 'none', color: 'black' }}><ReadMoreOutlinedIcon /></Link>
                      </Tooltip>
                      &nbsp;&nbsp;
                      <Tooltip title='Xóa hóa đơn'>
                        <DeleteOutlineOutlinedIcon onClick={() => handleDelete(bill.id)} />
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


