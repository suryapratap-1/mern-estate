import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { priceFormatter } from '../utils/priceFormatter'
import {Link} from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchListingStart, fetchListingSuccess, fetchPropertyFailure } from '../redux/slices/listingSlice'
import { FaCircle } from "react-icons/fa";
import { getDaysFromNow } from '../utils/getDaysFromNow';

const Home = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    // const dispatch = useDispatch();
    // const listing = useSelector(state => state.listings)

    useEffect(() => {
        const fetchListing = async () => {
            // dispatch(fetchListingStart())
            setLoading(true)
            try {
                const res = await axios.get('/api/v1/listings/show-all')
                // if (res.data.success === true) {
                //     dispatch(fetchListingSuccess(res.data))
                // }
                setListings([res.data]);
                setLoading(false)
            } 
            catch (error) {
                // dispatch(fetchPropertyFailure(error))
                console.log(error)
            }
        }
        fetchListing()
    }, [])

    // console.log(listings)

    return (
        <main>

            <div className='relative w-full'>
                <img className='h-[28rem] w-full object-fill'
                    src="/hp-hero-desktop.jpg" alt="home-page-wallpaper" 
                />
                <div className='absolute bottom-72 w-full flex justify-center'>
                    <h1 className='w-1/2 pt-8 text-white text-6xl font-bold text-center'>
                        The #1 site real estate professionals trust*
                    </h1>
                </div> 
            </div>

            <div className='w-full p-3'>
                {
                    !loading && listings.length === 0 && (
                        <p className='text-xl'>No listings found!</p>
                    )
                }
                {
                    loading && (
                        <p className='text-xl text-center w-full'>
                            Loading...
                        </p>
                    )
                }
            </div>

            {/* showing listings */}
            <div className=' mt-5 px-4 min-[769px]:px-18'>
                <h1 className='w-full text-center text-4xl font-bold text-gray-700'>Popular Listings</h1>
                {
                    listings.map((listing, index) => (
                        <div key={index} className='md:px-12 md:py-6 grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-8'>
                            {
                                listing.listings.map(list => (
                                    <Link to={`/listing/${list._id}`}>
                                        <div key={list._id} className='p-2 flex flex-col gap-3 group bg-white rounded-md shadow-md cursor-pointer hover:shadow-xl transition-all duration-400'>
                                            <div className='overflow-hidden rounded-md'>
                                                <img className='rounded-md w-full h-48 object-cover group-hover:scale-105 transition-scale duration-500'
                                                    src={list.images[0]} alt="property image" 
                                                />
                                            </div>
                                            <div className='pl-2 flex flex-col'>
                                                <div className='flex items-center justify-between'>
                                                    <div className='flex gap-1 items-center'>
                                                        <FaCircle className='text-[0.8rem] text-green-600'/>
                                                        <p className='text-sm'>For {list.type}</p>
                                                    </div>
                                                    <p className='text-xs'>{getDaysFromNow(list.createdAt)}</p>
                                                </div>
                                                <p className='font-bold text-gray-800'>Rs. {priceFormatter(list.price)}</p>
                                                <div className='flex flex-wrap gap-2'>
                                                    <p><span className='font-bold text-gray-800'>{list.bedrooms}</span> bed</p>
                                                    <p><span className='font-bold text-gray-800'>{list.bathrooms}</span> bath</p>
                                                    <p><span className='font-bold text-gray-800'>{list.kitchens}</span> kitchens</p>
                                                    <span className='font-bold text-gray-800'>{priceFormatter(list.carpetArea)}</span> Sqrft
                                                </div>
                                                <p className=' text-sm text-gray-800'>{list.address}</p>
                                                <p className=' text-sm text-gray-800'>{list.listingName}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))   
                            }
                        </div>
                    ))
                }
            </div>

            {/* section 1 */}
            <section className='mt-10 grid grid-cols-2'>
                <div>
                    <img src="/home-section-desktop.jpg" alt="" />
                </div>
                <div className='px-14 flex flex-col justify-center gap-5 items-start'>
                    <h2 className=' text-4xl font-bold text-gray-800'>Need a home loan? Get pre-approved</h2>
                    <p className=' text-lg font-semibold text-gray-800'>Find a lender who can offer competitive mortgage rates and help you with pre-approval.</p>
                    <button className='px-5 py-3 rounded-full bg-[#2b2b2b] text-white hover:underline hover:bg-gray-600'>Get pre-approved now</button>
                </div>
            </section>
            
            {/* section 2 */}
            <section className='grid grid-cols-2'>
                <div className='px-14 flex flex-col justify-center gap-5 items-start'>
                    <h2 className=' text-4xl font-bold text-gray-800'>Get Local Info</h2>
                    <p className=' text-lg font-semibold text-gray-800'>
                        Does it have pet-friendly rentals? How are the schools? Get important local information on the area you're most interested in.
                    </p>
                    <button className='px-5 py-3 rounded-full bg-[#2b2b2b] text-white hover:underline hover:bg-gray-600'>
                        Get pre-approved now
                    </button>
                </div>
                <div>
                    <img src="/home-section-family.jpg" alt="" />
                </div>
            </section>
        </main>
    )
}

export default Home