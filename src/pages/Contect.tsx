"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Axios from "@/utils/axios";
import SummaryApi from "../common/summeryApi";
import toast from "react-hot-toast";

// Define the validation schema using Yup
const validationSchema = yup.object({
  name: yup.string().required("Full name is required").min(2, "Name must be at least 2 characters"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  gender: yup.string().required("Gender is required"),
  email: yup.string().email("Invalid email format"),
  courseInterest: yup.string().required("Course interest is required"),
  source: yup.string().required("Enquiry source is required"),
  priority: yup.string().required("Priority is required"),
  demoStatus: yup.string().required("Demo status is required"),
  status: yup.string().required("Status is required"),
  remarks: yup.string(),
  cityName: yup.string().required("City is required"),
});

export default function EnquiryForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      phone: "",
      gender: "",
      email: "",
      courseInterest: "",
      source: "WALK_IN",
      priority: "MEDIUM",
      demoStatus: "PENDING",
      status: "NEW",
      remarks: "",
      cityName: "",
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data: any) => {
    try {
      console.log("Form submitted:", data);
      const response = await Axios({
        ...SummaryApi.createEnquiries,
        data: data,
      });

      if (response.data.success) {
        toast.success("Enquiry submitted successfully!");
      }
      reset()
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Student Enquiry Form</CardTitle>
            <CardDescription>Fill out the form below to register a new student enquiry</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter full name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="Enter phone number"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={watchedValues.gender}
                    onValueChange={(value) => setValue("gender", value)}
                  >
                    <SelectTrigger className={`w-full ${errors.gender ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter email address"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="courseInterest">Course Interest *</Label>
                  <Select
                    value={watchedValues.courseInterest}
                    onValueChange={(value) => setValue("courseInterest", value)}
                  >
                    <SelectTrigger
                      className={`w-full ${errors.courseInterest ? "border-red-500" : ""}`}
                    >
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic Computer">Basic Computer</SelectItem>
                      <SelectItem value="Tally ERP">Tally ERP</SelectItem>
                      <SelectItem value="Spoken English">Spoken English</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.courseInterest && (
                    <p className="text-sm text-red-500">{errors.courseInterest.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cityName">City *</Label>
                  <Select
                    value={watchedValues.cityName}
                    onValueChange={(value) => setValue("cityName", value)}
                  >
                    <SelectTrigger className={`w-full ${errors.cityName ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sehore">Sehore</SelectItem>
                      <SelectItem value="Aasta">Aasta</SelectItem>
                      <SelectItem value="Ichawar">Ichawar</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.cityName && (
                    <p className="text-sm text-red-500">{errors.cityName.message}</p>
                  )}
                </div>
              </div>

              {/* Enquiry Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="source">Enquiry Source</Label>
                  <Select
                    value={watchedValues.source}
                    onValueChange={(value) => setValue("source", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WALK_IN">Walk In</SelectItem>
                      <SelectItem value="ONLINE">Online</SelectItem>
                      <SelectItem value="REFERRAL">Referral</SelectItem>
                      <SelectItem value="SOCIAL_MEDIA">Social Media</SelectItem>
                      <SelectItem value="ADVERTISEMENT">Advertisement</SelectItem>
                      <SelectItem value="PHONE_CALL">Phone Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={watchedValues.priority}
                    onValueChange={(value) => setValue("priority", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  {...register("remarks")}
                  placeholder="Enter any additional remarks or notes"
                  rows={4}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}