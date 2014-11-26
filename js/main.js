$(function(){

	//Add submit handler for the deliveryInfo(form)
	$('.insertDelivery .deliveryForm').submit(function(){
		var deliveryInfo = {};
		//Here 'this' is the <form>
		$(this).find('input').not("input[type='submit']").each(function(){
			//Here 'this' is the each input on <form>
			deliveryInfo[this.name] = $(this).val();
		});
		//Just to controll it is working
		//console.log('deliveryInfo: ', deliveryInfo);

		$.ajax({
			url:"libs/sql-ajax-json.php",
			dataType:"json",

			data:{
				sql:"sql/SQL-queries.sql",
				run:"save deliveryInfo to db-dilivery",
				//data to send
				//coming soon :) ...
			},

			seccess: function(){},

			error: function(){}

		});


		return false;
	});

});