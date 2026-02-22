import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Save } from "lucide-react";
import { AiIcon, TagIcon } from "../../components/icons/icons";
import BackButton from "../../components/backButton/backButton";

const CreateNote = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <div className="min-h-screen bg-grey p-5">
            <div className="w-full max-w-3xl mx-auto ">
                <BackButton label="Back to Notes"/>
                <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200">
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Create New Note
                        </h2>

                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-gray-900 flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                            >
                                <X size={16} />
                                Cancel
                            </button>

                            <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                                <Save size={16} />
                                Save
                            </button>
                        </div>
                    </div>

                    <div className="p-5 space-y-4">

                        <div>
                            <label className="block text-lg text-gray-500 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                placeholder="Enter note title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-gray-800 w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-lg text-gray-500">
                                    Content
                                </label>

                                <button className="flex items-center gap-2 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                                    <AiIcon size={16} />
                                    AI Summary
                                </button>
                            </div>

                            <textarea
                                placeholder="Start writing your note..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={10}
                                className="text-gray-800 w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <div>
                            <label className="block text-lg text-gray-500 mb-2">
                                Tags
                            </label>

                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Add a tag..."
                                    className="text-gray-800 flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <button className="flex items-center gap-2 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                                    <TagIcon size={16} />
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {["work", "personal", "important", "planning", "design", "learning"].map(
                                    (tag) => (
                                        <span
                                            key={tag}
                                            className="text-gray-600 text-xs bg-gray-100 px-3 py-1 rounded-full hover:bg-orange-100 hover:text-orange-600 cursor-pointer transition"
                                        >
                                            {tag}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg text-gray-500 mb-3">
                                Note Color
                            </label>

                            <div className="flex gap-4">
                                {[
                                    "bg-orange-400",
                                    "bg-blue-400",
                                    "bg-green-400",
                                    "bg-pink-400",
                                    "bg-yellow-400",
                                    "bg-purple-400",
                                    "bg-red-400",
                                ].map((color, index) => (
                                    <div
                                        key={index}
                                        className={`h-10 w-10 rounded-lg cursor-pointer border-2 border-gray-300 hover:scale-105 transition ${color}`}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNote;