//图片预加载插进
//闭包模拟局部作用域
(function ($) {

	function PreLoad(imgs, options){
		this.imgs = (typeof imgs === "string") ? [imhgs] : imgs;
		this.opts = $.extend({}, PreLoad.DEFAULTS, options);

		this._onordered();
	}

	PreLoad.DEFAULTS = {
		each : null, //每张图片加载完后执行
		all : null   //所有图片加载完后执行
	}

	PreLoad.prototype._onordered = function () {//无序加载
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

	$.extend({
		preload : function (imgs, opts) {
			new PreLoad(imgs, opts);
		}
	});

})(jQuery);