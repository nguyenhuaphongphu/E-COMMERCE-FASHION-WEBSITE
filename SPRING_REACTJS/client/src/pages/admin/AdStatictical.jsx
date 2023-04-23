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
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const { RangePicker } = DatePicker;
const Container = styled.div`
overflow: auto;
`;
const Filter = styled.div`
  margin: 10px;
  margin-bottom: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterContainer = styled.div`
  justify-content: space-between;
  margin: 20px 10px 10px 10px;
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;\
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
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function AdStatictical() {

    const [data, setData] = useState([]);
    const [monthVal, setMonthVal] = useState(new Date(new Date()).getMonth() + 1);
    const [yearVal, setYearVal] = useState(new Date(new Date()).getFullYear());

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

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [getDate, setGetDate] = useState(0)
    const [getMonth, setGetMonth] = useState(0)
    const [getYear, setGetYear] = useState(0)
    const [valueDate, setValueDate] = useState(false)
    const onChange = (data, dateString) => {
        setGetDate(new Date(dateString).getDate())
        setGetMonth(new Date(dateString).getMonth() + 1)
        setGetYear(new Date(dateString).getFullYear())
        setValueDate(!valueDate)
    };

    const [getDateFrom, setGetDateFrom] = useState(0)
    const [getDateTo, setGetDateTo] = useState(0)
    const [valueForm, setValueForm] = useState(false)
    const onChangeForm = (data, dateString) => {
        setGetDateFrom(new Date(dateString[0]))
        setGetDateTo(new Date(dateString[1]))
        setValueForm(!valueForm)
    };

    const arrPrice = [];
    const countTotal = (el) => {
        arrPrice.push(el)
    }


    const onChangeDate = (date, dateString) => {
        setMonthVal(new Date(dateString).getMonth() + 1);
        setYearVal(new Date(dateString).getFullYear());
        if (dateString === '') {
            setMonthVal(new Date(new Date()).getMonth() + 1);
            setYearVal(new Date(new Date()).getFullYear());
        }
    };

    function arrDay() {
        const arrDay = [];
        data.map(el => {
            if (new Date(el.time).getMonth() + 1 === monthVal && new Date(el.time).getFullYear() === yearVal) {
                arrDay.push(`Ngày ${String(new Date(el.time).getDate())}`)
            }
        })
        const uniqueSet = new Set(arrDay);
        const backToArray = [...uniqueSet];
        return backToArray;
    }

    function arrPriceSta() {
        const result = data.filter(item => {
            return new Date(item.time).getMonth() + 1 === monthVal && new Date(item.time).getFullYear() === yearVal;
        });
        const result2 = [];
        result.forEach(function (a) {
            if (!this[new Date(a.time).getDate()]) {
                this[new Date(a.time).getDate()] = { totalPrice: 0 };
                result2.push(this[new Date(a.time).getDate()]);
            }
            this[new Date(a.time).getDate()].totalPrice += a.totalPrice;
        }, Object.create(null));
        const finalResult = [];
        result2.map(el => {
            finalResult.push(el.totalPrice);
        })
        return finalResult;
    }

    return (
        <>
            <DivParent>
                <NavbarAdmin />
            </DivParent>
            <DivChild>
                <Box sx={{ width: '100%' }} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Tổng doanh thu" {...a11yProps(0)} />
                            <Tab label="Doanh thu tháng" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <FilterContainer>
                            <Filter>
                                <FilterText >Doanh thu theo: </FilterText>
                                <DatePicker
                                    presets={[
                                        {
                                            label: 'Yesterday',
                                            value: dayjs().add(-1, 'd'),
                                        },
                                        {
                                            label: 'Last Week',
                                            value: dayjs().add(-7, 'd'),
                                        },
                                        {
                                            label: 'Last Month',
                                            value: dayjs().add(-1, 'month'),
                                        },
                                    ]}
                                    onChange={onChange}
                                    style={{ marginRight: 30 }}
                                />
                                <RangePicker onChange={onChangeForm} />
                            </Filter>
                        </FilterContainer>
                        <hr />
                        <Container>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>Ngày đặt</b></TableCell>
                                            <TableCell align="right"><b>Tổng tiền</b></TableCell>
                                            <TableCell align="right"><b>Trạng thái</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.filter((bill) => {
                                            if (valueDate) {
                                                return (
                                                    new Date(bill.time).getDate() === getDate &&
                                                    new Date(bill.time).getMonth() + 1 === getMonth &&
                                                    new Date(bill.time).getFullYear() === getYear
                                                );
                                            } else if (valueForm) {
                                                return (
                                                    (getDateFrom < new Date(bill.time)) && (new Date(bill.time) < getDateTo)
                                                );
                                            } else {
                                                return true;
                                            }
                                        })
                                            .slice(0).reverse().map((bill) => {
                                                countTotal(bill.totalPrice)
                                                return (
                                                    <TableRow key={bill.id}>
                                                        <TableCell>{moment.utc(bill.time).format('DD/MM/YYYY')}</TableCell>
                                                        <TableCell align="right"> {numberFormat.format(bill.totalPrice)}</TableCell>
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
                                                )

                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Container>
                        <FilterContainer>
                            <Filter style={{ textAlign: "right" }}>
                                <FilterText >Tổng thu : </FilterText>
                                <FilterText >{numberFormat.format(arrPrice.reduce((a, b) => { return a + b }, 0))}</FilterText>
                            </Filter>
                        </FilterContainer>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <DatePicker onChange={onChangeDate} picker="month" style={{ margin: '10px' }} />
                        <Bar height="140%"
                            data={{
                                labels: arrDay(),
                                datasets: [
                                    {
                                        label: `Doanh thu tháng ${monthVal}/${yearVal}`,
                                        backgroundColor: 'rgba(75,192,192,1)',
                                        data: arrPriceSta()
                                    }
                                ]
                            }}
                        />
                    </TabPanel>
                </Box>
            </DivChild>
        </>
    );
}