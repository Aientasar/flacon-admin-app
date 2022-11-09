import React, { Component } from "react";
import { withRouter } from "react-router";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-router-dom";

class AddEditDevice extends Component {
  currentModule = "";

  constructor(props) {
    super(props);
    this.state = props.initState;
  }

  handleChange = (item, value) => {
    const form = this.state.form.map((x) =>
      x.name === item.name ? { ...x, value: value } : x
    );
    this.setState({ form });
  };

  processData() {
    //date careted,uodated
    //date formats
    //validte schemas
    // this.writeData();
  }

  async writeData() {
    // try {
    //   let db = this.props.firebaseDB;
    //   let docRef = doc(
    //     db,
    //     String(this.state.path),
    //     this.state.data[this.state.keyName]
    //   );
    //   console.log(docRef);
    //   let docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     console.log("Duplicate Data exists");
    //     return;
    //   } else {
    //     await setDoc(docRef, this.state.data, { merge: true });
    //     console.log("Document written");
    //   }
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  }

  async getData() {
    // try {
    //   let docSnap = await getDoc(
    //     doc(
    //       this.props.firebaseDB,
    //       String(this.state.path),
    //       this.props.match.params.id
    //     )
    //   );
    //   if (!docSnap.exists()) {
    //     swal("No Data exists");
    //     this.props.history.push("/" + this.props.initState.url);
    //     return;
    //   }
    //   let form = this.state.form.map((formItem) => {
    //     formItem.value = docSnap.data()[formItem.name];
    //     return formItem;
    //   });
    //   this.state.data = docSnap.data();
    //   this.setState({ form, data: this.state.data });
    // } catch (e) {
    //   swal("Error loading data");
    //   this.props.history.push("/" + this.props.initState.url);
    //   return;
    // }
  }

  handleSubmit = (value) => {
    const form = this.state.form;
    let isInvalid = false;
    form.map((item) => {
      item.isDirty = true;
      if (
        item.isRequired &&
        (!item.value || item.value == "" || item?.value.value == "")
      )
        isInvalid = true;
      this.state.data[item["name"]] = item["value"];
    });
    this.setState({ form, data: this.state.data });
  };

  moduleChange = () => {
    console.log("module change");
    this.state = this.props.initState;
    this.currentModule = this.props.initState.url;
    if (this.props.match.params.id) this.getData();
  };

