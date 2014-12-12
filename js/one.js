$(function(){

		$("#one").change(function(){
			$val=$('#one option:selected').text();
			if($val=='每日'){
				$('.one_week').hide();
				$('.one_day').show();
			}else if($val=='每周'){
				$('.one_day').hide();
				$('.one_week').show();
			}else{
				$('.one_week ,.one_day').hide();
			}
		})
	})