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
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { mobile } from "../../responsive";
import { Link } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import { Tag } from 'antd';


const Input = styled.input`
  flex: 1;
  margin: 10px 10px 20px 0px;
  padding: 10px;
`;
const Select = styled.select`
flex: 1;
margin: 10px 10px 20px 0px;
padding: 10px;
padding-right: 60px;
`;
const FilterContainer = styled.div`
position: fixed;
  display: flex;
  background-color: white;
  justify-content: space-between;
  margin-bottom: -10px;
  width: inherit;
`;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Button1 = styled.button`
  padding: 9.5px;
  border: 2px solid teal;
  background-color: white;
  &:hover{
      background-color: #f8f4f4;
  }
  margin-left: 15px;
`;
const Filter = styled.div`
  margin: 5px;
  margin-top: 15px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const SearchContainer = styled.div`
`;
const Option = styled.option``;

const DivParent = styled.div`
width: 15%;                                
float: left;
`;

const DivChild = styled.div`
width: 85%;
float: right;
`;
export default function AdProduct() {

  const [data, setData] = useState([]);
  const [dataBrand, setDataBrand] = useState([]);
  const [dataSupplier, setDataSupplier] = useState([]);
  const [dataProductType, setDataProductType] = useState([]);
  const [dataTag, setDataTag] = useState([]);
  useEffect(() => {
    callApi('products', 'get', null).then(res => {
      setData(res.data)
    });
    callApi('brands', 'get', null).then(res => {
      setDataBrand(res.data)
    });
    callApi('suppliers', 'get', null).then(res => {
      setDataSupplier(res.data)
    });
    callApi('typeOfProduct', 'get', null).then(res => {
      setDataProductType(res.data)
    });
    callApi('tags', 'get', null).then(res => {
      setDataTag(res.data)
    });
  },[]);

  const handleDelete = (id) => {
    callApi(`products/${id}`, 'delete', null)
  };

  const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const [open, setOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState('');

  const handleClickOpen = (id) => {
    callApi(`products/${id}`, 'get', null).then(res => {
      setDataDetail(res.data)
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedBrand, setSelectedBrand] = useState(undefined);
  const [selectedProductType, setSelectedProductType] = useState(undefined);
  const [selectedSupplier, setSelectedSupplier] = useState(undefined);
  const [search, setSearch] = useState(undefined);
  const filterProductType = (e) => {
    setSelectedProductType(e)
  }
  const filterBrand = (e) => {
    setSelectedBrand(e)
  }
  const filterSupplier = (e) => {
    setSelectedSupplier(e)
  }
  const [sort, setSort] = useState('');
  const filterPrice = (e) => {
    setSort(e)
  }

  var dataStorage = JSON.parse(localStorage.getItem("products")) || [];
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const addDataStorege = (product) => {
    dataStorage.push(product)
    dataStorage = dataStorage.filter(onlyUnique);
    localStorage.setItem("products", JSON.stringify(dataStorage));
  }

  return (
    <>
      <DivParent>
        <NavbarAdmin />
      </DivParent>
      <DivChild>
        <FilterContainer>
          <AddContainer>
            <Link to='/addproduct'><Button1>THÊM SP</Button1></Link>
            <Link to='/import' style={{ textDecoration: 'none', color: 'black' }}><Button1>NHẬP HÀNG</Button1></Link>
          </AddContainer>
          <Filter>
            <Select onChange={(e) => filterProductType(e.target.value)}>
              <Option disabled selected>
                Loại sản phẩm
              </Option>
              {dataProductType.map((productType) => {
                return (
                  <Option>{productType.name}</Option>
                )
              })}
            </Select>
            <Select onChange={(e) => filterBrand(e.target.value)}>
              <Option disabled selected>
                Thương hiệu
              </Option>
              {dataBrand.map((brand) => {
                return (
                  <Option>{brand.name}</Option>
                )
              })}
            </Select>
            <Select onChange={(e) => filterSupplier(e.target.value)}>
              <Option disabled selected>
                Nhà cung cấp
              </Option>
              {dataSupplier.map((supplier) => {
                return (
                  <Option>{supplier.name}</Option>
                )
              })}
            </Select>
          </Filter>
          <Filter>
            <SearchContainer>
              <Input placeholder="Search"
                onChange={(event) => {
                  setSearch(event.target.value);
                }} />
            </SearchContainer>
          </Filter>
          <Filter>
            <Select onChange={(e) => filterPrice(e.target.value)}>
              <Option selected disabled>Mới nhất</Option>
              <Option value={0} >Giá tăng</Option>
              <Option value={1}>Giá giảm</Option>
              <Option value={2} >Còn hàng</Option>
              <Option value={3}>Hết hàng</Option>
              {dataTag.map(tag => {
                return (
                  <Option value={tag.name} key={tag.name}>{tag.name}</Option>
                )
              })}
            </Select>
          </Filter>
        </FilterContainer>
        <TableContainer component={Paper} style={{ marginTop: 80 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right"><b>Tên sản phẩm</b></TableCell>
                <TableCell align="right"><b>Ảnh</b></TableCell>
                <TableCell align="right"><b>Giá</b></TableCell>
                <TableCell align="right"><b>Thương hiệu</b></TableCell>
                <TableCell align="right"><b>Nhà cung cấp</b></TableCell>
                <TableCell align="right"><b>Loại sản phẩm</b></TableCell>
                <TableCell align="right"><b>Trạng thái</b></TableCell>
                <TableCell align="right"><b>Hành động</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.filter((products) => {
                if (selectedBrand && selectedProductType && selectedSupplier) {
                  return (
                    products.brand === selectedBrand &&
                    products.type === selectedProductType &&
                    products.supplier === selectedSupplier
                  );
                } else if (selectedBrand && selectedProductType) {
                  return (
                    products.brand === selectedBrand &&
                    products.type === selectedProductType
                  );
                } else if (selectedProductType && selectedSupplier) {
                  return (
                    products.type === selectedProductType &&
                    products.supplier === selectedSupplier
                  );
                } else if (selectedBrand && selectedSupplier) {
                  return (
                    products.brand === selectedBrand &&
                    products.supplier === selectedSupplier
                  );
                } else if (selectedBrand) {
                  return (
                    products.brand === selectedBrand
                  );
                } else if (selectedProductType) {
                  return (
                    products.type === selectedProductType
                  );
                } else if (selectedSupplier) {
                  return (
                    products.supplier === selectedSupplier
                  );
                } else if (search) {
                  return (
                    products.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                  );
                } else if (sort) {
                  if (sort === '0') {
                    return (
                      data.sort((a, b) => {
                        return b.price - a.price
                      })
                    )
                  } else if (sort === '1') {
                    return (
                      data.sort((a, b) => {
                        return a.price - b.price
                      })
                    )
                  } else
                    if (sort === '2') {
                      return (
                        products.amount > 0
                      )
                    } else if (sort === '3') {
                      return (
                        products.amount === 0
                      )
                    } else if (sort !== '0' && sort !== '1') {
                      for (let i = 0; i < products.tag.length; i++) {
                        if (products.tag[i] === sort) {
                          return products
                        }
                      }

                    }
                } else {
                  return true;
                }
              })
                .slice(0).reverse().map((product) => (
                  <>
                    <TableRow key={product.id}>
                      <TableCell align="right">{product.name}</TableCell>
                      <TableCell align="right">
                        <img width="80" src={product.image[0]}></img>
                      </TableCell>
                      <TableCell align="right">{numberFormat.format(product.price)}</TableCell>
                      <TableCell align="right">{product.brand}</TableCell>
                      <TableCell align="right">{product.supplier}</TableCell>
                      <TableCell align="right">{product.type}</TableCell>
                      <TableCell align="right">
                        <button
                          style={{
                            backgroundColor: product.amount > 0 ? '#4CAF50' : "#f44336",
                            border: 'aliceblue',
                            borderRadius: 15,
                            color: 'white',
                            padding: 7
                          }}>
                          {product.amount > 0 ? 'Còn hàng' : 'Hết hàng'}
                        </button>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Thêm vào đơn nhập hàng">
                          <AddCircleOutlineIcon onClick={() => addDataStorege(product)} />
                        </Tooltip>
                        &nbsp;&nbsp;
                        <Tooltip title="Xem chi tiết">
                          <ArticleOutlinedIcon onClick={() => handleClickOpen(product.id)} />
                        </Tooltip>
                        &nbsp;&nbsp;
                        <Tooltip title="Xóa sản phẩm">
                          <DeleteOutlineOutlinedIcon onClick={() => handleDelete(product.id)} />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DivChild>
      {/* form more information */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Số lượng tồn: {dataDetail.amount}
        </DialogTitle>
        <div style={{ marginLeft: 25 }}>
          {dataDetail.tag?.map(tag => {
            return (
              <Tag color="blue" key={tag.name}>{tag}</Tag>
            )
          })}
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dataDetail.description}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}