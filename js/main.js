$(function(){

	function getShelvesForDropDown() {
		var shelves = {};

		//get shelves and append options to select (drop down list)
		$.ajax({
			url:"libs/sql-ajax-json.php",

			dataType:"json",

			data:{
				sql:"sql/sql-queries.sql",
				run:"get shelves"
			},

			success: function(data){
				var shelvesSelect = $('#shelvesSelect');
				$.each(data, function(val, shelf) {
    				shelvesSelect.append(
        				$('<option></option>').val(shelf.shelf_id).html(shelf.code)
    				);
				});
			},

			error: function(data){
				//console.log("error: ", data);
				//some error handling
			}

		});
	}

	function addAuthor(firstName, lastName) {
		var authorExists = false;
		$.ajax({
			url:"libs/sql-ajax-json.php",

			dataType:"json",

			data:{
				sql:"sql/sql-queries.sql",
				run:"get author id",
				//data to send
				first_name: firstName,
				last_name: lastName
			},

			success: function(data){
				if(data.isbn != null) {
					authorExists = true;
				}	
			},

			error: function(data){
				//console.log("error: ", data);
				//some error handling
			}

		});

		if(!authorExists) {
			//ajax for register delivery (authors)(first_name, last_name)
			//to db/authors
			$.ajax({
				url:"libs/sql-ajax-json.php",

				dataType:"json",

				data:{
					sql:"sql/sql-queries.sql",
					run:"add author",
					//data to send
					first_name: firstName,
					last_name: lastName
				},

				success: function(data){
					//console.log("success: ", data);
					return data.author_id;
				},

				error: function(data){
					//console.log("error: ", data);
					//some error handling
				}

			});
		}
	}


	function registerBook(deliveryInfo, authorId) {
		var bookExists = false;
		$.ajax({
			url:"libs/sql-ajax-json.php",

			dataType:"json",

			data:{
				sql:"sql/sql-queries.sql",
				run:"get isbn",
				isbn: JSON.stringify(deliveryInfo["isbn"])
			},

			success: function(data){
				if(data.isbn != null) {
					bookExists = true;
				}	
			},

			error: function(data){
				//console.log("error: ", data);
				//some error handling
			}

		});

		if(!bookExists) {
			//ajax for register delivery (isbn, title, description)
			//to db/book
			$.ajax({
				url:"libs/sql-ajax-json.php",

				dataType:"json",

				data:{
					sql:"sql/sql-queries.sql",
					run:"register book",
					//data to send
					isbn: JSON.stringify(deliveryInfo["isbn"]),
					title: JSON.stringify(deliveryInfo["title"]),
					description: JSON.stringify(deliveryInfo["description"]),
					author_id: JSON.stringify(deliveryInfo["author_id"]),
					shelf_id: JSON.stringify(deliveryInfo["shelf_id"])
				},

				success: function(data){
					//console.log("success: ", data);
				},

				error: function(data){
					//console.log("error: ", data);
					//some error handling
				}

			});
		}
	}

	function registerDelivery(deliveryInfo) {
		//ajax for register delivery (isbn, f_price, date, quantity)
		//to db/deliveries
		$.ajax({
			url:"libs/sql-ajax-json.php",

			dataType:"json",

			data:{
				sql:"sql/sql-queries.sql",
				run:"register delivery",
				//data to send
				isbn: JSON.stringify(deliveryInfo["isbn"]),
				f_price: JSON.stringify(deliveryInfo["f_price"]),
				date: JSON.stringify(deliveryInfo["date"]),
				quantity: JSON.stringify(deliveryInfo["quantity"])

			},

			success: function(data){
				//console.log("success: ", data);
			},

			error: function(data){
				//console.log("error: ", data);
				//some error handling
			}

		});
	}

	function registerPrice(isbn, fPrice) {
		//Multiplying f-price with 1.8 so it will become price.
		var price = (fPrice * 1.8).toFixed(2);
		//Call an AJAX-call for sending the price 
			$.ajax({
			url:"libs/sql-ajax-json.php",
			dataType:"json",

			data:{
				sql:"sql/sql-queries.sql",
				run:"register price",
				//data to send
				price: fPrice,
				isbn: isbn
			},

			success: function(data){
				//console.log("success: ", data);
			},

			error: function(data){
				//console.log("error: ", data);
				//some error handling
			}
		});
	}

	//When document is ready
	$(document).ready(function(){
		getShelvesForDropDown();
	});

	//Add submit handler for the deliveryInfo(form)
	$('.insertDelivery .deliveryForm').submit(function(){
		var deliveryInfo = {};
		//Here 'this' is the <form>
		//ask HUGO about .not input type=reset
		$(this).find('input').not("input[type='submit'], input[type='reset']").each(function(){
			//Here 'this' is the each input on <form>
			deliveryInfo[this.name] = $(this).val();
		});
		//Just to control it is working
		//console.log('deliveryInfo: ', deliveryInfo);
		
		authorId = addAuthor(JSON.stringify(deliveryInfo["first_name"]), JSON.stringify(deliveryInfo["last_name"]);

		registerBook(deliveryInfo, authorId);

		registerDelivery(deliveryInfo);
		
		registerPrice()

		return false;
	});

});