	$(document).ready(function(){
			document.addEventListener("deviceready", myDeviceReadyListener, false);
	});	
	function myDeviceReadyListener(){
		$('#pp_iden').click(function(){
 			navigator.camera.getPicture(onSuccess1, onFail, { 
				quality: 70,
			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
			    // sourceType:Camera.PictureSourceType.Camera,
			    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
			   // mediaType:Camera.MediaType.VIDEO,
			}); 			
 		})
	}
	function onSuccess1(imageURI){
		$condition=$("#pp_idens").val();
		if($condition==""){
		$width=$("#content").width();
		$img="<img src='"+imageURI+"' width='"+$width+"' height='100' class='pp_idens'/>";
		$(".pp_iden").append($img);
		$("#pp_idens").val(imageURI);
		}else{
			alert("只允许上传一张图片");
		}
	
	    
	}
	
	function onFail(message) {
	    alert('请重新选择');
	}
$(function(){
	$("#pp_submit").click(function(){
		
		var imageURI=$("#pp_idens").val();
		 var options = new FileUploadOptions();
          options.fileKey="url";
           options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
           options.mimeType="image/jpeg";
            var params = {};
            var id = getItem('u_id');
            var p_principal=$("#p_principal").val();
            var p_email=$("#p_email").val();
            var p_iden=$("#p_iden").val();
            var p_province=$("#p_province").val();
            var p_city=$("#p_city").val();
            var p_area=$("#p_area").val();
            alert(id);
            alert(p_principal);
            params.userid = id;
            params.p_principal= p_principal;
            params.p_email= p_email;
            params.p_iden=p_iden;
            params.p_province=p_province;
            params.p_city=p_city;
            params.p_area=p_area;
           	options.params = params;
           var ft = new FileTransfer();
           ft.upload(imageURI, encodeURI("http://www.29mins.com/mobile_admin/mobile_login/update_account_url"), win, fail, options);
	})
	 function win(r) {
	 	alert(r.name);
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




	