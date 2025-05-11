import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../utils/userSlice";
import { useSearchParams } from "react-router-dom";


const EditForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const users = useSelector((state) => state.user.users);
  const user = users.find((u) => u.id === Number(id));


  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contactNumber: "",
    gmail: "",
    place: "",
    designation: "",
    date: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        age: user.age || "",
        contactNumber: user.contactNumber || "",
        gmail: user.gmail || "",
        place: user.place || "",
        designation: user.designation || "",
        date: user.date ? convertToInputDate(user.date) : "",
      });
    }
  }, [user]);

  const convertToInputDate = (ddmmyyyy) => {
    const [dd, mm, yyyy] = ddmmyyyy.split("-");
    return `${yyyy}-${mm}-${dd}`;
  };

  const convertToDisplayDate = (yyyymmdd) => {
    const [yyyy, mm, dd] = yyyymmdd.split("-");
    return `${dd}-${mm}-${yyyy}`;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ ...formData, id: Number(id), date: convertToDisplayDate(formData.date) }));
    navigate(`/?page=${page}`);
  };

  if (!user) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        User not found.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Age", name: "age", type: "number" },
          { label: "Contact Number", name: "contactNumber", type: "text" },
          { label: "Gmail", name: "gmail", type: "email" },
          { label: "Place", name: "place", type: "text" },
          { label: "Designation", name: "designation", type: "text" },
          { label: "Date", name: "date", type: "date" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-semibold mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        ))}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;