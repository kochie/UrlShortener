import React from 'react';

export default class ShortUrl extends React.Component{
    render() {
        return (
            <div className="col-lg-12">
                <div id="link">
                    <a className="result" href={this.props.shortUrl}>
                        {this.props.shortUrl}
                    </a>
                </div>
            </div>
        );
    }
}