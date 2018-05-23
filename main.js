'use strict';

var utils = require(__dirname + '/lib/utils');
var request = require('request');
var BFX = require('bitfinex-api-node');
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

function call_market_price(cryptoname, exchange, currency, url, partition) {
	request(
		{
			url: url + cryptoname + partition + currency,
			json: true
		}, 
		function(error, response, content) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(JSON.stringify(content));
				var json = JSON.stringify(data);
				var jsonoutput = JSON.parse(JSON.stringify(json));
				var output = eval("(function(){return " + jsonoutput + ";})()");
				if (exchange == 'bitfinex') {
					var ticker = parseFloat(output.last_price);
				}
				if (exchange == 'okex') {
					var ticker = parseFloat(output.ticker.last);
				}
				if (exchange == 'binance') {
					var ticker = parseFloat(output.price);
				}
				ticker = number_format(ticker,2,'.','');
				adapter.setObject('ticker.' + exchange + '.' + cryptoname, {
					type: 'state',
					common: {
						name: cryptoname + '_' + exchange,
						type: 'string',
						role: 'variable'
					},
					native: {}
				});
				//adapter.log.info(cryptoname + '_' + exchange + ': ' + ticker);	
				adapter.setState('ticker.' + exchange + '.' + cryptoname, {val: ticker, ack: true});
			} else {
				adapter.log.error(error);
			}
		}
	);
}

function call_wallet(cryptoname, wallet_adress, url, divide, jsonformat, urlsuffix, suffix) {
	const options = {
		url: url + wallet_adress + urlsuffix,
		json: jsonformat
	}
	request(options, (error, response, content) => {
		if (!error && response.statusCode == 200) {
			if (jsonformat == true && cryptoname != 'xrp') {
				var data = JSON.parse(JSON.stringify(content));
				var json = JSON.stringify(data);
				var jsonoutput = JSON.parse(JSON.stringify(json));
				var output = eval("(function(){return " + jsonoutput + ";})()");
				if (suffix == 'result') {
					var balance = parseFloat(output.result);
				}
				if (suffix == 'balance') {
					var balance = parseFloat(output.balance);
				}
				if (divide == 0) {
					var balance = number_format(balance,8,'.','');
				} else {
					var balance = number_format(balance / divide,8,'.','');
				}
			} else {
				if (cryptoname == 'xrp') {
					var obj = content.balances[0];
					var balance = number_format(obj.value,8,'.','');
				} else {
					if (divide == 0) {
						var balance = number_format(content,8,'.','');
					} else {
						var balance = number_format(content / divide,8,'.','');
					}
				}
			}
			adapter.setObject('wallet.' + cryptoname, {
				type: 'state',
				common: {
					name: wallet_adress,
					type: 'string',
					role: 'variable'
				},
				native: {}
			});
			//adapter.log.info(cryptoname + '_wallet (' + wallet_adress + '): ' + balance);
			adapter.setState('wallet.' + cryptoname, {val: balance, ack: true});
		} else {
			adapter.log.error(error);
		}
	});
}

