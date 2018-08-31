import React, { Component } from 'react';
import GCard from './../plugins/GistCard';
import GPCard from './../plugins/GistPaperCard';
class Gist extends Component {
  render() {
    return (
      <div className ='page-margin' style = {{marginTop:80}}>
        <div className = 'container'> 
          <div className = 'row'>
            <div className='col-md-10 col-lg-10 col-lg-offset-1 col-md-offset-1'> 
              <div className = 'col-md-12 col-lg-12' > 
                <div className = 'col-md-10 col-md-offset-1 '>
                <div style = {{ marginTop:80}}></div>
                  <GPCard details ={{name:'Agyingo', bcolor:'green'}}></GPCard>
                  <GCard details ={{name:'Agyingo', bcolor:'green'}}></GCard>
                  
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
