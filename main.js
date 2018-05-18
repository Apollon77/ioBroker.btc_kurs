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
	var xrp = adapter.config.xrp;
	var eos = adapter.config.eos;
	var xlm = adapter.config.xlm;
	var iot = adapter.config.iot;
	var neo = adapter.config.neo;
	var xmr = adapter.config.xmr;
    
	if (exchange == "bitfinex") {
		var url = "https://api.bitfinex.com/v1/pubticker/";
	}
		
	if (btc == true) {
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
	
	if (xrp == true) {
		request(
			{
				url: url + 'xrpusd',
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
					adapter.setObject('XRP-USD_' + exchange, {
						type: 'state',
						common: {
							name: 'XRP-USD_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('XRP-USD_' + exchange + ': ' + ticker);	
					adapter.setState('XRP-USD_' + exchange, {val: ticker, ack: true});
				} else {
					adapter.log.error(error);
				}
			}
		);
	}
	
	if (eos == true) {
		request(
			{
				url: url + 'eosusd',
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
					adapter.setObject('EOS-USD_' + exchange, {
						type: 'state',
						common: {
							name: 'EOS-USD_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('EOS-USD_' + exchange + ': ' + ticker);	
					adapter.setState('EOS-USD_' + exchange, {val: ticker, ack: true});
				} else {
					adapter.log.error(error);
				}
			}
		);
	}
	
	if (xlm == true) {
		request(
			{
				url: url + 'xlmusd',
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
					adapter.setObject('XLM-USD_' + exchange, {
						type: 'state',
						common: {
							name: 'XLM-USD_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('XLM-USD_' + exchange + ': ' + ticker);	
					adapter.setState('XLM-USD_' + exchange, {val: ticker, ack: true});
				} else {
					adapter.log.error(error);
				}
			}
		);
	}
	
	if (iot == true) {
		request(
			{
				url: url + 'iotusd',
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
					adapter.setObject('MIOTA-USD_' + exchange, {
						type: 'state',
						common: {
							name: 'MIOTA-USD_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('MIOTA-USD_' + exchange + ': ' + ticker);	
					adapter.setState('MIOTA-USD_' + exchange, {val: ticker, ack: true});
				} else {
					adapter.log.error(error);
				}
			}
		);
	}

	if (neo == true) {
		request(
			{
				url: url + 'neousd',
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
					adapter.setObject('NEO-USD_' + exchange, {
						type: 'state',
						common: {
							name: 'NEO-USD_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('NEO-USD_' + exchange + ': ' + ticker);	
					adapter.setState('NEO-USD_' + exchange, {val: ticker, ack: true});
				} else {
					adapter.log.error(error);
				}
			}
		);
	}
	
	if (xmr == true) {
		request(
			{
				url: url + 'xmrusd',
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
					adapter.setObject('XMR-USD_' + exchange, {
						type: 'state',
						common: {
							name: 'XMR-USD_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('XMR-USD_' + exchange + ': ' + ticker);	
					adapter.setState('XMR-USD_' + exchange, {val: ticker, ack: true});
				} else {
					adapter.log.error(error);
				}
			}
		);
	}
	
	setTimeout(function () {
		adapter.stop();
	}, 30000);
}
