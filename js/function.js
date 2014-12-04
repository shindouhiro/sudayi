function getArray(url){
		$.get(url,function(data){
			obj = JSON.parse(data);
		})
		return obj
}
