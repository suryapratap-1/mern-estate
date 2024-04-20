import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Footer_Button from './Footer_Button';

const Footer = () => {
    return (
        <footer className='px-4 min-[769px]:px-32 py-14 bg-[#242424] text-gray-200'>
            <div className='flex flex-col gap-12'> 
                <div className='flex flex-wrap gap-4'>
                    <div className=' p-3 bg-white rounded-full'>
                        <FaFacebook className=' text-lg text-black' />
                    </div>
                    <div className=' p-3 bg-white rounded-full'>
                        <FaXTwitter className=' text-lg text-black' />
                    </div>
                    <div className=' p-3 bg-white rounded-full'>
                        <FaLinkedinIn className=' text-lg text-black' />
                    </div>
                    <div className=' p-3 bg-white rounded-full'>
                        <FaInstagram className=' text-lg text-black' />
                    </div>
                    <div className=' p-3 bg-white rounded-full'>
                        <FaPinterest className=' text-lg text-black' />
                    </div>
                    <div className=' p-3 bg-white rounded-full'>
                        <FaYoutube className=' text-lg text-black' />
                    </div>
                </div>

                <div className='flex flex-wrap gap-x-10 gap-y-5'>
                    <Footer_Button text={"About"} />                     
                    <Footer_Button text={"Careers"} />                     
                    <Footer_Button text={"Accessibility"} />                     
                    <Footer_Button text={"Feedback"} />                     
                    <Footer_Button text={"Media room"} />                     
                    <Footer_Button text={"Ad Choices"} />                     
                    <Footer_Button text={"Advertise with us"} />                     
                    <Footer_Button text={"Agent support"} />                     
                    <Footer_Button text={"Privacy"} />                     
                    <Footer_Button text={"Terms"} />                     
                    <Footer_Button text={"Home Made"} />                     
                    <Footer_Button text={"Tech Blog"} />                     
                    <Footer_Button text={"Agent Blog"} />                     
                    <Footer_Button text={"Sitemap"} />                     
                </div>

                <div className='flex flex-col gap-4'>
                    <h2 className='font-bold text-2xl'>Get the app</h2>
                    <div className='flex gap-3'>
                        <img src="/app-store-btn.svg" alt="" />
                        <img src="/google-play-btn.svg" alt="" />
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <h2 className='font-bold text-2xl'>Products</h2>
                    <div className='flex flex-wrap gap-x-10 gap-y-5'>
                        <Footer_Button text={"Leads & Branding"} />  
                        <Footer_Button text={"ListHub"} />  
                        <Footer_Button text={"Moving.com"} />  
                        <Footer_Button text={"International Properties"} />  
                        <Footer_Button text={"Avail"} />  
                        <Footer_Button text={"UpNest"} />  
                        <Footer_Button text={"Builder Solutions"} />  
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <h2 className='font-bold text-2xl'>News Corp</h2>
                    <div className='flex flex-wrap gap-x-10 gap-y-5'>
                        <Footer_Button text={"Barrons"} />  
                        <Footer_Button text={"Financial News"} />  
                        <Footer_Button text={"Harper Collins"} />  
                        <Footer_Button text={"Mansion Global"} />  
                        <Footer_Button text={"MarketWatch"} />  
                        <Footer_Button text={"New York Post"} />  
                        <Footer_Button text={"REA Group"} />  
                        <Footer_Button text={"Storyful"} />  
                        <Footer_Button text={"Wall Street Journal"} />  
                        <Footer_Button text={"Makaan.com"} />  
                        <Footer_Button text={"Housing.com"} />  
                        <Footer_Button text={"PropTiger.com"} />  
                        <Footer_Button text={"News Corn Australia"} />  
                        <Footer_Button text={"News UK"} />  
                    </div>
                </div>

                <div className=' text-xs flex flex-col gap-2 text-gray-300'>
                    <p>*Based on an Aug. 2023 proprietary survey among real estate professionals.</p>
                    <div className='flex gap-1'>
                        <p>© 1995-2024 </p>
                        <span className='underline'>National Association of REALTORS</span>
                        <p>and</p>
                        <span className='underline'>Move,INC.</span>
                        <p>and  All rights reserved.</p>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer