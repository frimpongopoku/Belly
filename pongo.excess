request->itemBrand,'Info'=>$request->info,'Price'=>'','Size'=>'']);
    	if ($request->finalise == "finalise" && $request->hasFile('image')){
            $ext = $request->image->getClientOriginalExtension();
            if( $ext=='jpeg' || $ext=='jpg' || $ext=='png' || $ext=='bmp' || $ext=='gif'|| $ext=='JPEG' || $ext=='JPG' || $ext=='PNG' || $ext=='BMP' || $ext=='GIF' ){
        		//upload the image
        		$fileName = uniqid().'.'.$request->image->getClientOriginalName();
        			$free = new Free();
        			$free->Name = $request->name;
        			$free->Email = $request->email;
        			$free->Item = $request->itemName;
        			$free->Brand = $request->itemBrand;
        			$free->Category = $request->categoryBox; 
        			$free->info = $request->info;
        			$fileName = uniqid().$request->image->getClientOriginalName();
        			if ($request->image->move('userImages',$fileName)){
	                    $free->Pics ="userImages/".$fileName;
	                    if($free->save()){
	                    	//send an email here

	                        Session::forget('old');
	                        return redirect(Session::get('lastpage'));
	                    }
	        		}
	
            }else{
                echo "You did not select any image. You selected a ".$ext." file";
                echo " <p class='alert alert-warning'><a href='".Session::get('lastpage')."'>Go back</a></p>";
            }



<form action='/up' method='post' encType='multipart/form-data'> 
                        <center>
                                <input type='hidden' name='_token' defaultValue ={ this.props.token } />
                            <input type = 'file' name='image' /> 
                            <input type='submit' value = 'submit'/>
                        </center>
                    </form>