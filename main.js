'use strict';

var utils = require(__dirname + '/lib/utils');
var request = require('request');
var adapter = new utils.Adapter('btc_kurs');

adapter.on('ready', function () {
    main();
});

function number_format( number, length, sep, th_sep ) {
	number = Math.round( number * Math.pow(10, length) ) / Math.pow(10, length);
	var str_number = number + "";
	var arr_int = str_number.split(".");
	if(!arr_int[0]) arr_int[0] = "0";
	if(!arr_int[1]) arr_int[1] = "";
	if(arr_int[1].length < length){
		var decimal = arr_int[1];
		for(var i=arr_int[1].length + 1; i <= length; i++){  decimal += "0";  }
		arr_int[1] = decimal;
	}
	if(th_sep !== '' && arr_int[0].length > 3){
		var term = arr_int[0];
		arr_int[0] = "";
		for(var j = 3; j < term.length ; j+=3){
			var extract = term.slice(term.length - j, term.length - j + 3);
			arr_int[0] = th_sep + extract +  arr_int[0] + "";
		}
		var str_first = term.substr(0, (term.length % 3 === 0)?3:(term.length % 3));
		arr_int[0] = str_first + arr_int[0];
	}
	return arr_int[0]+sep+arr_int[1];
}

function main() {
	var exchange = adapter.config.exchange;
	var btc = adapter.config.btc;
	var eth = adapter.config.eth;
	var ltc = adapter.config.ltc;
	var bch = adapter.config.bch;
    
	if (exchange == "bitfinex") {
		var url = "https://api.bitfinex.com/v1/pubticker/";
	}
		
	if (btc == true) {
		adapter.log.warn('Request BTC done');
		request(
			{
				url: url + 'btcusd',
				json: true
			}, 
			function(error, response, content) {
				if (!error && response.statusCode == 200) {
					let data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					let jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('BTC-USD_' + exchange, {
						type: 'state',
						common: {
							name: 'BTC-USD_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('BTC-USD_' + exchange + ': ' + ticker);	
					adapter.setState('BTC-USD_' + exchange, {val: ticker, ack: true});
				} else {
					adapter.log.error(error);
				}
			}
		);
	}
	if (eth == true) {
		adapter.log.warn('Request ETH done');
		request(
			{
				url: url + 'ethusd',
				json: true
			}, 
			function(error, response, content) {
				if (!error && response.statusCode == 200) {
					let data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					let jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('ETH-USD_' + exchange, {
						type: 'state',
						common: {
							name: 'ETH-USD_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('ETH-USD_' + exchange + ': ' + ticker);	
					adapter.setState('ETH-USD_' + exchange, {val: ticker, ack: true});
				} else {
					adapter.log.error(error);
				}
			}
		);
	}

	if (ltc == true) {
		adapter.log.warn('Request LTC done');
		request(
			{
				url: url + 'ltcusd',
				json: true
			}, 
			function(error, response, content) {
				if (!error && response.statusCode == 200) {
					let data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					let jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('LTC-USD_' + exchange, {
						type: 'state',
						common: {
							name: 'LTC-USD_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('LTC-USD_' + exchange + ': ' + ticker);	
					adapter.setState('LTC-USD_' + exchange, {val: ticker, ack: true});
				} else {
					adapter.log.error(error);
				}
			}
		);
	}

	if (bch == true) {
		adapter.log.warn('Request BCH done');
		request(
			{
				url: url + 'bchusd',
				json: true
			}, 
			function(error, response, content) {
				if (!error && response.statusCode == 200) {
					let data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					let jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('BCH-USD_' + exchange, {
						type: 'state',
						common: {
							name: 'BCH-USD_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('BCH-USD_' + exchange + ': ' + ticker);	
					adapter.setState('BCH-USD_' + exchange, {val: ticker, ack: true});
				} else {
					adapter.log.error(error);
				}
			}
		);
	}
	
	setTimeout(function () {
		adapter.stop();
	}, 10000);
}
