import React from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { deleteUsersData } from "../../Features/commerceSlice";
import { state } from "../../Type/Type";

const RegisteredUsers = () => {
  var dispatch = useDispatch();
  var useAppSelector: TypedUseSelectorHook<state> = useSelector;
  var state = useAppSelector((state) => state.commerceSlice);
  // function deletes the user and dispatches the deleteUsersData
  const deleteUsers = (i: number) => {
    var sign = localStorage.getItem("signData");
    var signArr = JSON.parse(sign || "");
    signArr.map((item: any, index: number) => {
      if (
        state.users[i].email == item.email &&
        state.users[i].name == item.name &&
        state.users[i].role == item.role
      ) {
        dispatch(deleteUsersData({ index: i, ind: index }));
      }
    });
  };

  return (
    <div className="col-10 padTop p-3 m-auto d-flex align-items-center justify-content-center flex-column">
      {/* rendering of users data */}
      {state.users.length > 0 ? (
        <table className="col-12 m-auto text-center shadow table overflow-scroll" id="users__table">
          <tbody>
            <tr className=" border-bottom border-dark">
              <th className="p-2 bg-secondary text-light">S.No</th>
              <th className="p-2 bg-secondary text-light">Name</th>
              <th className="p-2 bg-secondary text-light">Email</th>
              <th className="p-2 bg-secondary text-light">Role</th>
              <th className="p-2 bg-secondary text-light">Action</th>
            </tr>
            {state.users.map((item, i) => {
              return (
                <tr className="border-bottom border-dark p-3">
                  <td>{i}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-danger col-3 "
                      onClick={() => deleteUsers(i)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        // render image if users are not available
        <img
          src="https://i.pinimg.com/736x/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.jpg"
          alt=""
        />
      )}
    </div>
  );
};

export default RegisteredUsers;