  render() {
    if (!this.currentModule || this.currentModule != this.props.initState.url)
      this.moduleChange();

    return (
      <div className="m-3 card p-5 border-0 rounded-3">
        <div>
          <small className="fw-bold d-block mb-3">
            <NavLink to={"/" + this.state.url}>{this.state.title}</NavLink>
            {" > Add/Edit" + this.state.title}
          </small>
        </div>
        <div className="d-flex align-items-center mb-3">
          <h3 className="w-auto fw-bold mb-md-0 mb-3">
            <u>Add {this.state.title}</u>
          </h3>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit(e);
          }}
          className="row"
        >
          {this.state.form.map((item) => (
            <div key={item.name} className="p-3 col-md-4 mb-2">
              {(() => {
                switch (item.type) {
                  case "number":
                    return (
                      <>
                        <label htmlFor={item.name} className="form-label">
                          {item.label}
                          <span className="text-danger">
                            {item.isRequired ? " *" : ""}
                          </span>
                        </label>
                        <input
                          type={item.type}
                          className="form-control border-0 bg-light"
                          id={item.name}
                          placeholder={item.placeHolder}
                          value={item.value}
                          min={"0"}
                          onChange={(e) => {
                            item.isDirty = true;
                            this.handleChange(item, e.target.value);
                          }}
                        />
                        <span className="d-block invalid-feedback mt-2 fw-bold">
                          {item.isRequired &&
                          item.isDirty &&
                          (!item.value || item.value == 0)
                            ? "Required Feild"
                            : ""}
                        </span>
                      </>
                    );
                  case "text":
                    return (
                      <>
                        <label htmlFor={item.name} className="form-label">
                          {item.label}
                          <span className="text-danger">
                            {item.isRequired ? " *" : ""}
                          </span>
                        </label>
                        <input
                          type={item.type}
                          className="form-control border-0 bg-light"
                          id={item.name}
                          placeholder={item.placeHolder}
                          value={item.value}
                          onChange={(e) => {
                            item.isDirty = true;
                            this.handleChange(item, e.target.value);
                          }}
                        />
                        <span
                          className="d-block invalid-feedback mt-2 fw-bold"
                          role="alert"
                        >
                          {item.isRequired &&
                          item.isDirty &&
                          (!item.value || item.value == "")
                            ? "Required Feild"
                            : ""}
                        </span>
                      </>
                    );
                  case "checkbox":
                    return (
                      <>
                        <label htmlFor={item.name} className="form-label">
                          {item.label}
                          <span className="text-danger">
                            {item.isRequired ? " *" : ""}
                          </span>
                        </label>
                        <div className="form-check">
                          <input
                            type={item.type}
                            className="form-control p-2 form-check-input me-2"
                            id={item.name}
                            placeholder={item.placeHolder}
                            checked={item.value}
                            onChange={(e) => {
                              item.isDirty = true;
                              this.handleChange(item, e.target.checked);
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={item.name}
                          >
                            {item.label}
                          </label>
                        </div>

                        <span
                          className="d-block invalid-feedback mt-2 fw-bold"
                          role="alert"
                        >
                          {item.isRequired &&
                          item.isDirty &&
                          (!item.value || item.value == "")
                            ? "Required Feild"
                            : ""}
                        </span>
                      </>
                    );
                  case "select":
                    return (
                      <>
                        <label htmlFor={item.name} className="form-label">
                          {item.label}
                          <span className="text-danger">
                            {item.isRequired ? " *" : ""}
                          </span>
                        </label>
                        <Select
                          value={item.value}
                          isMulti={item.isMulti ? true : false}
                          options={item.options}
                          onChange={(e) => {
                            item.isDirty = true;
                            this.handleChange(item, e);
                          }}
                        />
                        <span className="d-block invalid-feedback mt-2 fw-bold">
                          {item.isRequired &&
                          item.isDirty &&
                          (!item.value || !item.value || item.value.value == "")
                            ? "Required Feild"
                            : ""}
                        </span>
                      </>
                    );
                  case "date":
                    return (
                      <>
                        <label htmlFor={item.name} className="form-label">
                          {item.label}
                          <span className="text-danger">
                            {item.isRequired ? " *" : ""}
                          </span>
                        </label>
                        <DatePicker
                          showYearDropdown
                          showMonthDropdown
                          className="form-control border-0 bg-light"
                          selected={item.value ? item.value : Date.now()}
                          onChange={(e) => {
                            item.isDirty = true;
                            this.handleChange(item, e);
                          }}
                        />
                        <span className="d-block invalid-feedback mt-2 fw-bold">
                          {item.isRequired &&
                          !item.isDirty &&
                          (!item.value || item.value == "")
                            ? "Required Feild"
                            : ""}
                        </span>
                      </>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
          ))}
          <div className="mt-3">
            <button
              type="submit"
              className="btn fw-bold float-end btn-dark ms-2 px-5"
            >
              Update
            </button>
            <NavLink to={"/" + this.state.url}>
              <button
                type="button"
                className="btn fw-bold float-end btn-outline-dark me-2 px-5"
              >
                Cancel
              </button>
            </NavLink>
          </div>
        </form>
      </div>
      // <Form
      //   handleSubmit={this.handleSubmit}
      //   handleChange={this.handleChange}
      //   formValue={this.state.form}
      //   title={this.state.title}
      //   url={this.state.url}
      // />
    );
  }
}

export default withRouter(AddEditDevice);
