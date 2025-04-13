import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router";
import CourseTab from "./CourseTab";
const EditCourse=()=>{
    return(
        <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
                <h1 className="font-bold text-xl">
                    Add Detail Information Regarding Course
                </h1>
                <Link>
                <Button variant='link'>Go to lectures Page</Button>
                </Link>
            </div>
            <CourseTab/>
        </div>
    )
}
export default EditCourse