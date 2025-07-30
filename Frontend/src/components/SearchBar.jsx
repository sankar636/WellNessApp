import React from 'react'
import { FaSearch } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

const SearchBar = () => {
    return (
        <div className="w-80 flex items-center px-4 brightness-0 shadow-2xl rounded-md border border-gray-300">
            <input
                type="text"
                placeholder="Search Notes..."
                className="w-full text-xs bg-transparent py-[11px] outline-none"
                // value={value}
                // onChange={onChange}
            />

            {/* {value && ( */}
                <IoMdClose
                    className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
                    // onClick={onClearSearch}
                />
            {/* )} */}

            <FaSearch
                className="text-slate-400 cursor-pointer hover:text-black"
                // onClick={handleSearch}
            />
        </div>
    )
}

export default SearchBar