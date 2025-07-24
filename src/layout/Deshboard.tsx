
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"


import {
    Home,
    Users,
    GraduationCap,
    BookOpen,
    CreditCard,
    FileText,
    Settings,
    CalendarPlus,
    UserPlus,
    Search,
    Menu,
    Plus,
    Eye,
    Edit,
    Trash2,
    UserCheck,
    DollarSign,
    TrendingUp,
    School,
    Bell,
} from "lucide-react"
import { useState } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"



const Deshboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("")

    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();


    const sidebarItems = [
        { icon: Home, label: "Dashboard", id: "dashboard", render: "/deshboard/home" },
        { icon: Bell, label: "Enquiries", id: "enquiries", badge: "0", render: "/deshboard/enquiries" },
        { icon: School, label: "Branch", id: "branch", badge: "18", render: "/deshboard/branch" },
        { icon: BookOpen, label: "Courses", id: "courses", render: "/deshboard/courses" },
        { icon: CalendarPlus, label: "Batches", id: "betches", render: "/deshboard/batches" },
        { icon: UserPlus, label: "Students", id: "students", render: "/deshboard/students" },
        { icon: FileText, label: "Reports", id: "reports", render: "/deshboard/reports" },
        { icon: Settings, label: "Settings", id: "settings", render: "/deshboard/settings" },
        { icon: CreditCard, label: "Fees", id: "fees", render: "/deshboard/fees" },

    ]





    return (
        <div className="flex h-screen bg-gray-100">

            {/* sidebar  */}
            <div className={`bg-white w-64 min-h-screen p-4 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
                <div className="flex items-center mb-8">
                    <GraduationCap className="h-8 w-8 text-black" />
                    <span className="ml-2 text-xl font-bold text-gray-800">Eminence Tally</span>
                </div>

                <nav className="space-y-2">
                    {sidebarItems.map((item, index) => (
                        <Link key={index} to={item.render}>
                            <div

                                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${activeTab === item.id ? "bg-gradient-to-r from-gray-700 to-gray-900 hover:from-black hover:to-gray-700 text-white" : "text-gray-600 hover:bg-gray-50"
                                    }`}
                                onClick={() => setActiveTab(item.id)}
                            >

                                <div className="flex items-center">
                                    <item.icon className="h-5 w-5 mr-3" />
                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                </div>

                                {item.badge && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                        {item.badge}
                                    </Badge>
                                )}
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm border-b p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden mr-2"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                            <h1 className="text-2xl font-bold text-gray-800">System</h1>
                        </div>
                    </div>
                </header>


                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6"><Outlet /></main>

            </div>

        </div>
    )
}

export default Deshboard