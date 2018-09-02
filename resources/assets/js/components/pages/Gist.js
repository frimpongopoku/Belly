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
                  <GPCard details ={{name:'Agyingo', bcolor:'green'}} type='text' id ='1'></GPCard>
                  <GCard details ={{name:'Agyingo', bcolor:'green'}} type='pic' id="1"></GCard>
                   <GPCard details ={{name:'Agyingo', bcolor:'green'}} type='text' id ='2'></GPCard>
                  
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
