	$(document).ready(function(){
			document.addEventListener("deviceready", my5DeviceReadyListener, false);
	});
	
	function my5DeviceReadyListener(){
		$("#content").on('click','.pic',function(){
		var a=$(this)
 			navigator.camera.getPicture(function(imageURI){
 				$width=a.parent().width();
 				$height=a.parent().height();
 				$img="<img src='"+imageURI+"' width='"+$width+"' height='"+$height+"' class='pics'/>";
 				a.parent().append($img);
			    a.remove();	
 			}, onFail, { 
 				quality: 70,
			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
			    //sourceType:Camera.PictureSourceType.Camera,
			    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
			   // mediaType:Camera.MediaType.VIDEO,
			}); 			
 		})
	}
	
	function onFail(message) {
	    alert('请重新选择');
	}
	
	
$(function(){
	$("#detail_submit").click(function(){
		$(".pics").each(function(){
		   var imageURI = $(this).attr("src");
		   var price=$(this).prev().val();
		   var type=$(this).prev().prev().val();
		   var product_id=getItem('product_id');
		 	var id = getItem('u_id');//获取userid
		    var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.fileName+='.jpg';
            options.mimeType="image/jpeg";
            var params = {};
            params.name = "iden";
            params.price=price;
            params.name=type;
            params.uid=id;
            params.product_id=product_id;
            options.params = params;
            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://www.29mins.com/product_uploader/create_other_details"), win, fail, options);
		})
	})
	 function win(r) {
			$.get('http://www.29mins.com/product_uploader/get_stores_by_account',function(data){
					var obj = JSON.parse(data);
					if(obj==""){
						 $.ui.loadContent("#warehouse_add");
					}else{
						 $.ui.loadContent("#chose_way");
					}
			})
       }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
        
        
     $("#content").on("taphold","img",function(){
  	
			if(confirm("确定删除")){
			
			$(this).parent().children().show();
			$(this).remove();
			$id=$(this).attr("class");
 			$("#"+$id).val("");
				return true;
				}
				return false;
 	 })
    
})	