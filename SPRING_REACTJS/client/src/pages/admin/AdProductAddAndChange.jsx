import callApi from '../../apicaller'
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import { Checkbox, Col, Row } from 'antd';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import CheckBox from '@mui/material/Checkbox';
import { message } from 'antd';
import { Search } from "@material-ui/icons";

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 25px;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  margin: 10px 10px 20px 0px;
  padding: 10px;
`;
const Button = styled.button`
  margin: 10px 10px 20px 200px;
  width: 20%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  padding: 10px;
`;
const Select = styled.select`
flex: 1;
margin: 10px 10px 20px 0px;
padding: 10px;
padding-right: 60px;
`;
const Textarea = styled.textarea`
margin: 10px 10px 20px 0px;
padding: 10px;
width: 97%;
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 10px;
  margin:10px;
`;

const InputSearch = styled.input`
  border: none;
`;

export default function AdProductAddAndChange() {

    const [data, setData] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [dataSupplier, setDataSupplier] = useState([]);
    const [dataProductType, setDataProductType] = useState([]);
    const [dataTag, setDataTag] = useState([]);
    const [dataPhoto, setDataPhoto] = useState(undefined);
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
        callApi('files', 'get', null).then(res => {
            setDataPhoto(res.data)
        });
    }, []);

    const [arrSelectImage, setArrSelectImage] = useState([]);
    const selectImage = (e) => {
        if (e.target.checked === true) {
            setArrSelectImage([...arrSelectImage, e.target.value]);
        } else {
            const selectedAcc = arrSelectImage.filter(a => {
                if (a === e.target.value) return false;
                return true;
            });
            setArrSelectImage([...selectedAcc]);
        }
    };

    const [search, setSearch] = useState(undefined);

    const [nameProductAdd, setNameProductAdd] = useState('');
    const [priceProductAdd, setPriceProductAdd] = useState('');
    const [describeProductAdd, setDescribeProductAdd] = useState('');
    const [brandProductAdd, setBrandProductAdd] = useState('');
    const [supplierProductAdd, setSupplierProductAdd] = useState('');
    const [productTypeProductAdd, setProductTypeProductAdd] = useState('');
    const [checkboxes, setCheckBoxes] = useState('')
    const onChange = (checkedValues) => {
        setCheckBoxes(checkedValues);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (nameProductAdd === '' || priceProductAdd === '' || describeProductAdd === '' ||
            brandProductAdd === '' || supplierProductAdd === '' || productTypeProductAdd === '') {
            message.warning('Vui lòng nhập đầy đủ thông tin !');
        } else if (arrSelectImage.length === 0) {
            message.warning('Vui lòng chọn ảnh sản phẩm !');
        } else {
            const dataAdd = {
                name: nameProductAdd,
                price: priceProductAdd,
                image: arrSelectImage,
                brand: brandProductAdd,
                supplier: supplierProductAdd,
                type: productTypeProductAdd,
                description: describeProductAdd,
                tag: checkboxes
            };
            callApi('products', 'post', dataAdd);
        }
    }

    return (
        <Row>
            <Col span={8} style={{ padding: "10px" }}>
                <Title>Thêm sản phẩm</Title>
                <Form>
                    <Input placeholder="Tên sản phẩm"
                        onChange={e => setNameProductAdd(e.target.value)} />
                    <Input placeholder="Giá VNĐ" type='number'
                        onChange={e => setPriceProductAdd(e.target.value)} />
                    <Textarea placeholder="Mô tả"
                        onChange={e => setDescribeProductAdd(e.target.value)} />
                    <Select onChange={e => setBrandProductAdd(e.target.value)}>
                        <option selected hidden>Thương hiệu</option>
                        {dataBrand.map((brand) => {
                            return (
                                <option key={brand.id} value={brand.name}>
                                    {brand.name}
                                </option>
                            );
                        })}
                    </Select>
                    <Select onChange={e => setSupplierProductAdd(e.target.value)}>
                        <option selected hidden>Nhà cung cấp</option>
                        {dataSupplier.map((supplier) => {
                            return (
                                <option key={supplier.id} value={supplier.name}>
                                    {supplier.name}
                                </option>
                            );
                        })}
                    </Select>
                    <Select onChange={e => setProductTypeProductAdd(e.target.value)}>
                        <option selected hidden>Loại sản phẩm</option>
                        {dataProductType.map((producttype) => {
                            return (
                                <option key={producttype.id} value={producttype.name}>
                                    {producttype.name}
                                </option>
                            );
                        })}
                    </Select>
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                        <Row>
                            {dataTag.map((tag) => {
                                return (
                                    <Col key={tag.id}>
                                        <Checkbox value={tag.name}>{tag.name}</Checkbox>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Checkbox.Group>
                    <Button onClick={handleAdd}>Đồng ý</Button>
                </Form>
            </Col>
            <Col span={16} style={{ padding: "10px" }}>
                <Col span={6}>
                    <SearchContainer>
                        <InputSearch placeholder="Tìm ảnh sản phẩm"
                            onChange={(event) => {
                                setSearch((event.target.value).replaceAll(' ', ''));
                            }} />
                        <Search style={{ color: "gray", fontSize: 16, textAlign: 'right' }} />
                    </SearchContainer>
                </Col>
                <ImageList cols={5}>
                    {dataPhoto?.filter(item => {
                        if (search) {
                            return (
                                item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                            );
                        } else {
                            return true;
                        }
                    })
                        .map((item) => (
                            <ImageListItem key={item.url}>
                                <img
                                    src={item.url}
                                    srcSet={item.url}
                                    alt={item.name}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={item.name}
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={item.name}
                                        >
                                            <CheckBox onChange={selectImage} value={item.url}></CheckBox>
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                </ImageList>
            </Col>
        </Row>
    );
};
