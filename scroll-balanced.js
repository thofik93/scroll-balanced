+function($) {
  'use strict'

  var ScrollBalanced = function(element) {
    this.$element = $(element)
    $(window).on('scroll', function(){
      this.scrollHandler()
    }.bind(this))
  }

  ScrollBalanced.VERSION = '0.0.1[BETA]'

  ScrollBalanced.AUTHOR = 'Thofik Wiranata - thofikwiranata15@gmail.com'

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
      var elLeftHeight = $containerScroll.find('.square-article-left').outerHeight()
      var elRightHeight = $containerScroll.find('.square-article-right').outerHeight()
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
          .find('.col--item-tabs')
          .filter(filterVal)
          .find('.square-article')
          .css({transform: 'translate3d(0,0,0)' })

        return 

      } else if(scrollOffset >= runState && scrollOffset < activeState) {
        $containerScroll
          .removeClass('scroll-active')
          .addClass('scroll-run')
          animateRun()  
      } else if (scrollOffset >= activeState) {
        $containerScroll
          .removeClass('scroll-run')
          .addClass('scroll-active')
          animateActive()
      }

      function animateRun() {
        
        var offset = (filterVal === '.square-article-left') 
                ? elRightHeight - elLeftHeight
                :  (elLeftHeight - elRightHeight)

        var perScroll = offset / heightContainerScroll 
        var scrollRun = scrollOffset - runState

        var moveCurrentEl =  scrollRun * (perScroll * 2)
        
        if(moveCurrentEl > offset) {
          moveCurrentEl = offset
        }

        $containerScroll
          .find('.col--item-tabs')
          .filter(filterVal)
          .find('.square-article')
          .css({transform: 'translate3d(0,' + moveCurrentEl + 'px,0px' })
      }

      function animateActive() {
        $containerScroll
          .find('.col--item-tabs')
          .filter(filterVal)
          .find('.square-article')
          .css({transform: 'translate3d(0,' + offset + 'px,0px' })
      }
  }

  ScrollBalanced.prototype.getFilterVal = function(elLeftHeight, elRightHeight) {
    var filterVal = (elLeftHeight > elRightHeight) ? 
                      '.square-article-right' : '.square-article-left'
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