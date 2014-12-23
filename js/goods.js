	$(document).ready(function(){
			document.addEventListener("deviceready", my3DeviceReadyListener, false);
	});
	
	function my3DeviceReadyListener(){
		$('#adv').click(function(){
 			navigator.camera.getPicture(onSuccess_adv, onFail, { 
 				quality: 70,
			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
			    //sourceType:Camera.PictureSourceType.Camera,
			    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
			   // mediaType:Camera.MediaType.VIDEO,
			}); 			
 		})
 		$('#cover').click(function(){
 			navigator.camera.getPicture(onSuccess_cover, onFail, { 
 				quality: 70,
			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
			    sourceType:Camera.PictureSourceType.Camera,
			    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
			   // mediaType:Camera.MediaType.VIDEO,
			}); 			
 		})
 		
 		$("#detail").click(function(){
	 		navigator.camera.getPicture(onSuccess_detail, onFail, { 
	 				quality: 70,
				    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
				    sourceType:Camera.PictureSourceType.Camera,
				    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
				   // mediaType:Camera.MediaType.VIDEO,
				}); 	
 		})
	}
	function onSuccess_adv(imageURI){
		$condition=$(".advs").attr('src');
		if($condition==undefined){
		$width=$("#content").width()/3;
		$img="<img src='"+imageURI+"' width='"+$width+"' height='"+$width+"' class='advs'/>";
		$(".adv").append($img);
		}else{
			alert("只允许上传一张图片");
		}
		
	}
	
	function onSuccess_cover(imageURI){
		$condition=$(".covers").attr('src');
		if($condition==undefined){
		$width=$("#content").width()/3;
		$img="<img src='"+imageURI+"' width='"+$width+"' height='"+$width+"' class='covers'/>";
		$(".cover").append($img);
		}else{
			alert("只允许上传一张图片");
		}	
	}
	
	function onSuccess_detail(imageURI){
		$width=$("#content").width()/3;
		$img="<img src='"+imageURI+"' width='"+$width+"' height='"+$width+"' class='details'/>";
		$(".detail").append($img);
		
	}
	function onFail(message) {
	    // alert('请重新选择');
	}
	
	
$(function(){
	$("#loading_submit").click(function(){
			var url='http://www.29mins.com/product_uploader';
				$.get(url,function(data){
					var obj = JSON.parse(data);
					var adv_id=obj._id;
					setItem('product_id',adv_id);
					var id = getItem('u_id');//获取userid
					var imageURI=$(".advs").attr('src');
					var level=$("#pic_level").text();
					if(level=='A'){
						level=1;
					}else if(level=='B'){
						level=2;
					}else if(level=='C'){
						level=3;
					}else if(level=='D'){
						level=4;
					}
				    var options = new FileUploadOptions();
		            options.fileKey="adv_url";
		            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
		            options.mimeType="image/jpeg";
		            var params = {};
		            params.product_id=adv_id;
		            params.uid=id;
		            
		            options.params = params;
		            var ft = new FileTransfer();
		            ft.upload(imageURI, encodeURI("http://www.29mins.com/product_uploader/create_adv"), win, fail, options);
		            var imageURI2=$(".covers").attr('src');
		            var options = new FileUploadOptions();
		            options.fileKey="cover_url";
		            options.fileName=imageURI2.substr(imageURI2.lastIndexOf('/')+1);
		            options.mimeType="image/jpeg";
		            var params = {};
		            params.product_id=adv_id;
		            params.uid=id;
		            params.level=level;
		            options.params = params;
		            var ft = new FileTransfer();
		            ft.upload(imageURI2, encodeURI("http://www.29mins.com/product_uploader/create_cover"), win, fail, options);
			            $(".details").each(function(){
		            	   var imageURI = $(this).attr("src");
						   var options = new FileUploadOptions();
				           options.fileKey="file";
				           options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
				           options.mimeType="image/jpeg";
				           var params = {};
				           params.product_id=adv_id;
				           params.uid=id;
				           options.params = params;
				           var ft = new FileTransfer();
				           ft.upload(imageURI, encodeURI("http://www.29mins.com/product_uploader/create_details"), win, fail, options);
			            })
			               var product_id=adv_id;
						   var uid=id;
						   var num = $("#loading_area select").length;
						   num = num-1;
						   var val=$("#loading_area select").eq(num).val();
						   var cate_id=val;
						   var good_name=$("#goods_name").val();
						   var description=$("#goods_description").val();
						   var url='http://www.29mins.com/product_uploader/create_other_product_details?cate_id='+cate_id+'&good_name='+good_name+'&description='+description+'&product_id='+product_id+'&uid='+uid;
			             $.get(url,function(data){
			 				var obj = JSON.parse(data);
					 	})
				      
				})
	})
	 function win(r) {
			 $.ui.loadContent("#loading_detail");
						
       }

        function fail(error) {
            // alert("An error has occurred: Code = " + error.code);
            // console.log("upload error source " + error.source);
            // console.log("upload error target " + error.target);
        }
        
        
     $("#loading_area").on("longTap","img",function(){
  	
			if(confirm("确定删除")){
			$(this).remove();
				return true;
				}
				return false;


 		
 	 })
    
})	