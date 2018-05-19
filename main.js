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
	var btc_wallet = adapter.config.btc_wallet;
	var btc_wallet_adress = adapter.config.btc_wallet_adress;
	var eth_wallet = adapter.config.eth_wallet;
	var eth_wallet_adress = adapter.config.eth_wallet_adress;
	var ltc_wallet = adapter.config.ltc_wallet;
	var ltc_wallet_adress = adapter.config.ltc_wallet_adress;
	var bch_wallet = adapter.config.bch_wallet;
	var bch_wallet_adress = adapter.config.bch_wallet_adress;
	var xrp_wallet = adapter.config.xrp_wallet;
	var xrp_wallet_adress = adapter.config.xrp_wallet_adress;
	
	// Ticker
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
					var data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					var jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('ticker.' + exchange + '.btc', {
						type: 'state',
						common: {
							name: 'btc_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('btc_' + exchange + ': ' + ticker);	
					adapter.setState('ticker.' + exchange + '.btc', {val: ticker, ack: true});
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
					var data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					var jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('ticker.' + exchange + '.eth', {
						type: 'state',
						common: {
							name: 'eth_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('eth_' + exchange + ': ' + ticker);	
					adapter.setState('ticker.' + exchange + '.eth', {val: ticker, ack: true});
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
					var data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					var jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('ticker.' + exchange + '.ltc', {
						type: 'state',
						common: {
							name: 'ltc_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('ltc_' + exchange + ': ' + ticker);	
					adapter.setState('ticker.' + exchange + '.ltc', {val: ticker, ack: true});
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
					var data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					var jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('ticker.' + exchange + '.bch', {
						type: 'state',
						common: {
							name: 'bch_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('bch_' + exchange + ': ' + ticker);	
					adapter.setState('ticker.' + exchange + '.bch', {val: ticker, ack: true});
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
					var data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					var jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('ticker.' + exchange + '.xrp', {
						type: 'state',
						common: {
							name: 'xrp_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('xrp_' + exchange + ': ' + ticker);	
					adapter.setState('ticker.' + exchange + '.xrp', {val: ticker, ack: true});
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
					var data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					var jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('ticker.' + exchange + '.eos', {
						type: 'state',
						common: {
							name: 'eos_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('eos_' + exchange + ': ' + ticker);	
					adapter.setState('ticker.' + exchange + '.eos', {val: ticker, ack: true});
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
					var data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					var jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('ticker.' + exchange + '.xlm', {
						type: 'state',
						common: {
							name: 'xlm_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('xlm_' + exchange + ': ' + ticker);	
					adapter.setState('ticker.' + exchange + '.xlm', {val: ticker, ack: true});
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
					var data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					var jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('ticker.' + exchange + '.miota', {
						type: 'state',
						common: {
							name: 'miota_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('miota_' + exchange + ': ' + ticker);	
					adapter.setState('ticker.' + exchange + '.miota', {val: ticker, ack: true});
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
					var data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					var jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('ticker.' + exchange + '.neo', {
						type: 'state',
						common: {
							name: 'neo_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('neo_' + exchange + ': ' + ticker);	
					adapter.setState('ticker.' + exchange + '.neo', {val: ticker, ack: true});
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
					var data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					var jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var ticker = parseFloat(output.last_price);
					ticker = number_format(ticker,2,'.','');
					adapter.setObject('ticker.' + exchange + '.xmr', {
						type: 'state',
						common: {
							name: 'xmr_' + exchange,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('xmr_' + exchange + ': ' + ticker);	
					adapter.setState('ticker.' + exchange + '.xmr', {val: ticker, ack: true});
				} else {
					adapter.log.error(error);
				}
			}
		);
	}
	
	// Wallet
	if (btc_wallet == true) {
		if (btc_wallet_adress != null) {
			const options = {
				url: 'https://blockchain.info/q/addressbalance/' + btc_wallet_adress,
				json: false
			}
			request(options, (error, response, content) => {
				if (!error && response.statusCode == 200) {
					var balance = number_format(content / 100000000,8,'.','');
					adapter.setObject('wallet.btc', {
						type: 'state',
						common: {
							name: btc_wallet_adress,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('btc_wallet (' + btc_wallet_adress + '): ' + balance);
					adapter.setState('wallet.btc', {val: balance, ack: true});
				} else {
					adapter.log.error(error);
				}
			});
		}
	}
	if (eth_wallet == true) {
		if (eth_wallet_adress != null) {
			const options = {
				url: 'https://api.etherscan.io/api?module=account&action=balance&address=' + eth_wallet_adress,
				json: true
			}
			request.post(options, (error, response, content) => {
				if (!error && response.statusCode == 200) {
					var data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					var jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var balance = parseFloat(output.result);
					var balance = number_format(balance / 1000000000000000000,8,'.','');
					adapter.setObject('wallet.eth', {
						type: 'state',
						common: {
							name: eth_wallet_adress,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('eth_wallet (' + eth_wallet_adress + '): ' + balance);
					adapter.setState('wallet.eth', {val: balance, ack: true});
				} else {
					adapter.log.error(error);
				}
			});
		}
	}
	
	if (ltc_wallet == true) {
		if (ltc_wallet_adress != null) {
			const options = {
				url: 'https://api.blockcypher.com/v1/ltc/main/addrs/' + ltc_wallet_adress + '/balance',
				json: true
			}
			request(options, (error, response, content) => {
				if (!error && response.statusCode == 200) {
					var data = JSON.parse(JSON.stringify(content));
					var json = JSON.stringify(data);
					var jsonoutput = JSON.parse(JSON.stringify(json));
					var output = eval("(function(){return " + jsonoutput + ";})()");
					var balance = parseFloat(output.balance);
					var balance = number_format(balance / 100000000,8,'.','');
					adapter.setObject('wallet.ltc', {
						type: 'state',
						common: {
							name: ltc_wallet_adress,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('ltc_wallet (' + ltc_wallet_adress + '): ' + balance);
					adapter.setState('wallet.ltc', {val: balance, ack: true});
				} else {
					adapter.log.error(error);
				}
			});
		}
	}
	
	if (bch_wallet == true) {
		if (bch_wallet_adress != null) {
			const options = {
				url: 'https://cashexplorer.bitcoin.com/api/addr/' + bch_wallet_adress + '/balance',
				json: false
			}
			request(options, (error, response, content) => {
				if (!error && response.statusCode == 200) {
					var balance = number_format(content / 100000000,8,'.','');
					adapter.setObject('wallet.bch', {
						type: 'state',
						common: {
							name: bch_wallet_adress,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('bch_wallet (' + bch_wallet_adress + '): ' + balance);
					adapter.setState('wallet.bch', {val: balance, ack: true});
				} else {
					adapter.log.error(error);
				}
			});
		}
	}
	
	if (xrp_wallet == true) {
		if (xrp_wallet_adress != null) {
			const options = {
				url: 'https://data.ripple.com/v2/accounts/' + xrp_wallet_adress + '/balances',
				json: true
			}
			request(options, (error, response, content) => {
				if (!error && response.statusCode == 200) {
					var obj = content.balances[0];
					var balance = number_format(obj.value,8,'.','');
					adapter.setObject('wallet.xrp', {
						type: 'state',
						common: {
							name: xrp_wallet_adress,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					adapter.log.info('xrp_wallet (' + xrp_wallet_adress + '): ' + balance);
					adapter.setState('wallet.xrp', {val: balance, ack: true});
				} else {
					adapter.log.error(error);
				}
			});
		}
	}
	
	
	setTimeout(function () {
		adapter.stop();
	}, 40000);
}
