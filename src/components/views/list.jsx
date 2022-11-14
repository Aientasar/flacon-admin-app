import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { queryData } from "../../services/httpService";

const ListDevice = (props) => {
  let [currentState, setCurrentState] = useState(props.initState);
  const [totalPages, settotalPages] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const PAGE_SIZE = 5;
  let location = useLocation();

  useEffect(() => {
    queryResultData(currentState.url);
  }, [currentState.url]);

  useEffect(() => {
    moduleChange();
  }, [location]);

  const queryResultData = async (url) => {
    setisLoading(true);
    try {
      let queryResult = await queryData(url);
      setisLoading(false);
      let newState = { ...currentState };
      newState["apiData"] = queryResult.data;
      newState["apiCallData"] = queryResult.data;
      setCurrentState((currentState) => ({ ...newState }));
      console.log(newState);

      if (currentState.apiData.length > PAGE_SIZE) {
        settotalPages(
          Array.from(
            Array(Math.ceil(currentState.apiData.length / PAGE_SIZE)),
            (n, index) => index
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (currentPage) => {
    if (currentState.currentPage == currentPage) return;
    updateState("currentPage", currentPage);
  };

  const handleFilter = (filterText) => {
    let newApiData = currentState.apiCallData.filter((item) => {
      let hasData = false;
      currentState.table.map((feild) => {
        if (
          item[feild.id] &&
          item[feild.id]
            .toString()
            .toLowerCase()
            .includes(filterText.toLowerCase())
        ) {
          hasData = true;
          return;
        }
      });
      return hasData;
    });
    updateState("apiData", newApiData);
  };

  const updateState = (key, value) => {
    let newState = { ...currentState };
    newState[key] = value ? value : props.initState[key];
    setCurrentState((currentState) => ({ ...newState }));
  };

  const handleSort = (feild, sort) => {
    let newApiData = currentState.apiCallData.sort((a, b) =>
      a[feild] > b[feild]
        ? sort
          ? 1
          : -1
        : b[feild] > a[feild]
        ? sort
          ? -1
          : 1
        : 0
    );
    let table = currentState.table.map((value) => {
      if (value.id == feild) value.sort = !value.sort;
      return value;
    });

    updateState("apiData", newApiData);
  };

  const moduleChange = () => {
    setCurrentState((currentState) => ({ ...props.initState }));
    settotalPages([]);
  };

  return (
    <>
      <div className="m-3">
        <div className="p-2 row d-flex justify-content-between align-items-center">
          <h3 className="w-auto fw-bold mb-md-0 mb-3">
            <u>{currentState.title}</u>
          </h3>
          <span className="d-flex w-auto align-items-center">
            <input
              className="form-control d-inline w-auto"
              placeholder="Search"
              onChange={(e) => handleFilter(e.target.value)}
            />
            <NavLink to={"/" + currentState.url + "/add"}>
              <button className="ms-2 btn w-auto btn-dark">
                <i className="bx bx-plus"></i>
              </button>
            </NavLink>
          </span>
        </div>

        <div className="table-responsive mt-3">
          <table className="table isLora">
            <thead>
              <tr>
                {currentState.table.map((item) => (
                  <th
                    key={item.id}
                    onClick={() => handleSort(item.id, item.sort)}
                    scope="col"
                  >
                    {item.name}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                if (isLoading) {
                  return (
                    <tr>
                      <td>Isloading</td>
                    </tr>
                  );
                } else {
                  if (
                    !currentState.apiData ||
                    currentState.apiData.length == 0
                  ) {
                    return (
                      <tr>
                        <td>No Data</td>
                      </tr>
                    );
                  } else {
                    return currentState.apiData
                      .slice(
                        currentState.currentPage * PAGE_SIZE,
                        currentState.currentPage * PAGE_SIZE + PAGE_SIZE
                      )
                      .map((dataItem) => (
                        <tr key={dataItem[[currentState.keyName]]}>
                          {currentState.table.map((item) => (
                            <td key={dataItem[currentState.keyName] + item.id}>
                              {dataItem[item.id]
                                ? item.isDate
                                  ? new Date(
                                      dataItem[item.id]
                                    ).toLocaleDateString("en-US")
                                  : dataItem[item.id]
                                : "--"}
                            </td>
                          ))}
                          <td className="fw-bold">
                            <NavLink
                              to={
                                "/" +
                                currentState.url +
                                "/add/" +
                                dataItem[currentState.keyName]
                              }
                            >
                              Edit
                            </NavLink>
                          </td>
                        </tr>
                      ));
                  }
                }
              })()}
            </tbody>
          </table>
        </div>

        <nav>
          <ul className="pagination float-end">
            {totalPages.map((page) => (
              <li
                key={page}
                className={
                  page == currentState.currentPage
                    ? "page-item active"
                    : "page-item"
                }
              >
                <a onClick={() => handlePageChange(page)} className="page-link">
                  {page + 1}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ListDevice;
