import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSessionById } from "../Services/Session.js";
import axios from "axios";
import { UserDataContext } from "../context/AuthContext.jsx";

const SessionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserDataContext);

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await getSessionById(id, token);
                setSession(response.data.data);
                setError(null);
            } catch (err) {
                // console.error("Error fetching session:", err);
                setError("Failed to load session. You may not have permission to Edit this session.");
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, [id, navigate, token]);

    const handleEdit = () => {
        navigate("/add-session", { state: { session } });
    };


    if (loading) return <p className="text-center mt-10">Loading session...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!session) return <p className="text-center mt-10">Session not found</p>;

    const isOwner = user?._id === session.user_id;

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-bold mb-4">{session.title}</h2>
            <p className="mb-2"><strong>Status:</strong> {session.status}</p>
            <p className="mb-2">
                <strong>Tags:</strong> {session.tags.join(", ")}
            </p>
            <p className="mb-4">
                <strong>JSON File:</strong>{" "}
                <a
                    href={session.json_file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 underline"
                >
                    {session.json_file_url}
                </a>
            </p>

            {isOwner && (
                <div className="flex gap-4">
                    <button
                        onClick={handleEdit}
                        className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500"
                    >
                        Edit
                    </button>
                    {/* <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Delete
                    </button> */}
                </div>
            )}
        </div>
    );
};

export default SessionDetails;