import { createBrowserRouter } from "react-router";
import App from "../App"
import Home from "@/pages/Home";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import Gallary from "@/pages/Gallary";
import Contect from "@/pages/Contect";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>,
            children: [
                {
                    path: "",
                    element: <Home/>
                },
                {
                    path: "/about",
                    element:<About/>
                },
                {
                    path: "/courses",
                    element: <Courses/>
                },
                {
                    path: "/gallery",
                    element: <Gallary/>
                },
                {
                    path: "/contect",
                    element: <Contect/>
                }
                
            ]
        }
    ]
);


export default router;
