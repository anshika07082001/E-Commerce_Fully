import React, { useEffect } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { UsersData } from '../../Features/commerceSlice'
import { state } from '../../Type/Type'

const RegisteredUsers = () => {
    var dispatch=useDispatch()
    var useAppSelector:TypedUseSelectorHook<state>=useSelector
    var state=useAppSelector(state=>state.commerceSlice)
    // var [userArr,setUserArr]=useState()
    useEffect(()=>{
        var arr = localStorage.getItem('signData')
        var newArr:any=[]
        JSON.parse(arr||'').map((item:any)=>{
            if(item.role=='User'){
                newArr.push(item)
            }
        })
        dispatch(UsersData(newArr))
    },[])
    console.log(state.users)
  return (
    <div className='col-10 pt-2 bg-danger m-auto d-flex align-items-center justify-content-center flex-column'>
        <table className="col-10 m-auto bg-warning text-center border border-dark">
            <tr className='border border-dark'><th>S.No</th><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
            {state.users.length>0?
            state.users.map((item,i)=>{
                return <tr className='border border-dark p-3'><td>{i}</td><td>{item.name}</td><td>{item.email}</td><td>{item.role}</td><td><button className='btn btn-danger '>X</button></td></tr>
            })
            :<label>No Registered Users</label>}
        </table>
    </div>
  )
}

export default RegisteredUsers