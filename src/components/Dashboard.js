/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import jsonData from '../db/db.json';

const myData = JSON.parse(JSON.stringify(jsonData));

// const API_HOST = "http://localhost:3000";
// const DASHBOARD_API_URL = `${API_HOST}/posts`;

const Dashboard = () => {
  const [allRecords,  setAllRecords] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");

  const fetchInventory = () => {
    console.log(myData);
    setAllRecords(myData.posts);
    setData(myData.posts);
    // fetch(`${DASHBOARD_API_URL}`)
    //   .then((res) => res.json())
    //   .then((json) => {
    //   });
  };  

  useEffect(() => {
    fetchInventory();
  }, []);

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  /**
   *
   * @param id - The id of the website
   * @param  currentName - the current name of website
   * @param currentEmail - the current email of website
   * @param currentUsername - the current username of website
   * @param currentWebsite - The current webaddress of the website
   */
  const onEdit = ({
    id,
    currentName,
    currentEmail,
    currentUsername,
    currentWebsite,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setName(currentName);
    setEmail(currentEmail);
    setUsername(currentUsername);
    setWebsite(currentWebsite);
  };

  /**
   *
   * @param id
   * @param newName
   * @param newEmail
   * @param newUsername
   * @param newWebsite
   
   */
  const updateInventory = ({
    id,
    newName,
    newEmail,
    newUsername,
    newWebsite,
  }) => {
    const updatedReports = allRecords.map(el => {
      if(el.id === id) {
        return {
          ...el,
          name: newName,
          email: newEmail,
          username: newUsername,
          website: newWebsite
        }
      }
      return el;
    })

    setAllRecords(updatedReports);
    console.log(updatedReports);


    // fetch(`${DASHBOARD_API_URL}/${id}`, {
    //   method: "PATCH",
    //   body: JSON.stringify({
    //     name: newName,
    //     email: newEmail,
    //     username: newUsername,
    //     website: newWebsite,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     // reset inEditMode and state values
    //     onCancel();

    //     // fetch the updated data
    //     fetchInventory();
    //   });
  };

  /**
   *
   * @param id -The id of the website
   * @param newName - The new name  of the website
   * @param newEmail - The new email  of the website
   * @param newUsername - The new username  of the website
   * @param newWebsite - The new webaddress  of the website
   */
  const onSave = ({ id, newName, newEmail, newUsername, newWebsite }) => {
    updateInventory({ id, newName, newEmail, newUsername, newWebsite });
  };

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
      status: false,
      rowKey: null,
    });
    // reset the  state value
    setName(null);
    setEmail(null);
    setUsername(null);
    setWebsite(null);
  };

