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

		//ajax for register delivery (isbn, f_price, date, quantity)
		//to db/deliveries
		$.ajax({
			url:"libs/sql-ajax-json.php",
			dataType:"json",

			data:{
				sql:"sql/sql-queries.sql",
				run:"register delivery",
				//data to send
				isbn: JSON.stringify(deliveryInfo.isbn),
				f_price: JSON.stringify(deliveryInfo.f_price),
				date: JSON.stringify(deliveryInfo.date),
				quantity: JSON.stringify(deliveryInfo.quantity)
			},

			success: function(data){},

			error: function(data){}

		});

		//ajax for register (isbn, shelfs_id) to db/book_shelfs
		$.ajax({
			url:"libs/sql-ajax-json.php",
			dataType:"json",

			data:{
				sql:"sql/sql-queries.sql",
				run:"register books shelf",
				//data to send
				isbn: JSON.stringify(deliveryInfo.isbn),
				shelfs_id: JSON.stringify(deliveryInfo.shelfs_id)
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