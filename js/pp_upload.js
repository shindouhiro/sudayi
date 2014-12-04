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
            var id = getItem('u_id');//获取userid
            alert(id);
            var p_principal=$("#p_principal").val();// 获取负责人
            var p_email=$("#p_email").val();//获取邮箱
            var p_iden=$("#p_iden").val();//获取身份证号码
            var p_province=$("#p_province").val();//获取省
            var p_city=$("#p_city").val();//获取市
            var p_area=$("#p_area").val();//获取区
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
           var url2='http://www.29mins.com/mobile_admin/mobile_login/get_account_credit?userid='+id;
           alert(id);
           alert(url2);
           //获取状态值
		   $.get(url2,function(data){
					obj = JSON.parse(data);
					var state_id=obj.state_id;
					var card_img='http://www.29mins.com/'+obj.url.url;
					var url2='http://www.29mins.com/mobile_admin/mobile_login/get_state_name?state_id='+state_id;
					$.get(url2,function(data){
						obj = JSON.parse(data);
						var state_name=obj.name;
						alert(state_name);
						$.ui.loadContent("#audit");
					})
			})
			
				
	})
	 function win(r) {

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




	