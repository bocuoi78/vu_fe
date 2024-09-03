import * as React from 'react';
import dayjs from 'dayjs';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import Button from "@mui/material/Button";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Radio, RadioGroup} from "@mui/material";
import api from "../../api";

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function InformationForm({data, onChangeData}) {
    const handleDataChange = (event) => {
        const { name, value } = event.target;
        onChangeData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const  handleBirthdayChange = (newDate) => {
        onChangeData((prevData) => ({
            ...prevData,
            "birthday": newDate
        }));
    }

    const handleCheckClick = async () => {
        const studentId = data.id? data.id : ''
        try {
            const response = await api.getStudent(studentId)
            if (response && response.data && response.data.status === "OK") {
                onChangeData({
                    id : response.data.data.id,
                    fullname : response.data.data.fullname,
                    clazz : response.data.data.clazz,
                    birthday : response.data.data.birthday,
                    gender : response.data.data.gender,
                    phone : response.data.data.phone,
                    email :response.data.data.email
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

  return (
    <Grid container spacing={3}>
        <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="studentId" required>
                Mã sinh viên
            </FormLabel>
            <OutlinedInput
                id="studentId"
                name="id"
                placeholder="Mã sinh viên"
                required
                size="small"
                value={data.id? data.id : ""}
                onChange={handleDataChange}
            />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
            <Button variant="contained" onClick={handleCheckClick}>Tra cứu</Button>
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 8 }}>
            <FormLabel htmlFor="fullname" required>
                Họ và Tên
            </FormLabel>
            <OutlinedInput
                id="studentName"
                name="fullname"
                placeholder="Họ và Tên"
                required
                size="small"
                value={data.fullname? data.fullname : ''}
                onChange={handleDataChange}
            />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 4 }}>
            <FormLabel htmlFor="fullname" required>
                Lớp
            </FormLabel>
            <OutlinedInput
                id="studentClazz"
                name="clazz"
                placeholder="Lớp"
                required
                size="small"
                value={data.clazz? data.clazz : ''}
                onChange={handleDataChange}
            />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="Ngày sinh"
                        name="birthday"
                        value={dayjs(data.birthday? data.birthday : "")}
                        format="DD-MM-YYYY"
                        onChange={handleBirthdayChange}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="studentGender" required>
                Giới tính
            </FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                value={data.gender? data.gender : ""}
                name="gender"
                onChange={handleDataChange}
            >
                <FormControlLabel value={true} control={<Radio />} label="Nam" />
                <FormControlLabel value={false} control={<Radio />} label="Nữ" />
            </RadioGroup>
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
            <FormLabel htmlFor="phone" required>
                Số điện thoại
            </FormLabel>
            <OutlinedInput
                id="phone"
                name="phone"
                placeholder="Số điện thoại"
                required
                size="small"
                value={data.phone? data.phone : ""}
                onChange={handleDataChange}
            />
        </FormGrid>
        <FormGrid size={{ xs: 12 }}>
            <FormLabel htmlFor="email">
                Địa chỉ email
            </FormLabel>
            <OutlinedInput
                id="email"
                name="email"
                placeholder="Địa chỉ email"
                size="small"
                value={data.email? data.email : ""}
                onChange={handleDataChange}
            />
        </FormGrid>
    </Grid>
  );
}
