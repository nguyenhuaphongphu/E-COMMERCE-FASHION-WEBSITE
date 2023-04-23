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
import styled from "styled-components";
import { Tag } from 'antd';

const DivParent = styled.div`
width: 15%;                                
float: left;
`;
const DivChild = styled.div`
width: 85%;
float: right;
`;

export default function Admins() {

  const [data, setData] = useState([]);

  useEffect(() => {
    callApi('api/auth', 'get', null).then(res => {
      setData(res.data)
    });
  });

  const handleOpenChange = (id) => {
    handleChange(id);
  }
  const handleChange = (id) => {
    const dataChange = {
      roles : null
    }
    callApi(`api/auth/${id}`, 'patch', dataChange)
  }

  const handleDelete = (id) => {
    callApi(`admins/${id}`, 'delete', null)
    window.location.reload();
  };

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
                <TableCell align="right"><b>Tên quản trị viên</b></TableCell>
                <TableCell align="right"><b>Số điện thoại</b></TableCell>
                <TableCell align="right"><b>Email</b></TableCell>
                <TableCell align="right"><b>Địa chỉ</b></TableCell>
                <TableCell align="right"><b>Quyền hạn</b></TableCell>
                <TableCell align="right"><b>Hành động</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.filter((user) => {
                return user.roles[0].name !== "ROLE_USER";
              })
                .slice(0).reverse().map((user) => (
                  <TableRow key={user._id}>
                    <TableCell align="right">{user.fullname}</TableCell>
                    <TableCell align="right">{user.phone}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.address}</TableCell>
                    <TableCell align="right">
                      {user.roles?.map(role => {
                        return (
                          <Tag color="blue">{role.name}</Tag>
                        )
                      })}
                    </TableCell>
                    <TableCell align="right">
                      <ModeOutlinedIcon onClick={() => handleOpenChange(user.id)} />&nbsp;&nbsp;<DeleteOutlineOutlinedIcon onClick={() => handleDelete(user.id)} />
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


