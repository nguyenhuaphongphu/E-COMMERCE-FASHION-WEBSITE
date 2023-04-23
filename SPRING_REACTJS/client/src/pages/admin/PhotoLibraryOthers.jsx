import NavbarAdmin from "../../components/NavbarAdmin";
import callApi from '../../apicaller'
import * as React from 'react';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import { message } from 'antd';
import ClearIcon from '@mui/icons-material/Clear';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import _ from 'lodash';
import Box from '@mui/material/Box';


const DivParent = styled.div`
width: 15%;                                
float: left;
`;
const DivChild = styled.div`
width: 85%;
float: right;
`;
const Form = styled.form`
padding: 20px;
`;

export default function PhotoLibraryOthers() {

  const [selectedFile, setSelectedFile] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);


  useEffect(() => {
    callApi('files/Others', 'get', null).then(res => {
      setData(res.data)
    });
  });

  const handleSubmit = async (event) => {
    event.preventDefault()
    const arrElement = [];
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < selectedFile.length; j++) {
        if (selectedFile[j].name === data[i].name) {
          arrElement.push(selectedFile[j].name)
        }
      }
    }
    if (arrElement.length != 0) {
      for (var k = 0; k < arrElement.length; k++) {
        message.warning(`Đã tồn tại ảnh ${arrElement[k]}`);
      }
    } else {
      for (var i = 0; i < selectedFile.length; i++) {
        const formData = new FormData();
        formData.append("files", selectedFile[i]);
        try {
          const response = await axios({
            method: "post",
            url: "http://localhost:8080/files/uploadOthers",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          });
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files)
  }

  const handleDeleteImage = (e) => {
    callApi(`files/Other/${e}`, 'delete', null)
  }

  const handleChangePage = (event, value) => {
    setPage(value - 1);
  };

  return (
    <>
      <DivParent>
        <NavbarAdmin />
      </DivParent>
      <DivChild>
        <Box sx={{ width: '100%' }} >
          <Form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileSelect} multiple />
            <input type="submit" value="Thêm ảnh" />
          </Form>
          <ImageList cols={6}>
            {((_.chunk(data, 3))[page])?.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  src={item.url}
                  alt={item.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.name}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={item.name}
                      onClick={() => handleDeleteImage(item.name)}
                    >
                      <ClearIcon style={{ color: 'red' }} />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
          <br />
          <Stack spacing={3} style={{ textAlign: "right" }}>
            <Pagination onChange={handleChangePage} count={(_.chunk(data, 3)).length} color="primary" />
          </Stack>
        </Box>

      </DivChild>
    </>
  );
};
