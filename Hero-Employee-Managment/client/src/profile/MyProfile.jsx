import React from 'react';
import useAuth from '../auth/hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../auth/hook/useAxiosSecure';
import { Spinner } from '@material-tailwind/react';
import { CiBank, CiCircleInfo, CiMail } from "react-icons/ci";
import { GiHoodedFigure } from "react-icons/gi";
import { FaDollarSign } from "react-icons/fa6";
import { MdOutlineVerified } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { VscUnverified } from "react-icons/vsc";
import { Link } from 'react-router-dom';

const MyProfile = () => {

  const {user, loading} = useAuth();
  console.log(user?.email)
  const axiosSecure = useAxiosSecure();

  const { data: profile = [], isLoading, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user?.email}`)
      console.log(data)
      console.log(user?.email)
      return data;
    },
  });

  console.log("Profile Data:", JSON.stringify(profile, null, 2));

  if (isLoading || loading) {
    return <div className="pt-14 flex items-center justify-center"> <Spinner /> </div>;
  };
    
  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <section className="container mx-auto flex flex-col md:flex-row gap-5 items-center justify-center text-center px-8 pt-14 min-h-screen">
      <img src={profile?.image || user?.photoURL} alt="avatar" className="w-52 h-52 rounded-lg"/>
      <div className=''>
        <div className="flex gap-2 items-end justify-center md:justify-start">
          <h6 className="text-3xl font-semibold">{ profile?.name || user?.displayName}</h6>
          <span className={`text-xs mb-1 flex gap-1 items-center px-1 rounded-full w-fit ${profile?.isVerified ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}> 
            {profile?.isVerified ? <MdOutlineVerified /> : <VscUnverified />}
            <p className=""> {profile?.isVerified ? "Verified" : "Not Verified"} </p>
          </span>
        </div>
         
        <div className="">
          <span className="text-base text-gray-600 flex gap-1 items-center"> 
            <CiCircleInfo /> Designation:
            <p className="text-sm text-gray-600"> {profile?.designation}</p>
          </span>
          <span className="text-base text-gray-600 flex gap-1 items-center"> 
            <CiMail /> Email:
            <p className=""> {profile?.email || user?.email} </p>
          </span>
          <span className="text-base text-gray-600 flex gap-1 items-center"> 
            <GiHoodedFigure /> Role:
            <p className=""> {profile?.role} </p>
          </span>
          <span className="text-base text-gray-600 flex gap-1 items-center"> 
            <FaDollarSign /> Salary:
            <p className=""> {profile?.salary} </p>
            </span>
          <span className="text-base text-gray-600 flex gap-1 items-center"> 
            <CiBank /> Bank Account No:
            <p className=""> {profile?.bank_account_no} </p>
          </span>
        </div>
      </div>

      <Link to={'/update-profile'} className='btn bg-gray-200'> update profile </Link>
    </section>
  );
};

export default MyProfile;