import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import {  Edit, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"


const StudentCourses = () => {

    const courses = [
        {
          id: "CRS001",
          name: "Tally ERP",
          teacher: "Dr. Muhammad Iqbal",
          students: 35,
          duration: "1 Year",
          fee: "15,000",
        },
        {
          id: "CRS002",
          name: "Spoken English",
          teacher: "Ms. Sarah Ahmed",
          students: 42,
          duration: "1 Year",
          fee: "12,000",
        },
        {
          id: "CRS003",
          name: "Basic Computer",
          teacher: "Prof. Ali Hassan",
          students: 28,
          duration: "1 Year",
          fee: "18,000",
        }
      ]
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Courses Management</h2>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Courses</CardTitle>
                    <CardDescription>Manage your institute courses</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-black hover:bg-gray-800">
                                <TableHead  className=" text-white">Course ID</TableHead>
                                <TableHead className="text-white">Course Name</TableHead>
                                <TableHead className="text-white">Teacher</TableHead>
                                <TableHead className="text-white">Students</TableHead>
                                <TableHead className="text-white">Duration</TableHead>
                                <TableHead className="text-white">Fee</TableHead>
                                <TableHead className="text-white">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium">{course.id}</TableCell>
                                    <TableCell>{course.name}</TableCell>
                                    <TableCell>{course.teacher}</TableCell>
                                    <TableCell>{course.students}</TableCell>
                                    <TableCell>{course.duration}</TableCell>
                                    <TableCell>₹{course.fee}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <Button variant="ghost" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )

}

export default StudentCourses