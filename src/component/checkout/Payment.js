import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {useEffect} from "react";

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type:', detail: 'Visa' },
  { name: 'Card holder:', detail: 'Mr. John Smith' },
  { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date:', detail: '04/2024' },
];
const default_bank = {
    bankId : "vietinbank",
    accountNo : "0918949317",
    template : "compact",
    accountName : "NGUYEN DUY KHANH",
    amount : "100000"
}

export default function Payment({studentData, orderData}) {
    const [url, setUrl] = React.useState("")
    useEffect(() => {
        const uniformType = orderData.gender?"nam":"nu"
        const description = studentData.id + " " + orderData.size + " " + uniformType + " " + orderData.orderId
        setUrl("https://img.vietqr.io/image/"
            + default_bank.bankId
            + "-" + default_bank.accountNo
            + "-" + default_bank.template + ".png"
            + "?amount=" + default_bank.amount
            + "&addInfo=" + description
            + "&accountName=" + default_bank.accountName)
    }, [orderData, studentData.id]);
    // const url = "https://img.vietqr.io/image/"
    //     + default_bank.bankId
    //     + "-" + default_bank.accountNo
    //     + "-" + default_bank.template + ".png"
    //     + "?amount=" + default_bank.amount
    //     + "&addInfo=" + description
    //     + "&accountName=" + default_bank.accountName
  return (
      <Stack spacing={2} alignItems="center">
        <img
            src={url}
            width={500}
            // height={500}
            alt="Thong tin chuyen khoan"/>
        {/*<Divider/>*/}
        {/*<Stack*/}
        {/*    direction="column"*/}
        {/*    divider={<Divider flexItem/>}*/}
        {/*    spacing={2}*/}
        {/*    sx={{my: 2}}*/}
        {/*>*/}
        {/*  <div>*/}
        {/*    <Typography variant="subtitle2" gutterBottom>*/}
        {/*      Shipment details*/}
        {/*    </Typography>*/}
        {/*    <Typography gutterBottom>John Smith</Typography>*/}
        {/*    <Typography gutterBottom sx={{color: 'text.secondary'}}>*/}
        {/*      {addresses.join(', ')}*/}
        {/*    </Typography>*/}
        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <Typography variant="subtitle2" gutterBottom>*/}
        {/*      Payment details*/}
        {/*    </Typography>*/}
        {/*    <Grid container>*/}
        {/*      {payments.map((payment) => (*/}
        {/*          <React.Fragment key={payment.name}>*/}
        {/*            <Stack*/}
        {/*                direction="row"*/}
        {/*                spacing={1}*/}
        {/*                useFlexGap*/}
        {/*                sx={{width: '100%', mb: 1}}*/}
        {/*            >*/}
        {/*              <Typography variant="body1" sx={{color: 'text.secondary'}}>*/}
        {/*                {payment.name}*/}
        {/*              </Typography>*/}
        {/*              <Typography variant="body2">{payment.detail}</Typography>*/}
        {/*            </Stack>*/}
        {/*          </React.Fragment>*/}
        {/*      ))}*/}
        {/*    </Grid>*/}
        {/*  </div>*/}
        {/*</Stack>*/}
      </Stack>
  );
}
