import React, { Component } from 'react';


class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className = 'container'> 
                    <div className = 'row'> 
                        <div className = 'col-md-10 col-lg-10 col-md-offset-2'> 
                            {/* Search area */}
                            <div className='my-thumbnail' style={{ margin: '15px' }}> 
                                <div className =' ' >
                                    <input type = 'text' placeholder='search ' className='form-control' />

                                    <div className="">
                                        <input type="radio" className=" my-checkbox" name='criteria' value = 'Name'id="Name" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="Name">By Name</label>

                                        <input type="radio" className=" my-checkbox" name='criteria' value='Title' id="Title" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="Title">By Title</label>

                                        <input type="radio" className=" my-checkbox" name='criteria' value='University' id="University" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="University">By University</label>
                                        
                                        <input type="radio" className=" my-checkbox" name='criteria' value='Year'id="Year" />
                                         <label className="form-check-label my-checkbox-label" htmlFor="Year">By Year</label>
                                   
                                        <input type="radio" className=" my-checkbox" name='criteria' value='Username'id="Username" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="Username">By Username</label>
                                 
                                        <input type="radio" className=" my-checkbox" name='criteria' value='Programme' id="Programme" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="Programme">By Programme</label>
                           
                                        <input type="radio" className=" my-checkbox" name='criteria' value='Course' id="Course" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="Course">By Course</label>
                              
                                        <input type="radio" className=" my-checkbox" name='criteria' value='Rating' id="Rating" />
                                        <label className="form-check-label my-checkbox-label" htmlFor="Rating">By Rating</label>
                                    </div>
                                 </div>
                            </div>
                            {/* Found Papers area  */}
                            <div> 
                                <div className = 'container'>
                                    <div className = 'row'>
                                        <div className ='col-md-4'>
                                            <div className = 'z-depth-1'>
                                                <div className ='my-card'> 
                                                    <center>
                                                        <p className='title-flag' style ={{textTransform:'uppercase'}}> <b>I am the good shepherd</b>
                                                        </p>
                                                    </center>
                                                        <p><b>Name:</b> Frimpong Opoku</p>
                                                        <p><b>Course:</b> Economics</p>
                                                        <p><b>File-type:</b> PDF </p>
                                                        <p><b>Progam:</b> Engineering</p>
                                                    
                                                </div>
                                                <div className='my-card-footer clearfix'>
                                                    <small className = 'angel'><i className = 'fa fa-timer'></i> 3 months ago</small>

                                                </div>
                                            </div>
                                        </div>

                                        <div className='col-md-4'>
                                            <div className='z-depth-1'>
                                                <div className='my-card'>
                                                    <center>
                                                        <br/><br/>
                                                        <h1 className = 'card-title'> 
                                                            FRENCH
                                                        </h1>
                                                        <p>Papers available: <span className ='badge'>450</span></p>
                                                    </center>
                                        

                                                </div>
                                                <div className='my-card-footer clearfix'>
                                                    <small className='angel'><i className='fa fa-timer'></i> 3 months ago</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                {/* End of Found papers area */}
                        </div> 
                    </div> 
                </div>
            </div>
        );
    }
}

export default Dashboard;
