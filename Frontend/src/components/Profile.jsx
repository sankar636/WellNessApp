import React from 'react'
import { getInitials } from '../utils/helper.js'

const Profile = (props) => {

  return (
    <div className="flex items-center gap-3">
            <div className="relative group inline-block">
                <div className="absolute top-14 left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                    {currentUser?.username}
                </div>
                <div className="w-14 h-14 flex items-center justify-center rounded-full text-2xl font-semibold bg-slate-100">
                    {getInitials(props.user?.username)}
                </div>
            </div>
            <div>
                <button
                    onClick={props.onLogout}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full shadow-md hover:scale-105 transition-transform duration-200 hover:shadow-lg"
                >
                    Logout
                </button>
            </div>
        </div>
  )
}

export default Profile