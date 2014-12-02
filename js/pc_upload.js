	$(document).ready(function(){
			document.addEventListener("deviceready", myDeviceReadyListener, false);
	});	
	function myDeviceReadyListener(){
		$('#pc_iden').click(function(){
 			navigator.camera.getPicture(onSuccess1, onFail, { 
				quality: 70,
			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
			    sourceType:Camera.PictureSourceType.Camera,
			   //  sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
			   // mediaType:Camera.MediaType.VIDEO,
			}); 			
 		})
 		$('#pc_off').click(function(){
 			navigator.camera.getPicture(onSuccess2, onFail, { 
 				quality: 70,
			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
			    // sourceType:Camera.PictureSourceType.Camera,
			    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
			   // mediaType:Camera.MediaType.VIDEO,
			}); 			
 		})
 	
	}
	function onSuccess1(imageURI){
		$condition=$("#pc_idens").val();
		if($condition==""){
		$width=$("#content").width();
		$img="<img src='"+imageURI+"' width='"+$width+"' height='100' class='pc_idens'/>";
		$(".pc_iden").append($img);
		$("#pc_idens").val(imageURI);
		}else{
			alert("只允许上传一张图片");
		}
	
	    
	}
	
	function onSuccess2(imageURI){	
		$condition=$("#pc_offs").val();
		if($condition==""){
		$width=$("#content").width();
		$img="<img src='"+imageURI+"' width='"+$width+"' height='100' class='pc_offs'/>";
		$(".pc_off").append($img);
		$("#pc_offs").val(imageURI);
		}else{
			alert("只允许上传一张图片");
		}
	}
	function onFail(message) {
	    alert('请重新选择');
	}
$(function(){
	$("#pc_submit").click(function(){
		
		var imageURI=$("#pc_idens").val();
		 var options = new FileUploadOptions();
          options.fileKey="file";
           options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
           options.mimeType="image/jpeg";
            var params = {};
            params.name = "iden";
           options.params = params;

           var ft = new FileTransfer();
           ft.upload(imageURI, encodeURI("http://yongxinghua.is-great.net/upload.php"), win, fail, options);
           
           var imageURI=$("#pc_offs").val();
            var options = new FileUploadOptions();
          options.fileKey="file";
           options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
           options.fileName+='.jpg';
           options.mimeType="image/jpeg";
            var params = {};
            params.name = "off";
           options.params = params;

           var ft = new FileTransfer();
           ft.upload(imageURI, encodeURI("http://yongxinghua.is-great.net/upload.php"), win, fail, options);
          
	})
	 function win(r) {
			alert("上传成功");
       }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
        
        
     $("#content").on("longTap","img",function(){
  	
			if(confirm("确定删除")){
			$(this).remove();
			$id=$(this).attr("class");
 			$("#"+$id).val("");
				return true;
				}
				return false;


 		
 	 })
    
})	




	