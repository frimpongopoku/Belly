import React, { Component } from 'react';

class Profile extends Component {
    render() {
        return (
            <div className = 'page-margin'>
                <div className = 'container'> 
                    <div className = 'row'> 
                        <div className='col-md-10 col-lg-10 col-md-offset-2'> 
                            <div className = 'col-md-6'>
                                <img src='/imgs/avatars/nose-mask-avatar.jpg' className = 'big-profile-pic z' />
                            </div>
                            <div className ='col-md-6'> 
                                <div className = 'my-thumbnail img-responsive clearfix' style ={{height:400}}> 
                                    <input type = 'text' className ='form-control margin-10' placeholder='name'/>
                                    <input type='text' className='form-control margin-10' placeholder='email' />
                                    <input type='text' className='form-control margin-10' placeholder='phone' />
                                    <input type='text' className='form-control margin-10' placeholder='university' />
                                    <input type='text' className='form-control margin-10' placeholder='Programme' />
                                    <input type='text' className='form-control margin-10' placeholder='School'/>
                                    <input type='submit' className = 'btn btn-primary pull-right' value='save' />
                                </div>
                            </div>
                            <div className = 'col-md-12'> 
                                <div className='my-thumbnail margin-10'>
                                    <p>@created 13 pieces @deleted three @1k followers cri</p>
                                </div>
                            </div>
                            <div className = 'col-md-12'> 
                                <div className = 'my-thumbnail clearfix'> 
                                    <button className='btn btn-danger pull-right'><i className = 'fa fa-trash'></i></button>
                                    <button className='btn btn-elegant pull-right'><i className = 'fa fa-eyes'></i> View </button>
                                    <p> I created this thing and God says its good</p> 
                                </div>
                                <br />
                                <div className='my-thumbnail clearfix'>
                                    <button className='btn btn-danger pull-right'><i className='fa fa-trash'></i></button>
                                    <button className='btn btn-elegant pull-right'><i className='fa fa-eyes'></i> View </button>
                                    <p> I created this thing and God says its good</p>
                                </div>
                                <br />
                                <div className='my-thumbnail clearfix'>
                                    <button className='btn btn-danger pull-right'><i className='fa fa-trash'></i></button>
                                    <button className='btn btn-elegant pull-right'><i className='fa fa-eyes'></i> View </button>
                                    <p> I created this thing and God says its good</p>
                                </div>
                            </div>
                        </div>
                        
                    </div> 
                </div>
                
            </div>
        );
    }
}

export default Profile;
