import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { deleteUser, updateUser } from "./../store/actions";
import { SET_USER } from "./../store/types";
import Modal from "./EditModal";

const UserRow = (props) => {
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleClick = (user) => {
    dispatch({
      type: SET_USER,
      payload: { user },
    });
  };

  const handleEdit = (user) => {
    setUser(user);
    setModalIsOpen(true);
  };

  const handleUpdateProfile = () => {
    dispatch(updateUser(user));
    toggleModal();
  };

  const handleOnChange = (e) => {
    const currentUser = { ...user };
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser);
  };

  return (
    <>
      {isModalOpen && user && (
        <Modal
          onRequestClose={toggleModal}
          data={user}
          onSubmit={handleUpdateProfile}
          handleOnChange={handleOnChange}
        />
      )}

      <tr>
        <td className="user_name" onClick={() => handleClick(props.user)}>
          {props.user.firstName + " " + props.user.lastName}
        </td>
        <td>{props.user.email}</td>
        <td>
          <div className="action_icons">
            <AiFillEdit className="edit_icon" onClick={() => handleEdit(props.user)} />
            <AiTwotoneDelete className="delete_icon" onClick={() => handleDelete(props.user._id)} />
          </div>
        </td>
      </tr>
    </>
  );
};

const UserTable = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user, id) => {
          if (id == 0) return;
          return <UserRow user={user} key={user._id} />;
        })}
      </tbody>
    </table>
  );
};

const UsersList = () => {
  const usersList = useSelector((state) => state.usersListReducer);
  return <div>{usersList.length ? <UserTable users={usersList} /> : ""}</div>;
};

export default UsersList;
