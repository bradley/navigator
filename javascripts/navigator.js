$(window).load(function(){
     ;(function(_navigation_controllers, $) {
        
        var Class = function() {
            return function(params) {
                if ( !(this instanceof arguments.callee) ) {
                    return new arguments.callee(arguments);
                }
                this.initialize.apply(this,(params.callee ? params : arguments));
            };
        };
        
        var NavigationController = Class();
        NavigationController.prototype = {
            initialize: function(_navigation_controller){
                this.controller = $(_navigation_controller);
                this.sub_views = this.controller.find('.navigation-view');
                this.navigation_wrap = {};
                this.current_step = 1;
                this.can_step = true;
                
                this.setupGeneratedViews();
                this.setupListeners();
            },
            setupListeners: function() {
                var self = this;
                // Listens for end of CSS animations.
                this.navigation_wrap.on("webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd", function() {
                    self.can_step = true;
                });
            },
            setupGeneratedViews: function() {
                this.sub_views.width(this.controller.width());
                this.controller.wrapInner( "<div class='navigation-wrap' />");            
                this.navigation_wrap = this.controller.children('.navigation-wrap');
                this.navigation_wrap.css({
                    'width'     : this.controller.width() * this.sub_views.length,
                    'marginLeft': 0
                });
            },
            stepForward: function() {
                if (!this.isLastStep() && this.can_step) {
                    var offset = parseInt(this.navigation_wrap.css('marginLeft')) - this.controller.width();
                    this.can_step = false;
                    this.navigation_wrap.css({"marginLeft": offset});
                    this.current_step += 1;
                } 
                else {
                    return false;
                }
            },
            stepBackward: function() {
                if (!this.isFirstStep() && this.can_step) {
                    var offset = parseInt(this.navigation_wrap.css('marginLeft')) + this.controller.width();
                    this.can_step = false;
                    this.navigation_wrap.css({"marginLeft": offset});
                    this.current_step -= 1;
                } 
                else {
                    return false;
                }
            },
            currentStep: function() {
                return this.current_step;
            },
            isFirstStep: function() {
                return this.current_step == 1;
            },
            isLastStep: function() {
                return this.current_step == this.sub_views.length;
            }
        }
        
        _navigation_controllers.each(function(ix, o){
            $(o).data('NavigationController.instance', new NavigationController(o));
        });
        
        $.fn.stepForward = function() {
            this.each(function() {
                $(this).data('NavigationController.instance').stepForward();
            });
        }
        
        $.fn.stepBackward = function() {
            this.each(function() {
                $(this).data('NavigationController.instance').stepBackward();
            });
        }
        
        $.fn.currentStep = function() {
            this.each(function() {
                $(this).data('NavigationController.instance').currentStep();
            });
        } 
        
        $.fn.isFirstStep = function() {
            this.each(function() {
                $(this).data('NavigationController.instance').isFirstStep();
            });
        }    
        
        $.fn.isLastStep = function() {
            this.each(function() {
                $(this).data('NavigationController.instance').isLastStep();
            });
        }    
        
        return _navigation_controllers;
        
    })($('.navigation-controller'), jQuery);
});