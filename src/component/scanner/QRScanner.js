import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import HOC from "../../hoc/HOC";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CachedIcon from '@mui/icons-material/Cached';
import FormControl from "@mui/material/FormControl";
import {InputLabel, MenuItem, Select} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import api from "../../api";
import CheckModal from "../dashboard/action/CheckModal";

const QRScanner = (props) => {
    const [camType, setCamType] = useState("environment");
    const [result, setResult] = useState("");
    const [data, setData] = useState({})

    const handleChangeCam = () => {
        if (camType==="environment") {
            setCamType("user")
        } else if (camType==="user") {
            setCamType("environment")
        }
    }

    const handleTextFieldChange = (event) => {
        const { value } = event.target
        setResult(value)
    }

    const handleScan = (data) => {
        if (data) {
            setResult(data)
            // try {
            //     const response = await api.getOrder(data)
            //     if (response && response.data && response.data.status==='OK') {
            //         console.log(response)
            //     }
            // } catch (e) {
            //     console.error(e)
            // }
        }
    };

    const handleClickCheck = async () => {

    }

    let handleError = err => {
        alert(err);
    };
    return (
        <Box
            sx={{
                width: '100%',
                textAlign: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1 } }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="keyword"
                    name="keyword"
                    // label="Nhập mã QR code"
                    variant="outlined"
                    value={result}
                    onChange={handleTextFieldChange}
                    fullWidth
                    placeholder="Nhập mã QR code"
                />
                <CheckModal orderId={result}/>
                <IconButton onClick={handleChangeCam}>
                    <CachedIcon />
                </IconButton>
            </Box>
            {/*<Box sx={{width: '100%',xs: 12, md: 6, textAlign: 'center'}}>*/}
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{
                        width: "100%",
                    }}
                    facingMode={camType}
                />
            {/*</Box>*/}
        </Box>
    );
};

export default HOC(QRScanner)