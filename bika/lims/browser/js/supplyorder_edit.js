(function($) {

	$(function () {

		var parent, totalsTd, subtotalTd, vatTotalTd, totalTd;

		parent = $('#supplyorder_edit');

		totalTds = $('tr.totals td:nth-child(2)', parent);
		subtotalTd = totalTds.eq(0);
		vatTotalTd = totalTds.eq(1);
		totalTd = totalTds.eq(2);

		$('input[name*=product]', parent).change(function (e) {
			var el, subtotal, vatTotal;
			el = $(e.target);
			subtotal = 0;
			vatTotal = 0;
			row = el.closest('tr');
			price = parseFloat(row.children().eq(4).text());
			quantity = parseFloat(el.val());
			total = price * quantity;
			row.children().eq(7).text(total.toFixed(2));
			// Add up the totals for all the items
			table = row.closest('table');
			$('tr td:nth-child(8)', table).each(function () {
				var el, price, vat;
				el = $(this);
				price = parseFloat(el.text()),
				vat = parseFloat(el.siblings('td:nth-child(6)').text());
				subtotal += price;
				vatTotal += (price / 100) * vat;
			});
			subtotalTd.text(subtotal.toFixed(2));
			vatTotalTd.text(vatTotal.toFixed(2));
			totalTd.text((subtotal + vatTotal).toFixed(2));
		});

	});

})(jQuery);
