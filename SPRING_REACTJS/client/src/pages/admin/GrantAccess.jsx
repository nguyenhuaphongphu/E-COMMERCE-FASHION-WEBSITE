import NavbarAdmin from "../../components/NavbarAdmin";
import { useParams } from "react-router-dom";
import callApi from '../../apicaller'
import * as React from 'react';
import { useState } from 'react'
import styled from "styled-components";
import { Checkbox} from 'antd';
import { useNavigate } from "react-router-dom";
const Button = styled.button`
  margin: 30px;
  width: 20%;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
  padding: 10px;
`;
const DivParent = styled.div`
width: 15%;                                
float: left;
`;
const DivChild = styled.div`
width: 85%;
float: right;
`;
export default function GrantAccess() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [checkboxes, setCheckBoxes] = useState('')
    const onChange = (checkedValues) => {
        setCheckBoxes(checkedValues);
    };

    const handleChange = () => {
        const dataChange = {
            roles: checkboxes
        }
        callApi(`api/auth/${id}`, 'patch', dataChange).then(res=>{
            navigate("/admin")
        })
    }
    const itemMenu = () => {
        if (checkboxes.includes("updater")) {
            return (
                <Checkbox.Group style={{ width: '100%', padding: "30px" }} onChange={onChange}>
                    <Checkbox value="updater">Updater</Checkbox>
                    <Checkbox value="seller">Seller</Checkbox>
                    <Checkbox value="admin">Admin</Checkbox>
                </Checkbox.Group>
            )
        }
        if (checkboxes.includes("seller")) {
            return (
                <>
                    <Checkbox value="createtag">Thêm thẻ</Checkbox>
                    <Checkbox value="updatetag">Cập nhật thẻ</Checkbox>
                    <Checkbox value="deletetag">Xóa thẻ</Checkbox>
                </>
            )
        }
    }
    return (
        <>
            <DivParent>
                <NavbarAdmin />
            </DivParent>
            <DivChild>
                <Button onClick={handleChange}>Thay đổi</Button>
                <Checkbox.Group style={{ width: '100%', padding: "30px" }} onChange={onChange}>
                    <Checkbox value="updater">Updater</Checkbox>
                    <Checkbox value="seller">Seller</Checkbox>
                    <Checkbox value="admin">Admin</Checkbox>

                    {itemMenu()}
                </Checkbox.Group>
                <hr />
            </DivChild>
        </>
    );
}


