import React, { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { deleteUsersData, getSignData, getUsersData } from "../../Features/commerceSlice";
import { state } from "../../Type/Type";

const RegisteredUsers = () => {
  var dispatch = useDispatch();
  var useAppSelector: TypedUseSelectorHook<state> = useSelector;
  var state = useAppSelector((state) => state.commerceSlice);

  useEffect(()=>{
    let users=localStorage.getItem('usersData')
    dispatch(getUsersData(JSON.parse(users||'')))
    let signData=localStorage.getItem('signData')
    dispatch(getSignData(JSON.parse(signData||'')))
  },[])

  const deleteUsers=(i:number)=>{
    var sign= localStorage.getItem('signData')
    var signArr = JSON.parse(sign||"")
    signArr.map((item:any,index:number)=>{
      if(state.users[i].email==item.email && state.users[i].name==item.name && state.users[i].role==item.role){
        dispatch(deleteUsersData({index:i,ind:index}))
      }
    })

  }
  return (
    <div className="col-10 p-3 m-auto d-flex align-items-center justify-content-center flex-column">
      <table className="col-12 m-auto text-center shadow" id="users__table">
        <tbody>
        <tr className=" border-bottom border-dark">
          <th className="p-2 bg-secondary text-light">S.No</th>
          <th className="p-2 bg-secondary text-light">Name</th>
          <th className="p-2 bg-secondary text-light">Email</th>
          <th className="p-2 bg-secondary text-light">Role</th>
          <th className="p-2 bg-secondary text-light">Action</th>
        </tr>
        {state.users.length > 0 ? (
          state.users.map((item, i) => {
            return (
              <tr className="border-bottom border-dark p-3">
                <td>{i}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button className="btn btn-danger col-3 " onClick={()=>deleteUsers(i)}>X</button>
                </td>
              </tr>
            );
          })
        ) : (
          <>
          <label>No Registered Users</label>
          </>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredUsers;
