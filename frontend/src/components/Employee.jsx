import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { createEmployee } from "../services/EmployeeService";

const employeeSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

function Employee() {
  const [isCreated, setIsCreated] = React.useState(false);
  const [error, setError] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      firstName: "k.",
      lastName: "syed",
      email: "k.syed@company.com",
    },
  });
  const { id } = useParams(); // Get the employee ID from the URL if editing
  async function submitEmployee(employee) {
    setError("");
    setIsCreated(false);

    try {
      await createEmployee(employee);
      setIsCreated(true);
    } catch (requestError) {
      console.error("Error adding employee:", requestError);
      setError(
        requestError.response?.data?.message ??
          "Unable to add employee. Check that the backend is running and try again."
      );
    }
  }
  function pageTitle(){
    if (id) {
      return "Edit Employee";
    }
    return "Add Employee";
  }

  if (isCreated) {
    return <Navigate to="/employees" replace />;
  }

  return (
    <div>
      <h1 className="text-center text-4xl text-emerald-700">{pageTitle()}</h1>
      {error && (
        <p className="text-center text-red-700" role="alert">
          {error}
        </p>
      )}

      <form
        className="flex flex-col gap-4 w-1/3 mx-auto mt-4 bg-gray-100 p-4 rounded-lg shadow-md"
        onSubmit={handleSubmit(submitEmployee)}
      >
        <input
          type="text"
          placeholder="First Name"
          className="border border-gray-300 rounded-2xl py-2 px-2"
          {...register("firstName")}
          aria-invalid={Boolean(errors.firstName)}
        />
        {errors.firstName && (
          <p className="text-red-700" role="alert">
            {errors.firstName.message}
          </p>
        )}
        <input
          type="text"
          placeholder="Last Name"
          className="border border-gray-300 rounded-2xl py-2 px-2"
          {...register("lastName")}
          aria-invalid={Boolean(errors.lastName)}
        />
        {errors.lastName && (
          <p className="text-red-700" role="alert">
            {errors.lastName.message}
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-2xl py-2 px-2"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && (
          <p className="text-red-700" role="alert">
            {errors.email.message}
          </p>
        )}
        <button
          type="submit"
          className="bg-emerald-500 text-white px-4 py-2   hover:bg-emerald-600 rounded-2xl transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Employee;
