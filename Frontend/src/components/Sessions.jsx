import React, { useEffect, useState } from 'react'
import SessionCard from './SessionCard.jsx'
import { getPublicSessions } from '../Services/Session.js';
import { Link } from 'react-router-dom';

const Sessions = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPublicSessions()
            .then((res) => {
                // console.log('API response:', res.data.data); Debug log
                const validSessions = res.data.data.filter(session => {
                    if (!session._id) {
                        return false;
                    }
                    return true;
                });
                setSessions(validSessions);
                setLoading(false);
            })
            .catch((err) => {
                // console.error("Error fetching sessions:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-10">Loading sessions...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className='flex flex-wrap justify-center gap-6'>
                {sessions.length > 0 ? (
                    sessions.slice(0, 2).map((session) => {
                        return (
                            <SessionCard
                                key={session._id}
                                id={session._id}
                                title={session.title}
                                tags={session.tags}
                                status={session.status}
                                json_file_url={session.json_file_url}
                            />
                        );
                    })
                ) : (
                    <p className='text-gray-500 text-center w-full'>No sessions available.</p>
                )}
            </div>
            <div className='flex justify-center mt-10'>
                <Link 
                    to="/sessions"
                    className='px-6 py-3 rounded-full text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-colors'
                >
                    View All Sessions
                </Link>
            </div>
        </div>
    );
};

export default Sessions;