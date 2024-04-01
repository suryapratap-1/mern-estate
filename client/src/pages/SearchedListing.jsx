import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaCircle } from "react-icons/fa";
import { priceFormatter } from '../utils/priceFormatter';
import { getDaysFromNow } from '../utils/getDaysFromNow';

const SearchedListing = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [searchFormData, setSearchFormData] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnishType: "both",
        sort: "created_at",
        order: "desc"
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        const typeFromUrl = urlParams.get("type");
        const parkingFromUrl = urlParams.get("parking");
        const furnishTypeFromUrl = urlParams.get("furnishType");
        const sortFromUrl = urlParams.get("sort");
        const orderFromUrl = urlParams.get("order");

        if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishTypeFromUrl || sortFromUrl || orderFromUrl) {
            setSearchFormData({
                searchTerm: searchTermFromUrl || "",
                type: typeFromUrl || "all",
                parking: parkingFromUrl === true ? true : false,
                furnishType: furnishTypeFromUrl || "both",
                sort: sortFromUrl || "created_at",
                order: orderFromUrl || "desc",
            })
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const response = await axios.get(`/api/v1/listings/search?${searchQuery}`);
            setListings(response.data.data);
            setLoading(false);
        }
        fetchListings();

    }, [location.search])

    const changeHandler = (e) => {
        const { name, value, type, checked } = e.target;
        setSearchFormData((prevData) => {
            return {
                ...prevData,
                [name]: type === "checkbox" ? checked : value
            }
        });
    }

    const submitHandler = () => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set("searchTerm", searchFormData.searchTerm);
        urlParams.set("type", searchFormData.type);
        urlParams.set("parking", searchFormData.parking);
        urlParams.set("furnishType", searchFormData.furnishType);
        urlParams.set("sort", searchFormData.sort);
        urlParams.set("order", searchFormData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    // console.log(listings)

    return (
        <main className='flex flex-col md:flex-row'>
            <div className='p-7  md:min-h-screen'>
                <form onSubmit={submitHandler} className='flex flex-col gap-7'>
                    <div className='border p-1 flex border-gray-500 rounded-full'>
                        <input className='w-full py-1.5 px-4 rounded-full outline-none'
                            type="text" 
                            placeholder='address/location'
                            id='searchTerm'
                            name='searchTerm'
                            value={searchFormData.searchTerm}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='flex gap-5 border border-gray-500 rounded-xl p-3'>
                        <p className='font-semibold'>Type: </p>
                        <div className='flex flex-wrap gap-3'>
                            <div className='flex gap-2'>
                                <label htmlFor="both" className='hover:cursor-pointer'>Rent & Sale</label>
                                <input type="radio" id='both' name='type' value="all"
                                    checked={searchFormData.type === "all"}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className='flex gap-2'>
                                <label htmlFor="rent" className='hover:cursor-pointer'>Rent</label>
                                <input type="radio" id='rent' name='type' value="Rent"
                                    checked={searchFormData.type === "Rent"}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className='flex gap-2'>
                                <label htmlFor="sale" className='hover:cursor-pointer'>Sale</label>
                                <input type="radio" id='sale' name='type' value="Sale"
                                    checked={searchFormData.type === "Sale"} 
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 font-semibold border border-gray-500 rounded-xl p-3'>
                        <p>Parking: </p>
                        <input type="checkbox" name="parking" id="parking" 
                            value={searchFormData.parking} 
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='flex gap-4 flex-wrap border border-gray-500 rounded-xl p-3'>
                        <p className='font-semibold'>Furnish: </p>
                        <div className='flex gap-2 flex-wrap w-44'>
                            <div className='flex gap-1'>
                                <label htmlFor="Furnished">Furnished</label>
                                <input type="radio" id='Furnished' name='furnishType' value="Furnished"
                                    checked={searchFormData.furnishType === "Furnished"} 
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className='flex gap-1'>
                                <label htmlFor="Semi furnished">Semi furnished</label>
                                <input type="radio" id='Semi furnished' name='furnishType' value="Semi furnished"
                                    checked={searchFormData.furnishType === "Semi furnished"}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className='flex gap-1'>
                                <label htmlFor="both">Both</label>
                                <input type="radio" id='both' name='furnishType' value="both"
                                    checked={searchFormData.furnishType === "both"}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-4 border border-gray-500 rounded-xl p-3'>
                        <label className='font-semibold'>Sort: </label>
                        <select className='border border-gray-500 rounded-lg'
                            id="sort_order" name='sort_order' defaultValue="created_at_desc"
                            onChange={changeHandler}
                        >
                            <option value="createdAt_desc">Latest</option>
                            <option value="regularPrice_desc">Price high to low</option>
                            <option value="regularPrice_asc">Price low to high</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>
                    <button className='border border-gray-500 rounded-xl py-2 bg-[#2b2b2b] text-white tracking-wider'>
                        Search
                    </button>
                </form>
            </div>
            <div className='w-full pb-10 mb-20'>
                <h1 className='text-3xl font-semibold pl-8 py-4'>
                    Listing results:
                </h1>
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
                <div className='pl-8 grid grid-cols-3 gap-4'>
                {
                    listings.map((listing) => (
                            <div className='rounded-md shadow-md hover:cursor-pointer group'>
                                <div className='overflow-hidden rounded-t-md'>
                                    <img className='w-full h-[250px] object-cover rounded-t-md group-hover:scale-105 transition-scale duration-300'
                                        src={listing.images} 
                                        alt="listing image" 
                                    />
                                </div>
                                <div className='px-4 py-1'>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-1 items-center'>
                                            <FaCircle className='text-[0.8rem] text-green-600'/>
                                            <p className='text-gray-800'>
                                                House for {listing.type}
                                            </p>
                                        </div>
                                        <p className='text-sm text-gray-800'>{getDaysFromNow(listing.createdAt)}</p>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className=' text-xl font-bold text-gray-700'>Rs {priceFormatter(listing.price)}</p>
                                        <div className='flex flex-wrap gap-3'>
                                            <p>
                                                <span className='text-gray-800 font-bold'>{listing.bedrooms} </span>bed
                                            </p>
                                            <p>
                                                <span className='text-gray-800 font-bold'>{priceFormatter(listing.bathrooms)} </span>bath
                                            </p>
                                            <p>
                                                <span className='text-gray-800 font-bold'>{priceFormatter(listing.kitchens)}</span> kitchen
                                            </p>
                                            <p>
                                                <span className='text-gray-800 font-bold'> {priceFormatter(listing.carpetArea)} </span>sqft lot
                                            </p>
                                        </div>
                                        <p className=' text-sm text-gray-800'>{listing.address}</p>
                                        <p className='text-sm text-gray-800'>{listing.listingName}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
                </div>
            </div>
        </main>
    )
}

export default SearchedListing