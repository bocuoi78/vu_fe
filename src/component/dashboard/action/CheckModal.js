import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ListItemIcon from "@mui/material/ListItemIcon";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import provider from "../../../provider";
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import IconButton from "@mui/material/IconButton";
import {Chip, Radio, RadioGroup} from "@mui/material";
import Stack from "@mui/material/Stack";
import InformationForm from "../../checkout/InformationForm";
import {styled} from "@mui/system";
import Grid from "@mui/material/Grid2";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FormControlLabel from "@mui/material/FormControlLabel";
import api from "../../../api";
import Checkbox from "@mui/material/Checkbox";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'scroll',
    display:'block',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function EditModal({data, fetchData}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [editData, setEditData] = React.useState(data)

    const handleDataChange = (event) => {
        const { name, value } = event.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCheckboxChange = (event) => {
        setEditData((prevData) => ({
            ...prevData,
            received: event.target.checked
        }));
    };

    const  handleBirthdayChange = (newDate) => {
        setEditData((prevData) => ({
            ...prevData,
            "birthday": newDate
        }));
    }

    const handleCheckClick = async () => {
        const studentId = data.id? data.id : ''
        try {
            const response = await api.getStudent(studentId)
            if (response && response.data && response.data.status === "OK") {
                setEditData({
                    studentId : response.data.data.id,
                    studentName : response.data.data.fullname,
                    studentClazz : response.data.data.clazz,
                    birthday : response.data.data.birthday,
                    studentGender : response.data.data.gender,
                    studentPhone : response.data.data.phone,
                    studentEmail :response.data.data.email
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleSave = async () => {
        try {
            await api.updateStudent({
                id: editData.studentId,
                fullname: editData.studentName,
                clazz: editData.studentClazz,
                birthday: editData.birthday,
                gender: editData.studentGender,
                phone: editData.studentPhone,
                email: editData.studentEmail
            })
            await api.updateOrder({
                id : editData.id,
                studentId : editData.studentId,
                uniformGender : editData.uniformGender,
                uniformSizeName : editData.uniformSize,
                paid : editData.paid,
                received : editData.received
            })
            fetchData()
            handleClose()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <React.Fragment>
            <Chip icon={<BorderColorSharpIcon/>} label="Chỉnh sửa" onClick={handleOpen}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={3}>
                        <FormGrid size={{ xs: 12, md: 6 }}>
                            <FormLabel htmlFor="studentId" required>
                                Mã sinh viên
                            </FormLabel>
                            <OutlinedInput
                                id="studentId"
                                name="studentId"
                                placeholder="Mã sinh viên"
                                required
                                size="small"
                                value={editData.studentId? editData.studentId : ""}
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
                                name="studentName"
                                placeholder="Họ và Tên"
                                required
                                size="small"
                                value={editData.studentName? editData.studentName : ''}
                                onChange={handleDataChange}
                            />
                        </FormGrid>
                        <FormGrid size={{ xs: 12, md: 4 }}>
                            <FormLabel htmlFor="fullname" required>
                                Lớp
                            </FormLabel>
                            <OutlinedInput
                                id="studentClazz"
                                name="studentClazz"
                                placeholder="Lớp"
                                required
                                size="small"
                                value={editData.studentClazz? editData.studentClazz : ''}
                                onChange={handleDataChange}
                            />
                        </FormGrid>
                        <FormGrid size={{ xs: 12, md: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Ngày sinh"
                                        name="birthday"
                                        value={dayjs(editData.birthday? editData.birthday : "")}
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
                                value={editData.studentGender? editData.studentGender : ""}
                                name="studentGender"
                                onChange={handleDataChange}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Nam" />
                                <FormControlLabel value={false} control={<Radio />} label="Nữ" />
                            </RadioGroup>
                        </FormGrid>
                        <FormGrid size={{ xs: 12, md: 6 }}>
                            <FormLabel htmlFor="phone" required>
                                Số điện thoại
                            </FormLabel>
                            <OutlinedInput
                                id="phone"
                                name="studentPhone"
                                placeholder="Số điện thoại"
                                required
                                size="small"
                                value={editData.studentPhone? editData.studentPhone : ""}
                                onChange={handleDataChange}
                            />
                        </FormGrid>
                        <FormGrid size={{ xs: 12, md: 6 }}>
                            <FormLabel htmlFor="email">
                                Địa chỉ email
                            </FormLabel>
                            <OutlinedInput
                                id="email"
                                name="studentEmail"
                                placeholder="Địa chỉ email"
                                size="small"
                                value={editData.studentEmail? editData.studentEmail : ""}
                                onChange={handleDataChange}
                            />
                        </FormGrid>
                        <FormGrid size={{xs: 12, md: 6}}>
                            <FormLabel htmlFor="uniformGender" required>
                                Loại áo
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={editData.uniformGender}
                                name="uniformGender"
                                onChange={handleDataChange}
                            >
                                <FormControlLabel value={true} control={<Radio/>} label="Nam (Áo xuông)"/>
                                <FormControlLabel value={false} control={<Radio/>} label="Nữ (Áo ôm)"/>
                            </RadioGroup>
                        </FormGrid>
                        <FormGrid size={{xs: 12, md: 6}}>
                            <FormLabel htmlFor="uniformSize" required>
                                Kích thước áo
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={editData.uniformSize}
                                name="uniformSize"
                                onChange={handleDataChange}
                            >
                                <FormControlLabel value={"S"} control={<Radio/>} label="S"/>
                                <FormControlLabel value={"M"} control={<Radio/>} label="M"/>
                                <FormControlLabel value={"L"} control={<Radio/>} label="L"/>
                                <FormControlLabel value={"XL"} control={<Radio/>} label="XL"/>
                                <FormControlLabel value={"XXL"} control={<Radio/>} label="XXL"/>
                                <FormControlLabel value={"XXXL"} control={<Radio/>} label="XXXL"/>
                                <FormControlLabel value={"XXXXL"} control={<Radio/>} label="XXXL +"/>
                            </RadioGroup>
                        </FormGrid>
                        <FormGrid size={{xs: 12}}>
                            <FormControlLabel control={<Checkbox name="received" checked={editData.received} onChange={handleCheckboxChange}/>} label="Đã nhận áo" />
                        </FormGrid>
                        <Stack spacing={2} direction="row" sx={{alignSelf: "center", width: { xs: 12, md: 6 }}}>
                            <Button
                                variant="contained"
                                color="inherit"
                                sx={{ alignSelf: 'start', width: { xs: 12, md: 6 } }}
                                onClick={handleClose}
                            >
                                Hủy
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ alignSelf: 'start', width: { xs: 12, md: 6 } }}
                                onClick={handleSave}
                            >
                                Lưu lại
                            </Button>
                        </Stack>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}