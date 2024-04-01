import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaCircle } from "react-icons/fa";
import { priceFormatter } from '../utils/priceFormatter';
import { getDaysFromNow } from '../utils/getDaysFromNow';
import { FaBath } from "react-icons/fa";
import { IoBed } from "react-icons/io5";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FiHome } from "react-icons/fi";
import { RxLapTimer } from "react-icons/rx";
import { BiSolidCarGarage } from "react-icons/bi";
import { TbRulerMeasure } from "react-icons/tb";
import { BsFillSignNoParkingFill } from "react-icons/bs";


const Listing = () => {
    const listingID = useParams()
    const [listing, setListing] = useState([])

    useEffect(() => {
        const fetchListingById = async () => {
            try {
                const res = await axios.get(`/api/v1/listings/${listingID.listingId}`)
                setListing(res.data.listing)
            } 
            catch (error) {
                console.log('Error while fetching listing data at Listing page ', error)
            }
        }
        fetchListingById()
    }, [])

    const mailHandler = async () => {

    }

    return (
        <main className='py-2 px-[10rem] '> 
            <div className='py-5 flex flex-col gap-4 bg-white rounded'>
                <h1 className=' text-3xl font-bold tracking-wide text-[#2b2b2b]'>{listing.listingName}</h1>
                <div className='rounded'>
                    <img className='w-full h-[450px] rounded-md object-cover'
                        src={listing.images} alt='listing image' 
                    />
                </div>

                <div className='flex gap-2 items-center'>
                    <FaCircle className=' text-green-600'/>
                    <p className='font-semibold text-lg text-gray-700'>
                        For {listing.type}
                    </p>
                </div>
                <p className='font-bold text-3xl text-[#202020]'>Rs {priceFormatter(listing.price)}</p>
                <div className='flex gap-8 text-lg'>
                    <div className='flex gap-3 items-center'>
                        <span className='font-bold '>{listing.bedrooms}</span>
                        <p>bed</p>
                        <IoBed />
                    </div>
                    <div className='flex gap-3 items-center'>
                        <span className='font-bold '>{listing.bathrooms}</span>
                        <p>bath</p>
                        <FaBath />
                    </div>
                    <div className='flex gap-3 items-center'>
                        <span className='font-bold '>{listing.kitchens}</span>
                        <p>kitchen</p>
                        <TbToolsKitchen2 />
                    </div>
                </div>
                <p className='text-lg tracking-wider'>{listing.address}</p>
                <div className='flex gap-20 text-lg'>
                    <div className='flex gap-3 items-center'>
                        <FiHome className=' text-xl'/>
                        <div className='flex flex-col'>
                            <p className=' font-semibold'>{listing.furnishType}</p>
                            <p className=' text-xs'>property type</p>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <RxLapTimer className=' text-xl'/>
                        <div className='flex flex-col'>
                            <p className=' font-semibold'>{getDaysFromNow(listing.createdAt)}</p>
                            <p className=' text-xs'>time on estate.com</p>
                        </div>
                    </div>
                    <div>
                        {
                            listing.parking === true ?
                            <div className='flex gap-3 items-center'>
                                <BiSolidCarGarage className=' text-xl'/>
                                <div className='flex flex-col'>
                                    <p className=' font-semibold'>Parking</p>
                                    <p className=' text-xs'>available</p>
                                </div>
                            </div> :
                            <div className='flex gap-3 items-center'>
                                <BsFillSignNoParkingFill className=' text-xl'/>
                                <div className='flex flex-col'>
                                    <p className=' font-semibold'>Parking</p>
                                    <p className=' text-xs'>not available</p>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='flex gap-3 items-center'>
                        <TbRulerMeasure className=' text-xl' />
                        <div className='flex flex-col'>
                            <p className=' font-semibold'>{listing.carpetArea}</p>
                            <p className=' text-xs'>sqrft</p>
                        </div>
                    </div>
                </div>
                <p className='text-lg pt-4'>{listing.description}</p>
            </div>

            <div className='mt-12 flex flex-col items-center gap-5'>
                <h2 className='text-4xl font-bold text-[#2b2b2b] text-center'>Contact Owner</h2>
                <form onSubmit={mailHandler}
                    className='w-[400px] flex flex-col gap-4 mb-20'
                >
                    <div className='flex flex-col'>
                        <label htmlFor="clientName">Name<sup className='relative top-0 text-lg text-red-600'>*</sup></label>
                        <input className=' px-4 py-3 border rounded-md border-black focus:outline-red-400'
                            type="text"
                            placeholder='John Doe'
                            required
                            name='clientName'
                            id='clientName'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="clientEmail">Email<sup className='relative top-0 text-lg text-red-600'>*</sup></label>
                        <input className=' px-4 py-3 border rounded-md border-black focus:outline-red-400'
                            type="johndoe@gmail.com"
                            placeholder='John Doe'
                            required
                            name='clientEmail'
                            id='clientEmail'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="clientContact">Contact<sup className='relative top-0 text-lg text-red-600'>*</sup></label>
                        <input className=' px-4 py-3 border rounded-md border-black focus:outline-red-400'
                            type="text"
                            placeholder='+91 0000000000'
                            required
                            name='clientContact'
                            id='clientContact'
                        />
                    </div>
                    <button className='mt-3 p-3 rounded-md bg-[#2b2b2b] text-white hover:bg-[#333333]'>Email Agent</button>
                </form>
            </div>
        </main>
    )
}

export default Listing