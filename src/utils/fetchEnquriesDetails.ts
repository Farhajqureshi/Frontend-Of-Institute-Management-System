import Axios from "./axios";
import SummaryApi from "@/common/summeryApi";
// import AxiosToastError from "./axiosToastError";


export const fetchEnquriesDetailData = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.enquiries,
            params: {
                page: 1,// Default page number // Default limit
                status: "", // Default status filter
                courseInterest: "", // Default course interest filter
                source: "", // Default source filter
                search: "" // Default search term
            }
        });
        return response.data;

    } catch (error) {
        console.log(error);

    }
}