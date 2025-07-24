



export const baseURL = "http://localhost:8080";
// import.meta.env.VITE_API_URL


const SummaryApi = {
  login: {
    url: "/api/user/login",
    method: "post",
  },
  refreshToken:{
    url:"/api/user/refresh-token",
    method:"post"
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "get"
  },
  logout:{
    url: "/api/user/logout",
    method:"get"
  },
  enquiries: {
    url: `api/enquiries/get`,
    method: "get",
  },

  createEnquiries: {
    url:"/api/enquiries/create",
    method:"post"
  },
  updateEnquiries:{
    url:"/api/enquiries/update/",
    method:"put"
  }
};

export default SummaryApi;