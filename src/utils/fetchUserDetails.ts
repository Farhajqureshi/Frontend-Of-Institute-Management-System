import Axios from "./axios";
import SummaryApi from "@/common/summeryApi";
// import AxiosToastError from "./axiosToastError";


export const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDetails
        });
        return response.data; // osam data structure is { data: { ...userDetails } }    

    } catch (error) {
        console.log(error);

    }
}