	$(document).ready(function(){
			document.addEventListener("deviceready", my3DeviceReadyListener, false);
	});
	
	function my3DeviceReadyListener(){
		$('#adv').click(function(){
 			navigator.camera.getPicture(onSuccess1, onFail, { 
 				quality: 70,
			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
			    //sourceType:Camera.PictureSourceType.Camera,
			    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
			   // mediaType:Camera.MediaType.VIDEO,
			}); 			
 		})
 		$('#cover').click(function(){
 			navigator.camera.getPicture(onSuccess2, onFail, { 
 				quality: 70,
			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
			    sourceType:Camera.PictureSourceType.Camera,
			    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
			   // mediaType:Camera.MediaType.VIDEO,
			}); 			
 		})
 		
 		$("#detail").click(function(){
	 		navigator.camera.getPicture(onSuccess3, onFail, { 
	 				quality: 70,
				    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
				    sourceType:Camera.PictureSourceType.Camera,
				    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
				   // mediaType:Camera.MediaType.VIDEO,
				}); 	
 		})
	}
	function onSuccess1(imageURI){
		$condition=$(".advs").attr('src');
		if($condition==undefined){
		$width=$("#content").width();
		$img="<img src='"+imageURI+"' width='"+$width+"' height='100' class='advs'/>";
		$(".adv").append($img);
		}else{
			alert("只允许上传一张图片");
		}
		
	}
	
	function onSuccess2(imageURI){
		$condition=$(".covers").attr('src');
		if($condition==undefined){
		$width=$("#content").width();
		$img="<img src='"+imageURI+"' width='"+$width+"' height='100' class='covers'/>";
		$(".cover").append($img);
		}else{
			alert("只允许上传一张图片");
		}	
	}
	
	function onSuccess3(imageURI){
		$width=$("#content").width();
		$img="<img src='"+imageURI+"' width='"+$width+"' height='100' class='details'/>";
		$(".detail").append($img);
		
	}
	function onFail(message) {
	    alert('请重新选择');
	}
	
	
$(function(){
	$("#loading_submit").click(function(){
			var url='http://www.29mins.com/product_uploader';
				$.get(url,function(data){
					var obj = JSON.parse(data);
					var adv_id=obj._id;
					var imageURI=$(".advs").attr('src');
				    var options = new FileUploadOptions();
		            options.fileKey="adv_url";
		            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
		            options.mimeType="image/jpeg";
		            var params = {};
		            params.product_id=adv_id;
		            options.params = params;
		            var ft = new FileTransfer();
		            ft.upload(imageURI, encodeURI("http://www.29mins.com/product_uploader/get_adv"), win, fail, options);
				})
	})
	 function win(r) {
			alert("上传成功");
       }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
        
        
     $("#loading_area").on("longTap","img",function(){
  	
			if(confirm("确定删除")){
			$(this).remove();
				return true;
				}
				return false;


 		
 	 })
    
})	