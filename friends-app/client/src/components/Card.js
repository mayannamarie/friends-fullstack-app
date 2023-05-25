
import React from 'react';
import '../css/edit.css';

const Card = (props) => {
    return (
        //<form className="form-edit" onSubmit={handleSubmit}>
            <div className="col-md-4">
                <div className="card mb-4 box-shadow">
                    <img
                        className="card-img-top"
                        data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                        alt="Thumbnail [100%x225]"
                        style={{ height: 225, width: '100%', display: 'block' }}
                        src={props.f.image}
                        data-holder-rendered="true" />
                    <div className="card-body">
                        Address
                        <ul>
                            {/* //retrieving the data from axios */}
                            <li className="card-text">{props.f.address[0].street_no}</li>
                            <li className="card-text">{props.f.address[0].city}</li>
                            <li className="card-text">{props.f.address[0].country}</li>
                        </ul>

                        <small className="text-muted">{props.f.first_name}</small><br></br>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button  class="btn btn-warning" className="btn btn-sm btn-outline-secondary" onClick={ () => props.onEdit(props.f._id)}>Edit</button>
                                <button  class="btn btn-danger" className="btn btn-sm btn-outline-secondary" onClick={ () => props.onDelete(props.f._id)}>Delete</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        //</form>
    );
}

export default Card;