import React, { Component } from 'react';
import PropTypes from 'prop-types';
class GistCard extends Component {
    render() {
        return (
            <div>
                <div className = 'panel panel-default solid-p-w'> 
                       <div className = 'panel-heading clearfix'>
                            <i className='fa fa-ellipsis-h font-medium pull-right'  style = {{ cursor:'pointer' }} ></i>
                            <h1 className = 'panel-title'>Create in me</h1>
                    </div>
                    <div className = 'panel-body' style ={{padding:'0px'}}> 
                        <img src = '/imgs/knust.jpg' className='img-responsive gist-img' />

                        <a href='#' className = 'name-badge margin-climb-up  my-depth-1' style={{background:this.props.details.bcolor}}> @{this.props.details.name} </a>
                        <p className = 'font-small pull-right margin-10'>540 Likes 60 Comments</p>
                    </div> 
                    <div className = 'panel-footer'> 
                        <a href='#' className = 'action-btn font-small-ish'><i className = 'fa fa-thumbs-up'></i> Like</a>
                        <a href='#' className='action-btn font-small-ish'><i className='fa fa-comment'></i> Comment</a>
                        <a href='#' className='action-btn font-small-ish'><i className='fa fa-share'></i> Share</a>
                    </div>
                </div> 
                                   
            </div>
        );
    }
}

GistCard.propTypes = { 
    details: PropTypes.object,
    bcolor: PropTypes.string, 
    name: PropTypes.string 
}

export default GistCard;
