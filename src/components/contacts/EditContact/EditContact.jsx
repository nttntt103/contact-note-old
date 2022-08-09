import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

const EditContact = () => {
  let navigate = useNavigate();

  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    errorMessage: "",
    groups: [],
  });

  useEffect(() => {
    (async function () {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups();
        setState({
          ...state,
          contact: response.data,
          loading: false,
          groups: groupResponse.data,
        });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    })();
  }, [contactId]);

  let updateInput = (e) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [e.target.name]: e.target.value,
      },
    });
  };

  let { contact, loading, groups, errorMessage } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, loading: false, errorMessage: error.message });
      navigate(`/contacts/edit/${contact.id}`, { replace: false });
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 text-primary fw-bold">Edit Contact</p>
                  <p className="fst-italic">
                      There are four ways, and only four ways, in which we have contact with the world. We are evaluated and classified by these four contacts: what we do, how we look, what we say, and how we say it.
                  </p>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-md-4">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                      <input
                        required
                        name="name"
                        value={contact.name}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        required
                        name="photo"
                        value={contact.photo}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Photo URL"
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        required
                        name="mobile"
                        value={contact.mobile}
                        onChange={updateInput}
                        type="number"
                        className="form-control"
                        placeholder="Mobile"
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        required
                        name="email"
                        value={contact.email}
                        onChange={updateInput}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        required
                        name="company"
                        value={contact.company}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Company"
                      />
                    </div>

                    <div className="mb-2">
                      <input
                        required
                        name="title"
                        value={contact.title}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                      />
                    </div>

                    <div className="mb-2">
                      <select
                        className="form-control"
                        required
                        name="groupId"
                        value={contact.groupId}
                        onChange={updateInput}
                      >
                        <option value="" disabled selected hidden>
                          Select a group
                        </option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="mb-2">
                      <button type="submit" className="btn btn-primary">
                        Update
                      </button>
                      <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>

                <div className="col-md-6">
                  <img
                    src={contact.photo}
                    alt="avatar"
                    className="contact-img"
                  />
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EditContact;
