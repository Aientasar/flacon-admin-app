import React, { useEffect, useState, useRef } from "react";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink, useParams, useNavigate, useLocation } from "react-router-dom";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getData,
  postData,
  putData,
  deleteData,
} from "../../services/httpService";
import { v4 as uuidv4 } from "uuid";
import empty from "../../images/empty.jpg";

const AddEditDevice = (props) => {
  //get form --> create form -->handle form chages and update form values
  //-->on submit-->loops form-->get data & update data if present --> send data for posting
  const [state, setState] = useState(props.initState);
  const [data, setData] = useState(props.initState.data);
  const [form, setForm] = useState(props.initState.form);
  const [isProcessing, setisProcessing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();
  const { id: paramId } = useParams();
  const storage = getStorage();

  useEffect(() => {
    moduleChange();
  }, [location]);

  useEffect(() => {
    getItemData();
  }, [state.url]);

  const handleChange = (item, val) => {
    const newForm = form.map((x) => {
      if (x.name === item.name) {
        if (x.type == "number") val = parseFloat(val);
        if (x.type == "date") val = new Date(val).getTime();
        if (x.type == "select")
          return { ...x, value: val.value, selectValue: val };
        return { ...x, value: val };
      }
      return x;
    });
    console.log(newForm);
    setForm(newForm);
  };

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (!paramId) return;
        setisProcessing(true);
        deleteData(state.url, state.keyName, paramId)
          .then((result) => {
            console.log(result);
            swal("Deleted succesfully", "success");
            setisProcessing(false);
            navigate("/" + state.url);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const fileUpload = () => {
    return new Promise((resolve, reject) => {
      let path = null;
      if (state.url == "owners") {
        path = state.url + "/" + uuidv4() + ".jpg";
      } else {
        if (!data?.ownerId) {
          swal("Select owner to upload image", "error");
          reject();
        }
        path = data.ownerId + "/" + state.url + "/" + uuidv4() + ".jpg";
      }
      let storageRef = ref(storage, path);
      uploadBytes(storageRef, data.tempFile).then(
        (snapshot) => {
          resolve(path);
        },
        (error) => {
          console.log(error);
          reject();
        }
      );
    });
  };

  const processData = (postingdata) => {
    let fn = paramId ? putData : postData;
    //post data
    fn(state.url, postingdata).then(
      (result) => {
        console.log(result);
        swal("Data saved succesfully", "success");
        setisProcessing(false);
        navigate("/" + state.url);
      },
      (err) => {
        console.log(err);
        swal("Error savong data,please try again", "error");
        setisProcessing(false);
      }
    );
  };

  const handleSubmit = () => {
    setisProcessing(true);
    let postingdata = data;

    // check validity & populate data
    let isInvalid = false;
    let hasFile = false;

    const newForm = form.map((item) => {
      item.isDirty = true;
      if (
        item.isRequired &&
        (item.value.toString() == "" || item?.value.value == "")
      )
        isInvalid = true;
      if (item.name === "avatar" && item.tempFile) hasFile = true;
      postingdata[item.name] = item.value;
      return item;
    });

    if (isInvalid) {
      swal("Invalid values", "error");
      setisProcessing(false);
      return;
    }
    console.log(postingdata);

    if (hasFile) {
      fileUpload()
        .then((filePath) => {
          postingdata["avatar"] = filePath;
          processData(postingdata);
        })
        .catch(() => {
          swal("Unable to upload file,please try again", "error");
          setisProcessing(false);
          return;
        });
    } else {
      processData(postingdata);
    }
  };

  const getItemData = () => {
    if (!paramId) return;
    setisLoading(true);
    getData(state.url, state.keyName, paramId)
      .then((result) => {
        console.log(result.data);

        let newData = { ...data };
        Object.keys(newData).forEach(function (key) {
          newData[key] = result.data[key];
        });
        console.log(newData);
        setData((data) => ({ ...newData }));
        console.log(data);

        const newForm = form.map((item) => {
          if (result.data[item.name]?.toString()) {
            item.value = result.data[item.name];
            if (item.type == "select") {
              const index = item.options.findIndex(
                (option) => option.value === item.value
              );
              console.log(index);
              if (index >= 0) item.selectValue = item.options[index];
            }
          }
          return item;
        });

        setForm(newForm);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/" + state.url);
      });
  };

  const moduleChange = () => {
    setState(props.initState);
    setData(props.initState.data);
    setForm(props.initState.form);
    setisProcessing(false);
    setisLoading(false);
  };

  const onImageChange = (item, e, isDel = false) => {
    if (!isDel && !e?.target?.files[0]) return;
    const newForm = form.map((x) => {
      if (x.name === item.name) {
        return {
          ...x,
          value: isDel ? "" : URL.createObjectURL(e.target.files[0]),
          tempFile: isDel ? "" : e.target.files[0],
        };
      }
      return x;
    });
    console.log(newForm);
    setForm(newForm);
  };

  return (
    <div className="m-3 card p-5 border-0 rounded-3">
      <div>
        <small className="fw-bold d-block mb-3">
          <NavLink to={"/" + state.url}>{state.title}</NavLink>
          {" > Add/Edit" + state.title}
        </small>
      </div>
      <div className="d-flex align-items-center mb-3">
        <h3 className="w-auto fw-bold mb-md-0 mb-3">
          <u>Add {state.title}</u>
        </h3>
      </div>
      {(() => {
        if (isLoading) {
          return <h3 className="m-auto pt-3">Loading Data</h3>;
        } else {
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              className="row"
            >
              {form.map((item) => (
                <div key={item.name} className="p-3 col-md-4 mb-2">
                  {(() => {
                    switch (item.type) {
                      case "file":
                        return (
                          <>
                            <div className="text-center">
                              <img
                                style={{ maxHeight: "5em" }}
                                src={item.value ? item.value : empty}
                                className=" img-thumbnail mb-2 m-auto"
                              />
                              <label
                                htmlFor={item.name}
                                className="form-label d-block text-primary"
                              >
                                {item.label}
                              </label>

                              <label
                                onClick={(e) => {
                                  onImageChange(item, e, true);
                                }}
                                className="form-label d-block text-danger"
                              >
                                Delete
                              </label>

                              <input
                                hidden
                                type={item.type}
                                className="form-control border-0 bg-light"
                                id={item.name}
                                accept="image/*"
                                onChange={(e) => {
                                  onImageChange(item, e);
                                }}
                              />
                            </div>
                          </>
                        );
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
                                handleChange(item, e.target.value);
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
                                handleChange(item, e.target.value);
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
                              value={item.selectValue}
                              selected={true}
                              isMulti={item.isMulti ? true : false}
                              options={item.options}
                              onChange={(e) => {
                                item.isDirty = true;
                                handleChange(item, e);
                              }}
                            />
                            <span className="d-block invalid-feedback mt-2 fw-bold">
                              {item.isRequired &&
                              item.isDirty &&
                              item.value.toString() == ""
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
                                handleChange(item, e);
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
                  disabled={isProcessing}
                  type="submit"
                  className="btn fw-bold float-end me-2 px-5  btn-dark "
                >
                  {isProcessing && (
                    <div
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></div>
                  )}
                  {!isProcessing && <span>Process</span>}
                </button>

                {paramId && (
                  <button
                    onClick={(e) => {
                      handleDelete();
                    }}
                    disabled={isProcessing}
                    type="button"
                    className="btn fw-bold float-start me-2 px-5  btn-danger "
                  >
                    {isProcessing && (
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></div>
                    )}
                    {!isProcessing && <span>Delete</span>}
                  </button>
                )}

                <NavLink to={"/" + state.url}>
                  <button
                    type="button"
                    className="btn fw-bold float-end btn-outline-dark me-3 px-5"
                  >
                    Cancel
                  </button>
                </NavLink>
              </div>
            </form>
          );
        }
      })()}
    </div>
  );
};

export default AddEditDevice;
