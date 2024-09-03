import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import HOC from "../../hoc/HOC";
import {useEffect} from "react";
import api from "../../api";
import {styled} from "@mui/system";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import {Chip, InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import EditModal from "./action/EditModal";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import Stack from "@mui/material/Stack";
import DeleteModal from "./action/DeleteModal";

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const columns = [
    { id: 'no', label: 'STT', minWidth: 50, align: 'center' },
    { id: 'studentId', label: 'Mã sinh viên', minWidth: 100, align: 'center' },
    { id: 'studentName', label: 'Họ và Tên', minWidth: 250, align: 'center' },
    { id: 'studentClazz', label: 'Lớp', minWidth: 70, align: 'center' },
    { id: 'studentGender', label: 'Giới tính', minWidth: 50, align: 'center', format: (value) => value?'Nam':'Nữ' },
    { id: 'uniformSize', label: 'Size áo', minWidth: 70, align: 'center' },
    { id: 'uniformGender', label: 'Kiểu áo', minWidth: 70, align: 'center', format: (value) => value?'Nam':'Nữ' },
    { id: 'paid', label: 'Đã thanh toán', minWidth: 70, align: 'center', format: (value) => value?'Rồi':'Chưa' },
    { id: 'received', label: 'Đã nhận', minWidth: 70, align: 'center', format: (value) => value?'Rồi':'Chưa' },
    { id: 'action', label: 'Thao tác', minWidth: 100, align: 'center' },
    // {
    //     id: 'paid',
    //     label: 'Size\u00a0(km\u00b2)',
    //     minWidth: 170,
    //     align: 'right',
    //     format: (value) => value.toLocaleString('en-US'),
    // },
    // {
    //     id: 'received',
    //     label: 'Density',
    //     minWidth: 170,
    //     align: 'right',
    //     format: (value) => value.toFixed(2),
    // },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

function Orders() {
    const [filter, setFilter] = React.useState({
        keyword:"",
        uniformGender:"",
        UniformSize:"",
        fromDate:"",
        toDate:"",
        currentPage:"0",
        maxSize:"10"
    });

    const [data, setData] = React.useState({
        dataPaging: [],
        total: 0
    });

    const handleChangePage = (event, newPage) => {
        // setPage(newPage);
        setFilter((prevFilter)=>({
            ...prevFilter,
            currentPage: newPage
        }))
    };

    const handleChangeRowsPerPage = (event) => {
        setFilter((prevFilter)=>({
            ...prevFilter,
            maxSize: +event.target.value,
            currentPage: "0"
        }))
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilter((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRefresh = () => {
        setFilter({
            keyword:"",
            uniformGender:"",
            UniformSize:"",
            fromDate:"",
            toDate:"",
            currentPage:"0",
            maxSize:"10"
        })
    }

    React.useEffect(() => {
        fetchData();
    }, [filter]);

    const fetchData = async () => {
        try {
            const response = await api.getOrderList(filter);
            if (response && response.data && response.data.status === "OK") {
                setData(response.data.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="keyword"
                    name="keyword"
                    label="Tìm kiếm"
                    variant="outlined"
                    value={filter.keyword}
                    onChange={handleFilterChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="uniformGender">Loại áo</InputLabel>
                    <Select
                        labelId="uniformGender"
                        id="uniformGender"
                        name="uniformGender"
                        label="Loại áo"
                        value={filter.uniformGender}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value={true}>Nam (Áo xuồng)</MenuItem>
                        <MenuItem value={false}>Nữ (Áo ôm)</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="uniformSize">Kích thước áo</InputLabel>
                    <Select
                        labelId="uniformSize"
                        id="uniformSize"
                        name="uniformSize"
                        label="Kích thước áo"
                        value={filter.UniformSize}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value={"S"}>S</MenuItem>
                        <MenuItem value={"M"}>M</MenuItem>
                        <MenuItem value={"L"}>L</MenuItem>
                        <MenuItem value={"XL"}>XL</MenuItem>
                        <MenuItem value={"XXL"}>XXL</MenuItem>
                        <MenuItem value={"XXXL"}>XXXL</MenuItem>
                        <MenuItem value={"XXXXL"}>XXXL +</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleRefresh}>Làm mới</Button>
            </Box>
            {/*<div>*/}
            {/*    <FormGrid size={{ xs: 12, md: 6 }}>*/}
            {/*        <OutlinedInput*/}
            {/*            id="studentId"*/}
            {/*            name="id"*/}
            {/*            placeholder="Tìm kiếm"*/}
            {/*            required*/}
            {/*            size="small"*/}
            {/*            // value={data.id}*/}
            {/*            // onChange={handleDataChange}*/}
            {/*        />*/}
            {/*    </FormGrid>*/}
            {/*</div>*/}
            <TableContainer sx={{ maxHeight: 700 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.dataPaging
                            // .slice(filter.currentPage * filter.maxSize, filter.currentPage * filter.maxSize + filter.maxSize)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {

                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id==='no' ? index + 1 : ''}
                                                    {column.format ? column.format(value) : value}
                                                    {column.id==='action' ?
                                                        <Stack spacing={2} direction="row" sx={{alignSelf: "center"}}>
                                                            <EditModal data={row} fetchData={fetchData}/>
                                                            <DeleteModal data={row} fetchData={fetchData}/>
                                                        </Stack>
                                                        : ''}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100, 250]}
                component="div"
                count={data.total}
                rowsPerPage={filter.maxSize}
                page={filter.currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default HOC(Orders)