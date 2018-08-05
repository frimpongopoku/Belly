import React, { Component } from 'react';
import GCard from './../plugins/GistCard';
class Gist extends Component {
    render() {
        return (
            <div className ='page-margin'>
                <div className = 'container'> 
                    <div className = 'row'>
                        <div className='col-md-10 col-lg-10 col-lg-offset-1 col-md-offset-1'> 
                            <div className = 'col-md-9' > 
                                <div className = 'col-md-10 col-md-offset-1 '>
                                    <GCard details ={{name:'Agyingo', bcolor:'green'}}></GCard>
                                    <GCard details={{ name: 'Eliza', bcolor: 'crimson' }}></GCard>
                                    <GCard details={{ name: 'Nuups', bcolor: 'black' }}></GCard>
                                </div>
                            </div> 
                            <div className='col-md-3' > 
                                <div style={{ position: 'fixed'}}>
                                    <div className = 'thumbnail my-depth-1' style={{padding:15, marginRight:30}}>
                                        <p className = 'font-big '>Place for some other shit </p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div> 
                </div> 
            </div>
        );
    }
}

export default Gist;
