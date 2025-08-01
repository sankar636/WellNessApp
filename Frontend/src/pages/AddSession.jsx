import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveDraft, publishSession } from "../Services/Session";
import { UserDataContext } from "../context/AuthContext";

const AddSession = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(UserDataContext);

    const [formData, setFormData] = useState({
        title: "",
        tags: "",
        json_file_url: "",
        status: "draft",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        if (location.state?.session) {
            const { session } = location.state;
            setFormData({
                title: session.title,
                tags: session.tags.join(", "),
                json_file_url: session.json_file_url,
                status: session.status,
            });
            setSessionId(session._id);
            setIsEditMode(true);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        setLoading(true);
        setMessage("");

        try {
            const tagsArray = formData.tags.split(",").map(tag => tag.trim());
            const payload = {
                title: formData.title,
                tags: tagsArray,
                json_file_url: formData.json_file_url,
                status: formData.status,
            };

            if (isEditMode && sessionId) {
                // For edit mode, include the sessionId
                payload.sessionId = sessionId;

                // Update the session
                const response = await saveDraft(payload, token);

                // If changing to published, make separate publish call
                if (formData.status === "published") {
                    await publishSession(sessionId, token);
                }

                setMessage("Session updated successfully!");
            } else {
                // For new sessions
                const response = await saveDraft(payload, token);

                if (formData.status === "published") {
                    await publishSession(response.data.data._id, token);
                }

                setMessage(
                    formData.status === "published" ? "Session published successfully!" : "Session saved as draft!"
                );
            }

            setTimeout(() => navigate("/my-sessions"), 1500);
        } catch (err) {
            // console.error("Error saving session:", err);
            setMessage("Failed to save session. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
            <h2 className="text-2xl font-bold mb-4">
                {isEditMode ? "Edit Session" : "Add New Session"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block mb-1 font-semibold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Tags */}
                <div>
                    <label className="block mb-1 font-semibold">Tags (comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="tag1, tag2"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* JSON File URL */}
                <div>
                    <label className="block mb-1 font-semibold">JSON File URL</label>
                    <input
                        type="url"
                        name="json_file_url"
                        value={formData.json_file_url}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 font-semibold">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    {loading ? "Saving..." : isEditMode ? "Update Session" : "Save Session"}
                </button>
            </form>

            {message && (
                <p className={`mt-4 text-center font-medium ${message.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default AddSession;