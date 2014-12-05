	$(document).ready(function(){
			document.addEventListener("deviceready", myDeviceReadyListener, false);
	});	
	function myDeviceReadyListener(){
		$('#pc_iden').click(function(){
 			navigator.camera.getPicture(onSuccess1, onFail, { 
				quality: 70,
			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
			    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
			    // sourceType:Camera.PictureSourceType.Camera,
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
		$condition=$(".pc_idens").attr('src');
		if($condition==undefined){
		$width=$("#content").width();
		$img="<img src='"+imageURI+"' width='"+$width+"' height='100' class='pc_idens'/>";
		$(".pc_iden").append($img);
		$("#pc_idens").val(imageURI);
		}else{
			alert("只允许上传一张图片");
		}
	
	    
	}
	
	function onSuccess2(imageURI){	
		$condition=$(".pc_offs").attr('src');
		if($condition==undefined){
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
		
		    var imageURI=$(".pp_idens").attr('src');
		    var options = new FileUploadOptions();
            options.fileKey="url";
            var imageURI2=$(".pc_offs").attr('src');
            var options = new FileUploadOptions();
            options.fileKey="url2";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.fileName=imageURI2.substr(imageURI2.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            var params = {};
            var id = getItem('u_id');//获取userid
            alert(id);
            var p_principal=$("#c_principal").val();// 获取负责人
            var p_email=$("#c_email").val();//获取邮箱
            var p_iden=$("#c_iden").val();//获取身份证号码
            var p_type=$("#c_type").val();//获取公司类型
            var p_province=$("#c_province").val();//获取省
            var p_city=$("#c_city").val();//获取市
            var p_area=$("#c_area").val();//获取区
            params.userid = id;
            params.c_principal= c_principal;
            params.c_email= c_email;
            params.c_iden=c_iden;
            params.c_type=c_type;
            params.c_province=c_province;
            params.c_city=c_city;
            params.c_area=c_area;
           	options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://www.29mins.com/mobile_admin/mobile_login/update_account_2url"), win, fail, options);
           
	})
	 function win(r) {
			alert("上传成功");
       }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
        
        
    // $("#content").on("longTap","img",function(){
//  	
//			if(confirm("确定删除")){
//			$(this).remove();
//			$id=$(this).attr("class");
// 			$("#"+$id).val("");
//				return true;
//				}
//				return false;
//
//
// 		
// 	 })
    
})	




	