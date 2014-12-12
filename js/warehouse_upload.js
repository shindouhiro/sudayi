	$(document).ready(function(){
			document.addEventListener("deviceready", my6DeviceReadyListener, false);
	});	
	function my6DeviceReadyListener(){
		$('#warehouse_reminder').click(function(){
 			    navigator.camera.getPicture(onSuccess, onFail, { 
				quality: 70,
			    destinationType: Camera.DestinationType.FILE_URL, //以文件地址返回url
			    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
		//	    sourceType:Camera.PictureSourceType.Camera,
//			    mediaType:Camera.MediaType.VIDEO,
			}); 			
 		})
	}
	function onSuccess(imageURI){
		$condition=$(".warehouse_reminders").attr('src');
		if($condition==undefined){
		$width=$("#content").width()/3;
		$img="<img src='"+imageURI+"' width='"+$width+"' height='100' class='warehouse_reminders'/>";
		$(".warehouse_reminder").append($img);
		}else{
			alert("只允许上传一张图片");
		}
	
	    
	}
	
$(function(){
	$("#reminder_submit").click(function(){
		    var imageURI=$(".warehouse_reminders").attr('src');
		    var options = new FileUploadOptions();
            options.fileKey="url";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            var params = {};
            var id = getItem('u_id');//获取userid
            var name=$("#warehouse_name").val();
            var area_id=$("#warehouse_area").val();
            var weektime=$("#week_time").val();
            var weektime2=$("#week_time2").val();
            var daytime=$("#day_time").val();
            var daytime2=$("#day_time2").val();
            var address=$("#warehouse_address").val();
            var firsttime="",
                lasttime="";
            if(weektime){
            	firsttime=weektime;
            	lasttime=weektime2;
            }else{
            	firsttime=daytime;
            	lasttime=daytime2;
            }
            var day="";
           $("#warehouse_detail [type=checkbox]:checked").each(function(){
				day +=$(this).val()+",";
			})
            params.uid=id;
            params.warehouse_name=name;
            params.area_id = area_id;
            params.warehouse_address = address;
            params.first_time=firsttime;
            params.last_time=lasttime;
            params.day=day;
           	options.params = params;

            var ft = new FileTransfer();
             ft.upload(imageURI, encodeURI("http://www.29mins.com/mobile_admin/store_manager/new_store"), win, fail, options);
            
           
	})

		function win(r){
		var name=$("#warehouse_name").val();
			  var url='http://www.29mins.com/mobile_admin/store_manager/get_store_id?warehouse_name='+name;
              //alert(url);
              alert(url);
              $.get(url,function(data){
						obj = JSON.parse(data);
						ware_id=obj.$oid;
						alert(obj.$oid);
						setItem('ware_id',ware_id);
          
				})
			$.ui.loadContent("#warehouse_adding");
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




	