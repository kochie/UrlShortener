/**
 * Created by rkoch on 1/18/17.
 */

import React from 'react';
// import 'font-awesome';
import ShortUrl from './short-url.jsx';
import UrlForm from './url-form.jsx';

export default class UrlApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shortUrl: '',
            longUrl: ''
        };
    }

    onChange(e) {
        this.setState({
            longUrl: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.longUrl.split('://').length == 1) {
            this.state.longUrl = `http://${this.state.longUrl}`;
        }
        let url;
        try {
            url = new URL(this.state.longUrl);
        } catch(e) {
            return e;
        }

        window.fetch('/api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url.href,
                hostname: window.location.href
            })
        }).then((res)=>{
            return res.json();
        }).then((json)=>{
            this.setState({
                shortUrl: json.shortUrl
            });
        });
    }

    render(){
        return (
            <div className="site-wrapper">
            <div className="site-wrapper-inner">
                <div className="main-container">
                    <div className="inner cover">
                        <span className="glyphicon glyphicon-link"/>
                        {/*<i className="fa fa-link"/>*/}
                        <h1>URL Shortener</h1>
                        <h4>{window.location.hostname}</h4>
                        <div className="row">
                            <UrlForm onSubmit={this.onSubmit.bind(this)} onChange={this.onChange.bind(this)}/>
                        </div>
                        <div className="row">
                            <ShortUrl shortUrl={this.state.shortUrl}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

