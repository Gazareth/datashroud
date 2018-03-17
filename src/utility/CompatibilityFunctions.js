/**
  * Method that checks whether something exists.
**/
export function exists(x) {
  return (x !== undefined) && (x !== null);
}

/**
 * Method that checks whether cls is present in element object.
 * @param  {Object} ele DOM element which needs to be checked
 * @param  {Object} cls Classname is tested
 * @return {Boolean} True if cls is present, false otherwise.
 */
export function hasClass(ele, cls) {
    return ele.getAttribute('class').indexOf(cls) > -1;
}

/**
 * Method that adds a class to given element.
 * @param  {Object} ele DOM element where class needs to be added
 * @param  {Object} cls Classname which is to be added
 * @return {null} nothing is returned.
 */
export function addClass(ele, cls) {
    if (ele.classList) {
        ele.classList.add(cls);
    } else if (!hasClass(ele, cls)) {
        ele.setAttribute('class', ele.getAttribute('class') + ' ' + cls);
    }
}

/**
 * Method that does a check to ensure that class is removed from element.
 * @param  {Object} ele DOM element where class needs to be removed
 * @param  {Object} cls Classname which is to be removed
 * @return {null} Null nothing is returned.
 */
export function removeClass(ele, cls) {
    if (ele.classList) {
        ele.classList.remove(cls);
    } else if (hasClass(ele, cls)) {
        ele.setAttribute('class', ele.getAttribute('class').replace(cls, ' '));
    }
}

/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
export function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}