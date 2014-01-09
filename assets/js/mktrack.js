
var cookiename = 'mktrack';
var bakecookie = new bake_cookie();
function bake_cookie(c_name,value,exdays){
  this.set = function(c_name,value,exdays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
  };
  this.get = function(c_name){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++){
      x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
      y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x=x.replace(/^\s+|\s+$/g,"");
      if (x==c_name){
       return unescape(y);
      }
    }
  };
}

jQuery(function($){
	console.log(bakecookie.get(cookiename));
	saveState();
	$('.sortable').sortable({ 
		handle: '.navbar-inner', 
		connectWith: '.sortable',
		update: function( event, ui ) {
				saveState();
			}	
		});
	$('.thumbnail').equalHeights();
	$('body').on('click','.icon-chevron-up',function(){
		$(this).removeClass('icon-chevron-up').addClass('icon-chevron-down');
		$(this).parents('.thumbnail').animate({'height':'34px'},300,'linear').attr('data-state','closed');
	});
	$('body').on('click','.icon-chevron-down',function(){
		$(this).removeClass('icon-chevron-down').addClass('icon-chevron-up');
		var realHeight = $(this).closest('.thumbnail').data('height');
		$(this).closest('.thumbnail').animate({'height':realHeight},300,'linear').attr('data-state','open');
	});
});
function saveState(){
	var position = new Object();
	$('.thumbnail').each(function(i){
		$this = $(this);
		var whatCol = $this.closest('.row-fluid').attr('column');
		console.log($this.attr('id')+' '+i);
		position[i] = {id:$this.attr('id'),pos:i,state:$this.attr('data-state'),column:whatCol};
	});
	$('body').data('sound-off',position);
	bakecookie.set(cookiename,JSON.stringify(position),364);
}

$.fn.equalHeights = function(addheight){
  var div = $(this);
  var divHeight = 0;
  $(div).each(function(){
    if($(this).height() > divHeight){
      divHeight = $(this).height();
    }
  });
  
  if(addheight == undefined){ addheight = 0; }
  div.data('height',divHeight+addheight);
  div.css({'height':divHeight+addheight});
}