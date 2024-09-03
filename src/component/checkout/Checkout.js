import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import InformationForm from "./InformationForm";
import getCheckoutTheme from './theme/getCheckoutTheme';
import Info from './Info';
import InfoMobile from './InfoMobile';
import UniformForm from './UniformForm';
import Payment from './Payment';
import ToggleColorMode from './ToggleColorMode';
import SitemarkIcon from './SitemarkIcon';
import data from "bootstrap/js/src/dom/data";
import dayjs from "dayjs";
import api from "../../api";
import QRCode from "react-qr-code";
import StickyFooter from "../sticky-footer/StickyFooter";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Toggle design language"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton data-screenshot="toggle-default-theme" value={false}>
          Material Design 2
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

const steps = ['Thông tin cá nhân', 'Thông tin áo', 'Thanh toán'];

export default function Checkout() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const checkoutTheme = createTheme(getCheckoutTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [activeStep, setActiveStep] = React.useState(0);

    const [studentData, setStudentData] = React.useState({
        id : "",
        fullname : "",
        clazz : "",
        birthday : "",
        gender : "",
        phone : "",
        email : ""
    })

    const [orderData, setOrderData] = React.useState({
        orderId : "",
        gender : true,
        size : "",
        paid : false,
        received : false
    })

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <InformationForm data={studentData} onChangeData={setStudentData} />;
            case 1:
                return <UniformForm data={orderData} onChangeData={setOrderData} />;
            case 2:
                return <Payment studentData={studentData} orderData={orderData} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const updateStudent = async () => {
        try {
            const response = await api.updateStudent(studentData)
            if (response && response.data && response.data.status === "OK") {
                setActiveStep(activeStep + 1);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const updateOrder = async () => {
        try {
            const response = await api.updateOrder({
                id : orderData.orderId,
                studentId : studentData.id,
                uniformGender : orderData.gender,
                uniformSizeName : orderData.size,
                paid : orderData.paid,
                received : orderData.received
            })
            if (response && response.data && response.data.status === "OK") {
                setOrderData((prevOrderData)=>({
                    ...prevOrderData,
                    orderId : response.data.data.id
                }))
                setActiveStep(activeStep + 1);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const updatePayment = async () => {
        try {
            const response = await api.updateOrder({
                id : orderData.orderId,
                studentId : studentData.id,
                uniformGender : orderData.gender,
                uniformSizeName : orderData.size,
                paid : true,
                received : orderData.received
            })
            if (response && response.data && response.data.status === "OK") {
                setOrderData((prevOrderData)=>({
                    ...prevOrderData,
                    orderId : response.data.data.id,
                    paid : true
                }))
                setActiveStep(activeStep + 1);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const updateReceived = async () => {
        try {
            const response = await api.updateOrder({
                id : orderData.orderId,
                studentId : studentData.id,
                uniformGender : orderData.gender,
                uniformSizeName : orderData.size,
                paid : orderData.paid,
                received : !orderData.received
            })
            if (response && response.data && response.data.status === "OK") {
                setOrderData((prevOrderData)=>({
                    ...prevOrderData,
                    orderId : response.data.data.id,
                    received : !orderData.received
                }))
            }
        } catch (e) {
            console.log(e)
        }
    }

    const newOrder = () => {
        setOrderData({
            orderId : "",
            gender : "",
            size : "",
            paid : false,
            received : false
        })
        setActiveStep(1)
    }

    const newSession = () => {
        setStudentData({
            id : "",
            fullname : "",
            clazz : "",
            birthday : "",
            gender : "",
            phone : "",
            email : ""
        })
        setOrderData({
            orderId : "",
            gender : true,
            size : "",
            paid : false,
            received : false
        })
        setActiveStep(0)
    }

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: light)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };
  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  const handleNext = () => {
      if (activeStep === 0) {
          updateStudent()
      }
      if (activeStep === 1) {
          updateOrder()
      }
      if (activeStep === 2) {
          updatePayment()
      }
      // setActiveStep(activeStep + 1);
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
        <StickyFooter/>
      <CssBaseline />
      <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
        <Grid
          item
          xs={12}
          sm={5}
          lg={4}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'start',
            pt: 4,
            px: 10,
            gap: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'end', height: 150 }}>
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              href="/orders"
              sx={{ ml: '-8px' }}
            >
              Trang chủ
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: 500,
            }}
          >
            <Info totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={7}
          lg={8}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'start',
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'space-between', md: 'flex-end' },
              alignItems: 'center',
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Button
                startIcon={<ArrowBackRoundedIcon />}
                component="a"
                href="/orders"
                sx={{ alignSelf: 'start' }}
              >
                Trang chủ
              </Button>
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexGrow: 1,
                height: 150,
              }}
            >
              <ToggleColorMode
                data-screenshot="toggle-mode"
                mode={mode}
                toggleColorMode={toggleColorMode}
              />
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: '100%', height: 40 }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                ':last-child': { pb: 2 },
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {activeStep >= 2 ? '$144.97' : '$134.98'}
                </Typography>
              </div>
              <InfoMobile totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
              maxHeight: '720px',
              gap: { xs: 5, md: 'none' },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: 'flex', md: 'none' } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ':first-child': { pl: 0 },
                    ':last-child': { pr: 0 },
                    '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">{studentData.id} - {orderData.size} {orderData.gender==false?"Nam":"Nữ"}</Typography>
                  <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "80%", width: "80%" }}
                      value={orderData.orderId}
                      viewBox={`0 0 256 256`}
                  />
                  <Stack spacing={2} direction="row">
                      <Button
                          variant="contained"
                          color={orderData.received?"success":"error"}
                          sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                          onClick={updateReceived}
                      >
                          {orderData.received?"Đã nhận áo":"Chưa nhận áo"}
                      </Button>
                      <Button
                          variant="contained"
                          color="secondary"
                          sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                          onClick={newOrder}
                      >
                          Mua thêm
                      </Button>
                      <Button
                          variant="contained"
                          color="primary"
                          sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                          onClick={newSession}
                      >
                          Mua mới
                      </Button>
                  </Stack>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={[
                    {
                      display: 'flex',
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                      alignItems: 'end',
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: '60px',
                    },
                    activeStep !== 0
                      ? { justifyContent: 'space-between' }
                      : { justifyContent: 'flex-end' },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                      Trở lại
                    </Button>
                  )}

                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: 'flex', sm: 'none' } }}
                    >
                      Trỏ lại
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {activeStep === steps.length - 1 ? 'Xác nhận' : 'Tiếp theo'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
