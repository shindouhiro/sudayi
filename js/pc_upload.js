	$(document).ready(function(){
			document.addEventListener("deviceready", my2DeviceReadyListener, false);
	});	
	function my2DeviceReadyListener(){
		$('#pc_iden').click(function(){
 			    navigator.camera.getPicture(onSuccess, onFail, { 
				quality: 70,
			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
			    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
		//	    sourceType:Camera.PictureSourceType.Camera,
//			    mediaType:Camera.MediaType.VIDEO,
			}); 			
 		})
 		$('#pc_off').click(function(){
 			    navigator.camera.getPicture(onSuccess2, onFail, { 
 				quality: 70,
			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
		//	    sourceType:Camera.PictureSourceType.Camera,
			    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
		//	    mediaType:Camera.MediaType.VIDEO,
			}); 			
 		})
 	
	}
	function onSuccess(imageURI){
		$condition=$(".pc_idens").attr('src');
		if($condition==undefined){
		$width=$("#content").width();
		$img="<img src='"+imageURI+"' width='"+$width+"' height='100' class='pc_idens'/>";
		$(".pc_iden").append($img);
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
		}else{
			alert("只允许上传一张图片");
		}
	}
	function onFail(message) {
	    alert('请重新选择');
	}
$(function(){
	$("#pc_submit").click(function(){
		
		    var imageURI=$(".pc_idens").attr('src');
		    var options = new FileUploadOptions();
            options.fileKey="url";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            var params = {};
            var id = getItem('u_id');//获取userid
            var p_principal=$("#c_principal").val();// 获取负责人
            var p_email=$("#c_email").val();//获取邮箱
            var p_iden=$("#c_iden").val();//获取身份证号码
            var p_type=$("#c_type").val();//获取公司类型
            var p_province=$("#c_province").val();//获取省
            var p_city=$("#c_city").val();//获取市
            var p_area=$("#c_area").val();//获取区
            params.userid = id;
            params.p_principal= p_principal;
            params.p_email= p_email;
            params.p_iden=p_iden;
            params.p_type=p_type;
            params.p_province=p_province;
            params.p_city=p_city;
            params.p_area=p_area;
           	options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("http://www.29mins.com/mobile_admin/mobile_login/update_account_url"), win, fail, options);
            
           
	})
	 function win(r) {
	 		  var id = getItem('u_id');
			  var url='http://www.29mins.com/mobile_admin/mobile_login/get_account_credit?userid='+id;
              //alert(url);
              $.get(url,function(data){
						obj = JSON.parse(data);
						var info_id=obj._id;
						alert(info_id);
						var imageURI=$(".pc_offs").attr('src');
						alert(213);
						alert(imageURI);
						var options = new FileUploadOptions();
			            options.fileKey="url2";
			            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
			            options.mimeType="image/jpeg";
			            var params = {};
			            params.credit_info_id=info_id;
			            options.params = params;
			            var ft = new FileTransfer();
						ft.upload(imageURI, encodeURI("http://www.29mins.com/mobile_admin/mobile_login/insert_url2_to_account_info"), win2, fail, options);
          
				})
       }
		
		function win2(r){
		    alert("上传成功！");
		}
        function fail(error) {
            alert("上传失败！");
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




	