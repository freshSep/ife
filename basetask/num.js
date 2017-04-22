function fn(n){
    if(n&&isNaN(parseInt(n))&&n>0){
        console.log('not a number');
        return [];//返回一个空数组
    }
    var rs =[];
    var i = 0;
    do {
    	var item = getRandom();
    	if(rs.indexOf(item) == -1){
    		rs.push(item);
    		i++;
    	}
    }while( i< n );

    return rs;
}
    function getRandom() {
    	return parseInt(Math.random()*30)+2;
    }