const loadData = (type) => {
  let tableData = [];
  if (type === 'all') {
    tableData =  allRecords.filter((data) => data.type === "application" || data.type === "vendor") 
  } else if (type === 'app') {
    tableData =  allRecords.filter((data) => data.type === "application")     
  } else if (type === 'vendor') {
    tableData =  allRecords.filter((data) => data.type === "vendor")     
  }
  setData(tableData);
}
  return (
    <div className="col main pt-5 mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Library</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>

      <div className="row ">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">
            Check Records Related to Application
          </h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Comapny Name</th>
                  <th>Acion</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((data) => data.type === "application")
                  .slice(0, 10)
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        {inEditMode.status && inEditMode.rowKey === item.id ? (
                          <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        ) : (
                          item.name
                        )}
                      </td>
                      <td>
                        {" "}
                        {inEditMode.status && inEditMode.rowKey === item.id ? (
                          <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        ) : (
                          item.email
                        )}
                      </td>
                      <td>
                        {inEditMode.status && inEditMode.rowKey === item.id ? (
                          <input
                            value={username}
                            onChange={(event) =>
                              setUsername(event.target.value)
                            }
                          />
                        ) : (
                          item.username
                        )}
                      </td>
                      <td>
                        {inEditMode.status && inEditMode.rowKey === item.id ? (
                          <input
                            value={website}
                            onChange={(event) => setWebsite(event.target.value)}
                          />
                        ) : (
                          item.website
                        )}
                      </td>
                      <td>
                        {inEditMode.status && inEditMode.rowKey === item.id ? (
                          <React.Fragment>
                            <button
                              className={"btn-success"}
                              onClick={() =>
                                onSave({
                                  id: item.id,
                                  newName: name,
                                  newEmail: email,
                                  newUsername: username,
                                  newWebsite: website,
                                })
                              }
                            >
                              Save
                            </button>

                            <button
                              className={"btn-secondary"}
                              style={{ marginLeft: 8 }}
                              onClick={() => onCancel()}
                            >
                              Cancel
                            </button>
                          </React.Fragment>
                        ) : (
                          <button
                            className={"btn-primary"}
                            onClick={() =>
                              onEdit({
                                id: item.id,
                                currentName: item.name,
                                currentEmail: item.email,
                                currentUsername: item.username,
                                currentWebsite: item.website,
                              })
                            }
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">
            Check Records Related to Vendor
          </h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Comapny Name</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((data) => data.type === "vendor")
                  .slice(0, 5)
                  .map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        {inEditMode.status && inEditMode.rowKey === item.id ? (
                          <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        ) : (
                          item.name
                        )}
                      </td>
                      <td>
                        {" "}
                        {inEditMode.status && inEditMode.rowKey === item.id ? (
                          <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        ) : (
                          item.email
                        )}
                      </td>
                      <td>
                        {inEditMode.status && inEditMode.rowKey === item.id ? (
                          <input
                            value={username}
                            onChange={(event) =>
                              setUsername(event.target.value)
                            }
                          />
                        ) : (
                          item.username
                        )}
                      </td>
                      <td>
                        {inEditMode.status && inEditMode.rowKey === item.id ? (
                          <input
                            value={website}
                            onChange={(event) => setWebsite(event.target.value)}
                          />
                        ) : (
                          item.website
                        )}
                      </td>
                      <td>
                        {inEditMode.status && inEditMode.rowKey === item.id ? (
                          <React.Fragment>
                            <button
                              className={"btn-success"}
                              onClick={() =>
                                onSave({
                                  id: item.id,
                                  newName: name,
                                  newEmail: email,
                                  newUsername: username,
                                  newWebsite: website,
                                })
                              }
                            >
                              Save
                            </button>

                            <button
                              className={"btn-secondary"}
                              style={{ marginLeft: 8 }}
                              onClick={() => onCancel()}
                            >
                              Cancel
                            </button>
                          </React.Fragment>
                        ) : (
                          <button
                            className={"btn-primary"}
                            onClick={() =>
                              onEdit({
                                id: item.id,
                                currentName: item.name,
                                currentEmail: item.email,
                                currentUsername: item.username,
                                currentWebsite: item.website,
                              })
                            }
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">All Records of Employees</h5>
          <select onChange={(e) => { loadData(e.target.value) }}>
            <option value="all">All</option>
            <option value="app">Application</option>
            <option value="vendor">Vendor</option>
          </select>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Comapny Name</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {inEditMode.status && inEditMode.rowKey === item.id ? (
                        <input
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td>
                      {" "}
                      {inEditMode.status && inEditMode.rowKey === item.id ? (
                        <input
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      ) : (
                        item.email
                      )}
                    </td>
                    <td>
                      {inEditMode.status && inEditMode.rowKey === item.id ? (
                        <input
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                        />
                      ) : (
                        item.username
                      )}
                    </td>
                    <td>
                      {inEditMode.status && inEditMode.rowKey === item.id ? (
                        <input
                          value={website}
                          onChange={(event) => setWebsite(event.target.value)}
                        />
                      ) : (
                        item.website
                      )}
                    </td>
                    <td>
                      {inEditMode.status && inEditMode.rowKey === item.id ? (
                        <React.Fragment>
                          <button
                            className={"btn-success"}
                            onClick={() =>
                              onSave({
                                id: item.id,
                                newName: name,
                                newEmail: email,
                                newUsername: username,
                                newWebsite: website,
                              })
                            }
                          >
                            Save
                          </button>

                          <button
                            className={"btn-secondary"}
                            style={{ marginLeft: 8 }}
                            onClick={() => onCancel()}
                          >
                            Cancel
                          </button>
                        </React.Fragment>
                      ) : (
                        <button
                          className={"btn-primary"}
                          onClick={() =>
                            onEdit({
                              id: item.id,
                              currentName: item.name,
                              currentEmail: item.email,
                              currentUsername: item.username,
                              currentWebsite: item.website,
                            })
                          }
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
