import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";

async function fetchEmployees() {
  const { data } = await listEmployees();
  if (!Array.isArray(data)) {
    throw new TypeError("Expected the employee API to return a list.");
  }
  return data;
}

function ListEmployeeComponent() {
  function addNewEmployee() {
    navigate("/add-employee");
  }
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      setEmployees(await fetchEmployees());
    } catch (requestError) {
      console.error("Failed to load employees:", requestError);
      setError("We couldn't load the employee list. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    fetchEmployees()
      .then((data) => {
        if (active) setEmployees(data);
      })
      .catch((requestError) => {
        console.error("Failed to load employees:", requestError);
        if (active) {
          setError("We couldn't load the employee list. Please try again.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function handleDeleteEmployee(id) {
    setDeleteError("");
    setDeletingEmployeeId(id);

    try {
      await deleteEmployee(id);
      setEmployees((currentEmployees) =>
        currentEmployees.filter((employee) => employee.id !== id)
      );
    } catch (requestError) {
      console.error("Failed to delete employee:", requestError);
      setDeleteError(
        requestError.response?.data?.message ??
          "We couldn't delete this employee. Please try again."
      );
    } finally {
      setDeletingEmployeeId(null);
    }
  }

  return (
    <section
      className="container employee-page"
      aria-labelledby="employee-title"
    >
      <h1 id="employee-title">List of Employees</h1>
      {deleteError && (
        <p className="text-red-700" role="alert">
          {deleteError}
        </p>
      )}
      <div className="employee-table-wrap">
        {error ? (
          <div
            className="employee-message employee-message--error"
            role="alert"
          >
            <p>{error}</p>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={loadEmployees}
            >
              Try again
            </button>
          </div>
        ) : loading ? (
          <div className="employee-message" role="status">
            <span
              className="spinner-border spinner-border-sm text-primary"
              aria-hidden="true"
            />
            <span>Loading employees...</span>
          </div>
        ) : employees.length === 0 ? (
          <div className="employee-message">
            <p className="mb-0">No employees found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <button
              className="btn btn-primary my-3"
              onClick={() => addNewEmployee()}
            >
              Add Employee
            </button>
            <table className="table table-striped table-bordered employee-table mb-0">
              <thead>
                <tr>
                  <th scope="col">Employee Id</th>
                  <th scope="col">Employee First Name</th>
                  <th scope="col">Employee Last Name</th>
                  <th scope="col">Employee Email</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                      <button
                        className=" bg-blue-400 px-4.5 py-1 rounded-lg"
                        onClick={() =>
                          navigate(`/edit-employee/${employee.id}`)
                        }
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-500 px-3 py-1 rounded-lg "
                        disabled={deletingEmployeeId !== null}
                        onClick={() => handleDeleteEmployee(employee.id)}
                      >
                        {deletingEmployeeId === employee.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default ListEmployeeComponent;
