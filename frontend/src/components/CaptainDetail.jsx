import React,{useContext} from 'react'
import { CaptainDataContext } from '../context/CaptainContext'


function CaptainDetail() {

  const {captain} = useContext(CaptainDataContext)

  return (
    <>
      <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-3">
            <img
              className="h-10 w-10 rounded-full object-cover "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_vVBAvcz_VzzBC-8kmKTJ6j3B7t3LbYOhhg&s"
              alt=""
            />
            <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname +" "+captain.fullname.lastname}</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">₹935.45</h4>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex p-3 mt-6 bg-gray-200 rounded-xl justify-center gap-5 items-start">
          <div className="text-center">
            <i className=" text-3xl mb-2 font-thin  ri-timer-flash-fill"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className=" text-3xl mb-2 font-thin  ri-speed-up-fill"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className=" text-3xl mb-2 font-thin  ri-booklet-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
    </>
  )
}

export default CaptainDetail
