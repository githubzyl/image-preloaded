//图片预加载插进
//闭包模拟局部作用域
(function ($) {

	function PreLoad(imgs, options){
		this.imgs = (typeof imgs === "string") ? [imhgs] : imgs;
		this.opts = $.extend({}, PreLoad.DEFAULTS, options);

		if(this.opts.order === "ordered"){
			this._ordered();
		}else{
			this._unordered();
		}
	}

	PreLoad.DEFAULTS = {
		order : "unordered", //无序加载
		each : null, //每张图片加载完后执行
		all : null   //所有图片加载完后执行
	}

	PreLoad.prototype._unordered = function () {//无序加载
		var imgs = this.imgs,
		    opts = this.opts,
		    count = 0,
		    len = imgs.length;

		//预加载图片
		$.each(imgs, function (i, src) {
			if (typeof src != 'string') return; 

			var image = new Image();

			//图片加载完成
			$(image).on("load error", function () {
				opts.each && opts.each(count);

				if(count >= (len -1)){
					opts.all && opts.all();
				}

				count++;
			});

			image.src = src;

		});
	}

	PreLoad.prototype._ordered = function () {//有序加载
		var imgs = this.imgs,
		    opts = this.opts,
		    count = 0,
		    len = imgs.length;

	    load();

		//有序预加载图片
		function load () {
			var image = new Image();
			$(image).on("load error", function () {
				opts.each && opts.each(count);

				if(count >= len){
					//所有图片已加载完毕
					opts.all && opts.all();
				}else{
					load();
				}
				count++;
			});
			image.src = imgs[count];
		}
	}

	$.extend({
		preload : function (imgs, opts) {
			new PreLoad(imgs, opts);
		}
	});

})(jQuery);