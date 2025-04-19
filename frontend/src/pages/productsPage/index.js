import { useSelector, useDispatch } from "react-redux";
import { selectAllCourseIds, setInstructorCourses } from "../../context/courseSlice";
import { useGetMutation } from "../../context/courseApiSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductsPage() {
    const { getVideo } = useGetMutation();
    const courseIds = useSelector(selectAllCourseIds);

    return (
        <div className="p-4">
            <ul className="space-y-4">
                {courseIds.map((courseId) => (
                    <Card key={courseId} courseId={courseId} getVideo={getVideo} />
                ))}
            </ul>
        </div>
    );
}

function Card({ courseId, getVideo }) {
    const [course, setCourse] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCourse() {
            const data = await getVideo(courseId);
            setCourse(data);
        }
        fetchCourse();
    }, [courseId, getVideo]);

    const handleEdit = () => {
        dispatch(setInstructorCourses(courseId));
        navigate("createCourse");
    };

    const handleDelete = () => {
        console.log(`Deletar curso com ID: ${courseId}`);
    };

    if (!course) {
        return <li>Carregando...</li>;
    }

    return (
        <li className="flex items-center justify-between border p-4 rounded-lg shadow-md bg-white">
            <span className="text-lg font-bold">{course.title}</span>
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