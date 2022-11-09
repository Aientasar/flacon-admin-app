import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class ListDevice extends Component {
  // static contextType = initStateContext;
  currentModule = "";
  isLoading = false;
  PAGE_SIZE = 5;
  totalPages = [];

  constructor(props) {
    super(props);
    this.state = props.initState;
  }

  async queryData(url) {
    // this.setState({ apiData: [], apiData: [] });
    // this.isLoading = true;
    // try {
    //   // let data = await axios.get(url);
    //   // this.isLoading = false;
    //   // console.log(data);
    //   // this.setState({ apiData: [], apiData: [] });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  handlePageChange = (currentPage) => {
    if (this.state.currentPage == currentPage) return;
    this.setState({ currentPage });
  };

  handleFilter = (filterText) => {
    let apiData = this.state.apiCallData.filter((item) => {
      let hasData = false;
      this.state.table.map((feild) => {
        if (item[feild.id].toLowerCase().includes(filterText.toLowerCase())) {
          hasData = true;
          return;
        }
      });
      return hasData;
    });
    this.setState({ apiData: apiData });
  };

  handleSort = (feild, sort) => {
    let apiData = this.state.apiCallData.sort((a, b) =>
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
    let table = this.state.table.map((value) => {
      if (value.id == feild) value.sort = !value.sort;
      return value;
    });
    this.setState({ apiData: apiData, table: table });
  };

  moduleChange = () => {
    console.log("load");
    this.state = this.props.initState;
    this.currentModule = this.props.url;
    this.PAGE_SIZE = 5;
    this.totalPages = [];
    if (this.state.apiData.length > this.PAGE_SIZE) {
      this.totalPages = Array.from(
        Array(Math.ceil(this.state.apiData.length / this.PAGE_SIZE)),
        (n, index) => index
      );
    }
    //this.queryData(this.props.initState.apiUrl);
  };

  render() {
    if (!this.currentModule || this.currentModule != this.props.initState.url)
      this.moduleChange();

    return (
      <>
        <div className="m-3">
          <div className="p-2 row d-flex justify-content-between align-items-center">
            <h3 className="w-auto fw-bold mb-md-0 mb-3">
              <u>{this.state.title}</u>
            </h3>
            <span className="d-flex w-auto align-items-center">
              <input
                className="form-control d-inline w-auto"
                placeholder="Search"
                onChange={(e) => this.handleFilter(e.target.value)}
              />
              <NavLink to={"/" + this.state.url + "/add"}>
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
                  {this.state.table.map((item) => (
                    <th
                      key={item.id}
                      onClick={() => this.handleSort(item.id, item.sort)}
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
                  if (this.state.isLoading) {
                    return (
                      <tr>
                        <td>Isloading</td>
                      </tr>
                    );
                  } else {
                    return this.state.apiData
                      .slice(
                        this.state.currentPage * this.PAGE_SIZE,
                        this.state.currentPage * this.PAGE_SIZE + this.PAGE_SIZE
                      )
                      .map((dataItem) => (
                        <tr key={dataItem.IMEINumber}>
                          {this.state.table.map((item) => (
                            <td key={dataItem.IMEINumber + item.id}>
                              {dataItem[item.id]}
                            </td>
                          ))}
                          <td className="fw-bold">
                            <NavLink
                              to={
                                "/" +
                                this.state.url +
                                "/add/" +
                                dataItem.IMEINumber
                              }
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
              {this.totalPages.map((page) => (
                <li
                  key={page}
                  className={
                    page == this.state.currentPage
                      ? "page-item active"
                      : "page-item"
                  }
                >
                  <a
                    onClick={() => this.handlePageChange(page)}
                    className="page-link"
                  >
                    {page + 1}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </>

      // <List
      //   handleSort={this.handleSort}
      //   handleFilter={this.handleFilter}
      //   handlePageChange={this.handlePageChange}
      //   currentPage={this.state.currentPage}
      //   apiData={this.state.apiData}
      //   listValue={this.state.table}
      //   title={this.state.title}
      //   url={this.state.url}
      //   isLoading={this.isLoading}
      // />
    );
  }
}

export default ListDevice;
