
module.exports = class scrollSpy {
    constructor(container) {
        this.__container = window;
        this.__attr = 'scrollspy';
        this.__elements = document.querySelectorAll('[data-' + this.__attr + ']');

        if (container) {
            this.__container = document.getElementsByClassName(container)[0];
        }

        this.animateElement();
    }

    animateElement() {
        let __classObj = this;

        __classObj.__elements.forEach(function(item) {
            let elementObj = JSON.parse(item.getAttribute('data-' + __classObj.__attr));

            let bodyRect = document.body.getBoundingClientRect(),
                elemRect = item.getBoundingClientRect(),
                offset   = elemRect.top - bodyRect.top;
            
            if (offset <= __classObj.__container.offsetHeight) {
                item.classList.add(elementObj.class_in);
            }

            if (elementObj.hasOwnProperty('delay_in')) {
                item.classList.add(elementObj.delay_in);
            }

            if (elementObj.hasOwnProperty('speed_in')) {
                item.classList.add(elementObj.speed_in);
            }
        });

        this.__container.onscroll = function(e) {
            __classObj.__elements.forEach(function(item) {
                let elementObj = JSON.parse(item.getAttribute('data-' + __classObj.__attr));

                let bodyRect = document.body.getBoundingClientRect(),
                    elemRect = item.getBoundingClientRect(),
                    offset   = elemRect.top - bodyRect.top;
                
                if (offset <= __classObj.__container.offsetHeight) {
                    item.classList.add(elementObj.class_in);
                }

                if (elementObj.hasOwnProperty('delay_in')) {
                    item.classList.add(elementObj.delay_in);
                }

                if (elementObj.hasOwnProperty('speed_in')) {
                    item.classList.add(elementObj.speed_in);
                }
            });
        }
    }

    targetSetPropIn(target, props) {
        
        if (props.hasOwnProperty('class_in')) {
            target.classList.add(props.class_in);
        }

        if (props.hasOwnProperty('delay_in')) {
            target.classList.add(props.delay_in);
        }

        if (props.hasOwnProperty('speed_in')) {
            target.classList.add(props.speed_in);
        }
    }
}