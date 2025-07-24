import type { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import SummaryApi from "@/common/summeryApi";
import Axios from "@/utils/axios";
import toast from "react-hot-toast";
import { logout } from "../store/userSlice";
import AxiosToastError from "@/utils/axiosToastError";
import { Button } from "./ui/button";


interface UserMenuProps {
    close: () => void;
  }

const UserMenu : React.FC<UserMenuProps>  = ({close}) => {
    const user = useSelector((state: RootState) => state?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout,
            });
            // console.log("logout",response)
            if (response.data.success) {
                if (close) {
                    close();
                }
                dispatch(logout());
                localStorage.clear();
                toast.success(response.data.message);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            AxiosToastError(error);
        }
    };

    const handleClose = () => {
        if (close) {
            close();
        }
    };
    return (
        <div className="p-4 space-y-3 bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="font-semibold text-gray-900 text-base">My Account</div>

      {/* User Info */}
      <div className="text-sm space-y-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <span className="block truncate text-gray-700">
              {`${user.name} ${user.lastname}`}
              {user.role === "ADMIN" && <span className="ml-2 text-red-600 font-medium">(Admin)</span>}
            </span>
          </div>

          <Link
            onClick={handleClose}
            to={"/deshboard/home"}
            className="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Go to profile"
          >
            <HiOutlineExternalLink size={18} />
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <div className="pt-2 border-t border-gray-100">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
    );
};

export default UserMenu;
