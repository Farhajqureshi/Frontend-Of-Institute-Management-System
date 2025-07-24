import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Bell, Edit, Eye, FileText, Plus, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { fetchEnquriesDetailData } from "@/utils/fetchEnquriesDetails";
import Axios from "../../utils/axios";
import SummaryApi, { baseURL } from "../../common/summeryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CofirmBox from "@/components/adminComponents/ConfirmBox";
import AxiosToastError from "@/utils/axiosToastError";

interface Enquiry {
    id: string;
    name: string;
    phone: string;
    gender: string;
    email: string;
    enquryId: string;
    status: string;
    courseInterest: string;
    source: string;
    assignedTo: string;
    createdDate: string | Date;
    followUpDate?: string | Date;
    demoStatus?: string;
    cityName: string;
    priority: string;
    remarks: string;
    // Add other properties as needed
}

const Enquries = () => {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
    const [enquiryFormMode, setEnquiryFormMode] = useState("create");
    const [loading, setLoading] = useState(true);
    const [enquiryFilters, setEnquiryFilters] = useState({
        search: "",
        status: "",
        course: "",
        source: "",
        assignedTo: "",
        dateFrom: "",
        dateTo: "",
    });

    const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteEnquiry, setDeleteEnquiry] = useState({
        id: "",
    });

    const [showFilters, setShowFilters] = useState(false);

    const navigate = useNavigate();

    const fetchEnquiries = async () => {
        try {
            const enquiriesData = await fetchEnquriesDetailData();
            if (enquiriesData?.data) {
                setEnquiries(enquiriesData.data);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "NEW":
                return "bg-blue-100 text-blue-800";
            case "PENDING":
                return "bg-yellow-100 text-yellow-800";
            case "INTERESTED":
                return "bg-purple-100 text-purple-800";
            case "ENROLLED":
                return "bg-green-100 text-green-800";
            case "REJECTED":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getFilteredEnquiries = () => {
        return enquiries.filter((enquiry: any) => {
            const matchesSearch =
                enquiry.name
                    .toLowerCase()
                    .includes(enquiryFilters.search.toLowerCase()) ||
                enquiry.phone.includes(enquiryFilters.search) ||
                enquiry.email
                    .toLowerCase()
                    .includes(enquiryFilters.search.toLowerCase()) ||
                enquiry.enquryId
                    .toLowerCase()
                    .includes(enquiryFilters.search.toLowerCase());

            const matchesStatus =
                !enquiryFilters.status || enquiry.status === enquiryFilters.status;
            const matchesCourse =
                !enquiryFilters.course ||
                enquiry.courseInterest === enquiryFilters.course;
            const matchesSource =
                !enquiryFilters.source || enquiry.source === enquiryFilters.source;
            const matchesAssignedTo =
                !enquiryFilters.assignedTo ||
                enquiry.assignedTo === enquiryFilters.assignedTo;

            const matchesDateRange = () => {
                if (!enquiryFilters.dateFrom && !enquiryFilters.dateTo) return true;
                const enquiryDate = new Date(enquiry.createdDate);
                const fromDate = enquiryFilters.dateFrom
                    ? new Date(enquiryFilters.dateFrom)
                    : null;
                const toDate = enquiryFilters.dateTo
                    ? new Date(enquiryFilters.dateTo)
                    : null;

                if (fromDate && toDate) {
                    return enquiryDate >= fromDate && enquiryDate <= toDate;
                } else if (fromDate) {
                    return enquiryDate >= fromDate;
                } else if (toDate) {
                    return enquiryDate <= toDate;
                }
                return true;
            };

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCourse &&
                matchesSource &&
                matchesAssignedTo &&
                matchesDateRange()
            );
        });
    };

    const clearFilters = () => {
        setEnquiryFilters({
            search: "",
            status: "",
            course: "",
            source: "",
            assignedTo: "",
            dateFrom: "",
            dateTo: "",
        });
    };

    const activeFiltersCount = Object.values(enquiryFilters).filter(
        (value) => value !== ""
    ).length;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const rawFollowUpDate = formData.get("followUpDate");

        const enquiryData = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            gender: formData.get("gender"),
            cityName: formData.get("cityname"),
            courseInterest: formData.get("courseInterest"),
            source: formData.get("source"),
            status: formData.get("status"),
            followUpDate:
                rawFollowUpDate && typeof rawFollowUpDate === "string" && rawFollowUpDate.trim() !== ""
                    ? rawFollowUpDate
                    : null,
            remarks: formData.get("remarks"),
            demoStatus: formData.get("demoStatus"),
            createdDate:
                enquiryFormMode === "create"
                    ? new Date().toISOString().split("T")[0]
                    : selectedEnquiry?.createdDate,
        };

        console.log("Data sumbmit enquiry :", enquiryData);

        let response: any;

        if (enquiryFormMode === "create") {
            // 🔵 Create Enquiry using Axios config
            response = await Axios({
                ...SummaryApi.createEnquiries,
                data: enquiryData,
            });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchEnquiries();
            }
        } else {
            // 🟢 Update Enquiry using Axios config
            response = await axios({
                method: SummaryApi.updateEnquiries.method,
                url: `${baseURL}/api/enquiries/update/${selectedEnquiry?.id}`,
                data: enquiryData,
                withCredentials: true,
            });
            console.log(response.params);

            if (response.data.success) {
                toast.success(response.data.message);
                fetchEnquiries();
            }
        }

        setShowEnquiryModal(false);
        setSelectedEnquiry(null);
    };

    const handleDeleteCategory = async () => {
        try {
            const response = await axios({
                method: "delete",
                url: `${baseURL}/api/enquiries/delete/${selectedEnquiry?.id}`,
                data: deleteEnquiry,
                withCredentials: true,
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                fetchEnquiries();
                setOpenConfirmBoxDelete(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex sm:flex-row flex-col justify-between items-center">
                <h2 className="text-2xl font-bold">Enquiry Management</h2>
                <div className="flex items-center space-x-3">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search by name, phone, email..."
                            className="pl-10 w-64"
                            value={enquiryFilters.search}
                            onChange={(e) =>
                                setEnquiryFilters({ ...enquiryFilters, search: e.target.value })
                            }
                        />
                    </div>

                    {/* Filter Button */}
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="relative"
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        Filters
                        {activeFiltersCount > 0 && (
                            <Badge className="ml-2 bg-blue-600 text-white text-xs">
                                {activeFiltersCount}
                            </Badge>
                        )}
                    </Button>

                    {/* Add Enquiry Button */}
                    <Button
                        onClick={() => {
                            setSelectedEnquiry(null);
                            setEnquiryFormMode("create");
                            setShowEnquiryModal(true);
                        }}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Enquiry
                    </Button>
                </div>
            </div>

            {showFilters && (
                <Card className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select
                                className="w-full p-2 border rounded-md text-sm"
                                value={enquiryFilters.status}
                                onChange={(e) =>
                                    setEnquiryFilters({
                                        ...enquiryFilters,
                                        status: e.target.value,
                                    })
                                }
                            >
                                <option value="">All Status</option>
                                <option value="NEW">New</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="INTERESTED">Interested</option>
                                <option value="Enrolled">Enrolled</option>
                                <option value="NOT_INTERESTED">Not Interested</option>
                                <option value="LOST">Rejected</option>
                            </select>
                        </div>

                        {/* Course Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Course</label>
                            <select
                                className="w-full p-2 border rounded-md text-sm"
                                value={enquiryFilters.course}
                                onChange={(e) =>
                                    setEnquiryFilters({
                                        ...enquiryFilters,
                                        course: e.target.value,
                                    })
                                }
                            >
                                <option value="">All Courses</option>
                                <option value="Basic Computer">Basic Computer</option>
                                <option value="Tally ERP">Tally ERP</option>
                                <option value="Spoken English">Spoken English</option>
                            </select>
                        </div>

                        {/* Source Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Source</label>
                            <select
                                className="w-full p-2 border rounded-md text-sm"
                                value={enquiryFilters.source}
                                onChange={(e) =>
                                    setEnquiryFilters({
                                        ...enquiryFilters,
                                        source: e.target.value,
                                    })
                                }
                            >
                                <option value="">All Sources</option>
                                <option value="Website">Website</option>
                                <option value="SOCIAL_MEDIA">Social Media</option>
                                <option value="REFERRAL">Referral</option>
                                <option value="WALK_IN">Walk-in</option>
                                {/* <option value="Advertisement">Adver</option> */}
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Date From Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Date From
                            </label>
                            <Input
                                type="date"
                                className="text-sm"
                                value={enquiryFilters.dateFrom}
                                onChange={(e) =>
                                    setEnquiryFilters({
                                        ...enquiryFilters,
                                        dateFrom: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Date To Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Date To</label>
                            <Input
                                type="date"
                                className="text-sm"
                                value={enquiryFilters.dateTo}
                                onChange={(e) =>
                                    setEnquiryFilters({
                                        ...enquiryFilters,
                                        dateTo: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {/* Filter Actions */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        {/* <div className="text-sm text-gray-600">
                            Showing {getFilteredEnquiries().length} of {enquiries.length} enquiries
                        </div> */}
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={clearFilters}>
                                Clear All Filters
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFilters(false)}
                            >
                                Hide Filters
                            </Button>
                        </div>
                    </div>
                </Card>
            )}

            {/* Enquiry Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Enquiries
                        </CardTitle>
                        <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {getFilteredEnquiries().length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {activeFiltersCount > 0
                                ? `Filtered from ${enquiries.length}`
                                : "Total enquiries"}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            {getFilteredEnquiries().filter((e) => e.status === "NEW").length}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Demo Status Pending
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">
                            {
                                getFilteredEnquiries().filter((e) => e.demoStatus === "PENDING")
                                    .length
                            }
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Interested</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                            {
                                getFilteredEnquiries().filter((e) => e.status === "INTERESTED")
                                    .length
                            }
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            High Priority Student
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {
                                getFilteredEnquiries().filter((e) => e.priority === "HIGH")
                                    .length
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Enquiries Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Enquiries</CardTitle>
                    <CardDescription>
                        Manage student enquiries and follow-ups
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader className="bg-black">
                            <TableRow className="p-5">
                                {/* <TableHead className="text-white">SNO.</TableHead> */}
                                <TableHead className="text-white">Enquiry ID</TableHead>
                                <TableHead className="text-white">Name</TableHead>
                                <TableHead className="text-white">Contact</TableHead>
                                <TableHead className="text-white">City</TableHead>
                                <TableHead className="text-white">Course Interest</TableHead>
                                <TableHead className="text-white">Source</TableHead>
                                <TableHead className="text-white">Status</TableHead>
                                <TableHead className="text-white">Follow-up Date</TableHead>
                                <TableHead className="text-white">Demo Status</TableHead>
                                <TableHead className="text-white">
                                    Interested Priority
                                </TableHead>
                                <TableHead className="text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {getFilteredEnquiries().map((enquiry: any) => (
                                <TableRow key={enquiry.id}>
                                    {/* <TableCell className="font-medium">{enquiry.id}</TableCell> */}
                                    <TableCell className="font-medium">
                                        {enquiry.enquryId}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{enquiry.name}</p>
                                            <p className="text-sm text-gray-500">{enquiry.email}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{enquiry.phone}</TableCell>
                                    <TableCell>{enquiry.cityName}</TableCell>
                                    <TableCell>{enquiry.courseInterest}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{enquiry.source}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(enquiry.status)}>
                                            {enquiry.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {enquiry.followUpDate
                                            ? new Date(enquiry.followUpDate).toLocaleDateString()
                                            : "-"}
                                    </TableCell>
                                    <TableCell>{enquiry.demoStatus}</TableCell>
                                    <TableCell>{enquiry.priority}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedEnquiry(enquiry);
                                                    setEnquiryFormMode("view");
                                                    setShowEnquiryModal(true);
                                                }}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedEnquiry(enquiry);
                                                    setEnquiryFormMode("edit");
                                                    setShowEnquiryModal(true);
                                                }}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            "Are you sure you want to delete this enquiry?"
                                                        )
                                                    ) {
                                                        setEnquiries(
                                                            enquiries.filter((e: any) => e.id !== enquiry.id)
                                                        );
                                                        setOpenConfirmBoxDelete(true);
                                                        setDeleteEnquiry(enquiry);
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {getFilteredEnquiries().length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-lg font-medium">No enquiries found</p>
                            <p className="text-sm">
                                Try adjusting your filters or search terms
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {showEnquiryModal && (
                <div className="fixed inset-0 bg-neutral-800 bg-opacity-60 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-4">
                                <h3 className="text-xl font-bold">
                                    {enquiryFormMode === "create"
                                        ? "Add New Enquiry"
                                        : enquiryFormMode === "edit"
                                            ? "Edit Enquiry"
                                            : "View Enquiry"}
                                </h3>
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setShowEnquiryModal(false);
                                        setSelectedEnquiry(null);
                                    }}
                                >
                                    ×
                                </Button>
                            </div>

                            {enquiryFormMode === "view" ? (
                                // View Mode
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Enquiry ID:</p>
                                            <p className="font-semibold">
                                                {selectedEnquiry?.enquryId}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Date Created:</p>
                                            <p className="font-semibold">
                                                {selectedEnquiry?.createdDate
                                                    ? new Date(
                                                        selectedEnquiry.createdDate
                                                    ).toLocaleDateString()
                                                    : "Not available"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Name:</p>
                                            <p className="font-semibold">{selectedEnquiry?.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Phone:</p>
                                            <p className="font-semibold">{selectedEnquiry?.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email:</p>
                                            <p className="font-semibold">{selectedEnquiry?.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Course Interest:</p>
                                            <p className="font-semibold">
                                                {selectedEnquiry?.courseInterest}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Source:</p>
                                            <Badge variant="outline">{selectedEnquiry?.source}</Badge>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Status:</p>
                                            <Badge
                                                className={getStatusColor(
                                                    selectedEnquiry?.status ?? "Pending"
                                                )}
                                            >
                                                {selectedEnquiry?.status ?? "Pending"}
                                            </Badge>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Assigned To:</p>
                                            <p className="font-semibold">
                                                {selectedEnquiry?.assignedTo}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Follow-up Date:</p>
                                            <p className="font-semibold">
                                                {selectedEnquiry?.followUpDate
                                                    ? new Date(
                                                        selectedEnquiry.followUpDate
                                                    ).toLocaleDateString()
                                                    : "Not set"}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Notes:</p>
                                        <p className="font-semibold">
                                            {selectedEnquiry?.remarks || "No notes"}
                                        </p>
                                    </div>
                                    <div className="flex justify-end space-x-4">
                                        <Button
                                            onClick={() => {
                                                setEnquiryFormMode("edit");
                                            }}
                                        >
                                            Edit Enquiry
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setShowEnquiryModal(false);
                                                setSelectedEnquiry(null);
                                            }}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Name *
                                            </label>
                                            <Input
                                                name="name"
                                                placeholder="Enter full name"
                                                defaultValue={selectedEnquiry?.name || ""}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Phone *
                                            </label>
                                            <Input
                                                name="phone"
                                                placeholder="Enter phone number"
                                                defaultValue={selectedEnquiry?.phone || ""}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Email
                                            </label>
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="Enter email address"
                                                defaultValue={selectedEnquiry?.email || ""}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Gender *
                                            </label>
                                            <select
                                                name="gender"
                                                className="w-full p-2 border rounded-md"
                                                defaultValue={selectedEnquiry?.gender || ""}
                                                required
                                            >
                                                <option value="">All Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Femail">Female</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                City Name *
                                            </label>
                                            <select
                                                name="cityname"
                                                className="w-full p-2 border rounded-md"
                                                defaultValue={selectedEnquiry?.cityName || ""}
                                                required
                                            >
                                                <option value="">All Cities</option>
                                                <option value="Sehore">Sehore</option>
                                                <option value="Aasta">Aasta</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Course Interest *
                                            </label>
                                            <select
                                                name="courseInterest"
                                                className="w-full p-2 border rounded-md"
                                                defaultValue={selectedEnquiry?.courseInterest || ""}
                                                required
                                            >
                                                <option value="">All Courses</option>
                                                <option value="Basic Computer">Basic Computer</option>
                                                <option value="Tally ERP">Tally ERP</option>
                                                <option value="Spoken English">Spoken English</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Source
                                            </label>
                                            <select
                                                name="source"
                                                className="w-full p-2 border rounded-md"
                                                defaultValue={selectedEnquiry?.source || ""}
                                            >
                                                <option value="OTHER">All Sources</option>
                                                <option value="WEBSITE">Website</option>
                                                <option value="SOCIAL_MEDIA">Social Media</option>
                                                <option value="REFERRAL">Referral</option>
                                                <option value="WALK_IN">Walk-in</option>
                                                <option value="ADVERTISEMENT">Advertisement</option>
                                                <option value="PHONE_CALL">Phone Call</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                className="w-full p-2 border rounded-md"
                                                defaultValue={selectedEnquiry?.status || "NEW"}
                                            >
                                                <option value="NEW">New</option>
                                                <option value="CONTACTED">Contacted</option>
                                                <option value="INTERESTED">Interested</option>
                                                <option value="Enrolled">Enrolled</option>
                                                <option value="NOT_INTERESTED">Not Interested</option>
                                                <option value="CONVERTED">Converted</option>
                                                <option value="LOST">Rejected</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Demo Status
                                            </label>
                                            <select
                                                name="demoStatus"
                                                className="w-full p-2 border rounded-md"
                                                defaultValue={selectedEnquiry?.demoStatus || ""}
                                            >
                                                <option value="PENDING">Select Demo Status</option>
                                                <option value="PENDING">Pending</option>
                                                <option value="REJECTED">Rejected</option>
                                                <option value="JOINED">Joined</option>
                                                <option value="EXPIRED">Expired</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Intrest Priority
                                            </label>
                                            <select
                                                name="demoStatus"
                                                className="w-full p-2 border rounded-md"
                                                defaultValue={selectedEnquiry?.priority || ""}
                                            >
                                                <option value="">Select Interest Priority</option>
                                                <option value="HIGH">High</option>
                                                <option value="MEDIUM">Medium</option>
                                                <option value="LOW">Low</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Follow-up Date
                                            </label>
                                            <Input
                                                name="followUpDate"
                                                type="date"
                                                defaultValue={
                                                    selectedEnquiry?.followUpDate
                                                        ? new Date(selectedEnquiry.followUpDate)
                                                            .toISOString()
                                                            .split("T")[0]
                                                        : new Date().toISOString()
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Notes
                                        </label>
                                        <textarea
                                            name="remarks"
                                            className="w-full p-2 border rounded-md"
                                            placeholder="Any additional notes or comments..."
                                            defaultValue={selectedEnquiry?.remarks || ""}
                                        ></textarea>
                                    </div>

                                    <div className="flex justify-end space-x-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setShowEnquiryModal(false);
                                                setSelectedEnquiry(null);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit">
                                            {enquiryFormMode === "create"
                                                ? "Add Enquiry"
                                                : "Update Enquiry"}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {openConfimBoxDelete && (
                <CofirmBox
                    close={() => setOpenConfirmBoxDelete(false)}
                    cancel={() => setOpenConfirmBoxDelete(false)}
                    confirm={handleDeleteCategory}
                />
            )}
        </div>
    );
};

export default Enquries;
