var jqload_JQ = document.createElement('script');
    jqload_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
    jqload_JQ.type = 'text/javascript';
    
// Check if jQuery's loaded
function jqcheck_wait() {
  if(typeof jQuery === 'undefined') {
		document.getElementsByTagName('head')[0].appendChild(jqload_JQ)
		window.setTimeout(jqcheck_wait,10);
	}else {
		main();
	} 
}

jqcheck_wait();

function main(){
jQuery(function($){
	var imageSprite = 'data:image/gif;base64,R0lGODlh/wAYALMAAAAAAHBwcDAwMM/Pz5+fnxAQEK+vr0BAQN/f34+Pj1BQUCAgIL+/v39/f2BgYP///yH5BAEHAA8ALAAAAAD/ABgAAAT/8MlJq7046827/2AojmRpnmiqrmzrvuowtMgB3Hiu6wcCw7WdsPcrGkGDQmG2sgmfu4MpCI36Ss4qTkqiDq/HMCZ5W65uDVHjZspqc1wSerMGYLXxE8F9IIg1ZDhmKTcIBW85BQhsJXMddSaFh0+KjCOOFZAnCAJPAmB/E4YAk4eKhACLIHaWl6mTVZV2jamzF6y2IpI6spuwQqcvoBYIhks3SYrDrg+5HLiRtc/NziFs1RPQctIU2iWdWgIoBg4HBw3FNhnJxdQSxky0zavu8tgV3sz3863WrPj1SBDA0SBBjgR1APjp4ubGgn4TyARjNGrQtnkf8un6t0GjP4y3/wJuBCnBI4gsCR4MVPjA4I08IDjhWPALm8R4lm7aowdxFUcNJjP+tBC0wzWAPYXi8EOAqQ4SdT49GIXDQiBEpOJ93BcyqYejHUWO3Ff02VB+XDcs0rFwZQ4Spq40tFpTi8WtPNN2PNtVL1C+2cT6JIm2xNocbXdsCyCBgWK6ABbgtKXzot/AXo0CRnoZA9i+O7sJ9rlUpdO3rtI0ZsCa9Zi4JWdV1DqybqzRQgmDDr1bH+c2OFKu9OMSAEyhMBE0MABISTs2xZTQHsmMluNnjjvf2lzY8u8SbgseTLhQhIIb5WXqhYfMOSrVH5Rn1sDANqICDLx7xq35Qc0C/HkATqoV4pAwwBYNBDDJccSYUgYpy4zQEFZbwEUhMPr1Rl1LAKQUmy+xRPiBWzlIxcFVWangxYXGiWhWeR+4dJF9pAS4F3yi1OGiB+rtYKIJA5znEDofBHIXDLlo1wGN911EgUEeZqMkBRPyoMIecMAYCl1HIikaC/WxKEh+qWkgXyoMQUHElmw+IMMPVN3WZgpVPsHgnHjmyUGcUACop2F18rDjn4QWauihiBIaAQA7';
	var styles = 'body {margin:25px 0 0;padding:0;background:gray;}';
		styles += '#responsive-frame {margin: 0 auto;display: block;}';
		styles += '#resp-builder {position: fixed;margin: auto;width: 340px;background: #fff;top: 0;left: 0;right: 0;height: 25px;}';
		styles += '#resp-builder ul {padding:0;margin:0;}';
		styles += '#resp-builder li {background-image: url('+imageSprite+');background-repeat: no-repeat;cursor: pointer;display: inline-block;height: 25px;width: 26px;margin:0 3px;padding:0;}';
		styles += '#resp-builder .full-screen {background-position: 0px 50%;}';
		styles += '#resp-builder .computer {background-position: -42px 50%;}';
		styles += '#resp-builder .laptop {background-position: -86px 50%;}';
		styles += '#resp-builder .tablet {background-position: -125px 50%;}';
		styles += '#resp-builder .phone {background-position: -164px 50%;}';
		styles += '#resp-builder .refresh {background-position: -235px 50%;}';
		styles += '#resp-builder .close {background-position: -200px 50%;}';
		styles += '#resp-builder .landscape {-moz-transform: scaleX(-1);-o-transform: scaleX(-1);-webkit-transform: scaleX(-1);transform: scaleX(-1);-webkit-transform: rotate(90deg);-moz-transform: rotate(90deg);-ms-transform: rotate(90deg);-o-transform:rotate(90deg);transform: rotate(90deg);}';
		styles += '#resp-builder .current-selection {font: 14px/24px Georgia;background-position: 113px 50%;cursor:default;width:105px;color: #000;top: -7px;position: relative;}';
	var responsiveHtml = '<div id="resp-builder"><ul><li data-width="100%" title="Full Screen" class="full-screen"></li>';
		responsiveHtml += '<li data-width="1680" height="100%" title="Computer" class="computer"></li>';
		responsiveHtml += '<li data-width="1366" data-height="768" title="Laptop" class="laptop"></li>';
		responsiveHtml += '<li data-width="768" data-height="1024" title="Tablet" class="tablet portrait"></li>';
		responsiveHtml += '<li data-height="480" data-width="320" title="Phone" class="phone portrait"></li>';
		responsiveHtml += '<li title="Refresh" class="refresh"></li>';
		responsiveHtml += '<li class="current-selection"></li><li title="Close this" class="close"></li></ul></div>';
	var winHeight = window.innerHeight,
		winWidth = self.innerWidth;
	$('body').html('<iframe id="responsive-frame" height="'+winHeight+'" width="'+winWidth+'" seamless="seamless" src="'+location.href+'?"></iframe>');
	$('head link[rel="stylesheet"], head style').remove();
	$('head').append('<style>'+ styles +'</style>');
	$('body').append(responsiveHtml);
	$('body').on('click','li',function(){
		//Landscape and portrait
		var $this = $(this),
			$thisClass = $this.attr('class'),
			$thisTitle = $this.attr('title'),
			$currentaction = $('.current-selection');
			$iframe = $('#responsive-frame'),
			$thisWidth = (document.width > 1366 && $this.hasClass('computer'))? '100%': $this.attr('data-width'),
			$thisHeight = $this.attr('data-height') || winHeight;
		
		cancelFullscreen();
		switch($thisClass){
			case 'phone portrait':
			case 'tablet portrait':
				$this.removeClass('portrait').addClass('landscape');
				$thisTitle = $thisTitle+' portrait';
			break;
			case 'computer':
				$thisHeight = winHeight;
			break;
			case 'phone landscape':
			case 'tablet landscape':
				var temp = $thisWidth;
				$thisWidth = $thisHeight;
				$thisHeight = temp;
				$thisTitle = $thisTitle+' landscape';
				$this.removeClass('landscape').addClass('portrait');
			break;
			case 'full-screen':
				launchFullScreen(document.documentElement);
			break;
			case 'close':
				location.reload();
				$thisTitle = '';
			break;
			case 'refresh':
				$iframe.attr('src',location.href);
				$thisTitle = '';
				$thisWidth = $iframe.attr('width');
				$thisHeight = $iframe.attr('height');
			break;
		}
				
		$currentaction.text($thisTitle);
		$iframe.attr('width',$thisWidth).attr('height',$thisHeight);
	});
	// Whack fullscreen
	function cancelFullscreen() {
		if(document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if(document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}

	function launchFullScreen(element){
		if(element.requestFullScreen) {
			element.requestFullScreen();
		} else if(element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if(element.webkitRequestFullScreen) {
			element.webkitRequestFullScreen();
		}
	}
});
}