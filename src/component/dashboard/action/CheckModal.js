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

export default function CheckModal({orderId}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [data, setData] = React.useState({
        studentId: "",
        studentName: "",
        studentClazz: "",
        birthday: "",
        studentGender: true,
        studentPhone: "",
        studentEmail: "",
        uniformGender: true,
        uniformSize: "",
        paid: false,
        transfer: false,
        received: false
    })

    const handleCheckClick = async () => {
        try {
            const response = await api.getOrder(orderId)
            if (response && response.data && response.data.status === "OK") {
                setData({
                    studentId: response.data.data.studentId,
                    studentName: response.data.data.studentName,
                    studentClazz: response.data.data.studentClazz,
                    birthday: response.data.data.birthday,
                    studentGender: response.data.data.studentGender,
                    studentPhone: response.data.data.studentPhone,
                    studentEmail: response.data.data.studentEmail,
                    uniformGender: response.data.data.uniformGender,
                    uniformSize: response.data.data.uniformSize,
                    paid: response.data.data.paid,
                    transfer: response.data.data.transfer,
                    received: response.data.data.received
                })
                handleOpen()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleSave = async () => {
        try {
            await api.updateOrder({
                id: orderId,
                studentId: data.studentId,
                uniformGender: data.uniformGender,
                uniformSizeName: data.uniformSize,
                paid: data.paid,
                transfer: data.transfer,
                received: true
            })
            handleClose()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleCheckClick}>Kiểm tra</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    position:'absolute',
                    top:'10%',
                    left:'10%',
                    overflow:'scroll',
                    height:'100%',
                    display:'block',
                }}
            >
                <Box sx={style}>
                    <Grid container spacing={3}>
                        <FormGrid size={{ xs: 12, md: 6 }}>
                            <FormLabel htmlFor="uuid" required>
                                uuid
                            </FormLabel>
                            <OutlinedInput
                                id="uuid"
                                name="uuid"
                                size="small"
                                value={orderId}
                                disabled
                            />
                        </FormGrid>
                        <FormGrid size={{ xs: 12, md: 6 }}>
                            <FormLabel htmlFor="studentId" required>
                                Mã sinh viên
                            </FormLabel>
                            <OutlinedInput
                                id="studentId"
                                name="studentId"
                                size="small"
                                value={data.studentId}
                                disabled
                            />
                        </FormGrid>
                        <FormGrid size={{ xs: 12, md: 8 }}>
                            <FormLabel htmlFor="fullname" required>
                                Họ và Tên
                            </FormLabel>
                            <OutlinedInput
                                id="studentName"
                                name="studentName"
                                size="small"
                                value={data.studentName}
                                disabled
                            />
                        </FormGrid>
                        <FormGrid size={{ xs: 12, md: 4 }}>
                            <FormLabel htmlFor="studentClazz" required>
                                Lớp
                            </FormLabel>
                            <OutlinedInput
                                id="studentClazz"
                                name="studentClazz"
                                size="small"
                                value={data.studentClazz}
                                disabled
                            />
                        </FormGrid>
                        <FormGrid size={{ xs: 12, md: 6 }}>
                            <FormLabel htmlFor="birthday" required>
                                Ngày sinh
                            </FormLabel>
                            <OutlinedInput
                                id="birthday"
                                name="birthday"
                                size="small"
                                value={data.birthday}
                                disabled
                            />
                        </FormGrid>
                        <FormGrid size={{ xs: 12, md: 6 }}>
                            <FormLabel htmlFor="studentGender" required>
                                Giới tính
                            </FormLabel>
                            <OutlinedInput
                                id="studentGender"
                                name="studentGender"
                                size="small"
                                value={data.studentGender?"Nam":"Nữ"}
                                disabled
                            />
                        </FormGrid>
                        <FormGrid size={{ xs: 12, md: 6 }}>
                            <FormLabel htmlFor="phone" required>
                                Số điện thoại
                            </FormLabel>
                            <OutlinedInput
                                id="phone"
                                name="studentPhone"
                                size="small"
                                value={data.studentPhone}
                                disabled
                            />
                        </FormGrid>
                        <FormGrid size={{ xs: 12, md: 6 }}>
                            <FormLabel htmlFor="email">
                                Địa chỉ email
                            </FormLabel>
                            <OutlinedInput
                                id="email"
                                name="studentEmail"
                                value={data.studentEmail}
                                disabled
                            />
                        </FormGrid>
                        <FormGrid size={{xs: 12, md: 4}}>
                            <FormLabel required>
                                Loại áo
                            </FormLabel>
                            <OutlinedInput
                                id="uniformType"
                                name="uniformType"
                                value={data.uniformGender?data.uniformSize+" Nam" : data.uniformSize+" Nữ"}
                                disabled
                            />
                        </FormGrid>
                        <FormGrid size={{xs: 12, md: 4}}>
                            <FormLabel htmlFor="paid" required>
                                Trạng thái thanh toán
                            </FormLabel>
                            <OutlinedInput
                                id="paid"
                                name="paid"
                                value={
                                data.paid?
                                    (data.transfer?"Đã chuyển khoản":"Đã đóng tiến mặt")
                                    :
                                    "Chưa thanh toán"
                            }
                                disabled
                            />
                        </FormGrid>
                        <FormGrid size={{xs: 12, md: 4}}>
                            <FormLabel htmlFor="received" required>
                                Trạng thái nhận
                            </FormLabel>
                            <OutlinedInput
                                id="received"
                                name="received"
                                value={data.received?"Đã nhận":"Chưa nhận"}
                                disabled
                            />
                        </FormGrid>
                        <Stack spacing={2} direction="row" sx={{alignSelf: "center", width: { xs: 12, md: 6 }}}>
                            <Button
                                variant="contained"
                                color="inherit"
                                sx={{ alignSelf: 'start', width: { xs: 12, md: 6 } }}
                                onClick={handleClose}
                            >
                                Thoát
                            </Button>
                            {data.received?'':
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ alignSelf: 'start', width: { xs: 12, md: 6 } }}
                                    onClick={handleSave}
                                >
                                    Đã nhận áo
                                </Button>
                            }
                        </Stack>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}