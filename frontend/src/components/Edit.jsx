import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';


const Edit = () => {
  const location = useLocation()
  const {_id, name, email, phone, company, status, notes} = location.state
  useEffect(()=>{
    setValue('name', name)
    setValue('email', email)
    setValue('phone', phone)
    setValue('company', company)
    setValue('status', status)
    setValue('notes', notes)
  },[])
    const nav = useNavigate()

    const schema = yup.object().shape({
    name: yup.string().required().trim().min(3).max(15) .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed"),
    email: yup.string().required().trim().email().min(3).max(30),
    phone: yup.string().required().trim().min(10).max(10) .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    company: yup.string().required().trim().min(3).max(20).matches(/^[A-Za-z0-9&.\- ]+$/,"Enter a valid company name"),
    status: yup.string().required().trim().min(3).max(15).matches(/[a-z]/),
    notes: yup.string().required().trim().min(3).max(20).matches(/^[A-Za-z ]+$/, "Only alphabets are allowed"),
    
  })

  const { register, setValue, handleSubmit, reset, formState:{errors} } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEdit = async(data)=>{
    const res = await axios.put(`http://localhost:7000/api/edit-data/${_id}`,data)
    if(res?.data?.success){
        Swal.fire({
            title: "update",
            text: res?.data?.message,
            icon: "success",
            timer: 2000
        })
        nav('/view')
    }
    else{
         Swal.fire({
            title: "update",
            text: res?.data?.message,
            icon: "error",
            timer: 2000
        })
    }
  }

  return (
    <>
   <Layout>
     <div className="row">
        <div className="col-sm-12 col-12">
            <div className="row">
                <div className="col-sm-6 col-12">Image</div>
                <div className="col-sm-6 col-12">
                    <div className='border shadow rounded mt-3 p-4'>
                        <h1 className='text-center mt-3 mb-4'>Update<span className='text-warning'>Form#</span></h1>
                        <form onSubmit={handleSubmit(handleEdit)}>
                            <input {...register('name')} type="text" className='form-control mb-3 shadow-none' placeholder='Enter Your Name' />
                            {errors?.name && <p className='text-danger ps-1'>{errors?.name?.message}</p>}
                            <input {...register('email')} type="email" className='form-control mb-3 shadow-none' placeholder='Enter Your Email' />
                            {errors?.email && <p className='text-danger ps-1'>{errors?.email?.message}</p>}
                            <input {...register('phone')} type="text" maxLength={10} className='form-control mb-3 shadow-none' placeholder='Enter Your Phone' />
                            {errors?.phone && <p className='text-danger ps-1'>{errors?.phone?.message}</p>}
                            <input {...register('company')} type="text" className='form-control mb-3 shadow-none' placeholder='Enter Your Company' />
                            {errors?.company && <p className='text-danger ps-1'>{errors?.company?.message}</p>}
                            <select {...register('status')} className='form-control mb-3 shadow-none'>
                                <option value="Lead Status">Lead Status</option>
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Converted">Converted</option>
                                <option value="Lost">Lost</option>
                            </select>
                            {errors?.status && <p className='text-danger ps-1'>{errors?.status?.message}</p>}
                            <input {...register('notes')} type="text" className='form-control mb-4 shadow-none' placeholder='Enter Notes ' />
                            {errors?.notes && <p className='text-danger ps-1'>{errors?.notes?.message}</p>}
                            <input type="submit" className='btn btn-warning form-control text-light' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
   </Layout>
    </>
  )
}

export default Edit