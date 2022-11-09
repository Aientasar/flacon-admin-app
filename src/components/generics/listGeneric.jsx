import React from "react";
import { NavLink } from "react-router-dom";

const List = (props) => {
  let PAGE_SIZE = 5;
  let totalPages = [];
  if (props.apiData.length > PAGE_SIZE) {
    totalPages = Array.from(
      Array(Math.ceil(props.apiData.length / PAGE_SIZE)),
      (n, index) => index
    );
  }

  return (
    <div className="m-3">
      <div className="p-2 row d-flex justify-content-between align-items-center">
        <h3 className="w-auto fw-bold mb-md-0 mb-3">
          <u>{props.title}</u>
        </h3>
        <span className="d-flex w-auto align-items-center">
          <input
            className="form-control d-inline w-auto"
            placeholder="Search"
            onChange={(e) => props.handleFilter(e.target.value)}
          />
          <NavLink to={"/" + props.url + "/add"}>
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
              {props.listValue.map((item) => (
                <th
                  key={item.id}
                  onClick={() => props.handleSort(item.id, item.sort)}
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
              if (props.isLoading) {
                return (
                  <tr>
                    <td>Isloading</td>
                  </tr>
                );
              } else {
                return props.apiData
                  .slice(
                    props.currentPage * PAGE_SIZE,
                    props.currentPage * PAGE_SIZE + PAGE_SIZE
                  )
                  .map((dataItem) => (
                    <tr key={dataItem.IMEINumber}>
                      {props.listValue.map((item) => (
                        <td key={dataItem.IMEINumber + item.id}>
                          {dataItem[item.id]}
                        </td>
                      ))}
                      <td className="fw-bold">
                        <NavLink
                          to={"/" + props.url + "/add/" + dataItem.IMEINumber}
                        >
                          Edit
                        </NavLink>
                      </td>
                    </tr>
                  ));
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
                page == props.currentPage ? "page-item active" : "page-item"
              }
            >
              <a
                onClick={() => props.handlePageChange(page)}
                className="page-link"
              >
                {page + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default List;
