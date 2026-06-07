import React, { useState } from 'react'
import { IoHome } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const Layout = ({children}) => {
    const [open, setOpen] = useState(true)
    const data = [
        {label: "Dashboard", icon: <IoHome className="fs-3 text-info" />, url: '#' },
        {label: "Add Leads", icon: <FaUsers className="fs-3 text-info" />, url: '/'},
    ]
  return (
    <>
    <div className="row">
        <div className={`${open ? 'col-sm-2' : 'col-sm-1'} min-vh-100 bg-dark text-light`}>
            <ul className='mt-5 list-unstyled'>
                {data?.map((item, index)=>{
                    return (
                    <Link className='text-light text-decoration-none' to={item?.url}>
                        <li className='p-3'>
                            {item?.icon}
                            {open && (
                                <span className='ms-2 fw-bold'>{item?.label}</span>
                            )}
                        </li>
                    </Link>
                    )
                })}
            </ul>
        </div>
        <div className={`${open ? "col-sm-10" : "col-sm-11"}`}>
            <div className="row">
                <div className="col-sm-12">
                    <GiHamburgerMenu onClick={()=> setOpen(!open)} className="fs-2 mt-2" />
                </div>
            </div>
            <hr />
            <div>{children}</div>
        </div>
    </div>
    </>
  )
}

export default Layout