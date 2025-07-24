import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { fetchUserDetails } from "./utils/fetchUserDetails";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { fetchEnquriesDetailData } from "./utils/fetchEnquriesDetails";

const App = () => {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  

  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      // console.log("User Data:", userData);
      if (userData?.data) {
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnquiries = async () => {
    try {
      const enquiriesData = await fetchEnquriesDetailData();
      console.log("Enquiries Data:", enquiriesData); 
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchEnquiries();
  }, []);
  return (
    <>
      <Toaster />
      <Header />
      <main className="min-h-[84vh]">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </>
  );
};

export default App;
