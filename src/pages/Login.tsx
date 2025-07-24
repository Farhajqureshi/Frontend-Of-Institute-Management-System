
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Axios from "@/utils/axios";
import SummaryApi from "@/common/summeryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/axiosToastError";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "@/utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/store/userSlice";

// ✅ Validation schema
const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "At least 6 characters").required("Password is required"),
});

type LoginFormInputs = yup.InferType<typeof loginSchema>;

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ RHF setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
    });

    // ✅ Submit Handler
    const onSubmit = async (data: LoginFormInputs) => {
        setIsLoading(true);
        try {
            // console.log(data);
            await new Promise((res) => setTimeout(res, 2000));
            const response = await Axios({
                ...SummaryApi.login,
                data: data
            });

            if (response.data.error) {
                toast.error(response.data.message);
            };

            if (response.data.success) {
                toast.success(response.data.message);
            }
            localStorage.setItem("accesstoken", response.data.data.accessToken);
            localStorage.setItem("refreshToken", response.data.data.refreshToken);

            const userDetails = await fetchUserDetails()
            dispatch(setUserDetails(userDetails.data));

            reset()
            navigate("/")

            // alert("Login successful!");
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        alert("Forgot password functionality would be implemented here");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="pl-10"
                                    {...register("email")}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="pl-10 pr-10"
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <Label htmlFor="remember" className="text-sm">Remember me</Label>
                            </div>
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-primary hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter>
                    {/* Signup footer if needed */}
                </CardFooter>
            </Card>
        </div>
    );
}
