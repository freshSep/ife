// splice(position, numberOfItemsToRemove, item)  
// 拼接函数(索引位置, 要删除元素的数量, 元素) 
/*Array.prototype.insert = function (index, item) {  
  this.splice(index, 0, item);  
};*/

var number = document.getElementById('number');
var list = document.getElementById('list');
var sort = document.getElementById('sort');
var show = document.getElementById('show');
//var btnList = document.getElementById('numfield').getElementsByTagName('button');
var wrap = document.getElementById('wrap');
var items = []; //保存队列信息
var sortType = document.getElementById('sortType');

/*
    工具函数
**/
function indexOf(ele,arr){
	var index = -1;
	for (var i = 0; i < arr.length; i++){
		if(ele === arr[i]){
			index = i;
		}
	}
	return index;
}
/*
     插入数字 
**/
function pushList(direction,num) {
	if( items.length == 60){ //限制最大队列数，并返回
		alert('队列元素最多为60个!')
		return false;
	}
	if(direction){
		items.unshift(num);
	}else {
		items.push(num);
	}
	listRender(items);
}
/*
     弹出数字
**/
function popList(direction,idx) {
	//事实上这里应该做一个重载，待优化
	if(items.length) {
		var removedItem = '';

		if( idx!= undefined){
			removedItem = items.splice(idx,1);
		}else if(direction != undefined&& direction!== 0){
			removedItem = direction? items.shift():items.pop();
		}

		listRender(items);
		alert(removedItem);
	}else {
		alert('队列中已经没有元素了!');
	}
}
/*
    渲染当前队列
**/
function listRender(arr) {
	var inner = '';
	for(var i = 0; i < arr.length; i++) {
		//inner += '<li style="height:'+arr[i]+'px"">'+arr[i]+'</li>';
		inner += '<li style="height:'+arr[i]+'px""></li>';
	}
	list.innerHTML = inner;
}
/*******************************************************
 *  排序算法
********************************************************/
/*
    冒泡排序
**/
function bubbleSort(arr) {
	var i,j;
	var temp;
	var flag; //继续循环标志
	for( i = 0; i < (arr.length-1); i++) {
		flag = true;
		for( j = 0; j < (arr.length-1-i) ; j++) {
			if(arr[j] > arr[j+1]) {
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
				flag = false;
			}
		}
		listRender(arr);
		//console.log(arr);
		if(flag){break;}
	}
	return arr;
}
/*
    选择排序
**/
function selectSort(arr) {
	var i, j;
	var k;//待排数据的最小下标
	var temp;
	for(var i = 0; i < (arr.length-1); i++) {
		k = i;
		for(j = i+1; j < arr.length; j++){
			if(arr[j] < arr[k]) {
				k = j; //找到未排序好的队列中最小值的下标
			}
		}
		if(k !=i ) {
			temp = arr[i];
			arr[i] = arr[k];
			arr[k] = temp;//将最小值与未排序队列的第一位交换
			listRender(arr);//只在有交换的时候渲染
			//console.log(arr);
		}
	}
}
/*
    插入排序
**/
function  insertSort(arr) {
	var i, j;
	var k;
	var temp;
	for(i = 1; i < arr.length; i++) { //for(i = 0; i < arr.length-1; i++) {
		k = i ; //插入点
		for( j = i-1; j > -1; j-- ) {
			if(arr[i] <= arr[j]) {
				k = j; //找到应该插入的位置
			}
		}
		if( k != i ){
			temp = arr.splice(i,1);//移除的元素
			arr.splice( k, 0, temp[0]); //插入元素
			listRender(arr); 
			//console.log(arr);
		}
	}
}
/*
    交换排序
**/
function swapSort(arr) {
	var i, j;
	var temp;
	for(var i = 0; i< arr.length-1; i++) {
		//哨岗 遍历时判断arr[k]与后面所有元素的大小，并交换
		for(j = i+1; j<arr.length; j++) {
			if(arr[i] > arr[j]){
				temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
		listRender(arr);
		//console.log(arr);
	}
}
/*
    快速排序 待完成
**/
function fastSort(arr) {
	return arr;
}
// 下一步，将排序函数转换成定时器形式
//
/*
     初始化
**/
function init(){
	

	//为输入框绑定输入限制
	number.addEventListener('keydown',function(event){
		//阻止非数字输入
		if(event.keyCode>57||event.keyCode<48){
			if(event.keyCode!=8)event.preventDefault();
		}
	})

	//事件代理，根据button的class值来判断采用的方法
	wrap.addEventListener('click',function(event){
		var target = event.target;

		if(target.tagName.toLowerCase() == 'button') {
			var classList = target.className.split(' '); //在谷歌浏览器中天然就支持classList，但是这个classList不是数组，所以还是使用className分割成的数组
			var direction = (classList.indexOf('left') == -1)?false:true;

			if(classList.indexOf('pop') != -1) { //弹出
				popList(direction);
			}else if(classList.indexOf('push') != -1) {
				var num = number.value;
				//条件限制
				if(num && num>=10 && num<=100){ //插入
					pushList(direction, num);
					number.value = '';
				}else {
					alert('请输入一个大于10且小于100的数字!')
				}
			}

		}else if(target.tagName.toLowerCase() == 'li') {
			var idx = indexOf(target,list.children);
			popList(0,idx);
		}
	})

	sort.addEventListener('click',function(){
		if(sortType.value){
			switch(sortType.value.toLowerCase()){
				case 'bubble':
					bubbleSort(items);
					break;
				case 'select':
					selectSort(items);
					break;
				case 'insert':
					insertSort(items);
					break;
				case 'swap':
					swapSort(items);
					break;
				default:
					selectSort(items);
			}
		}
	})
}
init();

function getTest(n){
	var test = [];
	for(var i = 0; i<n; i++){
		var a = parseInt(Math.random()*100);
		test.push(a);
	}
	return test;
}
//var a = getTest(5);
//console.log(a);
//bubbleSort(a);
//selectSort(a);
//insertSort(a);
//swapSort(a);