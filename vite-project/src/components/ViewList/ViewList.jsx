import React, { useState } from "react";
import { useQuery, useQueryClient } from 'react-query';
import { GetUserDetails } from "./ViewList.api.js"

export const ViewList = () => {
    const [editedUsername, setEditedUsername] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const queryClient = useQueryClient();

    //Use Tanstack react query to fetch the user-list details
    const getUserDetails = useQuery(["getUserDetails"], () => GetUserDetails(), {
        refetchOnWindowFocus: false,
    });

    //Call an API to Update UserName 
    const handleUpdate = (previousName, updatedName) => {
        if (updatedName) {
            fetch(`http://localhost:3001/api/updatetitle/${updatedName}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ previousName }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to update report");
                    }
                    return response.json();
                })
                .then(() => {
                     queryClient.invalidateQueries(["getUserDetails"]);
                })
                .catch((error) => console.error(error));
        }
    };
    
   //Handle Edit User Name
    const handleEdit = (name, index) => {
        setEditedUsername(name);
        setEditIndex(index);
    };

    //User Name Submit Thair Update Name
    const handleSubmit = () => {
        if (editedUsername && editIndex !== null) {
            const previousName = getUserDetails.data.data[editIndex].user_name;
            const updatedDetails = [...getUserDetails.data.data];
            updatedDetails[editIndex].user_name = editedUsername;
            setEditedUsername("");
            setEditIndex(null);
            handleUpdate(previousName, editedUsername);
        }
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <div className="container px-4 py-8 mx-auto">
                    <h1 className="mb-4 text-4xl font-bold text-center text-sky-600">View Your Details</h1>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold tracking-wider text-left text-gray-600 uppercase text-md">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold tracking-wider text-left text-gray-600 uppercase text-md">
                               UserName
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold tracking-wider text-left text-gray-600 uppercase text-md">
                               E-mail
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold tracking-wider text-left text-gray-600 uppercase text-md">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold tracking-wider text-left text-gray-600 uppercase text-md">
                                Edit / Update
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold tracking-wider text-left text-gray-600 uppercase text-md">
                                Update Count
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {getUserDetails?.data?.data?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item?.user_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item?.user_email}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        {item?.created_at}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 cursor-pointer whitespace-nowrap">
                                        <a onClick={() => handleEdit(item.user_name, index)} className="px-4 py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-700">
                                            Update
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        {item?.update_count}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {editIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                   
                    <div className="p-8 bg-white rounded-md shadow-md">
                    <h3 className="mb-6 text-lg font-semibold text-center text-sky-800">Update UserName</h3>
                        <input
                            type="text"
                            className="p-2 mb-4 border border-gray-300 rounded-md"
                            value={editedUsername}
                            onChange={(e) => setEditedUsername(e.target.value)}
                        />
                        <button onClick={()=> handleSubmit()} className="px-4 py-2 ml-3 text-white bg-blue-500 rounded-md hover:bg-blue-700">Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};
