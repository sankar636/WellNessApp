import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaArrowRight } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <div className='max-w-80'>
                    <Link to='/' className="flex items-center">
                        <h1 className="font-bold text-2xl">
                            <span className="text-blue-500">Well</span>
                            <span className="text-blue-700">Ness</span>
                        </h1>
                    </Link>
                    <p className='text-sm'>
                        Embrace inner peace and holistic wellness with our guided yoga sessions, meditation practices, and expert-led retreats.
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="text-gray-600 hover:text-blue-600" size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-gray-600 hover:text-blue-400" size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-gray-600 hover:text-pink-500" size={20} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="text-gray-600 hover:text-red-600" size={20} />
                        </a>
                    </div>
                </div>

                <div>
                    <p className='text-lg text-gray-800'>About Us</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">Our Mission</a></li>
                        <li><a href="#">Yoga Instructors</a></li>
                        <li><a href="#">Testimonials</a></li>
                        <li><a href="#">Wellness Blog</a></li>
                        <li><a href="#">Retreats</a></li>
                    </ul>
                </div>

                <div>
                    <p className='text-lg text-gray-800'>PRACTICES</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                    <li><a href="#">Hatha Yoga</a></li>
                        <li><a href="#">Vinyasa Flow</a></li>
                        <li><a href="#">Meditation</a></li>
                        <li><a href="#">Pranayama</a></li>
                        <li><a href="#">Yoga for Beginners</a></li>
                    </ul>
                </div>

                <div className='max-w-80'>
                    <p className='text-lg text-gray-800'>JOIN OUR COMMUNITY</p>
                    <p className='mt-3 text-sm'>
                    Subscribe for weekly mindfulness tips, exclusive offers, and free guided sessions.
                    </p>
                    <div className='flex items-center mt-4'>
                        <input type="text" className='bg-white rounded-l border border-gray-300 h-9 px-3 outline-none' placeholder='Your email' />
                        <button className='flex items-center justify-center bg-black h-9 w-9 aspect-square rounded-r group'>
                            {/* Arrow icon */}
                            <FaArrowRight className="text-gray-600 hover:text-red-600" size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} WellNess. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer



// import React from "react";
// import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

// const Footer = () => {
//     return (
//         <footer className="bg-gray-50 text-gray-700 px-4 md:px-16 lg:px-24 xl:px-32 py-4" id="Contact">
//             <div className="flex flex-col md:flex-row justify-between gap-12">
//                 <div className="flex flex-col gap-4 w-full md:w-1/3">
//                     <div>
//                         <h3 className="font-semibold">Timing</h3>
//                         <p className="text-sm mt-1">10:30 am to 7:30 pm</p>
//                     </div>
//                     <div>
//                         <h3 className="font-semibold">Email</h3>
//                         <p className="text-sm mt-1">info@gmail.com</p>
//                     </div>
//                     <div className="border-t border-gray-300 pt-4">
//                         <h3 className="font-semibold">Contact Number</h3>
//                         <p className="text-sm mt-1">7896541239</p>
//                     </div>
//                 </div>
//                 <div className="w-full md:w-1/3">
//                     <h3 className="font-semibold">Our Clinic</h3>
//                     <p className="text-sm mt-1 leading-relaxed">
//                         890, Sector 62, Gyan Sarovar, GAIL <br />
//                         Noida (Delhi/NCR)
//                     </p>
//                 </div>
//                 <div className="w-full md:w-1/3">
//                     <h3 className="font-semibold">Socials</h3>
//                     <div className="flex items-center gap-4 mt-2">
//                         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//                             <FaFacebookF className="text-gray-600 hover:text-blue-600" size={20} />
//                         </a>
//                         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
//                             <FaTwitter className="text-gray-600 hover:text-blue-400" size={20} />
//                         </a>
//                         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//                             <FaInstagram className="text-gray-600 hover:text-pink-500" size={20} />
//                         </a>
//                         <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
//                             <FaYoutube className="text-gray-600 hover:text-red-600" size={20} />
//                         </a>
//                     </div>
//                 </div>

//             </div>
//         </footer>
//     );
// };

// export default Footer;
