import React, { Component } from 'react';
import Piece from './../Plugins/Piece';
import TextModal from './../Plugins/TextModal';

class Dashboard extends Component {
    constructor(props){
        super(props); 
        this.searchTypes = ['Name','Title','Year','Username','University','Programme','Course','Rating']; 
    }


    spillPieces(){ 
        return this.props.pieces.map( (piece, index) =>{ 
            return (
                <li key={ index }>
                    <Piece owner= { piece.owner } course={ piece.course } 
                        fileType = { piece.type } title={ piece.title } ID={ piece.id } />
                    <TextModal piece_title = { piece.title } piece_id = {piece.id}
                         piece_body={piece.body} created_at= { piece.created_at} />
                </li>
                );
        })
    }

    render() {

        console.log(typeof(this.props.pieces));
        return (
            <div>
                <div className = 'container' style={{padding:'0'}}> 
                    <div className = 'row' > 
                        <div className = 'col-md-10 col-lg-10 col-md-offset-2 col-lg-offset-2'> 
                            {/* Search area */}
                            <div className='my-thumbnail' style={{ margin: '15px 0', marginLeft:0, width:'100%' }}> 
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
                                <div className = 'container' style={{padding:'0'}}>
                                    <div className = 'col-md-10' style={{padding:'0'}}>
                                        <div className = 'row'> 
                                            <ul style={{listStyleType:'none',padding:0}}> 
                                               { 
                                                  this.props.pieces ===null ? '' : this.spillPieces()
                                               }
                                             </ul>
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
