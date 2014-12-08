	$(document).ready(function(){
			document.addEventListener("deviceready", myDeviceReadyListener, false);
	});	
	function myDeviceReadyListener(){
		$('#pp_iden').click(function(){
		alert(123);
 			//navigator.camera.getPicture(onSuccess1, onFail, { 
//				quality: 70,
//			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
//			    // sourceType:Camera.PictureSourceType.Camera,
//			    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
//			   // mediaType:Camera.MediaType.VIDEO,
//			}); 			
 		})
	}
	function onSuccess1(imageURI){
		$condition=$(".pp_idens").attr('src');
		if($condition==undefined){
		$width=$("#content").width();
		$img="<img src='"+imageURI+"' width='"+$width+"' height='100' class='pp_idens'/>";
		$(".pp_iden").append($img);
		alert($img);
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
		
		var imageURI=$(".pp_idens").attr('src')
		 var options = new FileUploadOptions();
          options.fileKey="url";
           options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
           options.mimeType="image/jpeg";
            var params = {};
            var id = getItem('u_id');//获取userid
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
          // var url2='http://www.29mins.com/mobile_admin/mobile_login/get_account_credit?userid='+id;
        
           //获取状态值
		  var url='http://www.29mins.com/mobile_admin/mobile_login/get_account_credit?userid='+id;
				// alert(url);
				$.get(url,function(data){
					 obj = JSON.parse(data);
					var province_id=obj.province_id;
					var city_id=obj.city_id;
					var area_id=obj.area_id;
					var state_id=obj.state_id;
					var card_id=obj.card_id;
					var name=obj.name;
					var email=obj.email;
					var card_img='http://www.29mins.com/'+obj.url.url;
					var url='http://www.29mins.com/mobile_admin/mobile_login/get_province_name?province_id='+province_id; 
					$.get(url,function(data){
						obj = JSON.parse(data);
						var province_name=obj.name;
						setItem('pp_province_name',province_name);
					})
					var url='http://www.29mins.com/mobile_admin/mobile_login/get_city_name?city_id='+city_id;
					$.get(url,function(data){
						obj = JSON.parse(data);
						var city_name=obj.name;
						setItem('pp_city_name',city_name);
					})
					var url='http://www.29mins.com/mobile_admin/mobile_login/get_area_name?area_id='+area_id;
					$.get(url,function(data){
						obj = JSON.parse(data);
						var area_name=obj.name;
						setItem('pp_area_name',area_name);
					})
					var url='http://www.29mins.com/mobile_admin/mobile_login/get_state_name?state_id='+state_id;
					$.get(url,function(data){
						obj = JSON.parse(data);
						var state_name=obj.name;
						setItem('pp_state_name',state_name);
					})
			
					var state_name=getItem('pp_state_name');
					var area_name=getItem('pp_area_name');
					var city_name=getItem('pp_city_name');
					var province_name=getItem('pp_province_name');
					// alert(province_name);
					var str="";
					str+='<li>'+state_name+'</li>';
					str+='<li>负责人:'+name+'</li>';
					str+='<li>邮箱:'+email+'</li>';
					str+='<li>身份证:'+card_id+'</li>';
					str+='<li>'+province_name+'省</li>';
					str+='<li>'+city_name+'市</li>';
					str+='<li>'+area_name+'</li>';
					str+='<li><img src="'+card_img+'"/></li>';
					alert(str);
					$("#audi").append(str);
					$.ui.loadContent("#audit");

				})
			
				
	})
	 function win(r) {

       }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
        
        
     $("#provider_personage").on("longTap","img",function(){
			if(confirm("确定删除")){
			$(this).remove();
				return true;
				}else{
				return false;
				}


 		
 	 })
    
})	




	