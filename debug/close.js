module.exports = (closeEvent) => {

switch (closeEvent.code) {
	case 1000:
	 var closeCode = closeEvent.code + " (the connection successfully completed)"
	break;
	case 1001:
	 var closeCode = closeEvent.code + " (endpoint is going away)"
	break;
	case 1002:
	 var closeCode = closeEvent.code + " (protocol error)"
	break;
	case 1003:
	 var closeCode = closeEvent.code + " (received unsupported datatype)"
	break;
	case 1005:
	 var closeCode = "[none]"
	break;
	case 1006:
	 var closeCode = closeEvent.code + " (connection was closed abnormally with no close frame being sent)"
	break;
	case 1007:
	 var closeCode = closeEvent.code + " (invalid frame payload data; a message was received that contained inconsistent data)"
	break;
	case 1008:
	 var closeCode = closeEvent.code + " (received a message with another than the expected form)"
	break;
	case 1009:
	 var closeCode = closeEvent.code + " (message too big; a data frame was received that is too large)"
	break;
	case 1010:
	 var closeCode = closeEvent.code + " (missing extension on the server to handle received data)"
	break;
	case 1011:
	 var closeCode = closeEvent.code + " (internal error; encountered an unexpected condition that prevents from fulfilling the request)"
	break;
	case 1012:
	 var closeCode = closeEvent.code + " (server is terminating the connection because it is restarting)"
	break;
	case 1013:
	 var closeCode = closeEvent.code + " (server is terminating the connection due to a temporary condition/it is overloaded and is casting off some of its clients; try again later)"
	break;
	case 1014:
	 var closeCode = closeEvent.code + " (bad gateway: server received an invalid response from the upstream server while acting as gateway or proxy)"
	break;
	case 1015:
	 var closeCode = closeEvent.code + " (connection was closed due to a failure to perform a TLS handshake; the server certificate can't be verified)"
	break;
	default:
	 if (closeEvent.code > 1000 && closeEvent.code < 2000) {
	 	 var closeCode = closeEvent.code + " (undefined WebSocket error)"
	  	}
	 else if (closeEvent.code > 1999 && closeEvent.code < 3000) {
	 	 var closeCode = closeEvent.code + " (undefined WebSocket extension error)"
	  	}
	 else if (closeEvent.code > 2999 && closeEvent.code < 4000) {
	 	 var closeCode = closeEvent.code + " (undefined library or framework error)"
	  	}
	 else if (closeEvent.code > 3999 && closeEvent.code < 5000) {
	 	 var closeCode = closeEvent.code + " (undefined application error)"
	  	}
	 else {
	  var closeCode = closeEvent.code
	  }
	break;
	}
	
if (closeEvent.reason == null) {
	var cause = " caused by: " + closeEvent.reason
	}
else {
	var cause = ""
	}

if (closeEvent.wasClean) {
		console.log("the client's connection was cleanly closed with the code " + closeCode + cause)
		}
	else {
	 console.log("the client's connection violently terminated with the code " + closeCode + cause)
	 }
	 console.log(" ")
	 
} //module.exports