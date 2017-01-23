import React from 'react';

export default class UrlForm extends React.Component {
    /** @namespace this.props.onSubmit */
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="col-lg-12">
                <form className="form-inline input-group input-group-lg" onSubmit={this.props.onSubmit}>
                    <input id="url-field" type="text" onChange={this.props.onChange} className="form-control" placeholder="Paste a link..."/>
                    <span className="input-group-btn">
                        <button className="btn btn-shorten" type="submit">SHORTEN</button>
                    </span>
                </form>
            </div>
        );
    }
}