function main() {

	//exchange
	if (adapter.config.bitfinex_exchange == true) {
		const API_KEY = adapter.config.bitfinex_exchange_api;
		const API_SECRET = adapter.config.bitfinex_exchange_apisecret;
		var bfxRest = new BFX(API_KEY, API_SECRET, {version: 1}).rest;
		bfxRest.wallet_balances((err, js) => {
			for (var i in js) {
				if (JSON.stringify(js[i].amount) != '"0.0"') {
					var type = JSON.stringify(js[i].type).replace(/"/g, '');;
					var currency = JSON.stringify(js[i].currency).replace(/"/g, '');;
					var amount = JSON.stringify(js[i].amount).replace(/"/g, '');;

					adapter.setObject('exchange.bitfinex.' + type + '_' + currency, {
						type: 'state',
						common: {
							name: type + '_' + currency,
							type: 'string',
							role: 'variable'
						},
						native: {}
					});
					//adapter.log.info(type + ' - ' + currency + ' - ' + amount);
					adapter.setState('exchange.bitfinex.' + type + '_' + currency, {val: amount, ack: true});
				}
			}
		});
	}
	
	// Ticker
	if (adapter.config.bitfinex == true) {
		var url = "https://api.bitfinex.com/v1/pubticker/";
		if (adapter.config.btc_bitfinex == true) {
			call_market_price( 'btc', 'bitfinex', 'usd', url, '');
		}
		if (adapter.config.eth_bitfinex == true) {
			call_market_price( 'eth', 'bitfinex', 'usd', url, '');
		}
		if (adapter.config.ltc_bitfinex == true) {
			call_market_price( 'ltc', 'bitfinex', 'usd', url, '');
		}
		if (adapter.config.bch_bitfinex == true) {
			call_market_price( 'bch', 'bitfinex', 'usd', url, '');
		}
		if (adapter.config.xrp_bitfinex == true) {
			call_market_price( 'xrp', 'bitfinex', 'usd', url, '');
		}
		if (adapter.config.eos_bitfinex == true) {
			call_market_price( 'eos', 'bitfinex', 'usd', url, '');
		}
		if (adapter.config.xlm_bitfinex == true) {
			call_market_price( 'xlm', 'bitfinex', 'usd', url, '');
		}
		if (adapter.config.iota_bitfinex == true) {
			call_market_price( 'iot', 'bitfinex', 'usd', url, '');
		}
		if (adapter.config.neo_bitfinex == true) {
			call_market_price( 'neo', 'bitfinex', 'usd', url, '');
		}
		if (adapter.config.xmr_bitfinex == true) {
			call_market_price( 'xmr', 'bitfinex', 'usd', url, '');
		}
		if (adapter.config.dsh_bitfinex == true) {
			call_market_price( 'dsh', 'bitfinex', 'usd', url, '');
		}
		if (adapter.config.etc_bitfinex == true) {
			call_market_price( 'etc', 'bitfinex', 'usd', url, '');
		}
	}

	if (adapter.config.okex == true) {
		var url = "https://www.okex.com/api/v1/ticker.do?symbol=";
		if (adapter.config.btc_okex == true) {
			call_market_price( 'btc', 'okex', 'usdt', url, '_');
		}
		if (adapter.config.eth_okex == true) {
			call_market_price( 'eth', 'okex', 'usdt', url, '_');
		}
		if (adapter.config.ltc_okex == true) {
			call_market_price( 'ltc', 'okex', 'usdt', url, '_');
		}
		if (adapter.config.bch_okex == true) {
			call_market_price( 'bch', 'okex', 'usdt', url, '_');
		}
		if (adapter.config.xrp_okex == true) {
			call_market_price( 'xrp', 'okex', 'usdt', url, '_');
		}
		if (adapter.config.eos_okex == true) {
			call_market_price( 'eos', 'okex', 'usdt', url, '_');
		}
		if (adapter.config.true_okex == true) {
			call_market_price( 'true', 'okex', 'usdt', url, '_');
		}
		if (adapter.config.trx_okex == true) {
			call_market_price( 'trx', 'okex', 'usdt', url, '_');
		}
		if (adapter.config.etc_okex == true) {
			call_market_price( 'etc', 'okex', 'usdt', url, '_');
		}
		if (adapter.config.ont_okex == true) {
			call_market_price( 'ont', 'okex', 'usdt', url, '_');
		}
		if (adapter.config.qtum_okex == true) {
			call_market_price( 'qtum', 'okex', 'usdt', url, '_');
		}
		if (adapter.config.iota_okex == true) {
			call_market_price( 'iota', 'okex', 'usdt', url, '_');
		}
	}	

	if (adapter.config.binance == true) {
		var url = "https://api.binance.com/api/v3/ticker/price?symbol=";
		if (adapter.config.btc_binance == true) {
			call_market_price( 'BTC', 'binance', 'USDT', url, '');
		}
		if (adapter.config.eth_binance == true) {
			call_market_price( 'ETH', 'binance', 'USDT', url, '');
		}
		if (adapter.config.ltc_binance == true) {
			call_market_price( 'LTC', 'binance', 'USDT', url, '');
		}
		if (adapter.config.bcc_binance == true) {
			call_market_price( 'BCC', 'binance', 'USDT', url, '');
		}
		if (adapter.config.xrp_binance == true) {
			call_market_price( 'XRP', 'binance', 'USDT', url, '');
		}
		if (adapter.config.qtum_binance == true) {
			call_market_price( 'QTUM', 'binance', 'USDT', url, '');
		}
		if (adapter.config.neo_binance == true) {
			call_market_price( 'NEO', 'binance', 'USDT', url, '');
		}
		if (adapter.config.bnb_binance == true) {
			call_market_price( 'BNB', 'binance', 'USDT', url, '');
		}
		if (adapter.config.ada_binance == true) {
			call_market_price( 'ADA', 'binance', 'USDT', url, '');
		}
	}	
	
	// Wallet
	if (adapter.config.btc_wallet == true) {
		if (adapter.config.btc_wallet_adress != null) {
			call_wallet('btc', adapter.config.btc_wallet_adress, 'https://blockchain.info/q/addressbalance/', 100000000, false, '', '')
		}
	}
	if (adapter.config.eth_wallet == true) {
		if (adapter.config.eth_wallet_adress != null) {
			call_wallet('eth', adapter.config.eth_wallet_adress, 'https://api.etherscan.io/api?module=account&action=balance&address=', 1000000000000000000, true, '', 'result')
		}
	}
	if (adapter.config.ltc_wallet == true) {
		if (adapter.config.ltc_wallet_adress != null) {
			call_wallet('ltc', adapter.config.ltc_wallet_adress, 'https://api.blockcypher.com/v1/ltc/main/addrs/', 100000000, true, '/balance', 'balance')
		}
	}
	if (adapter.config.bch_wallet == true) {
		if (adapter.config.bch_wallet_adress != null) {
			call_wallet('bch', adapter.config.bch_wallet_adress, 'https://cashexplorer.bitcoin.com/api/addr/', 100000000, false, '/balance', '')
		}
	}
	if (adapter.config.xrp_wallet == true) {
		if (adapter.config.xrp_wallet_adress != null) {
			call_wallet('xrp', adapter.config.xrp_wallet_adress, 'https://data.ripple.com/v2/accounts/', 0, true, '/balances', '')
		}
	}
	
	setTimeout(function () {
		adapter.stop();
	}, 40000);
}
