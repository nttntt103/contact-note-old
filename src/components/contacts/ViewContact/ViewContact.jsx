import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ViewContact = () => {
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: "",
    group: {}
  });

  useEffect(() => {
    (async function getContactData() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroup(response.data);
        setState({ ...state, contact: response.data, loading: false, group: groupResponse.data });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: error.message });
      }
    })();
  }, [contactId]);

  let { loading, contact, errorMessage, group } = state;

  return (
    <React.Fragment>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-warning">View Contact</p>
              <p className="fst-italic">
                There are four ways, and only four ways, in which we have contact with the world. We are evaluated and classified by these four contacts: what we do, how we look, what we say, and how we say it.
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
            {Object.keys(contact).length > 0 && Object.keys(group).length > 0 && (
              <section className="view-contact mt-3">
            <div className="container">
              <div className="row align-items-center">
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
                      Mobile: <span className="fw-bold">{contact.mobile}</span>
                    </li>

                    <li className="list-group-item list-group-item-action">
                      Email: <span className="fw-bold">{contact.email}</span>
                    </li>

                    <li className="list-group-item list-group-item-action">
                      Company:{" "}
                      <span className="fw-bold">{contact.company}</span>
                    </li>

                    <li className="list-group-item list-group-item-action">
                          Title: <span className="fw-bold">{contact.title}</span>
                    </li>

                    <li className="list-group-item list-group-item-action">
                      Group: <span className="fw-bold">{group.name}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <Link to={"/contacts/list"} className="btn btn-warning">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </section>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ViewContact
