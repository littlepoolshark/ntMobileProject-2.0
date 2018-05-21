//@flow
import React, { Component, PropTypes } from 'react';
import Hammer from 'hammerjs';



class Slick extends Component {
    props: {
        defaultIndex: number,
        durationTime: string,
        isAutoPlay: boolean,
        iShowDot: boolean
    }

    static defaultProps = {
        defaultIndex: 1,
        durationTime: "0.5s",
        isAutoPlay: true,
        iShowDot: false
    }

    state: {
        activeIndex: number,
        isAnimating: boolean,
        screenWidth: number,
        isWindowResized: boolean
    }

    constructor(props: Object) {
        super(props);
        this.state = {
            activeIndex: props.defaultIndex || 1,
            isAnimating: false,
            screenWidth: window.screen.width || document.documentElement.clientWidth,//获取视口宽度的兼容性写法
            isWindowResized: false
        }; 
    }

    _goPrev() {
        this._enableAnimation();
        this.setState((prevState, prevProps) => {
            return {
                activeIndex: prevState.activeIndex - 1,
                isAnimating: true
            }
        });
    }

    _goNext() {
        this._enableAnimation();
        this.setState((prevState, prevProps) => {
            return {
                activeIndex: prevState.activeIndex + 1,
                isAnimating: true
            }
        });
    }

    _autoPlay() {
        this.timer = setInterval(() => {
            this._goNext();
        }, 4000);
    }

    _enableAnimation() {
        let className: string = this.refs.sliderWrapper.className;
        if (className.indexOf("animate") === -1) {
            this.refs.sliderWrapper.className += " animate";
        };
    }

    _disableAnimation() {
        let className: string = this.refs.sliderWrapper.className;
        if (className.indexOf("animate") > -1) {
            this.refs.sliderWrapper.className = className.replace('animate', '').trim();
        };
    }

    _recover() {
        let nextTranslateX = this.state.activeIndex * (-this.state.screenWidth);
        this._setTranslateXTo(nextTranslateX);
    }

    _setSlickItemWidth() {
        let lis = this.refs.sliderWrapper.getElementsByTagName("li");
        Array.prototype.map.call(lis, (ele, index) => {
            ele.style.width = this.state.screenWidth + "px";
        })
    }

    _handleTransitionEnd() {
        let childrenCount = this.props.children.length + 2;

        this._disableAnimation();
        if (this.state.activeIndex === 0) {
            this.setState({
                activeIndex: childrenCount - 2
            }, () => {
                this.setState({
                    isAnimating: false
                }, () => {
                    if (!this.timer && this.props.isAutoPlay) {
                        this._autoPlay();
                    }
                })
            });
        } else if (this.state.activeIndex === (childrenCount - 1)) {
            this.setState({
                activeIndex: 1
            }, () => {
                this.setState({
                    isAnimating: false
                }, () => {
                    if (!this.timer && this.props.isAutoPlay) {
                        this._autoPlay();
                    }
                })
            });
        } else {
            this.setState({
                isAnimating: false
            }, () => {
                if (!this.timer && this.props.isAutoPlay) {
                    this._autoPlay();
                }
            });
        }
    }

    _getCurrentTranslateX(): number {
        let transfromStr: string = this.refs.sliderWrapper.style.transform;
        let indexOfLeftBrace: number = transfromStr.indexOf("(");
        let prevTranslateX: number = parseInt(transfromStr.slice(indexOfLeftBrace + 1, -1).split(",")[0]);
        return prevTranslateX;
    }

    _setTranslateXTo(translateX: number) {
        this.refs.sliderWrapper.style.transform = `translate3d(${translateX}px,0,0)`;
        this.refs.sliderWrapper.style.webkitTransform = `translate3d(${translateX}px,0,0)`;
    }

    _setScreenWidth() {
        this.setState({
            screenWidth: window.screen.width || document.documentElement.clientWidth,
            isWindowResized: true
        })
    }

    render() {

        let childrenCount = React.Children.count(this.props.children);
        let isOnlyChild = childrenCount === 1;
        let transformX = isOnlyChild ? 0 : this.state.activeIndex * (-this.state.screenWidth);

        let sliderWrapperStyle = {
            transform: `translate3d(${transformX}px,0,0)`,
            "webkitTransform": `translate3d(${transformX}px,0,0)`,
            "WebkitTransform": `translate3d(${transformX}px,0,0)`,
            width: isOnlyChild ? `${this.state.screenWidth}px` : `${this.state.screenWidth * (childrenCount + 2)}px`
        };


        let newChildren = this.props.children;
        if(!isOnlyChild) {
            newChildren = [React.cloneElement(this.props.children[childrenCount - 1]), ...this.props.children, React.cloneElement(this.props.children[0])];
        }


        return (
            <div className="slider-container">
                <ul
                    className="slider-wrapper"
                    ref="sliderWrapper"
                    style={sliderWrapperStyle}
                    onTransitionEnd={(e) => { this._handleTransitionEnd() }}
                >
                    {newChildren}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this._setSlickItemWidth();

        if (React.Children.count(this.props.children) !== 1) {

            if (this.props.isAutoPlay) {
                this._autoPlay();
            }

            this.hammertime = new Hammer(this.refs.sliderWrapper);
            this.hammertime.get('pan').set({ threshold: 10, direction: Hammer.DIRECTION_HORIZONTAL });

            this.hammertime.on("panstart", (e: Object) => {
                if (this.state.isAnimating) return;
                this._disableAnimation();
                let prevTranslateX: number = this._getCurrentTranslateX();
                this.currTranslateX = prevTranslateX + e.deltaX;
            });

            this.hammertime.on("panmove", (e) => {
                if (this.state.isAnimating) return;
                if (!!this.timer) {
                    window.clearInterval(this.timer);
                    this.timer = null;
                };
                let nextTranslateX: number = this.currTranslateX + e.deltaX;
                this._setTranslateXTo(nextTranslateX);
            });

            this.hammertime.on("panend pancancel", (e: Object) => {
                if (this.state.isAnimating) return;
                this._enableAnimation();
                let precent: number = (Math.abs(this._getCurrentTranslateX() - this.currTranslateX) + 10) * 100 / this.state.screenWidth;

                if (e.deltaX < 0) {
                    if (precent > 20) {
                        this._goNext();
                    } else {
                        this._recover();
                    }
                } else {
                    if (precent > 20) {
                        this._goPrev();
                    } else {
                        this._recover();
                    }
                }
            });
        }


        window.addEventListener("resize", this._setScreenWidth.bind(this), false);

    }

    componentWillUnmount() {
        this.hammertime = null;
        this.currTranslateX = null;
        this.timer && clearInterval(this.timer);
        window.removeEventListener("resize", this._setScreenWidth.bind(this), false);
    }

    componentDidUpdate() {
        if (this.state.isWindowResized) {
            this._setSlickItemWidth();
        }
    }
}




export default Slick;
