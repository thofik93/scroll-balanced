+function($) {
	'use strict'

	var ScrollBalanced = function(element) {
		this.$element = $(element)
		$(window).on('scroll', function(){
			this.scrollHandler()
		}.bind(this))
	}

	ScrollBalanced.VERSION = '0.0.1[BETA]'

	ScrollBalanced.AUTHOR = 'thofikwiranata15@gmail.com'

	ScrollBalanced.prototype.scrollHandler = function() {
		var scrollOffset = $(window).scrollTop()
		this.trigger(scrollOffset)
	}

	ScrollBalanced.prototype.trigger = function(scrollOffset) {
		var runState = this.$element.offset().top
		var heightContainerScroll = this.$element.outerHeight()

		this.toggleClass(scrollOffset, runState, heightContainerScroll)
	}

	ScrollBalanced.prototype.toggleClass = function(scrollOffset, runState, heightContainerScroll) {
		var $containerScroll = this.$element
		var isActive = $containerScroll.hasClass('scroll-run') || $containerScroll.hasClass('scroll-active')
		var activeState = runState + heightContainerScroll
		var elLeftHeight = getHeightEl(':even')
		var elRightHeight = getHeightEl(':odd')
		var filterVal = this.getFilterVal(elLeftHeight, elRightHeight)
		var totalEl = $containerScroll.find('.square-article').length

		// element minimal 2
		if(totalEl < 2) {
			return
		} 
				
		if (scrollOffset < runState) {
					
			if(isActive) {
				$containerScroll
					.removeClass('scroll-run')
					.removeClass('scroll-active')
			}

			$containerScroll
				.find('.square-article')
				.filter(filterVal)
				.css({transform: 'translate3d(0,0,0)' })

			return 

		} 
		else if(scrollOffset >= runState && scrollOffset < activeState) {
			$containerScroll
				.removeClass('scroll-active')
				.addClass('scroll-run')
				animateRun()	
		} 
		else if (scrollOffset >= activeState) {
			$containerScroll
				.removeClass('scroll-run')
				.addClass('scroll-active')
				animateActive()
			}

			function animateRun() {
				// hardcode +20 kalo section kanan yang lebih pendek
				var offset = (filterVal === ':even') 
								? elRightHeight - elLeftHeight
								:  (elLeftHeight - elRightHeight) + 20

					
				var perScroll = offset / heightContainerScroll 
				var scrollRun = scrollOffset - runState

				var moveCurrentEl =  scrollRun * (perScroll * 2)
					
				if(moveCurrentEl > offset) {
					moveCurrentEl = offset
				}

				$containerScroll
					.find('.square-article')
					.filter(filterVal)
					.css({transform: 'translate3d(0,' + moveCurrentEl + 'px,0px' })
			}

			function animateActive() {
				var elLeftHeight = getHeightEl(':even')
				var elRightHeight = getHeightEl(':odd')
				// hardcode +20 kalo section kanan yang lebih pendek
				var offset = (filterVal === ':even') 
								? elRightHeight - elLeftHeight
								:  (elLeftHeight - elRightHeight) + 20

				$containerScroll
					.find('.square-article')
					.filter(filterVal)
					.css({transform: 'translate3d(0,' + offset + 'px,0px' })
			}

			function getHeightEl(filter) {
				var $squareArticles = $containerScroll.find('.square-article')
				var $el = $squareArticles.filter(filter)
				var sumHeightSquareArticle  = 0

				$el.each(function(){
					sumHeightSquareArticle = sumHeightSquareArticle + $(this).outerHeight()
				})

				return sumHeightSquareArticle
			}
	}

	ScrollBalanced.prototype.getFilterVal = function(elLeftHeight, elRightHeight) {
		var filterVal = (elLeftHeight > elRightHeight) ? ':odd' : ':even'
		return filterVal
	}

	// SCROLL BALANCED PLUGIN DEFINITION
	// ========================

	function Plugin() {
		return this.each(function () {
			var $this   = $(this)
			var data    = $this.data('q.scrollbalanced')
			    
			if (!data) $this.data('q.scrollbalanced', (data = new ScrollBalanced(this)))
			if (typeof option == 'number') data.to(option)
		})
	}

	$.fn.scrollbalanced             = Plugin
	$.fn.scrollbalanced.Constructor = ScrollBalanced

	// Scroll Balanced DATA-API 
	// ========================
			
	$(window).on('load', function () {
		$('[data-scroll="fixed"]').each(function () {
				var $scroll = $(this)
				Plugin.call($scroll)
		})
	})
}(jQuery)