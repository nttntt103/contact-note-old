import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../Spinner/Spinner";

const ContactList = () => {
  let [query, setQuery] = useState({
    text: ''
  })

  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    (
      async function getInitialData() {
        try {
          setState({ ...state, loading: true });
          let response = await ContactService.getAllContacts();
          setState({ ...state, contacts: response.data, loading: false, filteredContacts: response.data});
        } catch (error) {
          setState({ ...state, loading: false, errorMessage: error.message });
        }
      }
    )()
  }, []);

  let { loading, contacts, errorMessage, filteredContacts } = state;

  const clickDeleteHandler = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId)
      if (response) {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({ ...state, contacts: response.data, loading: false, filteredContacts: response.data });
      }     
    } catch (error) {
       setState({ ...state, loading: false, errorMessage: error.message });
    }
  }

  const handleSearch = (e) => {
    setQuery({
      ...query, text: e.target.value
    })
    let searchedContacts = state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setState({
      ...state,
      filteredContacts: searchedContacts
    })
  }

  return (
    <React.Fragment>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h5 fw-bold">
                  Contact Note
                  <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" />
                    New
                  </Link>
                </p>

                <p className="fst-italic">
                  There are four ways, and only four ways, in which we have contact with the world. We are evaluated and classified by these four contacts: what we do, how we look, what we say, and how we say it.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        name='text'
                        value={query.text}
                        type="text"
                        onChange={handleSearch}
                        className="form-control"
                        placeholder="Search..."
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outline-dark"
                        value="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {filteredContacts.length > 0 &&
                  filteredContacts.map((contact) => {
                    return (
                      <div className="col-md-6" key={contact.id}>
                        <div className="card my-2">
                          <div className="card-body">
                            <div className="row align-items-center justify-content-around">
                              <div className="col-md-4">
                                <img
                                  src={contact.photo}
                                  alt="avatar"
                                  className="contact-img"
                                />
                              </div>

                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name: <span className="fw-bold">{contact.name}</span>
                                  </li>

                                  <li className="list-group-item list-group-item-action">
                                    Mobile:{" "}
                                    <span className="fw-bold">{contact.mobile}</span>
                                  </li>

                                  <li className="list-group-item list-group-item-action">
                                    Email:{" "}
                                    <span className="fw-bold">
                                      {contact.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>

                              <div className="col-md-1 d-flex flex-column align-items-center contact-icon">
                                <Link
                                  to={`/contacts/view/${contact.id}`}
                                  className="btn btn-warning my-1 contact-btn"
                                >
                                  <i className="fa fa-eye" />
                                </Link>

                                <Link
                                  to={`/contacts/edit/${contact.id}`}
                                  className="btn btn-primary my-1 contact-btn"
                                >
                                  <i className="fa fa-pen" />
                                </Link>

                                <button className="btn btn-danger my-1 contact-btn" onClick={() => {clickDeleteHandler(contact.id)}}>
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ContactList;
