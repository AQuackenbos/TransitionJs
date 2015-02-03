define([
    'underscore',
    'src/transition'
], function(_, transition) {

    function Slider() {
        this.el = document.createElement("div");
        this.el.className = "slider";
        this.rectEl = document.createElement("div");
        this.rectEl.className = "sliderRect";
        this.el.appendChild(this.rectEl);
        document.body.appendChild(this.el);
        this.el.addEventListener("click", this.reverseTransition.bind(this), false);
        this.direction = null;
        this.moveSliderRight();
    }

    _.extend(Slider.prototype, {

        reverseTransition: function() {
            if (this.direction === "right") {
                this.moveSliderLeft();
            } else {
                this.moveSliderRight();
            }
        },

        moveSliderRight: function() {
            this.direction = "right";
            transition.transition(this.rectEl, {
                properties: [
                    new transition.TransitionProperty("transform", "translateX(0)", "translateX(450px)")
                ],
                duration: "2000ms",
                onTransitionEnd: this.onMoveRightTransitionEnd.bind(this)
            });
        },

        moveSliderLeft: function() {
            this.direction = "left";
            transition.transition(this.rectEl, {
                properties: [
                    new transition.TransitionProperty("transform", "translateX(450px)", "translateX(0)")
                ],
                duration: "2000ms",
                onTransitionEnd: this.onMoveLeftTransitionEnd.bind(this)
            });
        },

        onMoveRightTransitionEnd: function(element, finished) {
            if (finished) {
                this.moveSliderLeft();
            } else {
                console.log("halted!");
            }
        },

        onMoveLeftTransitionEnd: function(element, finished) {
            if (finished) {
                this.moveSliderRight();
            } else {
                console.log("halted!");
            }
        }

    });

    return Slider;

});