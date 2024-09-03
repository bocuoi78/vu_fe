import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Dashboard from "../component/dashboard/Dashboard";
import SignIn from "../component/sign-in/SignIn";
import SignInSide from "../component/sign-in/SignInSide";
import Orders from "../component/dashboard/Orders";
import Checkout from "../component/checkout/Checkout";
import QRScanner from "../component/scanner/QRScanner";

function Routes() {
    const { token } = useAuth();

    // Define public routes accessible to all users
    const routesForPublic = [
        {
            path: "/check",
            element: <QRScanner />,
        },
        // {
        //     path: "/gioi-thieu",
        //     element: <Information />,
        // },
        // {
        //     path: "/bai-dang/:postId",
        //     element: <ViewPost />,
        // },
        // {
        //     path: "/tin-tuc",
        //     element: <News />,
        // },
        // {
        //     path: "/tin-tuc/doan-truong",
        //     element: <YUNews />,
        // },
        // {
        //     path: "/tin-tuc/lcd-khoa-khmt",
        //     element: <CSNews />,
        // },
        // {
        //     path: "/tin-tuc/lcd-khoa-ktmt&dt",
        //     element: <CENews />,
        // },
        // {
        //     path: "/tin-tuc/lcd-khoa-kts&tmdt",
        //     element: <DENews />,
        // },
        // {
        //     path: "/thong-bao",
        //     element: <Notification />,
        // },
        // {
        //     path: "/gop-y",
        //     element: <Feedback />,
        // },
        // {
        //     path: "/lien-he",
        //     element: <Contact />,
        // },
        // {
        //     path: "*",
        //     element: <Page404 />,
        // },
    ];

    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "/",
                    element: <Dashboard />,
                },
                {
                    path: "/dashboard",
                    element: <Dashboard />,
                },
                {
                    path: "/orders",
                    element: <Orders />,
                },
                {
                    path: "/customers",
                    element: <Dashboard />,
                },
                {
                    path: "/checkout",
                    element: <Checkout />,
                },
                // {
                //     path: "/quan-ly/cong-van",
                //     element: <Document />,
                // },
                // {
                //     path: "/quan-ly/bai-dang",
                //     element: <Post />,
                // },
                // {
                //     path: "/quan-ly/bai-dang/chinh-sua",
                //     element: <SavePost />,
                // },
                // {
                //     path: "/thong-ke",
                //     element: <Stats />,
                // },
                // {
                //     path: "/bao-cao",
                //     element: <Report />,
                // },
                // {
                //     path: "*",
                //     element: <Page404 />,
                // },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        // {
        //     path: "/",
        //     element: <Home />,
        // },
        {
            path: "/dang-nhap",
            element: <SignInSide />,
        },
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;