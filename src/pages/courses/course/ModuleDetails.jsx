import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {ArrowLeft} from "lucide-react";

//Data
const dataModules = {
    APP2000:[
        {
    id: "APP2000-M1",
    title: " Intro to App Dev",
    description: " An intro to application using springboot and react",
    moduleNumber:1
},
    {
        id: "APP2000-M2",
        title: " React basics",
        description: " Using react application",
        moduleNumber:2
    },
        {
            id: "APP2000-M2",
            title: " React basics 2",
            description: " Using react application and on.......",
            moduleNumber:3
        },
    ],
};

export default function ModuleDetails () {
    const {courseId, moduleId} = useParams();
    const navigate = useNavigate();

    //find right module on ID
    const module = dataModules[courseId]?.find((m) => m.id === moduleId);

    if (!module) {
        return(
            <div className={"p-6 text-black-600"}>Module not found for ID: {moduleId}</div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <button
                onClick={() => navigate(-1)}
                className="text-purple-600 hover:text-purple-800 mb-4 flex items-center"
            >
                <ArrowLeft className="mr-2" />Back to modules
                </button>

            <div className="bg-white p-6 rounded-lg shadow-md border max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">{module.title}</h1>
                <p className="mb-2 text-gray-600">
                    <strong>Title:</strong>{module.title}
                </p>
                    <p className="mb-2 text-gray-600">
                        <strong>Description:</strong>{module.description}
                    </p>
                        <p className="mb-2 text-gray-600">
                            <strong>Module Number:</strong>{module.moduleNumber}
                        </p>

        </div>
</div>
);

}
