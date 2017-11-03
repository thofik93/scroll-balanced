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
      var elLeftHeight = $containerScroll.find('.scroll-balanced-left').outerHeight()
      var elRightHeight = $containerScroll.find('.scroll-balanced-right').outerHeight()
      var filterVal = this.getFilterVal(elLeftHeight, elRightHeight)
      var totalEl = $containerScroll.find('.scroll-balanced-item').length

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
          .find('.column-scroll-balanced')
          .filter(filterVal)
          .find('.scroll-balanced-item')
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
        
        var offset = (filterVal === '.scroll-balanced-item-left') 
                ? elRightHeight - elLeftHeight
                :  (elLeftHeight - elRightHeight)

        var perScroll = offset / heightContainerScroll 
        var scrollRun = scrollOffset - runState

        var moveCurrentEl =  scrollRun * (perScroll * 2)
        
        if(moveCurrentEl > offset) {
          moveCurrentEl = offset
        }

        $containerScroll
          .find('.column-scroll-balanced')
          .filter(filterVal)
          .find('.scroll-balanced-item')
          .css({transform: 'translate3d(0,' + moveCurrentEl + 'px,0px' })
      }

      function animateActive() {
        $containerScroll
          .find('.column-scroll-balanced')
          .filter(filterVal)
          .find('.scroll-balanced-item')
          .css({transform: 'translate3d(0,' + offset + 'px,0px' })
      }
  }

  ScrollBalanced.prototype.getFilterVal = function(elLeftHeight, elRightHeight) {
    var filterVal = (elLeftHeight > elRightHeight) ? 
                      '.scroll-balanced-right' : '.scroll-balanced-left'
    return filterVal
  }

  // SCROLL BALANCED PLUGIN DEFINITION
  // ========================

  function Plugin() {
      return this.each(function () {
        var $this   = $(this)
        var data    = $this.data('montase.ui.scrollbalanced')
        
        if (!data) $this.data('montase.ui.scrollbalanced', (data = new ScrollBalanced(this)))
        if (typeof option == 'number') data.to(option)
      })
  }

  $.fn.scrollbalanced             = Plugin
  $.fn.scrollbalanced.Constructor = ScrollBalanced

  // Scroll Balanced DATA-API 
  // ========================
    
  $(window).on('load', function () {
    $('[data-scroll-balanced]').each(function () {
      var $scroll = $(this)
      Plugin.call($scroll)
    })
  })

}(jQuery)