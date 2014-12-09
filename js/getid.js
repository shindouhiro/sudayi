function getid(id,j){
	$("#"+id).change(function(){
		var id=$(this).val();
		$.get('http://www.29mins.com/product_uploader/get_nodes?cate_id='+id+'',function(data){
			var obj = JSON.parse(data);
			var str = "";
			if(obj==0){
				return false;
			}else{
				var select_id='add'+j;
				str+= '<select id='+select_id+'>';
				str+='<option >请选择</option>';
				for(var i=0;i<obj.length;i++){
					str+= '<option value='+obj[i]['_id']+'>'+obj[i]['name']+'</option>';
				}
				str+='</select>';
				$("#pic_type").append(str);
				j++;
				getid(''+select_id,j);
			}
			
		})
	})
}