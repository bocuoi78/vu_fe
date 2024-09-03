import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Chip} from "@mui/material";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import api from "../../../api";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DeleteModal({data, fetchData}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        try {
            const response = await api.deleteOrder(data.id)
            if (response && response.data && response.data.status === "OK") {
                fetchData()
                handleClose()
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <React.Fragment>
            <Chip icon={<DeleteForeverSharpIcon/>} label="Xóa" onClick={handleOpen}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Đăng xuất
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Bạn có chắc chắn muốn xóa?
                    </Typography>
                    <Button onClick={handleDelete}>
                        Có
                    </Button>
                    <Button onClick={handleClose}>
                        Không
                    </Button>
                </Box>
            </Modal>
        </React.Fragment>
    );
}