import { useGetAllCourseQuery } from "../../context/courseApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { setInstructorCourses } from "../../context/courseSlice";

export default function MainPage(){
const [courses, setCourses] = useState([])
const {data, isLoading,error} =  useGetAllCourseQuery();

useEffect(() => {
	if(data){
		setCourses(data);
	}

},[data])		

if (isLoading){
	return <div>Loading...</div>

}
if (error){
	return <div>Error: {error.message}</div>
}


return(
		<main className="flex flex-row flex-wrap ">
			<ul className="flex flex-row justify-around ">
			  {courses.map((course=> (
				<Card  id = {course.id_course} title={course.title} image={course.image} />)))}	
			
			</ul>	
			
	    </main>	
	)


}


function Card ({id, title, image}){
const navigate = useNavigate();
const dispatch = useDispatch();

function handleClick(){
	dispatch(setInstructorCourses(id));
	
	navigate(`/course/${id}`);

}

 return (
        <li
            key={id}
            className="flex flex-col justify-between items-center rounded-lg shadow-md bg-white p-4 m-2"
             
        >
            <img
                src={image}
                alt={title}
                className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <h2 className="text-lg font-bold">{title}</h2>
           
			<button className = "px-4 py-2 bg-green-500 text-white rounded-lg " onClick ={handleClick}> see course</button>
        </li>
    );
}

