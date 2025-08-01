import React, { useState, useEffect } from 'react'
import { getPublicSessions } from '../Services/Session.js';
import SessionCard from '../components/SessionCard.jsx';

const AllSessions = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        getPublicSessions()
            .then((res) => {
                setSessions(res.data.data);
                // console.log(res.data.data);
            })
            .catch((err) => console.error("Error fetching sessions:", err.message));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-16 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
                    Explore All Sessions
                </h1>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                    Browse through our collection of public sessions. Find inspiration, learn new techniques,
                    and join communities that share your interests.
                </p>
                <div className="mt-6">
                    <span className="inline-block bg-white bg-opacity-20 rounded-full px-4 py-2 text-sm font-medium text-black">
                        {sessions.length} sessions available
                    </span>
                </div>
            </div>

            {/* Sessions Grid */}
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className='flex flex-wrap justify-center gap-6'>
                    {sessions.length > 0 ? (
                        sessions.map((session) => (
                            <SessionCard
                                key={session._id}
                                id={session._id}
                                title={session.title}
                                tags={session.tags}
                                status={session.status}
                                json_file_url={session.json_file_url}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className='text-gray-500 text-lg'>No sessions available yet. Check back later!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AllSessions