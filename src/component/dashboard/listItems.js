import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from "react-router-dom";
import SignOutModal from "../sign-out/SignOutModal";

export const mainListItems = (
    <React.Fragment>
        <ListItemButton as={NavLink} to={"/checkout"}>
            <ListItemIcon>
                <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Add new" />
        </ListItemButton>
        <ListItemButton as={NavLink} to={"/orders"}>
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
        </ListItemButton>
        {/*<ListItemButton as={NavLink} to={"/customers"}>*/}
        {/*    <ListItemIcon>*/}
        {/*        <PeopleIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Customers" />*/}
        {/*</ListItemButton>*/}
        <ListItemButton as={NavLink} to={"/reports"}>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItemButton>
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <LayersIcon />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Integrations" />*/}
        {/*</ListItemButton>*/}
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);

export const extendListItem = (
    <React.Fragment>
        {/*<ListSubheader component="div" inset>*/}
        {/*    Saved reports*/}
        {/*</ListSubheader>*/}
        {/*<ListItemButton>*/}
        {/*    <ListItemIcon>*/}
        {/*        <LogoutIcon/>*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText primary="Sign Out" />*/}
        {/*</ListItemButton>*/}
        <SignOutModal/>
    </React.Fragment>
);