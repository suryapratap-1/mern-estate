import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateListing = () => {
    const [listingError, setListingError] = useState('');
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        listingName: '', description: '', address: '', price: 25000, bedrooms: 1, 
        bathrooms: 1, kitchens: 1, furnishType: '', type: '', parking: false, carpetArea: 1800
    })

    const changeHandler = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prevData => {
            return {
                ...prevData, 
                [name] : type === 'checkbox' ? checked : value
            }
        });
    };

    const fileChangeHandler = (e) => {
        if (e.target.files.length > 7) {
            setListingError('Maximum 6 files can be uploaded')
        }
        else setListingError(null)
        for(let file of e.target.files) {
            setFiles((prev) => [...prev, file])
        }
    }

    const listingFormSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        const fileData = new FormData()
        fileData.append('listingName', formData.listingName)
        fileData.append('description', formData.description)
        fileData.append('address', formData.address)
        fileData.append('price', formData.price)
        fileData.append('bedrooms', formData.bedrooms)
        fileData.append('bathrooms', formData.bathrooms)
        fileData.append('kitchens', formData.kitchens)
        fileData.append('furnishType', formData.furnishType)
        fileData.append('type', formData.type)
        fileData.append('parking', formData.parking)
        fileData.append('carpetArea', formData.carpetArea)
        files.map(file => {
            fileData.append('images', file)
        })

        try {
            const res = await axios.post('/api/v1/listings/create', fileData)
            if (res) {
                setLoading(false);
                setFormData({
                    listingName: '', description: '', address: '', price: 25000, bedrooms: 1, 
                    bathrooms: 1, kitchens: 1, furnishType: '', type: '', parking: false, carpetArea: 1800
                })
                setFiles([])
                toast.success('You listing has been created')
            }
            console.log(res)
        } 
        catch (error) {
            toast.error('Unable to create listing')
            console.log(error)
            setListingError(error)
        }
    }

    return (
        <main className='p-3 max-w-4xl mx-auto'>

            <h1 className='text-3xl my-7 font-semibold text-center'>Create a Listing</h1>

            <form onSubmit={listingFormSubmitHandler} className='flex flex-col gap-4 sm:flex-row'>

                <div className='flex flex-col gap-4 flex-1'>
                    <input className='border border-black p-3 rounded-lg'
                        onChange={changeHandler} 
                        type="text" placeholder='listing name' id='listingName' name='listingName' maxLength='62' minLength='5' required
                        value={formData.listingName}
                    />
                    <textarea className='border border-black p-3 rounded-lg'
                        onChange={changeHandler}
                        type="description" placeholder='Description' id='description' name='description' required
                        value={formData.description}
                    />
                    <input className='border border-black p-3 rounded-lg'
                        onChange={changeHandler}
                        type="text" placeholder='Address' id='address' name='address' required
                        value={formData.address}
                    />

                    <div className="flex gap-6 flex-wrap">
                        <p className='font-medium'>Type : </p>
                        <div className='flex gap-2'>
                            <label htmlFor="type">Rent</label>
                            <input className='w-4'
                                onChange={changeHandler}
                                type="radio" id='rent' name='type' value='Rent' 
                                checked={formData.type === 'Rent'}
                            />
                        </div>
                        <div className='flex gap-2'>
                            <label htmlFor="sale">Sale</label>
                            <input className='w-4'
                                onChange={changeHandler}
                                type="radio" id='sale' name='type' value='Sale' 
                                checked={formData.type === 'Sale'}
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-6 flex-wrap">
                        <p className='font-medium'>Furnished Type : </p>
                        <div className='flex gap-2'>
                            <label htmlFor="Furnished">Furnished</label>
                            <input className='w-4'
                                onChange={changeHandler}
                                type="radio" id='Furnished' name='furnishType' value='Furnished' 
                                checked={formData.furnishType === 'Furnished'}
                            />
                        </div>
                        <div className='flex gap-2'>
                            <label htmlFor="Semi-furnished">Semi furnished</label>
                            <input className='w-4'
                                onChange={changeHandler}
                                type="radio" id='Semi-furnished' name='furnishType' value='Semi furnished' 
                                checked={formData.furnishType === 'Semi furnished'}
                            />
                        </div>
                    </div>

                    <div className="flex gap-6 flex-wrap">
                        <div className='flex gap-2'>
                            <label htmlFor="parking" className='font-medium'>Parking</label>
                            <input className='w-4'
                                onChange={changeHandler}
                                type="checkbox" id='parking' name='parking' value={formData.checked}
                            />
                        </div>
                    </div>

                    <div className="flex gap-6 flex-wrap">
                        <div className='flex gap-2 items-center'>
                            <label htmlFor="bedrooms" className='font-medium'>Bedrooms</label>
                            <input className='p-2 border border-black rounded-lg'
                                onChange={changeHandler}
                                type="number" name="bedrooms" id="bedrooms" min='1' max='10' required 
                                value={formData.bedrooms}
                            />
                        </div>
                        <div className='flex gap-2 items-center'>
                            <label htmlFor="bathrooms" className='font-medium'>Bathrooms</label>
                            <input className='p-2 border border-black rounded-lg'
                                onChange={changeHandler}
                                type="number" name="bathrooms" id="bathrooms" min='1' max='10' required 
                                value={formData.bathrooms}
                            />
                        </div>
                        <div className='flex gap-2 items-center'>
                            <label htmlFor="kitchens" className='font-medium'>Kitchens</label>
                            <input className='p-2 border border-black rounded-lg'
                                onChange={changeHandler}
                                type="number" name="kitchens" id="kitchens" min='1' max='10' required 
                                value={formData.kitchens}
                            />
                        </div>
                        <div className='flex gap-2 items-center'>
                            <label htmlFor="price" className='font-medium'>Price</label>
                            <input className='p-2 border border-black rounded-lg'
                                onChange={changeHandler}
                                type="number" name="price" id="price" required 
                                value={formData.price}
                            />
                        </div>
                        <div className='flex gap-2 items-center'>
                            <label htmlFor="carpetArea" className='font-medium'>Carpet Area</label>
                            <input className='p-2 border border-black rounded-lg'
                                onChange={changeHandler}
                                type="number" name="carpetArea" id="carpetArea" required 
                                value={formData.carpetArea}
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images: 
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>
                    
                    <div className="flex gap-4">
                        <input onChange={fileChangeHandler}
                            className='p-3 border border-gray-600 rounded w-full'
                            type="file" name="images" id="images" accept='image/*' multiple required 
                        />
                        {/* <button type='button' className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg hover:bg-green-700 hover:text-white'>
                            Upload
                        </button> */}
                    </div>
                    {
                        listingError && 
                        <p className='text-red-600'>{listingError}</p>
                    }
                    <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95'>
                        {loading ? 'Uploading...' : 'Create Listing'}
                    </button>
                </div>

            </form>
        </main>
    )
}

export default CreateListing