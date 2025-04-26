import { useSelector, useDispatch } from "react-redux";
import { selectAllCourseIds, setInstructorCourses } from "../../context/courseSlice";
import { useGetCourseQuery } from "../../context/courseApiSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductsPage() {
   
    const courseIds = useSelector(selectAllCourseIds);
    const navigate = useNavigate();
    return (
        <div className="p-4">
           <button
                className="my-2 px-2 py-2 text-lg text-white font-bold bg-green-500 rounded"
                onClick={() => navigate('/instructor')}
            
            >
             Create New Course   
            </button>
           
            <ul className="space-y-4">
                {courseIds.map((courseId) => (
                    <Card key={courseId} courseId={courseId}  />
                ))}
            </ul>
        </div>
    );
}

function Card({ courseId }) {
    const { data:infoCourse, isLoading, error} = useGetCourseQuery(courseId);
   if(infoCourse){
    console.log(infoCourse)
   }
    const dispatch = useDispatch();
    const navigate = useNavigate();

 
    const handleEdit = () => {
        dispatch(setInstructorCourses(courseId));
        navigate("/createCourse");
    };

    const handleDelete = () => {
        console.log(`Deletar curso com ID: ${courseId}`);
    };

    if (isLoading) {
        return <li>Carregando...</li>;
    }

    if (error) {
        return <li>Erro ao carregar o curso: {error.message}</li>;
    }

    return (
        <li className="flex items-center justify-between border p-4 rounded-lg shadow-md bg-white">
             
            
            
            <span className="px-20 py-2 text-lg font-bold">
    {infoCourse?.title || "Título não disponível"}
</span>
            <div className="flex gap-2">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleEdit}
                >
                    Editar
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={handleDelete}
                >
                    Deletar
                </button>
            </div>
        </li>
    );
}