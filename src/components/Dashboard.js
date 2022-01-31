/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import jsonData from "../db/db.json";

const myData = JSON.parse(JSON.stringify(jsonData));

const Dashboard = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [allChildRecords, setChildAllRecords] = useState([]);
  const [childData, setChildData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [icon, setIcon] = useState(true);

  const fetchInventory = () => {
    console.log(myData);
    setAllRecords(myData.posts);
    setData(myData.posts);
    setSubData(myData.subData);
    setChildAllRecords(myData.subData);
    setChildData(myData.subData);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const [inExpandMode, setInExpandMode] = useState({
    status: false,
    rowKey: null,
  });

  const sortData = () => {
    const oldData = JSON.parse(JSON.stringify(data));
    let sorteddata = oldData.sort((a, b) => (a.name > b.name ? 1 : -1));
    console.log("sort................");
    setAllRecords(sorteddata);
    setData(sorteddata);
  };
  const decData = () => {
    const oldData = JSON.parse(JSON.stringify(data));
    let sorteddata = oldData.sort((a, b) => (b.name > a.name ? 1 : -1));
    console.log("sort................");
    setAllRecords(sorteddata);
    setData(sorteddata);
  };
  const ascId = () => {
    const oldData = JSON.parse(JSON.stringify(data));
    let sorteddata = oldData.sort((a, b) => (a.id > b.id ? 1 : -1));
    setAllRecords(sorteddata);
    setData(sorteddata);
  };
  const decId = () => {
    const oldData = JSON.parse(JSON.stringify(data));
    let sorteddata = oldData.sort((a, b) => (b.id > a.id ? 1 : -1));
    setAllRecords(sorteddata);
    setData(sorteddata);
  };
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
  const onEditChild = ({
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
  const toggleRow = (id) => {
    setInExpandMode({
      status: true,
      rowKey: id,
    });
    const forDataSelection = allChildRecords.filter(
      (el) => el.referenceId === id
    );
    console.log("cliekd", id, forDataSelection);
    setChildData(forDataSelection);
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
    const updatedReports = allRecords.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          name: newName,
          email: newEmail,
          username: newUsername,
          website: newWebsite,
        };
      }
      return el;
    });

    setAllRecords(updatedReports);
    setData(updatedReports);
    setInEditMode({
      status: false,
      rowKey: id,
    });
    console.log(updatedReports);
  };
  const updateChildInventory = ({
    id,
    newName,
    newEmail,
    newUsername,
    newWebsite,
  }) => {
    const updatedChildReports = allChildRecords.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          name: newName,
          email: newEmail,
          username: newUsername,
          website: newWebsite,
        };
      }
      return el;
    });
    const updatedChildData = childData.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          name: newName,
          email: newEmail,
          username: newUsername,
          website: newWebsite,
        };
      }
      return el;
    });
    setChildAllRecords(updatedChildReports);
    setChildData(updatedChildData);
    setInEditMode({
      status: false,
      rowKey: id,
    });
    console.log(updatedChildReports);
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
  const onSaveChild = ({ id, newName, newEmail, newUsername, newWebsite }) => {
    updateChildInventory({ id, newName, newEmail, newUsername, newWebsite });
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
    if (type === "all") {
      tableData = allRecords.filter(
        (data) => data.type === "application" || data.type === "vendor"
      );
    } else if (type === "app") {
      tableData = allRecords.filter((data) => data.type === "application");
    } else if (type === "vendor") {
      tableData = allRecords.filter((data) => data.type === "vendor");
    }
    setData(tableData);
  };
  const changeIcon = (item) => {
    setIcon(item);
    setIcon(!icon);
  };
  return (
    <div className="col main mt-3">
      <div className="row ">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">All Records of Employees</h5>
          <select
            onChange={(e) => {
              loadData(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="app">Application</option>
            <option value="vendor">Vendor</option>
          </select>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th>
                    {" "}
                    <i onClick={ascId} class="fa fa-sort-up"></i>
                    <i onClick={decId} class="fa fa-sort-down"></i>No{" "}
                  </th>
                  <th>
                    <i onClick={sortData} class="fa fa-sort-up"></i>
                    <i onClick={decData} class="fa fa-sort-down"></i>Name{" "}
                  </th>
                  <th>
                    <i onClick={sortData} class="fa fa-sort-up"></i>
                    <i onClick={decData} class="fa fa-sort-down"></i>Email{" "}
                  </th>
                  <th>
                    <i onClick={sortData} class="fa fa-sort-up"></i>
                    <i
                      onClick={decData}
                      class="fa fa-sort-down"
                    ></i>Username{" "}
                  </th>
                  <th>
                    <i onClick={sortData} class="fa fa-sort-up"></i>
                    <i onClick={decData} class="fa fa-sort-down"></i>Comapny
                    Name{" "}
                  </th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <React.Fragment key={item.name}>
                    <tr onClick={() => toggleRow(item.id)}>
                      <td onClick={() => changeIcon(item.id)}>
                        {/* {item.id} */}
                        {icon ? (
                          <i class="fa fa-caret-right"></i>
                        ) : (
                          <i class="fa fa-caret-down"></i>
                        )}
                      </td>
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
                    {inExpandMode.status && inExpandMode.rowKey === item.id
                      ? childData.map((el) => (
                          <tr key={el.id} >
                            <td>{/* <div>{item.id}</div> */}</td>
                            <td>
                              {" "}
                              {inEditMode.status &&
                              inEditMode.rowKey === el.id ? (
                                <input
                                  value={name}
                                  onChange={(event) =>
                                    setName(event.target.value)
                                  }
                                />
                              ) : (
                                el.name
                              )}
                            </td>

                            <td>
                              {inEditMode.status &&
                              inEditMode.rowKey === el.id ? (
                                <input
                                  value={email}
                                  onChange={(event) =>
                                    setEmail(event.target.value)
                                  }
                                />
                              ) : (
                                el.email
                              )}
                            </td>
                            <td>
                              {inEditMode.status &&
                              inEditMode.rowKey === el.id ? (
                                <input
                                  value={username}
                                  onChange={(event) =>
                                    setUsername(event.target.value)
                                  }
                                />
                              ) : (
                                el.username
                              )}
                            </td>
                            <td>
                              {inEditMode.status &&
                              inEditMode.rowKey === el.id ? (
                                <input
                                  value={website}
                                  onChange={(event) =>
                                    setWebsite(event.target.value)
                                  }
                                />
                              ) : (
                                el.website
                              )}
                            </td>
                            <td>
                              {inEditMode.status &&
                              inEditMode.rowKey === el.id ? (
                                <React.Fragment>
                                  <button
                                    className={"btn-success"}
                                    onClick={() =>
                                      onSaveChild({
                                        id: el.id,
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
                                    onEditChild({
                                      id: el.id,
                                      currentName: el.name,
                                      currentEmail: el.email,
                                      currentUsername: el.username,
                                      currentWebsite: el.website,
                                    })
                                  }
                                >
                                  Edit
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      : ""}
                  </React.Fragment>
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
