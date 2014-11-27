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
				sql:"sql/sql-queries.sql",
				run:"register delivery",
				//data to send
				books_isbn: JSON.stringify(deliveryInfo.books_isbn),
				f_price: JSON.stringify(deliveryInfo.f_price),
				date: JSON.stringify(deliveryInfo.date),
				quantity: JSON.stringify(deliveryInfo.quantity)
			},

			success: function(data){},

			error: function(data){}

		});

		$.ajax({
			url:"libs/sql-ajax-json.php",
			dataType:"json",

			data:{
				sql:"sql/sql-queries.sql",
				run:"search for title and quantity by isbn",
			},

			success: function(data){},

			error: function(data){}

		});


		return false;
	});

});