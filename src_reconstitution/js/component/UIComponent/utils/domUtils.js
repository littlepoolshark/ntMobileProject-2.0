import ReactDOM from 'react-dom';

/**
 * Get ownerDocument
 * @param {ReactComponent|HTMLElement} componentOrElement
 * @returns {HTMLDocument}
 */
function ownerDocument(componentOrElement) {
  var element = ReactDOM.findDOMNode(componentOrElement);

  return (element && element.ownerDocument) || document;
}

/**
 * Get ownerWindow
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 * @see https://github.com/jquery/jquery/blob/6df669f0fb87cd9975a18bf6bbe3c3548afa4fee/src/event.js#L294-L297
 */
function ownerWindow(element) {
  var doc = ownerDocument(element);

  return doc.defaultView || doc.parentWindow || window;
}

export default {
  ownerDocument,

  ownerWindow,

  scrollTop(element, value) {
    if (!element) {
      return;
    }

    var hasScrollTop = 'scrollTop' in element;

    if (value === undefined) {
      return (hasScrollTop ? element.scrollTop : element.pageYOffset);//pageXOffset 和 pageYOffset 属性返回文档在窗口左上角水平和垂直方向滚动的像素
    }

    hasScrollTop ?
      element.scrollTop = value : element.scrollTo(element.scrollX, value);
  },

  offset(element) {
    if (element) {
      //getBoundingClientRect()
      // 这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。

      // var box = document.getElementById('box');       // 获取元素
      // alert(box.getBoundingClientRect().top);         // 元素上边距离页面上边的距离
      // alert(box.getBoundingClientRect().right);       // 元素右边距离页面左边的距离
      // alert(box.getBoundingClientRect().bottom);      // 元素下边距离页面上边的距离
      // alert(box.getBoundingClientRect().left);        // 元素左边距离页面左边的距离

      var rect = element.getBoundingClientRect();
      var body = document.body;
      var clientTop = element.clientTop || body.clientTop || 0;
      var clientLeft = element.clientLeft || body.clientLeft || 0;
      var scrollTop = window.pageYOffset || element.scrollTop;
      var scrollLeft = window.pageXOffset || element.scrollLeft;

      return {
        top: rect.top + scrollTop - clientTop,
        left: rect.left + scrollLeft - clientLeft
      };
    }

    return null;
  },

 /**
  * Get the position(left or top) of the passed in element,relate to document Object modal.
  * @param {ReactComponent|HTMLElement} componentOrElement
  * @returns {HTMLDocument}
 */
  position(element) {
    return {
      left: element.offsetLeft,
      top: element.offsetTop
    };
  }
};
