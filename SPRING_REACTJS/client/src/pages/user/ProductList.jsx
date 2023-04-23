import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { mobile } from "../../responsive";
import { Search } from "@material-ui/icons";
import {
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import callApi from "../../apicaller"
import { Link } from "react-router-dom";
import React from "react"

const Container = styled.div``;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 10px;
  ${mobile({ margin: "10px 0px" })}
`;

const SearchContainer = styled.div`
  border: 1px solid ;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 10px;
`;
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Image = styled.img`
  height: 100%;
  z-index: 2;
  background-size: 0 !important;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Container2 = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const Container3 = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Option = styled.option``;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

export default function ProductList() {


  const [data, setData] = useState([]);
  const [dataBrand, setDataBrand] = useState([]);
  const [dataProductType, setDataProductType] = useState([]);
  const [dataSupplier, setSupplier] = useState([]);
  const [dataTag, setTag] = useState([]);
  useEffect(() => {
    callApi('products', 'get', null).then(res => {
      setData(res.data)
    });
    callApi('brands', 'get', null).then(res => {
      setDataBrand(res.data)
    });
    callApi('typeOfProduct', 'get', null).then(res => {
      setDataProductType(res.data)
    });
    callApi('suppliers', 'get', null).then(res => {
      setSupplier(res.data)
    });
    callApi('tags', 'get', null).then(res => {
      setTag(res.data)
    });
  }, []);
  var dataStorage = JSON.parse(localStorage.getItem("item")) || [];
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const addDataStorege = (products) => {
    dataStorage.push(products)
    dataStorage = dataStorage.filter(onlyUnique);
    localStorage.setItem("item", JSON.stringify(dataStorage));
  }
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

  return (
    <Container>
      <Navbar />
      <Hr />
      <FilterContainer>
        <Filter>
          <FilterText>Lọc sản phẩm:</FilterText>
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
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Filter>
        <Filter>
          <FilterText>Sắp xếp:</FilterText>
          <Select onChange={(e) => filterPrice(e.target.value)}>
            <Option selected disabled>Mới nhất</Option>
            <Option value={0} >Giá giảm </Option>
            <Option value={1}>Giá tăng</Option>
            {dataTag.map(tag => {
              return (
                <Option value={tag.name}>{tag.name}</Option>
              )
            })}
          </Select>
        </Filter>
      </FilterContainer>
      <Container2>
        {data.filter((products) => {
          if (selectedBrand && selectedProductType && selectedSupplier) {
            return (
              products.brand === selectedBrand &&
              products.type === selectedProductType &&
              products.supplier === selectedSupplier &&
              products.amount > 0
            );
          } else if (selectedBrand && selectedProductType) {
            return (
              products.brand === selectedBrand &&
              products.type === selectedProductType &&
              products.amount > 0
            );
          } else if (selectedProductType && selectedSupplier) {
            return (
              products.type === selectedProductType &&
              products.supplier === selectedSupplier &&
              products.amount > 0
            );
          } else if (selectedBrand && selectedSupplier) {
            return (
              products.brand === selectedBrand &&
              products.supplier === selectedSupplier &&
              products.amount > 0
            );
          } else if (selectedBrand) {
            return (
              products.brand === selectedBrand &&
              products.amount > 0
            );
          } else if (selectedProductType) {
            return (
              products.type === selectedProductType &&
              products.amount > 0
            );
          } else if (selectedSupplier) {
            return (
              products.supplier === selectedSupplier &&
              products.amount > 0
            );
          } else if (search) {
            return (
              products.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
              products.amount > 0
            );
          } else if (sort) {
            if (sort === '0') {
              return (
                data.sort((a, b) => {
                  return b.price - a.price
                })
                &&
                products.amount > 0
              )
            } else if (sort === '1') {
              return (
                data.sort((a, b) => {
                  return a.price - b.price
                })
                &&
                products.amount > 0
              )
            } else if (sort !== '0' && sort !== '1') {
              for (let i = 0; i < products.tag.length; i++) {
                if (products.tag[i] === sort) {
                  return products &&
                    products.amount > 0
                }
              }

            }
          } else {
            return products.amount > 0;
          }
        })
          .map((products) => (
            <Container3 item={products} key={products.id}>
              <Image src={products.image[0]} />
              <Info>
                <Icon>
                  <ShoppingCartOutlined onClick={() => addDataStorege(products)} />
                </Icon>
                <Icon>
                  <Link to={`/product/${products.id}`} style={{ textDecoration: 'none', color: 'black' }}><SearchOutlined /></Link>
                </Icon>
              </Info>
            </Container3>
          ))}
      </Container2>
      <Footer />
    </Container>
  );
};
