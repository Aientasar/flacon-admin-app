import React from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-router-dom";

const Form = (props) => {
  return (
    <div className="m-3 card p-5 border-0 rounded-3">
      <div>
        <small className="fw-bold d-block mb-3">
          <NavLink to={"/" + props.url}>{props.title}</NavLink>
          {" > Add/Edit" + props.title}
        </small>
      </div>
      <div className="d-flex align-items-center mb-3">
        <h3 className="w-auto fw-bold mb-md-0 mb-3">
          <u>Add {props.title}</u>
        </h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.handleSubmit(e);
        }}
        className="row"
      >
        {props.formValue.map((item) => (
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
                          props.handleChange(item, e.target.value);
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
                          props.handleChange(item, e.target.value);
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
                            props.handleChange(item, e.target.checked);
                          }}
                        />
                        <label className="form-check-label" htmlFor={item.name}>
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
                          props.handleChange(item, e);
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
                          props.handleChange(item, e);
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
          <NavLink to={"/" + props.url}>
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
  );
};

export default Form;
