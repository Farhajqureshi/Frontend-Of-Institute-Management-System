import { createBrowserRouter } from "react-router";
import App from "../App"
import Home from "@/pages/Home";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import Gallary from "@/pages/Gallary";
import Contect from "@/pages/Contect";
import Login from "@/pages/Login";
import Deshboard from "@/layout/Deshboard";
import DeshboardPage from "@/pages/Admin/DeshboardPage";
import Enquries from "@/pages/Admin/Enquries";
import StudentCourses from "@/pages/Admin/StudentCourses";
import Branch from "@/pages/Admin/Branch";
import Batches from "@/pages/Admin/Batches";
import Reports from "@/pages/Admin/Reports";
import Students from "@/pages/Admin/Students";
import Fees from "@/pages/Admin/Fees";
import Settings from "@/pages/Admin/Settings";
import AdminPermision from "@/layout/Adminpermission";
import ErrorPage from "@/pages/ErrorPage";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <Home />
                },
                {
                    path: "/about",
                    element: <About />
                },
                {
                    path: "/courses",
                    element: <Courses />
                },
                {
                    path: "/gallery",
                    element: <Gallary />
                },
                {
                    path: "/contact",
                    element: <Contect />
                },
                {
                    path: "/sign-in",
                    element: <Login />
                },

                {
                    path: "/deshboard",
                    element: <AdminPermision> <Deshboard /></AdminPermision>,
                    children: [
                        {
                            path: "enquiries",
                            element: <AdminPermision><Enquries /></AdminPermision>
                        },
                        {
                            path: "home",
                            element: <DeshboardPage />
                        },
                        {
                            path: "courses",
                            element: <StudentCourses />
                        },
                        {
                            path: "branch",
                            element: <Branch />
                        },
                        {
                            path: "batches",
                            element: <Batches />
                        },
                        {
                            path: "reports",
                            element: <Reports />
                        },
                        {
                            path: "students",
                            element: <Students />
                        },
                        {
                            path: "fees",
                            element: <Fees />
                        },
                        {
                            path: "settings",
                            element: <Settings />
                        }
                    ]
                }

            ]
        }
    ]
);


export default router;
