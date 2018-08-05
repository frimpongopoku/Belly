import $ from 'react'; 


class Blood{

	constructor(){ 
		this.switchPage = this.switchPage.bind(this);
	}

	capitalize(theString){
        return theString.charAt(0).toUpperCase() + theString.slice(1)
    }

	switchPage(choicePage, menuItems){
        menuItems.filter(item => choicePage !== item.name ).forEach(itemB =>{
            $('#' + itemB.name + '-button').removeClass('side-active');
        });
        $('#' + choicePage + '-button').addClass('side-active');
        
        let currentPage = $('#current-page-box').val();
        if(choicePage === currentPage){ //do nothing 
        }else{
            $('#' + currentPage).fadeOut(300, function () {
                $('#' + choicePage).fadeIn(200, function () {
                    $('#current-page-box').val(choicePage);
                });
            });
        }
    }
    changePage(newPage){
        //switch pages
        //record the latest page
        //add the required css styling to the side current Page
        //add necessary css styling to the button for the page that is being faded in
        let currentPage = $('#current-page-box').val();
        $('#'+currentPage).fadeOut(300,function(){
            $('#'+newPage).fadeIn(300);
        });
        $('#current-page-box').val(newPage);
        $('#'+currentPage+'-button').removeClass('side-active'); 
        $('#'+newPage + '-button').addClass('side-active');

    }

}

export default Blood;