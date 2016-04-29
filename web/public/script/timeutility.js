function secondsToStr (seconds) {
    var string = "";
    
    var years = Math.floor(seconds / 31557000);
    var days = Math.floor((seconds %= 31557000) / 86400);
    var hours = Math.floor((seconds %= 86400) / 3600);
    var minutes = Math.floor((seconds %= 3600) / 60);
    var secs = seconds % 60;
    var chain = false;
    
    function addZeros(nb, limit) {
        var res = limit-1;

        while((nb / 10) >= 1) {
            nb = Math.floor(nb / 10);
            res--;
        }

        if(res>0)
            return '0'.repeat(res);
        else
            return "";
    }
    
    if (years) {
      	string += years += ':';
        chain = true;
    }
    if (chain || days) {
        if(chain)
            string += addZeros(days, 3) + days + ':';
        else
            string += days + ':';

        chain = true;
    }
    if (chain || hours) {
        if(chain)
            string += addZeros(hours, 2) + hours + ':';
        else
      	    string += hours +':';

        chain = true;
    }
    if (chain || minutes) {
        if(chain)
            string += addZeros(minutes, 2) + minutes + ':';
        else
      	    string += minutes + ':';

        chain = true;
    }
    
    if(chain || minutes)
        string += addZeros(secs, 2) + secs;
    else
        string += secs;
    
    return string;
}
