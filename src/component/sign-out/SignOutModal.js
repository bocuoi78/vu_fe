import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ListItemIcon from "@mui/material/ListItemIcon";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import provider from "../../provider";

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

export default function SignOutModal() {
    const { setToken } = provider.useAuth();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <ListItemButton onClick={handleOpen}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
            </ListItemButton>
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
                        Bạn có chắc chắn muốn đăng xuất?
                    </Typography>
                    <Button onClick={() => setToken()}>
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