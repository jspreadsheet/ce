if (! jSuites && typeof(require) === 'function') {
    var jSuites = require('jsuites');
}
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jspreadsheet"] = factory();
	else
		root["jspreadsheet"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 243:
/***/ (function(module) {

/**
/**
 * Jspreadsheet Extensions (https://jspreadsheet.com)
 * Extension: Formula Basic
 * License: This is a free software MIT
 *
 * https://jspreadsheet.com
 */

;(function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

var Formula;!function(){var n={765:function(n,t){var r;r=function(n){n.version="1.0.2";var t=Math;function r(n,t){for(var r=0,e=0;r<n.length;++r)e=t*e+n[r];return e}function e(n,t,r,e,o){if(0===t)return r;if(1===t)return e;for(var i=2/n,u=e,a=1;a<t;++a)u=e*a*i+o*r,r=e,e=u;return u}function o(n,t,r,o,i){return function(r,u){if(o){if(0===r)return 1==o?-1/0:1/0;if(r<0)return NaN}return 0===u?n(r):1===u?t(r):u<0?NaN:e(r,u|=0,n(r),t(r),i)}}var i,u,a,f,l,c,s,h,g,p,m,d,v,E=function(){var n=.636619772,o=[57568490574,-13362590354,651619640.7,-11214424.18,77392.33017,-184.9052456].reverse(),i=[57568490411,1029532985,9494680.718,59272.64853,267.8532712,1].reverse(),u=[1,-.001098628627,2734510407e-14,-2073370639e-15,2.093887211e-7].reverse(),a=[-.01562499995,.0001430488765,-6911147651e-15,7.621095161e-7,-9.34935152e-8].reverse();function f(e){var f=0,l=0,c=0,s=e*e;if(e<8)f=(l=r(o,s))/(c=r(i,s));else{var h=e-.785398164;l=r(u,s=64/s),c=r(a,s),f=t.sqrt(n/e)*(t.cos(h)*l-t.sin(h)*c*8/e)}return f}var l=[72362614232,-7895059235,242396853.1,-2972611.439,15704.4826,-30.16036606].reverse(),c=[144725228442,2300535178,18583304.74,99447.43394,376.9991397,1].reverse(),s=[1,.00183105,-3516396496e-14,2457520174e-15,-2.40337019e-7].reverse(),h=[.04687499995,-.0002002690873,8449199096e-15,-8.8228987e-7,1.05787412e-7].reverse();function g(e){var o=0,i=0,u=0,a=e*e,f=t.abs(e)-2.356194491;return Math.abs(e)<8?o=(i=e*r(l,a))/(u=r(c,a)):(i=r(s,a=64/a),u=r(h,a),o=t.sqrt(n/t.abs(e))*(t.cos(f)*i-t.sin(f)*u*8/t.abs(e)),e<0&&(o=-o)),o}return function n(r,o){if(o=Math.round(o),!isFinite(r))return isNaN(r)?r:0;if(o<0)return(o%2?-1:1)*n(r,-o);if(r<0)return(o%2?-1:1)*n(-r,o);if(0===o)return f(r);if(1===o)return g(r);if(0===r)return 0;var i=0;if(r>o)i=e(r,o,f(r),g(r),-1);else{for(var u=!1,a=0,l=0,c=1,s=0,h=2/r,p=2*t.floor((o+t.floor(t.sqrt(40*o)))/2);p>0;p--)s=p*h*c-a,a=c,c=s,t.abs(c)>1e10&&(c*=1e-10,a*=1e-10,i*=1e-10,l*=1e-10),u&&(l+=c),u=!u,p==o&&(i=a);i/=l=2*l-c}return i}}(),M=(i=.636619772,u=[-2957821389,7062834065,-512359803.6,10879881.29,-86327.92757,228.4622733].reverse(),a=[40076544269,745249964.8,7189466.438,47447.2647,226.1030244,1].reverse(),f=[1,-.001098628627,2734510407e-14,-2073370639e-15,2.093887211e-7].reverse(),l=[-.01562499995,.0001430488765,-6911147651e-15,7.621095161e-7,-9.34945152e-8].reverse(),c=[-4900604943e3,127527439e4,-51534381390,734926455.1,-4237922.726,8511.937935].reverse(),s=[249958057e5,424441966400,3733650367,22459040.02,102042.605,354.9632885,1].reverse(),h=[1,.00183105,-3516396496e-14,2457520174e-15,-2.40337019e-7].reverse(),g=[.04687499995,-.0002002690873,8449199096e-15,-8.8228987e-7,1.05787412e-7].reverse(),o((function(n){var e=0,o=0,c=0,s=n*n,h=n-.785398164;return n<8?e=(o=r(u,s))/(c=r(a,s))+i*E(n,0)*t.log(n):(o=r(f,s=64/s),c=r(l,s),e=t.sqrt(i/n)*(t.sin(h)*o+t.cos(h)*c*8/n)),e}),(function(n){var e=0,o=0,u=0,a=n*n,f=n-2.356194491;return n<8?e=(o=n*r(c,a))/(u=r(s,a))+i*(E(n,1)*t.log(n)-1/n):(o=r(h,a=64/a),u=r(g,a),e=t.sqrt(i/n)*(t.sin(f)*o+t.cos(f)*u*8/n)),e}),0,1,-1)),N=(p=[1,3.5156229,3.0899424,1.2067492,.2659732,.0360768,.0045813].reverse(),m=[.39894228,.01328592,.00225319,-.00157565,.00916281,-.02057706,.02635537,-.01647633,.00392377].reverse(),d=[.5,.87890594,.51498869,.15084934,.02658733,.00301532,32411e-8].reverse(),v=[.39894228,-.03988024,-.00362018,.00163801,-.01031555,.02282967,-.02895312,.01787654,-.00420059].reverse(),function n(e,o){if(0===(o=Math.round(o)))return function(n){return n<=3.75?r(p,n*n/14.0625):t.exp(t.abs(n))/t.sqrt(t.abs(n))*r(m,3.75/t.abs(n))}(e);if(1===o)return function(n){return n<3.75?n*r(d,n*n/14.0625):(n<0?-1:1)*t.exp(t.abs(n))/t.sqrt(t.abs(n))*r(v,3.75/t.abs(n))}(e);if(o<0)return NaN;if(0===t.abs(e))return 0;if(e==1/0)return 1/0;var i,u=0,a=2/t.abs(e),f=0,l=1,c=0;for(i=2*t.round((o+t.round(t.sqrt(40*o)))/2);i>0;i--)c=i*a*l+f,f=l,l=c,t.abs(l)>1e10&&(l*=1e-10,f*=1e-10,u*=1e-10),i==o&&(u=f);return u*=n(e,0)/l,e<0&&o%2?-u:u}),w=function(){var n=[-.57721566,.4227842,.23069756,.0348859,.00262698,1075e-7,74e-7].reverse(),e=[1.25331414,-.07832358,.02189568,-.01062446,.00587872,-.0025154,53208e-8].reverse(),i=[1,.15443144,-.67278579,-.18156897,-.01919402,-.00110404,-4686e-8].reverse(),u=[1.25331414,.23498619,-.0365562,.01504268,-.00780353,.00325614,-68245e-8].reverse();return o((function(o){return o<=2?-t.log(o/2)*N(o,0)+r(n,o*o/4):t.exp(-o)/t.sqrt(o)*r(e,2/o)}),(function(n){return n<=2?t.log(n/2)*N(n,1)+1/n*r(i,n*n/4):t.exp(-n)/t.sqrt(n)*r(u,2/n)}),0,2,1)}();n.besselj=E,n.bessely=M,n.besseli=N,n.besselk=w},"undefined"==typeof DO_NOT_EXPORT_BESSEL?r(t):r({})},162:function(n){var t;n.exports=(t=function(n,t){var r=Array.prototype.concat,e=Array.prototype.slice,o=Object.prototype.toString;function i(t,r){var e=t>r?t:r;return n.pow(10,17-~~(n.log(e>0?e:-e)*n.LOG10E))}var u=Array.isArray||function(n){return"[object Array]"===o.call(n)};function a(n){return"[object Function]"===o.call(n)}function f(n){return"number"==typeof n&&n-n==0}function l(){return new l._init(arguments)}function c(){return 0}function s(){return 1}function h(n,t){return n===t?1:0}l.fn=l.prototype,l._init=function(n){if(u(n[0]))if(u(n[0][0])){a(n[1])&&(n[0]=l.map(n[0],n[1]));for(var t=0;t<n[0].length;t++)this[t]=n[0][t];this.length=n[0].length}else this[0]=a(n[1])?l.map(n[0],n[1]):n[0],this.length=1;else if(f(n[0]))this[0]=l.seq.apply(null,n),this.length=1;else{if(n[0]instanceof l)return l(n[0].toArray());this[0]=[],this.length=1}return this},l._init.prototype=l.prototype,l._init.constructor=l,l.utils={calcRdx:i,isArray:u,isFunction:a,isNumber:f,toVector:function(n){return r.apply([],n)}},l._random_fn=n.random,l.setRandom=function(n){if("function"!=typeof n)throw new TypeError("fn is not a function");l._random_fn=n},l.extend=function(n){var t,r;if(1===arguments.length){for(r in n)l[r]=n[r];return this}for(t=1;t<arguments.length;t++)for(r in arguments[t])n[r]=arguments[t][r];return n},l.rows=function(n){return n.length||1},l.cols=function(n){return n[0].length||1},l.dimensions=function(n){return{rows:l.rows(n),cols:l.cols(n)}},l.row=function(n,t){return u(t)?t.map((function(t){return l.row(n,t)})):n[t]},l.rowa=function(n,t){return l.row(n,t)},l.col=function(n,t){if(u(t)){var r=l.arange(n.length).map((function(){return new Array(t.length)}));return t.forEach((function(t,e){l.arange(n.length).forEach((function(o){r[o][e]=n[o][t]}))})),r}for(var e=new Array(n.length),o=0;o<n.length;o++)e[o]=[n[o][t]];return e},l.cola=function(n,t){return l.col(n,t).map((function(n){return n[0]}))},l.diag=function(n){for(var t=l.rows(n),r=new Array(t),e=0;e<t;e++)r[e]=[n[e][e]];return r},l.antidiag=function(n){for(var t=l.rows(n)-1,r=new Array(t),e=0;t>=0;t--,e++)r[e]=[n[e][t]];return r},l.transpose=function(n){var t,r,e,o,i,a=[];for(u(n[0])||(n=[n]),r=n.length,e=n[0].length,i=0;i<e;i++){for(t=new Array(r),o=0;o<r;o++)t[o]=n[o][i];a.push(t)}return 1===a.length?a[0]:a},l.map=function(n,t,r){var e,o,i,a,f;for(u(n[0])||(n=[n]),o=n.length,i=n[0].length,a=r?n:new Array(o),e=0;e<o;e++)for(a[e]||(a[e]=new Array(i)),f=0;f<i;f++)a[e][f]=t(n[e][f],e,f);return 1===a.length?a[0]:a},l.cumreduce=function(n,t,r){var e,o,i,a,f;for(u(n[0])||(n=[n]),o=n.length,i=n[0].length,a=r?n:new Array(o),e=0;e<o;e++)for(a[e]||(a[e]=new Array(i)),i>0&&(a[e][0]=n[e][0]),f=1;f<i;f++)a[e][f]=t(a[e][f-1],n[e][f]);return 1===a.length?a[0]:a},l.alter=function(n,t){return l.map(n,t,!0)},l.create=function(n,t,r){var e,o,i=new Array(n);for(a(t)&&(r=t,t=n),e=0;e<n;e++)for(i[e]=new Array(t),o=0;o<t;o++)i[e][o]=r(e,o);return i},l.zeros=function(n,t){return f(t)||(t=n),l.create(n,t,c)},l.ones=function(n,t){return f(t)||(t=n),l.create(n,t,s)},l.rand=function(n,t){return f(t)||(t=n),l.create(n,t,l._random_fn)},l.identity=function(n,t){return f(t)||(t=n),l.create(n,t,h)},l.symmetric=function(n){var t,r,e=n.length;if(n.length!==n[0].length)return!1;for(t=0;t<e;t++)for(r=0;r<e;r++)if(n[r][t]!==n[t][r])return!1;return!0},l.clear=function(n){return l.alter(n,c)},l.seq=function(n,t,r,e){a(e)||(e=!1);var o,u=[],f=i(n,t),l=(t*f-n*f)/((r-1)*f),c=n;for(o=0;c<=t&&o<r;c=(n*f+l*f*++o)/f)u.push(e?e(c,o):c);return u},l.arange=function(n,r,e){var o,i=[];if(e=e||1,r===t&&(r=n,n=0),n===r||0===e)return[];if(n<r&&e<0)return[];if(n>r&&e>0)return[];if(e>0)for(o=n;o<r;o+=e)i.push(o);else for(o=n;o>r;o+=e)i.push(o);return i},l.slice=function(){function n(n,r,e,o){var i,u=[],a=n.length;if(r===t&&e===t&&o===t)return l.copy(n);if(o=o||1,(r=(r=r||0)>=0?r:a+r)===(e=(e=e||n.length)>=0?e:a+e)||0===o)return[];if(r<e&&o<0)return[];if(r>e&&o>0)return[];if(o>0)for(i=r;i<e;i+=o)u.push(n[i]);else for(i=r;i>e;i+=o)u.push(n[i]);return u}return function(t,r){var e,o;return f((r=r||{}).row)?f(r.col)?t[r.row][r.col]:n(l.rowa(t,r.row),(e=r.col||{}).start,e.end,e.step):f(r.col)?n(l.cola(t,r.col),(o=r.row||{}).start,o.end,o.step):(o=r.row||{},e=r.col||{},n(t,o.start,o.end,o.step).map((function(t){return n(t,e.start,e.end,e.step)})))}}(),l.sliceAssign=function(r,e,o){var i,u;if(f(e.row)){if(f(e.col))return r[e.row][e.col]=o;e.col=e.col||{},e.col.start=e.col.start||0,e.col.end=e.col.end||r[0].length,e.col.step=e.col.step||1,i=l.arange(e.col.start,n.min(r.length,e.col.end),e.col.step);var a=e.row;return i.forEach((function(n,t){r[a][n]=o[t]})),r}if(f(e.col)){e.row=e.row||{},e.row.start=e.row.start||0,e.row.end=e.row.end||r.length,e.row.step=e.row.step||1,u=l.arange(e.row.start,n.min(r[0].length,e.row.end),e.row.step);var c=e.col;return u.forEach((function(n,t){r[n][c]=o[t]})),r}return o[0].length===t&&(o=[o]),e.row.start=e.row.start||0,e.row.end=e.row.end||r.length,e.row.step=e.row.step||1,e.col.start=e.col.start||0,e.col.end=e.col.end||r[0].length,e.col.step=e.col.step||1,u=l.arange(e.row.start,n.min(r.length,e.row.end),e.row.step),i=l.arange(e.col.start,n.min(r[0].length,e.col.end),e.col.step),u.forEach((function(n,t){i.forEach((function(e,i){r[n][e]=o[t][i]}))})),r},l.diagonal=function(n){var t=l.zeros(n.length,n.length);return n.forEach((function(n,r){t[r][r]=n})),t},l.copy=function(n){return n.map((function(n){return f(n)?n:n.map((function(n){return n}))}))};var g=l.prototype;return g.length=0,g.push=Array.prototype.push,g.sort=Array.prototype.sort,g.splice=Array.prototype.splice,g.slice=Array.prototype.slice,g.toArray=function(){return this.length>1?e.call(this):e.call(this)[0]},g.map=function(n,t){return l(l.map(this,n,t))},g.cumreduce=function(n,t){return l(l.cumreduce(this,n,t))},g.alter=function(n){return l.alter(this,n),this},function(n){for(var t=0;t<n.length;t++)!function(n){g[n]=function(t){var r,e=this;return t?(setTimeout((function(){t.call(e,g[n].call(e))})),this):(r=l[n](this),u(r)?l(r):r)}}(n[t])}("transpose clear symmetric rows cols dimensions diag antidiag".split(" ")),function(n){for(var t=0;t<n.length;t++)!function(n){g[n]=function(t,r){var e=this;return r?(setTimeout((function(){r.call(e,g[n].call(e,t))})),this):l(l[n](this,t))}}(n[t])}("row col".split(" ")),function(n){for(var t=0;t<n.length;t++)!function(n){g[n]=function(){return l(l[n].apply(null,arguments))}}(n[t])}("create zeros ones rand identity".split(" ")),l}(Math),function(n,t){var r=n.utils.isFunction;function e(n,t){return n-t}function o(n,r,e){return t.max(r,t.min(n,e))}n.sum=function(n){for(var t=0,r=n.length;--r>=0;)t+=n[r];return t},n.sumsqrd=function(n){for(var t=0,r=n.length;--r>=0;)t+=n[r]*n[r];return t},n.sumsqerr=function(t){for(var r,e=n.mean(t),o=0,i=t.length;--i>=0;)o+=(r=t[i]-e)*r;return o},n.sumrow=function(n){for(var t=0,r=n.length;--r>=0;)t+=n[r];return t},n.product=function(n){for(var t=1,r=n.length;--r>=0;)t*=n[r];return t},n.min=function(n){for(var t=n[0],r=0;++r<n.length;)n[r]<t&&(t=n[r]);return t},n.max=function(n){for(var t=n[0],r=0;++r<n.length;)n[r]>t&&(t=n[r]);return t},n.unique=function(n){for(var t={},r=[],e=0;e<n.length;e++)t[n[e]]||(t[n[e]]=!0,r.push(n[e]));return r},n.mean=function(t){return n.sum(t)/t.length},n.meansqerr=function(t){return n.sumsqerr(t)/t.length},n.geomean=function(r){var e=r.map(t.log),o=n.mean(e);return t.exp(o)},n.median=function(n){var t=n.length,r=n.slice().sort(e);return 1&t?r[t/2|0]:(r[t/2-1]+r[t/2])/2},n.cumsum=function(t){return n.cumreduce(t,(function(n,t){return n+t}))},n.cumprod=function(t){return n.cumreduce(t,(function(n,t){return n*t}))},n.diff=function(n){var t,r=[],e=n.length;for(t=1;t<e;t++)r.push(n[t]-n[t-1]);return r},n.rank=function(n){var t,r=[],o={};for(t=0;t<n.length;t++)o[f=n[t]]?o[f]++:(o[f]=1,r.push(f));var i=r.sort(e),u={},a=1;for(t=0;t<i.length;t++){var f,l=o[f=i[t]],c=(a+(a+l-1))/2;u[f]=c,a+=l}return n.map((function(n){return u[n]}))},n.mode=function(n){var t,r=n.length,o=n.slice().sort(e),i=1,u=0,a=0,f=[];for(t=0;t<r;t++)o[t]===o[t+1]?i++:(i>u?(f=[o[t]],u=i,a=0):i===u&&(f.push(o[t]),a++),i=1);return 0===a?f[0]:f},n.range=function(t){return n.max(t)-n.min(t)},n.variance=function(t,r){return n.sumsqerr(t)/(t.length-(r?1:0))},n.pooledvariance=function(t){return t.reduce((function(t,r){return t+n.sumsqerr(r)}),0)/(t.reduce((function(n,t){return n+t.length}),0)-t.length)},n.deviation=function(t){for(var r=n.mean(t),e=t.length,o=new Array(e),i=0;i<e;i++)o[i]=t[i]-r;return o},n.stdev=function(r,e){return t.sqrt(n.variance(r,e))},n.pooledstdev=function(r){return t.sqrt(n.pooledvariance(r))},n.meandev=function(r){for(var e=n.mean(r),o=[],i=r.length-1;i>=0;i--)o.push(t.abs(r[i]-e));return n.mean(o)},n.meddev=function(r){for(var e=n.median(r),o=[],i=r.length-1;i>=0;i--)o.push(t.abs(r[i]-e));return n.median(o)},n.coeffvar=function(t){return n.stdev(t)/n.mean(t)},n.quartiles=function(n){var r=n.length,o=n.slice().sort(e);return[o[t.round(r/4)-1],o[t.round(r/2)-1],o[t.round(3*r/4)-1]]},n.quantiles=function(n,r,i,u){var a,f,l,c,s,h=n.slice().sort(e),g=[r.length],p=n.length;for(void 0===i&&(i=3/8),void 0===u&&(u=3/8),a=0;a<r.length;a++)l=p*(f=r[a])+(i+f*(1-i-u)),c=t.floor(o(l,1,p-1)),s=o(l-c,0,1),g[a]=(1-s)*h[c-1]+s*h[c];return g},n.percentile=function(n,t,r){var o=n.slice().sort(e),i=t*(o.length+(r?1:-1))+(r?0:1),u=parseInt(i),a=i-u;return u+1<o.length?o[u-1]+a*(o[u]-o[u-1]):o[u-1]},n.percentileOfScore=function(n,t,r){var e,o,i=0,u=n.length,a=!1;for("strict"===r&&(a=!0),o=0;o<u;o++)e=n[o],(a&&e<t||!a&&e<=t)&&i++;return i/u},n.histogram=function(r,e){e=e||4;var o,i=n.min(r),u=(n.max(r)-i)/e,a=r.length,f=[];for(o=0;o<e;o++)f[o]=0;for(o=0;o<a;o++)f[t.min(t.floor((r[o]-i)/u),e-1)]+=1;return f},n.covariance=function(t,r){var e,o=n.mean(t),i=n.mean(r),u=t.length,a=new Array(u);for(e=0;e<u;e++)a[e]=(t[e]-o)*(r[e]-i);return n.sum(a)/(u-1)},n.corrcoeff=function(t,r){return n.covariance(t,r)/n.stdev(t,1)/n.stdev(r,1)},n.spearmancoeff=function(t,r){return t=n.rank(t),r=n.rank(r),n.corrcoeff(t,r)},n.stanMoment=function(r,e){for(var o=n.mean(r),i=n.stdev(r),u=r.length,a=0,f=0;f<u;f++)a+=t.pow((r[f]-o)/i,e);return a/r.length},n.skewness=function(t){return n.stanMoment(t,3)},n.kurtosis=function(t){return n.stanMoment(t,4)-3};var i=n.prototype;!function(t){for(var e=0;e<t.length;e++)!function(t){i[t]=function(e,o){var u=[],a=0,f=this;if(r(e)&&(o=e,e=!1),o)return setTimeout((function(){o.call(f,i[t].call(f,e))})),this;if(this.length>1){for(f=!0===e?this:this.transpose();a<f.length;a++)u[a]=n[t](f[a]);return u}return n[t](this[0],e)}}(t[e])}("cumsum cumprod".split(" ")),function(t){for(var e=0;e<t.length;e++)!function(t){i[t]=function(e,o){var u=[],a=0,f=this;if(r(e)&&(o=e,e=!1),o)return setTimeout((function(){o.call(f,i[t].call(f,e))})),this;if(this.length>1){for("sumrow"!==t&&(f=!0===e?this:this.transpose());a<f.length;a++)u[a]=n[t](f[a]);return!0===e?n[t](n.utils.toVector(u)):u}return n[t](this[0],e)}}(t[e])}("sum sumsqrd sumsqerr sumrow product min max unique mean meansqerr geomean median diff rank mode range variance deviation stdev meandev meddev coeffvar quartiles histogram skewness kurtosis".split(" ")),function(t){for(var e=0;e<t.length;e++)!function(t){i[t]=function(){var e,o=[],u=0,a=this,f=Array.prototype.slice.call(arguments);if(r(f[f.length-1])){e=f[f.length-1];var l=f.slice(0,f.length-1);return setTimeout((function(){e.call(a,i[t].apply(a,l))})),this}e=void 0;var c=function(r){return n[t].apply(a,[r].concat(f))};if(this.length>1){for(a=a.transpose();u<a.length;u++)o[u]=c(a[u]);return o}return c(this[0])}}(t[e])}("quantiles percentileOfScore".split(" "))}(t,Math),function(n,t){n.gammaln=function(n){var r,e,o,i=0,u=[76.18009172947146,-86.50532032941678,24.01409824083091,-1.231739572450155,.001208650973866179,-5395239384953e-18],a=1.000000000190015;for(o=(e=r=n)+5.5,o-=(r+.5)*t.log(o);i<6;i++)a+=u[i]/++e;return t.log(2.5066282746310007*a/r)-o},n.loggam=function(n){var r,e,o,i,u,a,f,l=[.08333333333333333,-.002777777777777778,.0007936507936507937,-.0005952380952380952,.0008417508417508418,-.001917526917526918,.00641025641025641,-.02955065359477124,.1796443723688307,-1.3924322169059];if(r=n,f=0,1==n||2==n)return 0;for(n<=7&&(r=n+(f=t.floor(7-n))),e=1/(r*r),o=2*t.PI,u=l[9],a=8;a>=0;a--)u*=e,u+=l[a];if(i=u/r+.5*t.log(o)+(r-.5)*t.log(r)-r,n<=7)for(a=1;a<=f;a++)i-=t.log(r-1),r-=1;return i},n.gammafn=function(n){var r,e,o,i,u=[-1.716185138865495,24.76565080557592,-379.80425647094563,629.3311553128184,866.9662027904133,-31451.272968848367,-36144.413418691176,66456.14382024054],a=[-30.8402300119739,315.35062697960416,-1015.1563674902192,-3107.771671572311,22538.11842098015,4755.846277527881,-134659.9598649693,-115132.2596755535],f=!1,l=0,c=0,s=0,h=n;if(n>171.6243769536076)return 1/0;if(h<=0){if(!(i=h%1+36e-17))return 1/0;f=(1&h?-1:1)*t.PI/t.sin(t.PI*i),h=1-h}for(o=h,e=h<1?h++:(h-=l=(0|h)-1)-1,r=0;r<8;++r)s=(s+u[r])*e,c=c*e+a[r];if(i=s/c+1,o<h)i/=o;else if(o>h)for(r=0;r<l;++r)i*=h,h++;return f&&(i=f/i),i},n.gammap=function(t,r){return n.lowRegGamma(t,r)*n.gammafn(t)},n.lowRegGamma=function(r,e){var o,i=n.gammaln(r),u=r,a=1/r,f=a,l=e+1-r,c=1/1e-30,s=1/l,h=s,g=1,p=-~(8.5*t.log(r>=1?r:1/r)+.4*r+17);if(e<0||r<=0)return NaN;if(e<r+1){for(;g<=p;g++)a+=f*=e/++u;return a*t.exp(-e+r*t.log(e)-i)}for(;g<=p;g++)h*=(s=1/(s=(o=-g*(g-r))*s+(l+=2)))*(c=l+o/c);return 1-h*t.exp(-e+r*t.log(e)-i)},n.factorialln=function(t){return t<0?NaN:n.gammaln(t+1)},n.factorial=function(t){return t<0?NaN:n.gammafn(t+1)},n.combination=function(r,e){return r>170||e>170?t.exp(n.combinationln(r,e)):n.factorial(r)/n.factorial(e)/n.factorial(r-e)},n.combinationln=function(t,r){return n.factorialln(t)-n.factorialln(r)-n.factorialln(t-r)},n.permutation=function(t,r){return n.factorial(t)/n.factorial(t-r)},n.betafn=function(r,e){if(!(r<=0||e<=0))return r+e>170?t.exp(n.betaln(r,e)):n.gammafn(r)*n.gammafn(e)/n.gammafn(r+e)},n.betaln=function(t,r){return n.gammaln(t)+n.gammaln(r)-n.gammaln(t+r)},n.betacf=function(n,r,e){var o,i,u,a,f=1e-30,l=1,c=r+e,s=r+1,h=r-1,g=1,p=1-c*n/s;for(t.abs(p)<f&&(p=f),a=p=1/p;l<=100&&(p=1+(i=l*(e-l)*n/((h+(o=2*l))*(r+o)))*p,t.abs(p)<f&&(p=f),g=1+i/g,t.abs(g)<f&&(g=f),a*=(p=1/p)*g,p=1+(i=-(r+l)*(c+l)*n/((r+o)*(s+o)))*p,t.abs(p)<f&&(p=f),g=1+i/g,t.abs(g)<f&&(g=f),a*=u=(p=1/p)*g,!(t.abs(u-1)<3e-7));l++);return a},n.gammapinv=function(r,e){var o,i,u,a,f,l,c=0,s=e-1,h=n.gammaln(e);if(r>=1)return t.max(100,e+100*t.sqrt(e));if(r<=0)return 0;for(e>1?(f=t.log(s),l=t.exp(s*(f-1)-h),a=r<.5?r:1-r,o=(2.30753+.27061*(i=t.sqrt(-2*t.log(a))))/(1+i*(.99229+.04481*i))-i,r<.5&&(o=-o),o=t.max(.001,e*t.pow(1-1/(9*e)-o/(3*t.sqrt(e)),3))):o=r<(i=1-e*(.253+.12*e))?t.pow(r/i,1/e):1-t.log(1-(r-i)/(1-i));c<12;c++){if(o<=0)return 0;if((o-=i=(u=(n.lowRegGamma(e,o)-r)/(i=e>1?l*t.exp(-(o-s)+s*(t.log(o)-f)):t.exp(-o+s*t.log(o)-h)))/(1-.5*t.min(1,u*((e-1)/o-1))))<=0&&(o=.5*(o+i)),t.abs(i)<1e-8*o)break}return o},n.erf=function(n){var r,e,o,i,u=[-1.3026537197817094,.6419697923564902,.019476473204185836,-.00956151478680863,-.000946595344482036,.000366839497852761,42523324806907e-18,-20278578112534e-18,-1624290004647e-18,130365583558e-17,1.5626441722e-8,-8.5238095915e-8,6.529054439e-9,5.059343495e-9,-9.91364156e-10,-2.27365122e-10,96467911e-18,2394038e-18,-6886027e-18,894487e-18,313092e-18,-112708e-18,381e-18,7106e-18,-1523e-18,-94e-18,121e-18,-28e-18],a=u.length-1,f=!1,l=0,c=0;for(n<0&&(n=-n,f=!0),e=4*(r=2/(2+n))-2;a>0;a--)o=l,l=e*l-c+u[a],c=o;return i=r*t.exp(-n*n+.5*(u[0]+e*l)-c),f?i-1:1-i},n.erfc=function(t){return 1-n.erf(t)},n.erfcinv=function(r){var e,o,i,u,a=0;if(r>=2)return-100;if(r<=0)return 100;for(u=r<1?r:2-r,e=-.70711*((2.30753+.27061*(i=t.sqrt(-2*t.log(u/2))))/(1+i*(.99229+.04481*i))-i);a<2;a++)e+=(o=n.erfc(e)-u)/(1.1283791670955126*t.exp(-e*e)-e*o);return r<1?e:-e},n.ibetainv=function(r,e,o){var i,u,a,f,l,c,s,h,g,p,m=e-1,d=o-1,v=0;if(r<=0)return 0;if(r>=1)return 1;for(e>=1&&o>=1?(a=r<.5?r:1-r,c=(2.30753+.27061*(f=t.sqrt(-2*t.log(a))))/(1+f*(.99229+.04481*f))-f,r<.5&&(c=-c),s=(c*c-3)/6,h=2/(1/(2*e-1)+1/(2*o-1)),g=c*t.sqrt(s+h)/h-(1/(2*o-1)-1/(2*e-1))*(s+5/6-2/(3*h)),c=e/(e+o*t.exp(2*g))):(i=t.log(e/(e+o)),u=t.log(o/(e+o)),c=r<(f=t.exp(e*i)/e)/(g=f+(l=t.exp(o*u)/o))?t.pow(e*g*r,1/e):1-t.pow(o*g*(1-r),1/o)),p=-n.gammaln(e)-n.gammaln(o)+n.gammaln(e+o);v<10;v++){if(0===c||1===c)return c;if((c-=f=(l=(n.ibeta(c,e,o)-r)/(f=t.exp(m*t.log(c)+d*t.log(1-c)+p)))/(1-.5*t.min(1,l*(m/c-d/(1-c)))))<=0&&(c=.5*(c+f)),c>=1&&(c=.5*(c+f+1)),t.abs(f)<1e-8*c&&v>0)break}return c},n.ibeta=function(r,e,o){var i=0===r||1===r?0:t.exp(n.gammaln(e+o)-n.gammaln(e)-n.gammaln(o)+e*t.log(r)+o*t.log(1-r));return!(r<0||r>1)&&(r<(e+1)/(e+o+2)?i*n.betacf(r,e,o)/e:1-i*n.betacf(1-r,o,e)/o)},n.randn=function(r,e){var o,i,u,a,f;if(e||(e=r),r)return n.create(r,e,(function(){return n.randn()}));do{o=n._random_fn(),i=1.7156*(n._random_fn()-.5),f=(u=o-.449871)*u+(a=t.abs(i)+.386595)*(.196*a-.25472*u)}while(f>.27597&&(f>.27846||i*i>-4*t.log(o)*o*o));return i/o},n.randg=function(r,e,o){var i,u,a,f,l,c,s=r;if(o||(o=e),r||(r=1),e)return(c=n.zeros(e,o)).alter((function(){return n.randg(r)})),c;r<1&&(r+=1),i=r-1/3,u=1/t.sqrt(9*i);do{do{f=1+u*(l=n.randn())}while(f<=0);f*=f*f,a=n._random_fn()}while(a>1-.331*t.pow(l,4)&&t.log(a)>.5*l*l+i*(1-f+t.log(f)));if(r==s)return i*f;do{a=n._random_fn()}while(0===a);return t.pow(a,1/s)*i*f},function(t){for(var r=0;r<t.length;r++)!function(t){n.fn[t]=function(){return n(n.map(this,(function(r){return n[t](r)})))}}(t[r])}("gammaln gammafn factorial factorialln".split(" ")),function(t){for(var r=0;r<t.length;r++)!function(t){n.fn[t]=function(){return n(n[t].apply(null,arguments))}}(t[r])}("randn".split(" "))}(t,Math),function(n,t){function r(n,r,e,o){for(var i,u=0,a=1,f=1,l=1,c=0,s=0;t.abs((f-s)/f)>o;)s=f,a=l+(i=-(r+c)*(r+e+c)*n/(r+2*c)/(r+2*c+1))*a,f=(u=f+i*u)+(i=(c+=1)*(e-c)*n/(r+2*c-1)/(r+2*c))*f,u/=l=a+i*l,a/=l,f/=l,l=1;return f/r}function e(r,e,o){var i=[.9815606342467192,.9041172563704749,.7699026741943047,.5873179542866175,.3678314989981802,.1252334085114689],u=[.04717533638651183,.10693932599531843,.16007832854334622,.20316742672306592,.2334925365383548,.24914704581340277],a=.5*r;if(a>=8)return 1;var f,l=2*n.normal.cdf(a,0,1,1,0)-1;l=l>=t.exp(-50/o)?t.pow(l,o):0;for(var c=a,s=(8-a)/(f=r>3?2:3),h=c+s,g=0,p=o-1,m=1;m<=f;m++){for(var d=0,v=.5*(h+c),E=.5*(h-c),M=1;M<=12;M++){var N,w=v+E*(6<M?i[(N=12-M+1)-1]:-i[(N=M)-1]),y=w*w;if(y>60)break;var I=2*n.normal.cdf(w,0,1,1,0)*.5-2*n.normal.cdf(w,r,1,1,0)*.5;I>=t.exp(-30/p)&&(d+=I=u[N-1]*t.exp(-.5*y)*t.pow(I,p))}g+=d*=2*E*o/t.sqrt(2*t.PI),c=h,h+=s}return(l+=g)<=t.exp(-30/e)?0:(l=t.pow(l,e))>=1?1:l}!function(t){for(var r=0;r<t.length;r++)!function(t){n[t]=function n(t,r,e){return this instanceof n?(this._a=t,this._b=r,this._c=e,this):new n(t,r,e)},n.fn[t]=function(r,e,o){var i=n[t](r,e,o);return i.data=this,i},n[t].prototype.sample=function(r){var e=this._a,o=this._b,i=this._c;return r?n.alter(r,(function(){return n[t].sample(e,o,i)})):n[t].sample(e,o,i)},function(r){for(var e=0;e<r.length;e++)!function(r){n[t].prototype[r]=function(e){var o=this._a,i=this._b,u=this._c;return e||0===e||(e=this.data),"number"!=typeof e?n.fn.map.call(e,(function(e){return n[t][r](e,o,i,u)})):n[t][r](e,o,i,u)}}(r[e])}("pdf cdf inv".split(" ")),function(r){for(var e=0;e<r.length;e++)!function(r){n[t].prototype[r]=function(){return n[t][r](this._a,this._b,this._c)}}(r[e])}("mean median mode variance".split(" "))}(t[r])}("beta centralF cauchy chisquare exponential gamma invgamma kumaraswamy laplace lognormal noncentralt normal pareto studentt weibull uniform binomial negbin hypgeom poisson triangular tukey arcsine".split(" ")),n.extend(n.beta,{pdf:function(r,e,o){return r>1||r<0?0:1==e&&1==o?1:e<512&&o<512?t.pow(r,e-1)*t.pow(1-r,o-1)/n.betafn(e,o):t.exp((e-1)*t.log(r)+(o-1)*t.log(1-r)-n.betaln(e,o))},cdf:function(t,r,e){return t>1||t<0?1*(t>1):n.ibeta(t,r,e)},inv:function(t,r,e){return n.ibetainv(t,r,e)},mean:function(n,t){return n/(n+t)},median:function(t,r){return n.ibetainv(.5,t,r)},mode:function(n,t){return(n-1)/(n+t-2)},sample:function(t,r){var e=n.randg(t);return e/(e+n.randg(r))},variance:function(n,r){return n*r/(t.pow(n+r,2)*(n+r+1))}}),n.extend(n.centralF,{pdf:function(r,e,o){var i;return r<0?0:e<=2?0===r&&e<2?1/0:0===r&&2===e?1:1/n.betafn(e/2,o/2)*t.pow(e/o,e/2)*t.pow(r,e/2-1)*t.pow(1+e/o*r,-(e+o)/2):(i=e*r/(o+r*e),e*(o/(o+r*e))/2*n.binomial.pdf((e-2)/2,(e+o-2)/2,i))},cdf:function(t,r,e){return t<0?0:n.ibeta(r*t/(r*t+e),r/2,e/2)},inv:function(t,r,e){return e/(r*(1/n.ibetainv(t,r/2,e/2)-1))},mean:function(n,t){return t>2?t/(t-2):void 0},mode:function(n,t){return n>2?t*(n-2)/(n*(t+2)):void 0},sample:function(t,r){return 2*n.randg(t/2)/t/(2*n.randg(r/2)/r)},variance:function(n,t){if(!(t<=4))return 2*t*t*(n+t-2)/(n*(t-2)*(t-2)*(t-4))}}),n.extend(n.cauchy,{pdf:function(n,r,e){return e<0?0:e/(t.pow(n-r,2)+t.pow(e,2))/t.PI},cdf:function(n,r,e){return t.atan((n-r)/e)/t.PI+.5},inv:function(n,r,e){return r+e*t.tan(t.PI*(n-.5))},median:function(n){return n},mode:function(n){return n},sample:function(r,e){return n.randn()*t.sqrt(1/(2*n.randg(.5)))*e+r}}),n.extend(n.chisquare,{pdf:function(r,e){return r<0?0:0===r&&2===e?.5:t.exp((e/2-1)*t.log(r)-r/2-e/2*t.log(2)-n.gammaln(e/2))},cdf:function(t,r){return t<0?0:n.lowRegGamma(r/2,t/2)},inv:function(t,r){return 2*n.gammapinv(t,.5*r)},mean:function(n){return n},median:function(n){return n*t.pow(1-2/(9*n),3)},mode:function(n){return n-2>0?n-2:0},sample:function(t){return 2*n.randg(t/2)},variance:function(n){return 2*n}}),n.extend(n.exponential,{pdf:function(n,r){return n<0?0:r*t.exp(-r*n)},cdf:function(n,r){return n<0?0:1-t.exp(-r*n)},inv:function(n,r){return-t.log(1-n)/r},mean:function(n){return 1/n},median:function(n){return 1/n*t.log(2)},mode:function(){return 0},sample:function(r){return-1/r*t.log(n._random_fn())},variance:function(n){return t.pow(n,-2)}}),n.extend(n.gamma,{pdf:function(r,e,o){return r<0?0:0===r&&1===e?1/o:t.exp((e-1)*t.log(r)-r/o-n.gammaln(e)-e*t.log(o))},cdf:function(t,r,e){return t<0?0:n.lowRegGamma(r,t/e)},inv:function(t,r,e){return n.gammapinv(t,r)*e},mean:function(n,t){return n*t},mode:function(n,t){if(n>1)return(n-1)*t},sample:function(t,r){return n.randg(t)*r},variance:function(n,t){return n*t*t}}),n.extend(n.invgamma,{pdf:function(r,e,o){return r<=0?0:t.exp(-(e+1)*t.log(r)-o/r-n.gammaln(e)+e*t.log(o))},cdf:function(t,r,e){return t<=0?0:1-n.lowRegGamma(r,e/t)},inv:function(t,r,e){return e/n.gammapinv(1-t,r)},mean:function(n,t){return n>1?t/(n-1):void 0},mode:function(n,t){return t/(n+1)},sample:function(t,r){return r/n.randg(t)},variance:function(n,t){if(!(n<=2))return t*t/((n-1)*(n-1)*(n-2))}}),n.extend(n.kumaraswamy,{pdf:function(n,r,e){return 0===n&&1===r?e:1===n&&1===e?r:t.exp(t.log(r)+t.log(e)+(r-1)*t.log(n)+(e-1)*t.log(1-t.pow(n,r)))},cdf:function(n,r,e){return n<0?0:n>1?1:1-t.pow(1-t.pow(n,r),e)},inv:function(n,r,e){return t.pow(1-t.pow(1-n,1/e),1/r)},mean:function(t,r){return r*n.gammafn(1+1/t)*n.gammafn(r)/n.gammafn(1+1/t+r)},median:function(n,r){return t.pow(1-t.pow(2,-1/r),1/n)},mode:function(n,r){if(n>=1&&r>=1&&1!==n&&1!==r)return t.pow((n-1)/(n*r-1),1/n)},variance:function(){throw new Error("variance not yet implemented")}}),n.extend(n.lognormal,{pdf:function(n,r,e){return n<=0?0:t.exp(-t.log(n)-.5*t.log(2*t.PI)-t.log(e)-t.pow(t.log(n)-r,2)/(2*e*e))},cdf:function(r,e,o){return r<0?0:.5+.5*n.erf((t.log(r)-e)/t.sqrt(2*o*o))},inv:function(r,e,o){return t.exp(-1.4142135623730951*o*n.erfcinv(2*r)+e)},mean:function(n,r){return t.exp(n+r*r/2)},median:function(n){return t.exp(n)},mode:function(n,r){return t.exp(n-r*r)},sample:function(r,e){return t.exp(n.randn()*e+r)},variance:function(n,r){return(t.exp(r*r)-1)*t.exp(2*n+r*r)}}),n.extend(n.noncentralt,{pdf:function(r,e,o){return t.abs(o)<1e-14?n.studentt.pdf(r,e):t.abs(r)<1e-14?t.exp(n.gammaln((e+1)/2)-o*o/2-.5*t.log(t.PI*e)-n.gammaln(e/2)):e/r*(n.noncentralt.cdf(r*t.sqrt(1+2/e),e+2,o)-n.noncentralt.cdf(r,e,o))},cdf:function(r,e,o){var i=1e-14;if(t.abs(o)<i)return n.studentt.cdf(r,e);var u=!1;r<0&&(u=!0,o=-o);for(var a=n.normal.cdf(-o,0,1),f=i+1,l=f,c=r*r/(r*r+e),s=0,h=t.exp(-o*o/2),g=t.exp(-o*o/2-.5*t.log(2)-n.gammaln(1.5))*o;s<200||l>i||f>i;)l=f,s>0&&(h*=o*o/(2*s),g*=o*o/(2*(s+.5))),a+=.5*(f=h*n.beta.cdf(c,s+.5,e/2)+g*n.beta.cdf(c,s+1,e/2)),s++;return u?1-a:a}}),n.extend(n.normal,{pdf:function(n,r,e){return t.exp(-.5*t.log(2*t.PI)-t.log(e)-t.pow(n-r,2)/(2*e*e))},cdf:function(r,e,o){return.5*(1+n.erf((r-e)/t.sqrt(2*o*o)))},inv:function(t,r,e){return-1.4142135623730951*e*n.erfcinv(2*t)+r},mean:function(n){return n},median:function(n){return n},mode:function(n){return n},sample:function(t,r){return n.randn()*r+t},variance:function(n,t){return t*t}}),n.extend(n.pareto,{pdf:function(n,r,e){return n<r?0:e*t.pow(r,e)/t.pow(n,e+1)},cdf:function(n,r,e){return n<r?0:1-t.pow(r/n,e)},inv:function(n,r,e){return r/t.pow(1-n,1/e)},mean:function(n,r){if(!(r<=1))return r*t.pow(n,r)/(r-1)},median:function(n,r){return n*(r*t.SQRT2)},mode:function(n){return n},variance:function(n,r){if(!(r<=2))return n*n*r/(t.pow(r-1,2)*(r-2))}}),n.extend(n.studentt,{pdf:function(r,e){return e=e>1e100?1e100:e,1/(t.sqrt(e)*n.betafn(.5,e/2))*t.pow(1+r*r/e,-(e+1)/2)},cdf:function(r,e){var o=e/2;return n.ibeta((r+t.sqrt(r*r+e))/(2*t.sqrt(r*r+e)),o,o)},inv:function(r,e){var o=n.ibetainv(2*t.min(r,1-r),.5*e,.5);return o=t.sqrt(e*(1-o)/o),r>.5?o:-o},mean:function(n){return n>1?0:void 0},median:function(){return 0},mode:function(){return 0},sample:function(r){return n.randn()*t.sqrt(r/(2*n.randg(r/2)))},variance:function(n){return n>2?n/(n-2):n>1?1/0:void 0}}),n.extend(n.weibull,{pdf:function(n,r,e){return n<0||r<0||e<0?0:e/r*t.pow(n/r,e-1)*t.exp(-t.pow(n/r,e))},cdf:function(n,r,e){return n<0?0:1-t.exp(-t.pow(n/r,e))},inv:function(n,r,e){return r*t.pow(-t.log(1-n),1/e)},mean:function(t,r){return t*n.gammafn(1+1/r)},median:function(n,r){return n*t.pow(t.log(2),1/r)},mode:function(n,r){return r<=1?0:n*t.pow((r-1)/r,1/r)},sample:function(r,e){return r*t.pow(-t.log(n._random_fn()),1/e)},variance:function(r,e){return r*r*n.gammafn(1+2/e)-t.pow(n.weibull.mean(r,e),2)}}),n.extend(n.uniform,{pdf:function(n,t,r){return n<t||n>r?0:1/(r-t)},cdf:function(n,t,r){return n<t?0:n<r?(n-t)/(r-t):1},inv:function(n,t,r){return t+n*(r-t)},mean:function(n,t){return.5*(n+t)},median:function(t,r){return n.mean(t,r)},mode:function(){throw new Error("mode is not yet implemented")},sample:function(t,r){return t/2+r/2+(r/2-t/2)*(2*n._random_fn()-1)},variance:function(n,r){return t.pow(r-n,2)/12}}),n.extend(n.binomial,{pdf:function(r,e,o){return 0===o||1===o?e*o===r?1:0:n.combination(e,r)*t.pow(o,r)*t.pow(1-o,e-r)},cdf:function(e,o,i){var u,a=1e-10;if(e<0)return 0;if(e>=o)return 1;if(i<0||i>1||o<=0)return NaN;var f=i,l=(e=t.floor(e))+1,c=o-e,s=l+c,h=t.exp(n.gammaln(s)-n.gammaln(c)-n.gammaln(l)+l*t.log(f)+c*t.log(1-f));return u=f<(l+1)/(s+2)?h*r(f,l,c,a):1-h*r(1-f,c,l,a),t.round(1/a*(1-u))/(1/a)}}),n.extend(n.negbin,{pdf:function(r,e,o){return r===r>>>0&&(r<0?0:n.combination(r+e-1,e-1)*t.pow(1-o,r)*t.pow(o,e))},cdf:function(t,r,e){var o=0,i=0;if(t<0)return 0;for(;i<=t;i++)o+=n.negbin.pdf(i,r,e);return o}}),n.extend(n.hypgeom,{pdf:function(r,e,o,i){if(r!=r|0)return!1;if(r<0||r<o-(e-i))return 0;if(r>i||r>o)return 0;if(2*o>e)return 2*i>e?n.hypgeom.pdf(e-o-i+r,e,e-o,e-i):n.hypgeom.pdf(i-r,e,e-o,i);if(2*i>e)return n.hypgeom.pdf(o-r,e,o,e-i);if(o<i)return n.hypgeom.pdf(r,e,i,o);for(var u=1,a=0,f=0;f<r;f++){for(;u>1&&a<i;)u*=1-o/(e-a),a++;u*=(i-f)*(o-f)/((f+1)*(e-o-i+f+1))}for(;a<i;a++)u*=1-o/(e-a);return t.min(1,t.max(0,u))},cdf:function(r,e,o,i){if(r<0||r<o-(e-i))return 0;if(r>=i||r>=o)return 1;if(2*o>e)return 2*i>e?n.hypgeom.cdf(e-o-i+r,e,e-o,e-i):1-n.hypgeom.cdf(i-r-1,e,e-o,i);if(2*i>e)return 1-n.hypgeom.cdf(o-r-1,e,o,e-i);if(o<i)return n.hypgeom.cdf(r,e,i,o);for(var u=1,a=1,f=0,l=0;l<r;l++){for(;u>1&&f<i;){var c=1-o/(e-f);a*=c,u*=c,f++}u+=a*=(i-l)*(o-l)/((l+1)*(e-o-i+l+1))}for(;f<i;f++)u*=1-o/(e-f);return t.min(1,t.max(0,u))}}),n.extend(n.poisson,{pdf:function(r,e){return e<0||r%1!=0||r<0?0:t.pow(e,r)*t.exp(-e)/n.factorial(r)},cdf:function(t,r){var e=[],o=0;if(t<0)return 0;for(;o<=t;o++)e.push(n.poisson.pdf(o,r));return n.sum(e)},mean:function(n){return n},variance:function(n){return n},sampleSmall:function(r){var e=1,o=0,i=t.exp(-r);do{o++,e*=n._random_fn()}while(e>i);return o-1},sampleLarge:function(r){var e,o,i,u,a,f,l,c,s,h,g=r;for(u=t.sqrt(g),a=t.log(g),f=.02483*(l=.931+2.53*u)-.059,c=1.1239+1.1328/(l-3.4),s=.9277-3.6224/(l-2);;){if(o=t.random()-.5,i=t.random(),h=.5-t.abs(o),e=t.floor((2*f/h+l)*o+g+.43),h>=.07&&i<=s)return e;if(!(e<0||h<.013&&i>h)&&t.log(i)+t.log(c)-t.log(f/(h*h)+l)<=e*a-g-n.loggam(e+1))return e}},sample:function(n){return n<10?this.sampleSmall(n):this.sampleLarge(n)}}),n.extend(n.triangular,{pdf:function(n,t,r,e){return r<=t||e<t||e>r?NaN:n<t||n>r?0:n<e?2*(n-t)/((r-t)*(e-t)):n===e?2/(r-t):2*(r-n)/((r-t)*(r-e))},cdf:function(n,r,e,o){return e<=r||o<r||o>e?NaN:n<=r?0:n>=e?1:n<=o?t.pow(n-r,2)/((e-r)*(o-r)):1-t.pow(e-n,2)/((e-r)*(e-o))},inv:function(n,r,e,o){return e<=r||o<r||o>e?NaN:n<=(o-r)/(e-r)?r+(e-r)*t.sqrt(n*((o-r)/(e-r))):r+(e-r)*(1-t.sqrt((1-n)*(1-(o-r)/(e-r))))},mean:function(n,t,r){return(n+t+r)/3},median:function(n,r,e){return e<=(n+r)/2?r-t.sqrt((r-n)*(r-e))/t.sqrt(2):e>(n+r)/2?n+t.sqrt((r-n)*(e-n))/t.sqrt(2):void 0},mode:function(n,t,r){return r},sample:function(r,e,o){var i=n._random_fn();return i<(o-r)/(e-r)?r+t.sqrt(i*(e-r)*(o-r)):e-t.sqrt((1-i)*(e-r)*(e-o))},variance:function(n,t,r){return(n*n+t*t+r*r-n*t-n*r-t*r)/18}}),n.extend(n.arcsine,{pdf:function(n,r,e){return e<=r?NaN:n<=r||n>=e?0:2/t.PI*t.pow(t.pow(e-r,2)-t.pow(2*n-r-e,2),-.5)},cdf:function(n,r,e){return n<r?0:n<e?2/t.PI*t.asin(t.sqrt((n-r)/(e-r))):1},inv:function(n,r,e){return r+(.5-.5*t.cos(t.PI*n))*(e-r)},mean:function(n,t){return t<=n?NaN:(n+t)/2},median:function(n,t){return t<=n?NaN:(n+t)/2},mode:function(){throw new Error("mode is not yet implemented")},sample:function(r,e){return(r+e)/2+(e-r)/2*t.sin(2*t.PI*n.uniform.sample(0,1))},variance:function(n,r){return r<=n?NaN:t.pow(r-n,2)/8}}),n.extend(n.laplace,{pdf:function(n,r,e){return e<=0?0:t.exp(-t.abs(n-r)/e)/(2*e)},cdf:function(n,r,e){return e<=0?0:n<r?.5*t.exp((n-r)/e):1-.5*t.exp(-(n-r)/e)},mean:function(n){return n},median:function(n){return n},mode:function(n){return n},variance:function(n,t){return 2*t*t},sample:function(r,e){var o,i=n._random_fn()-.5;return r-e*((o=i)/t.abs(o))*t.log(1-2*t.abs(i))}}),n.extend(n.tukey,{cdf:function(r,o,i){var u=o,a=[.9894009349916499,.9445750230732326,.8656312023878318,.755404408355003,.6178762444026438,.45801677765722737,.2816035507792589,.09501250983763744],f=[.027152459411754096,.062253523938647894,.09515851168249279,.12462897125553388,.14959598881657674,.16915651939500254,.18260341504492358,.1894506104550685];if(r<=0)return 0;if(i<2||u<2)return NaN;if(!Number.isFinite(r))return 1;if(i>25e3)return e(r,1,u);var l,c=.5*i,s=c*t.log(i)-i*t.log(2)-n.gammaln(c),h=c-1,g=.25*i;l=i<=100?1:i<=800?.5:i<=5e3?.25:.125,s+=t.log(l);for(var p=0,m=1;m<=50;m++){for(var d=0,v=(2*m-1)*l,E=1;E<=16;E++){var M,N;8<E?(M=E-8-1,N=s+h*t.log(v+a[M]*l)-(a[M]*l+v)*g):(M=E-1,N=s+h*t.log(v-a[M]*l)+(a[M]*l-v)*g),N>=-30&&(d+=e(8<E?r*t.sqrt(.5*(a[M]*l+v)):r*t.sqrt(.5*(-a[M]*l+v)),1,u)*f[M]*t.exp(N))}if(m*l>=1&&d<=1e-14)break;p+=d}if(d>1e-14)throw new Error("tukey.cdf failed to converge");return p>1&&(p=1),p},inv:function(r,e,o){if(o<2||e<2)return NaN;if(r<0||r>1)return NaN;if(0===r)return 0;if(1===r)return 1/0;var i,u=function(n,r,e){var o=.5-.5*n,i=t.sqrt(t.log(1/(o*o))),u=i+((((-453642210148e-16*i-.204231210125)*i-.342242088547)*i-1)*i+.322232421088)/((((.0038560700634*i+.10353775285)*i+.531103462366)*i+.588581570495)*i+.099348462606);e<120&&(u+=(u*u*u+u)/e/4);var a=.8832-.2368*u;return e<120&&(a+=-1.214/e+1.208*u/e),u*(a*t.log(r-1)+1.4142)}(r,e,o),a=n.tukey.cdf(u,e,o)-r;i=a>0?t.max(0,u-1):u+1;for(var f,l=n.tukey.cdf(i,e,o)-r,c=1;c<50;c++)if(f=i-l*(i-u)/(l-a),a=l,u=i,f<0&&(f=0,l=-r),l=n.tukey.cdf(f,e,o)-r,i=f,t.abs(i-u)<1e-4)return f;throw new Error("tukey.inv failed to converge")}})}(t,Math),function(n,t){var r,e,o=Array.prototype.push,i=n.utils.isArray;function u(t){return i(t)||t instanceof n}n.extend({add:function(t,r){return u(r)?(u(r[0])||(r=[r]),n.map(t,(function(n,t,e){return n+r[t][e]}))):n.map(t,(function(n){return n+r}))},subtract:function(t,r){return u(r)?(u(r[0])||(r=[r]),n.map(t,(function(n,t,e){return n-r[t][e]||0}))):n.map(t,(function(n){return n-r}))},divide:function(t,r){return u(r)?(u(r[0])||(r=[r]),n.multiply(t,n.inv(r))):n.map(t,(function(n){return n/r}))},multiply:function(t,r){var e,o,i,a,f,l,c,s;if(void 0===t.length&&void 0===r.length)return t*r;if(f=t.length,l=t[0].length,c=n.zeros(f,i=u(r)?r[0].length:l),s=0,u(r)){for(;s<i;s++)for(e=0;e<f;e++){for(a=0,o=0;o<l;o++)a+=t[e][o]*r[o][s];c[e][s]=a}return 1===f&&1===s?c[0][0]:c}return n.map(t,(function(n){return n*r}))},outer:function(t,r){return n.multiply(t.map((function(n){return[n]})),[r])},dot:function(t,r){u(t[0])||(t=[t]),u(r[0])||(r=[r]);for(var e,o,i=1===t[0].length&&1!==t.length?n.transpose(t):t,a=1===r[0].length&&1!==r.length?n.transpose(r):r,f=[],l=0,c=i.length,s=i[0].length;l<c;l++){for(f[l]=[],e=0,o=0;o<s;o++)e+=i[l][o]*a[l][o];f[l]=e}return 1===f.length?f[0]:f},pow:function(r,e){return n.map(r,(function(n){return t.pow(n,e)}))},exp:function(r){return n.map(r,(function(n){return t.exp(n)}))},log:function(r){return n.map(r,(function(n){return t.log(n)}))},abs:function(r){return n.map(r,(function(n){return t.abs(n)}))},norm:function(n,r){var e=0,o=0;for(isNaN(r)&&(r=2),u(n[0])&&(n=n[0]);o<n.length;o++)e+=t.pow(t.abs(n[o]),r);return t.pow(e,1/r)},angle:function(r,e){return t.acos(n.dot(r,e)/(n.norm(r)*n.norm(e)))},aug:function(n,t){var r,e=[];for(r=0;r<n.length;r++)e.push(n[r].slice());for(r=0;r<e.length;r++)o.apply(e[r],t[r]);return e},inv:function(t){for(var r,e=t.length,o=t[0].length,i=n.identity(e,o),u=n.gauss_jordan(t,i),a=[],f=0;f<e;f++)for(a[f]=[],r=o;r<u[0].length;r++)a[f][r-o]=u[f][r];return a},det:function n(t){if(2===t.length)return t[0][0]*t[1][1]-t[0][1]*t[1][0];for(var r=0,e=0;e<t.length;e++){for(var o=[],i=1;i<t.length;i++){o[i-1]=[];for(var u=0;u<t.length;u++)u<e?o[i-1][u]=t[i][u]:u>e&&(o[i-1][u-1]=t[i][u])}var a=e%2?-1:1;r+=n(o)*t[0][e]*a}return r},gauss_elimination:function(r,e){var o,i,u,a,f=0,l=0,c=r.length,s=r[0].length,h=1,g=0,p=[];for(o=(r=n.aug(r,e))[0].length,f=0;f<c;f++){for(i=r[f][f],l=f,a=f+1;a<s;a++)i<t.abs(r[a][f])&&(i=r[a][f],l=a);if(l!=f)for(a=0;a<o;a++)u=r[f][a],r[f][a]=r[l][a],r[l][a]=u;for(l=f+1;l<c;l++)for(h=r[l][f]/r[f][f],a=f;a<o;a++)r[l][a]=r[l][a]-h*r[f][a]}for(f=c-1;f>=0;f--){for(g=0,l=f+1;l<=c-1;l++)g+=p[l]*r[f][l];p[f]=(r[f][o-1]-g)/r[f][f]}return p},gauss_jordan:function(r,e){var o,i,u,a=n.aug(r,e),f=a.length,l=a[0].length,c=0;for(i=0;i<f;i++){var s=i;for(u=i+1;u<f;u++)t.abs(a[u][i])>t.abs(a[s][i])&&(s=u);var h=a[i];for(a[i]=a[s],a[s]=h,u=i+1;u<f;u++)for(c=a[u][i]/a[i][i],o=i;o<l;o++)a[u][o]-=a[i][o]*c}for(i=f-1;i>=0;i--){for(c=a[i][i],u=0;u<i;u++)for(o=l-1;o>i-1;o--)a[u][o]-=a[i][o]*a[u][i]/c;for(a[i][i]/=c,o=f;o<l;o++)a[i][o]/=c}return a},triaUpSolve:function(t,r){var e,o=t[0].length,i=n.zeros(1,o)[0],u=!1;return null!=r[0].length&&(r=r.map((function(n){return n[0]})),u=!0),n.arange(o-1,-1,-1).forEach((function(u){e=n.arange(u+1,o).map((function(n){return i[n]*t[u][n]})),i[u]=(r[u]-n.sum(e))/t[u][u]})),u?i.map((function(n){return[n]})):i},triaLowSolve:function(t,r){var e,o=t[0].length,i=n.zeros(1,o)[0],u=!1;return null!=r[0].length&&(r=r.map((function(n){return n[0]})),u=!0),n.arange(o).forEach((function(o){e=n.arange(o).map((function(n){return t[o][n]*i[n]})),i[o]=(r[o]-n.sum(e))/t[o][o]})),u?i.map((function(n){return[n]})):i},lu:function(t){var r,e=t.length,o=n.identity(e),i=n.zeros(t.length,t[0].length);return n.arange(e).forEach((function(n){i[0][n]=t[0][n]})),n.arange(1,e).forEach((function(u){n.arange(u).forEach((function(e){r=n.arange(e).map((function(n){return o[u][n]*i[n][e]})),o[u][e]=(t[u][e]-n.sum(r))/i[e][e]})),n.arange(u,e).forEach((function(e){r=n.arange(u).map((function(n){return o[u][n]*i[n][e]})),i[u][e]=t[r.length][e]-n.sum(r)}))})),[o,i]},cholesky:function(r){var e,o=r.length,i=n.zeros(r.length,r[0].length);return n.arange(o).forEach((function(u){e=n.arange(u).map((function(n){return t.pow(i[u][n],2)})),i[u][u]=t.sqrt(r[u][u]-n.sum(e)),n.arange(u+1,o).forEach((function(t){e=n.arange(u).map((function(n){return i[u][n]*i[t][n]})),i[t][u]=(r[u][t]-n.sum(e))/i[u][u]}))})),i},gauss_jacobi:function(r,e,o,i){for(var u,a,f,l,c=0,s=0,h=r.length,g=[],p=[],m=[];c<h;c++)for(g[c]=[],p[c]=[],m[c]=[],s=0;s<h;s++)c>s?(g[c][s]=r[c][s],p[c][s]=m[c][s]=0):c<s?(p[c][s]=r[c][s],g[c][s]=m[c][s]=0):(m[c][s]=r[c][s],g[c][s]=p[c][s]=0);for(f=n.multiply(n.multiply(n.inv(m),n.add(g,p)),-1),a=n.multiply(n.inv(m),e),u=o,l=n.add(n.multiply(f,o),a),c=2;t.abs(n.norm(n.subtract(l,u)))>i;)u=l,l=n.add(n.multiply(f,u),a),c++;return l},gauss_seidel:function(r,e,o,i){for(var u,a,f,l,c,s=0,h=r.length,g=[],p=[],m=[];s<h;s++)for(g[s]=[],p[s]=[],m[s]=[],u=0;u<h;u++)s>u?(g[s][u]=r[s][u],p[s][u]=m[s][u]=0):s<u?(p[s][u]=r[s][u],g[s][u]=m[s][u]=0):(m[s][u]=r[s][u],g[s][u]=p[s][u]=0);for(l=n.multiply(n.multiply(n.inv(n.add(m,g)),p),-1),f=n.multiply(n.inv(n.add(m,g)),e),a=o,c=n.add(n.multiply(l,o),f),s=2;t.abs(n.norm(n.subtract(c,a)))>i;)a=c,c=n.add(n.multiply(l,a),f),s+=1;return c},SOR:function(r,e,o,i,u){for(var a,f,l,c,s,h=0,g=r.length,p=[],m=[],d=[];h<g;h++)for(p[h]=[],m[h]=[],d[h]=[],a=0;a<g;a++)h>a?(p[h][a]=r[h][a],m[h][a]=d[h][a]=0):h<a?(m[h][a]=r[h][a],p[h][a]=d[h][a]=0):(d[h][a]=r[h][a],p[h][a]=m[h][a]=0);for(c=n.multiply(n.inv(n.add(d,n.multiply(p,u))),n.subtract(n.multiply(d,1-u),n.multiply(m,u))),l=n.multiply(n.multiply(n.inv(n.add(d,n.multiply(p,u))),e),u),f=o,s=n.add(n.multiply(c,o),l),h=2;t.abs(n.norm(n.subtract(s,f)))>i;)f=s,s=n.add(n.multiply(c,f),l),h++;return s},householder:function(r){for(var e,o,i,u,a=r.length,f=r[0].length,l=0,c=[],s=[];l<a-1;l++){for(e=0,u=l+1;u<f;u++)e+=r[u][l]*r[u][l];for(e=(r[l+1][l]>0?-1:1)*t.sqrt(e),o=t.sqrt((e*e-r[l+1][l]*e)/2),(c=n.zeros(a,1))[l+1][0]=(r[l+1][l]-e)/(2*o),i=l+2;i<a;i++)c[i][0]=r[i][l]/(2*o);s=n.subtract(n.identity(a,f),n.multiply(n.multiply(c,n.transpose(c)),2)),r=n.multiply(s,n.multiply(r,s))}return r},QR:(r=n.sum,e=n.arange,function(o){var i,u,a,f=o.length,l=o[0].length,c=n.zeros(l,l);for(o=n.copy(o),u=0;u<l;u++){for(c[u][u]=t.sqrt(r(e(f).map((function(n){return o[n][u]*o[n][u]})))),i=0;i<f;i++)o[i][u]=o[i][u]/c[u][u];for(a=u+1;a<l;a++)for(c[u][a]=r(e(f).map((function(n){return o[n][u]*o[n][a]}))),i=0;i<f;i++)o[i][a]=o[i][a]-o[i][u]*c[u][a]}return[o,c]}),lstsq:function(t,r){var e=!1;void 0===r[0].length&&(r=r.map((function(n){return[n]})),e=!0);var o=n.QR(t),i=o[0],u=o[1],a=t[0].length,f=n.slice(i,{col:{end:a}}),l=function(t){var r=(t=n.copy(t)).length,e=n.identity(r);return n.arange(r-1,-1,-1).forEach((function(r){n.sliceAssign(e,{row:r},n.divide(n.slice(e,{row:r}),t[r][r])),n.sliceAssign(t,{row:r},n.divide(n.slice(t,{row:r}),t[r][r])),n.arange(r).forEach((function(o){var i=n.multiply(t[o][r],-1),u=n.slice(t,{row:o}),a=n.multiply(n.slice(t,{row:r}),i);n.sliceAssign(t,{row:o},n.add(u,a));var f=n.slice(e,{row:o}),l=n.multiply(n.slice(e,{row:r}),i);n.sliceAssign(e,{row:o},n.add(f,l))}))})),e}(n.slice(u,{row:{end:a}})),c=n.transpose(f);void 0===c[0].length&&(c=[c]);var s=n.multiply(n.multiply(l,c),r);return void 0===s.length&&(s=[[s]]),e?s.map((function(n){return n[0]})):s},jacobi:function(r){for(var e,o,i,u,a,f,l,c=1,s=r.length,h=n.identity(s,s),g=[];1===c;){for(a=r[0][1],i=0,u=1,e=0;e<s;e++)for(o=0;o<s;o++)e!=o&&a<t.abs(r[e][o])&&(a=t.abs(r[e][o]),i=e,u=o);for(f=r[i][i]===r[u][u]?r[i][u]>0?t.PI/4:-t.PI/4:t.atan(2*r[i][u]/(r[i][i]-r[u][u]))/2,(l=n.identity(s,s))[i][i]=t.cos(f),l[i][u]=-t.sin(f),l[u][i]=t.sin(f),l[u][u]=t.cos(f),h=n.multiply(h,l),r=n.multiply(n.multiply(n.inv(l),r),l),c=0,e=1;e<s;e++)for(o=1;o<s;o++)e!=o&&t.abs(r[e][o])>.001&&(c=1)}for(e=0;e<s;e++)g.push(r[e][e]);return[h,g]},rungekutta:function(n,t,r,e,o,i){var u,a,f;if(2===i)for(;e<=r;)o+=((u=t*n(e,o))+(a=t*n(e+t,o+u)))/2,e+=t;if(4===i)for(;e<=r;)o+=((u=t*n(e,o))+2*(a=t*n(e+t/2,o+u/2))+2*(f=t*n(e+t/2,o+a/2))+t*n(e+t,o+f))/6,e+=t;return o},romberg:function(n,r,e,o){for(var i,u,a,f,l,c=0,s=(e-r)/2,h=[],g=[],p=[];c<o/2;){for(l=n(r),a=r,f=0;a<=e;a+=s,f++)h[f]=a;for(i=h.length,a=1;a<i-1;a++)l+=(a%2!=0?4:2)*n(h[a]);l=s/3*(l+n(e)),p[c]=l,s/=2,c++}for(u=p.length,i=1;1!==u;){for(a=0;a<u-1;a++)g[a]=(t.pow(4,i)*p[a+1]-p[a])/(t.pow(4,i)-1);u=g.length,p=g,g=[],i++}return p},richardson:function(n,r,e,o){function i(n,t){for(var r,e=0,o=n.length;e<o;e++)n[e]===t&&(r=e);return r}for(var u,a,f,l,c,s=t.abs(e-n[i(n,e)+1]),h=0,g=[],p=[];o>=s;)u=i(n,e+o),a=i(n,e),g[h]=(r[u]-2*r[a]+r[2*a-u])/(o*o),o/=2,h++;for(l=g.length,f=1;1!=l;){for(c=0;c<l-1;c++)p[c]=(t.pow(4,f)*g[c+1]-g[c])/(t.pow(4,f)-1);l=p.length,g=p,p=[],f++}return g},simpson:function(n,t,r,e){for(var o,i=(r-t)/e,u=n(t),a=[],f=t,l=0,c=1;f<=r;f+=i,l++)a[l]=f;for(o=a.length;c<o-1;c++)u+=(c%2!=0?4:2)*n(a[c]);return i/3*(u+n(r))},hermite:function(n,t,r,e){for(var o,i=n.length,u=0,a=0,f=[],l=[],c=[],s=[];a<i;a++){for(f[a]=1,o=0;o<i;o++)a!=o&&(f[a]*=(e-n[o])/(n[a]-n[o]));for(l[a]=0,o=0;o<i;o++)a!=o&&(l[a]+=1/(n[a]-n[o]));c[a]=(1-2*(e-n[a])*l[a])*(f[a]*f[a]),s[a]=(e-n[a])*(f[a]*f[a]),u+=c[a]*t[a]+s[a]*r[a]}return u},lagrange:function(n,t,r){for(var e,o,i=0,u=0,a=n.length;u<a;u++){for(o=t[u],e=0;e<a;e++)u!=e&&(o*=(r-n[e])/(n[u]-n[e]));i+=o}return i},cubic_spline:function(t,r,e){for(var o,i,u=t.length,a=0,f=[],l=[],c=[],s=[],h=[],g=[];a<u-1;a++)s[a]=t[a+1]-t[a];for(c[0]=0,a=1;a<u-1;a++)c[a]=3/s[a]*(r[a+1]-r[a])-3/s[a-1]*(r[a]-r[a-1]);for(a=1;a<u-1;a++)f[a]=[],l[a]=[],f[a][a-1]=s[a-1],f[a][a]=2*(s[a-1]+s[a]),f[a][a+1]=s[a],l[a][0]=c[a];for(i=n.multiply(n.inv(f),l),o=0;o<u-1;o++)h[o]=(r[o+1]-r[o])/s[o]-s[o]*(i[o+1][0]+2*i[o][0])/3,g[o]=(i[o+1][0]-i[o][0])/(3*s[o]);for(o=0;o<u&&!(t[o]>e);o++);return r[o-=1]+(e-t[o])*h[o]+n.sq(e-t[o])*i[o]+(e-t[o])*n.sq(e-t[o])*g[o]},gauss_quadrature:function(){throw new Error("gauss_quadrature not yet implemented")},PCA:function(t){var r,e,o,i,u,a=t.length,f=t[0].length,l=0,c=[],s=[],h=[],g=[],p=[],m=[],d=[];for(l=0;l<a;l++)c[l]=n.sum(t[l])/f;for(l=0;l<f;l++)for(p[l]=[],r=0;r<a;r++)p[l][r]=t[r][l]-c[r];for(p=n.transpose(p),l=0;l<a;l++)for(m[l]=[],r=0;r<a;r++)m[l][r]=n.dot([p[l]],[p[r]])/(f-1);for(u=(o=n.jacobi(m))[0],s=o[1],d=n.transpose(u),l=0;l<s.length;l++)for(r=l;r<s.length;r++)s[l]<s[r]&&(e=s[l],s[l]=s[r],s[r]=e,h=d[l],d[l]=d[r],d[r]=h);for(i=n.transpose(p),l=0;l<a;l++)for(g[l]=[],r=0;r<i.length;r++)g[l][r]=n.dot([d[l]],[i[r]]);return[t,s,d,g]}}),function(t){for(var r=0;r<t.length;r++)!function(t){n.fn[t]=function(r,e){var o=this;return e?(setTimeout((function(){e.call(o,n.fn[t].call(o,r))}),15),this):"number"==typeof n[t](this,r)?n[t](this,r):n(n[t](this,r))}}(t[r])}("add divide multiply subtract dot pow exp log abs norm angle".split(" "))}(t,Math),function(n,t){var r=[].slice,e=n.utils.isNumber,o=n.utils.isArray;function i(n,r,e,o){if(n>1||e>1||n<=0||e<=0)throw new Error("Proportions should be greater than 0 and less than 1");var i=(n*r+e*o)/(r+o);return(n-e)/t.sqrt(i*(1-i)*(1/r+1/o))}n.extend({zscore:function(){var t=r.call(arguments);return e(t[1])?(t[0]-t[1])/t[2]:(t[0]-n.mean(t[1]))/n.stdev(t[1],t[2])},ztest:function(){var e,i=r.call(arguments);return o(i[1])?(e=n.zscore(i[0],i[1],i[3]),1===i[2]?n.normal.cdf(-t.abs(e),0,1):2*n.normal.cdf(-t.abs(e),0,1)):i.length>2?(e=n.zscore(i[0],i[1],i[2]),1===i[3]?n.normal.cdf(-t.abs(e),0,1):2*n.normal.cdf(-t.abs(e),0,1)):(e=i[0],1===i[1]?n.normal.cdf(-t.abs(e),0,1):2*n.normal.cdf(-t.abs(e),0,1))}}),n.extend(n.fn,{zscore:function(n,t){return(n-this.mean())/this.stdev(t)},ztest:function(r,e,o){var i=t.abs(this.zscore(r,o));return 1===e?n.normal.cdf(-i,0,1):2*n.normal.cdf(-i,0,1)}}),n.extend({tscore:function(){var e=r.call(arguments);return 4===e.length?(e[0]-e[1])/(e[2]/t.sqrt(e[3])):(e[0]-n.mean(e[1]))/(n.stdev(e[1],!0)/t.sqrt(e[1].length))},ttest:function(){var o,i=r.call(arguments);return 5===i.length?(o=t.abs(n.tscore(i[0],i[1],i[2],i[3])),1===i[4]?n.studentt.cdf(-o,i[3]-1):2*n.studentt.cdf(-o,i[3]-1)):e(i[1])?(o=t.abs(i[0]),1==i[2]?n.studentt.cdf(-o,i[1]-1):2*n.studentt.cdf(-o,i[1]-1)):(o=t.abs(n.tscore(i[0],i[1])),1==i[2]?n.studentt.cdf(-o,i[1].length-1):2*n.studentt.cdf(-o,i[1].length-1))}}),n.extend(n.fn,{tscore:function(n){return(n-this.mean())/(this.stdev(!0)/t.sqrt(this.cols()))},ttest:function(r,e){return 1===e?1-n.studentt.cdf(t.abs(this.tscore(r)),this.cols()-1):2*n.studentt.cdf(-t.abs(this.tscore(r)),this.cols()-1)}}),n.extend({anovafscore:function(){var e,o,i,u,a,f,l,c,s=r.call(arguments);if(1===s.length){for(a=new Array(s[0].length),l=0;l<s[0].length;l++)a[l]=s[0][l];s=a}for(o=new Array,l=0;l<s.length;l++)o=o.concat(s[l]);for(i=n.mean(o),e=0,l=0;l<s.length;l++)e+=s[l].length*t.pow(n.mean(s[l])-i,2);for(e/=s.length-1,f=0,l=0;l<s.length;l++)for(u=n.mean(s[l]),c=0;c<s[l].length;c++)f+=t.pow(s[l][c]-u,2);return e/(f/(o.length-s.length))},anovaftest:function(){var t,o,i,u,a=r.call(arguments);if(e(a[0]))return 1-n.centralF.cdf(a[0],a[1],a[2]);var f=n.anovafscore(a);for(t=a.length-1,i=0,u=0;u<a.length;u++)i+=a[u].length;return o=i-t-1,1-n.centralF.cdf(f,t,o)},ftest:function(t,r,e){return 1-n.centralF.cdf(t,r,e)}}),n.extend(n.fn,{anovafscore:function(){return n.anovafscore(this.toArray())},anovaftes:function(){var t,r=0;for(t=0;t<this.length;t++)r+=this[t].length;return n.ftest(this.anovafscore(),this.length-1,r-this.length)}}),n.extend({qscore:function(){var o,i,u,a,f,l=r.call(arguments);return e(l[0])?(o=l[0],i=l[1],u=l[2],a=l[3],f=l[4]):(o=n.mean(l[0]),i=n.mean(l[1]),u=l[0].length,a=l[1].length,f=l[2]),t.abs(o-i)/(f*t.sqrt((1/u+1/a)/2))},qtest:function(){var t,e=r.call(arguments);3===e.length?(t=e[0],e=e.slice(1)):7===e.length?(t=n.qscore(e[0],e[1],e[2],e[3],e[4]),e=e.slice(5)):(t=n.qscore(e[0],e[1],e[2]),e=e.slice(3));var o=e[0],i=e[1];return 1-n.tukey.cdf(t,i,o-i)},tukeyhsd:function(t){for(var r=n.pooledstdev(t),e=t.map((function(t){return n.mean(t)})),o=t.reduce((function(n,t){return n+t.length}),0),i=[],u=0;u<t.length;++u)for(var a=u+1;a<t.length;++a){var f=n.qtest(e[u],e[a],t[u].length,t[a].length,r,o,t.length);i.push([[u,a],f])}return i}}),n.extend({normalci:function(){var e,o=r.call(arguments),i=new Array(2);return e=4===o.length?t.abs(n.normal.inv(o[1]/2,0,1)*o[2]/t.sqrt(o[3])):t.abs(n.normal.inv(o[1]/2,0,1)*n.stdev(o[2])/t.sqrt(o[2].length)),i[0]=o[0]-e,i[1]=o[0]+e,i},tci:function(){var e,o=r.call(arguments),i=new Array(2);return e=4===o.length?t.abs(n.studentt.inv(o[1]/2,o[3]-1)*o[2]/t.sqrt(o[3])):t.abs(n.studentt.inv(o[1]/2,o[2].length-1)*n.stdev(o[2],!0)/t.sqrt(o[2].length)),i[0]=o[0]-e,i[1]=o[0]+e,i},significant:function(n,t){return n<t}}),n.extend(n.fn,{normalci:function(t,r){return n.normalci(t,r,this.toArray())},tci:function(t,r){return n.tci(t,r,this.toArray())}}),n.extend(n.fn,{oneSidedDifferenceOfProportions:function(t,r,e,o){var u=i(t,r,e,o);return n.ztest(u,1)},twoSidedDifferenceOfProportions:function(t,r,e,o){var u=i(t,r,e,o);return n.ztest(u,2)}})}(t,Math),t.models=function(){function n(n,r){var e=n.length,o=r[0].length-1,i=e-o-1,u=t.lstsq(r,n),a=t.multiply(r,u.map((function(n){return[n]}))).map((function(n){return n[0]})),f=t.subtract(n,a),l=t.mean(n),c=t.sum(a.map((function(n){return Math.pow(n-l,2)}))),s=t.sum(n.map((function(n,t){return Math.pow(n-a[t],2)}))),h=c+s;return{exog:r,endog:n,nobs:e,df_model:o,df_resid:i,coef:u,predict:a,resid:f,ybar:l,SST:h,SSE:c,SSR:s,R2:c/h}}function r(r){var e,o,i=(e=r.exog,o=e[0].length,t.arange(o).map((function(r){var i=t.arange(o).filter((function(n){return n!==r}));return n(t.col(e,r).map((function(n){return n[0]})),t.col(e,i))}))),u=Math.sqrt(r.SSR/r.df_resid),a=i.map((function(n){var t=n.SST,r=n.R2;return u/Math.sqrt(t*(1-r))})),f=r.coef.map((function(n,t){return(n-0)/a[t]})),l=f.map((function(n){var e=t.studentt.cdf(n,r.df_resid);return 2*(e>.5?1-e:e)})),c=t.studentt.inv(.975,r.df_resid),s=r.coef.map((function(n,t){var r=c*a[t];return[n-r,n+r]}));return{se:a,t:f,p:l,sigmaHat:u,interval95:s}}return{ols:function(e,o){var i=n(e,o),u=r(i),a=function(n){var r,e,o,i=n.R2/n.df_model/((1-n.R2)/n.df_resid);return{F_statistic:i,pvalue:1-(r=i,e=n.df_model,o=n.df_resid,t.beta.cdf(r/(o/e+r),e/2,o/2))}}(i),f=1-(1-i.R2)*((i.nobs-1)/i.df_resid);return i.t=u,i.f=a,i.adjust_R2=f,i}}}(),t.extend({buildxmatrix:function(){for(var n=new Array(arguments.length),r=0;r<arguments.length;r++){n[r]=[1].concat(arguments[r])}return t(n)},builddxmatrix:function(){for(var n=new Array(arguments[0].length),r=0;r<arguments[0].length;r++){n[r]=[1].concat(arguments[0][r])}return t(n)},buildjxmatrix:function(n){for(var r=new Array(n.length),e=0;e<n.length;e++)r[e]=n[e];return t.builddxmatrix(r)},buildymatrix:function(n){return t(n).transpose()},buildjymatrix:function(n){return n.transpose()},matrixmult:function(n,r){var e,o,i,u,a;if(n.cols()==r.rows()){if(r.rows()>1){for(u=[],e=0;e<n.rows();e++)for(u[e]=[],o=0;o<r.cols();o++){for(a=0,i=0;i<n.cols();i++)a+=n.toArray()[e][i]*r.toArray()[i][o];u[e][o]=a}return t(u)}for(u=[],e=0;e<n.rows();e++)for(u[e]=[],o=0;o<r.cols();o++){for(a=0,i=0;i<n.cols();i++)a+=n.toArray()[e][i]*r.toArray()[o];u[e][o]=a}return t(u)}},regress:function(n,r){var e=t.xtranspxinv(n),o=n.transpose(),i=t.matrixmult(t(e),o);return t.matrixmult(i,r)},regresst:function(n,r,e){var o=t.regress(n,r),i={anova:{}},u=t.jMatYBar(n,o);i.yBar=u;var a=r.mean();i.anova.residuals=t.residuals(r,u),i.anova.ssr=t.ssr(u,a),i.anova.msr=i.anova.ssr/(n[0].length-1),i.anova.sse=t.sse(r,u),i.anova.mse=i.anova.sse/(r.length-(n[0].length-1)-1),i.anova.sst=t.sst(r,a),i.anova.mst=i.anova.sst/(r.length-1),i.anova.r2=1-i.anova.sse/i.anova.sst,i.anova.r2<0&&(i.anova.r2=0),i.anova.fratio=i.anova.msr/i.anova.mse,i.anova.pvalue=t.anovaftest(i.anova.fratio,n[0].length-1,r.length-(n[0].length-1)-1),i.anova.rmse=Math.sqrt(i.anova.mse),i.anova.r2adj=1-i.anova.mse/i.anova.mst,i.anova.r2adj<0&&(i.anova.r2adj=0),i.stats=new Array(n[0].length);for(var f,l,c,s=t.xtranspxinv(n),h=0;h<o.length;h++)f=Math.sqrt(i.anova.mse*Math.abs(s[h][h])),l=Math.abs(o[h]/f),c=t.ttest(l,r.length-n[0].length-1,e),i.stats[h]=[o[h],f,l,c];return i.regress=o,i},xtranspx:function(n){return t.matrixmult(n.transpose(),n)},xtranspxinv:function(n){var r=t.matrixmult(n.transpose(),n);return t.inv(r)},jMatYBar:function(n,r){var e=t.matrixmult(n,r);return new t(e)},residuals:function(n,r){return t.matrixsubtract(n,r)},ssr:function(n,t){for(var r=0,e=0;e<n.length;e++)r+=Math.pow(n[e]-t,2);return r},sse:function(n,t){for(var r=0,e=0;e<n.length;e++)r+=Math.pow(n[e]-t[e],2);return r},sst:function(n,t){for(var r=0,e=0;e<n.length;e++)r+=Math.pow(n[e]-t,2);return r},matrixsubtract:function(n,r){for(var e=new Array(n.length),o=0;o<n.length;o++){e[o]=new Array(n[o].length);for(var i=0;i<n[o].length;i++)e[o][i]=n[o][i]-r[o][i]}return t(e)}}),t.jStat=t,t)},960:function(n,t,r){const e=r(592);n.exports=function(n){function t(n,t){const r=t.split(".");let e=n;for(const n of r){if(null==e)return;e=e[n]}return e}for(let r=0;r<Object.keys(e).length;r++){let o,i=Object.keys(e)[r],u=[];if("object"==typeof e[i]){u=Object.keys(e[i]),o=Object.values(e[i]);for(let n=0;n<o.length;n++)if("object"==typeof o[n]){let t=u[n];e[i][t]&&(u=[...u,...Object.keys(e[i][t]).map((n=>t+"."+n))],u.splice(u.indexOf(t),1))}}if(u.length<1)n[i]=e[i];else for(let r=0;r<u.length;r++)"function"==typeof t(e[i],u[r])&&(n[i]=t(e[i],u[r]))}let r=function(n){return"number"==typeof n&&(n=parseInt(n)),n},o=null,i=null,u=null;n.TABLE=function(){return u},n.COLUMN=n.COL=function(){return u.tracking&&u.tracking.push(l.getColumnNameFromCoords(r(o),r(i))),r(o)+1},n.ROW=function(){return u.tracking&&u.tracking.push(l.getColumnNameFromCoords(r(o),r(i))),r(i)+1},n.CELL=function(){return l.getColumnNameFromCoords(o,i)},n.VALUE=function(n,t,e){return u.getValueFromCoords(r(n)-1,r(t)-1,e)},n.THISROWCELL=function(n){return u.getValueFromCoords(r(n)-1,r(i))};const a=function(n,t){for(let r=0;r<n.length;r++){let e=l.getTokensFromRange(n[r]);t=t.replace(n[r],"["+e.join(",")+"]")}return t},f=function(n){return"string"==typeof n&&(n=n.trim()),!isNaN(n)&&null!==n&&""!==n},l=function(n,t,r,e,l){u=l,o=r,i=e;let c="",s={};if(t)if(t.size){let n,r=null;t.forEach((function(t,r){n=r.replace(/!/g,"."),-1!==n.indexOf(".")&&(n=n.split("."),s[n[0]]=!0)})),n=Object.keys(s);for(let t=0;t<n.length;t++)c+="var "+n[t]+" = {};";t.forEach((function(e,o){n=o.replace(/!/g,"."),null===e||f(e)||(r=e.match(/(('.*?'!)|(\w*!))?(\$?[A-Z]+\$?[0-9]*):(\$?[A-Z]+\$?[0-9]*)?/g),r&&r.length&&(e=updateRanges(r,e))),n.indexOf(".")>0?c+=n+" = "+t.get(o)+";\n":c+="var "+n+" = "+e+";\n"}))}else{let n=Object.keys(t);if(n.length){let r,e={};for(let t=0;t<n.length;t++)if(r=n[t].replace(/\!/g,"."),r.indexOf(".")>0){let n=n.split(".");e[n[0]]={}}r=Object.keys(e);for(let n=0;n<r.length;n++)c+="var "+r[n]+" = {};";for(let e=0;e<n.length;e++){if(r=n[e].replace(/!/g,"."),null!==t[n[e]]&&!f(t[n[e]])){let r=t[n[e]].match(/(('.*?'!)|(\w*!))?(\$?[A-Z]+\$?[0-9]*):(\$?[A-Z]+\$?[0-9]*)?/g);r&&r.length&&(t[n[e]]=a(r,t[n[e]]))}r.indexOf(".")>0?c+=r+" = "+t[n[e]]+";\n":c+="var "+r+" = "+t[n[e]]+";\n"}}}let h=(n=function(n,t){let r="",e=0,o=["=","!",">","<"];for(let i=0;i<n.length;i++)'"'===n[i]&&(e=0===e?1:0),1===e?r+=n[i]:(r+=n[i].toUpperCase(),!0===t&&i>0&&"="===n[i]&&-1===o.indexOf(n[i-1])&&-1===o.indexOf(n[i+1])&&(r+="="));return r=r.replace(/\^/g,"**"),r=r.replace(/<>/g,"!="),r=r.replace(/&/g,"+"),r=r.replace(/\$/g,""),r}(n=(n=n.replace(/\$/g,"")).replace(/!/g,"."),!0)).match(/(('.*?'!)|(\w*!))?(\$?[A-Z]+\$?[0-9]*):(\$?[A-Z]+\$?[0-9]*)?/g);h&&h.length&&(n=a(h,n));let g=new Function(c+"; return "+n)();return null===g&&(g=0),g};return l.getColumnNameFromCoords=function(n,t){return r=parseInt(n),e="",r>701?(e+=String.fromCharCode(64+parseInt(r/676)),e+=String.fromCharCode(64+parseInt(r%676/26))):r>25&&(e+=String.fromCharCode(64+parseInt(r/26))),e+String.fromCharCode(65+r%26)+(parseInt(t)+1);var r,e},l.getCoordsFromColumnName=function(n){var t=/^[a-zA-Z]+/.exec(n);if(t){for(var r=0,e=0;e<t[0].length;e++)r+=parseInt(t[0].charCodeAt(e)-64)*Math.pow(26,t[0].length-1-e);--r<0&&(r=0);var o=parseInt(/[0-9]+$/.exec(n))||null;return o>0&&o--,[r,o]}},l.getRangeFromTokens=function(n){n=n.filter((function(n){return"#REF!"!=n}));for(var t="",r="",e=0;e<n.length;e++)n[e].indexOf(".")>=0?t=".":n[e].indexOf("!")>=0&&(t="!"),t&&(r=n[e].split(t),n[e]=r[1],r=r[0]+t);return n.sort((function(n,t){var r=Helpers.getCoordsFromColumnName(n),e=Helpers.getCoordsFromColumnName(t);return r[1]>e[1]?1:r[1]<e[1]?-1:r[0]>e[0]?1:r[0]<e[0]?-1:0})),n.length?r+(n[0]+":")+n[n.length-1]:"#REF!"},l.getTokensFromRange=function(n){if(n.indexOf(".")>0){var t=n.split(".");n=t[1],t=t[0]+"."}else n.indexOf("!")>0?(t=n.split("!"),n=t[1],t=t[0]+"!"):t="";n=n.split(":");var r=l.getCoordsFromColumnName(n[0]),e=l.getCoordsFromColumnName(n[1]);if(r[0]<=e[0])var o=r[0],i=e[0];else o=e[0],i=r[0];if(null===r[1]&&null==e[1])for(var u=null,a=null,f=Object.keys(vars),c=0;c<f.length;c++){var s=l.getCoordsFromColumnName(f[c]);s[0]===r[0]&&(null===u||s[1]<u)&&(u=s[1]),s[0]===e[0]&&(null===a||s[1]>a)&&(a=s[1])}else r[1]<=e[1]?(u=r[1],a=e[1]):(u=e[1],a=r[1]);for(var h=[],g=u;g<=a;g++){var p=[];for(c=o;c<=i;c++)p.push(t+l.getColumnNameFromCoords(c,g));h.push(p)}return h},l.setFormula=function(t){let r=Object.keys(t);for(let e=0;e<r.length;e++)"function"==typeof t[r[e]]&&(n[r[e]]=t[r[e]])},l.basic=!0,l}("undefined"==typeof window?r.g:window)},592:function(n,t,r){"use strict";var e=r(162),o=r(765);const i=new Error("#NULL!"),u=new Error("#DIV/0!"),a=new Error("#VALUE!"),f=new Error("#REF!"),l=new Error("#NAME?"),c=new Error("#NUM!"),s=new Error("#N/A"),h=new Error("#ERROR!"),g=new Error("#GETTING_DATA");var p=Object.freeze({__proto__:null,data:g,div0:u,error:h,na:s,name:l,nil:i,num:c,ref:f,value:a});function m(n){const t=[];return d(n,(n=>{t.push(n)})),t}function d(n,t){let r=-1;const e=n.length;for(;++r<e&&!1!==t(n[r],r,n););return n}function v(n){let t,r=n.length;for(;r--;)if(t=n[r],"number"!=typeof t)if(!0!==t)if(!1!==t){if("string"==typeof t){const e=R(t);n[r]=e instanceof Error?0:e}}else n[r]=0;else n[r]=1;return n}function E(n,t){if(!n)return a;n.every((n=>Array.isArray(n)))&&0!==n.length||(n=[[...n]]),n.map(((t,r)=>{t.map(((t,e)=>{t||(n[r][e]=0)}))}));const r=n.reduce(((t,r,e)=>r.length>n[t].length?e:t),0),e=n[r].length;return n.map((n=>[...n,...Array(e-n.length).fill(t||0)]))}function M(){let n;if(1===arguments.length){const r=arguments[0];n=null!=(t=r)&&"number"==typeof t.length&&"string"!=typeof t?m.apply(null,arguments):[r]}else n=Array.from(arguments);for(var t;!w(n);)n=N(n);return n}function N(n){return n&&n.reduce?n.reduce(((n,t)=>{const r=Array.isArray(n),e=Array.isArray(t);return r&&e?n.concat(t):r?(n.push(t),n):e?[n].concat(t):[n,t]})):[n]}function w(n){if(!n)return!1;for(let t=0;t<n.length;++t)if(Array.isArray(n[t]))return!1;return!0}function y(n,t){return t=t||1,n&&"function"==typeof n.slice?n.slice(t):n}function I(n){return n?n[0].map(((t,r)=>n.map((n=>n[r])))):a}function b(n,t){let r=null;return d(n,((n,e)=>{if(n[0]===t)return r=e,!1})),null==r?a:r}function T(){for(let n=0;n<arguments.length;n++)if(arguments[n]instanceof Error)return arguments[n]}function S(){let n=arguments.length;for(;n--;)if(arguments[n]instanceof Error)return!0;return!1}function A(n){const t=1e14;return Math.round(n*t)/t}function C(){return M.apply(null,arguments).filter((n=>"number"==typeof n))}function D(n){if("boolean"==typeof n)return n;if(n instanceof Error)return n;if("number"==typeof n)return 0!==n;if("string"==typeof n){const t=n.toUpperCase();if("TRUE"===t)return!0;if("FALSE"===t)return!1}return n instanceof Date&&!isNaN(n)||a}function O(n){if(!isNaN(n)){if(n instanceof Date)return new Date(n);const t=parseFloat(n);return t<0||t>=2958466?c:function(n){n<60&&(n+=1);const t=Math.floor(n-25569),r=new Date(86400*t*1e3),e=n-Math.floor(n)+1e-7;let o=Math.floor(86400*e);const i=o%60;o-=i;const u=Math.floor(o/3600),a=Math.floor(o/60)%60;let f=r.getUTCDate(),l=r.getUTCMonth();return n>=60&&n<61&&(f=29,l=1),new Date(r.getUTCFullYear(),l,f,u,a,i)}(t)}return"string"!=typeof n||(n=/(\d{4})-(\d\d?)-(\d\d?)$/.test(n)?new Date(n+"T00:00:00.000"):new Date(n),isNaN(n))?a:n}function x(n){let t,r=n.length;for(;r--;){if(t=O(n[r]),t===a)return t;n[r]=t}return n}function R(n){return n instanceof Error?n:null==n?0:("boolean"==typeof n&&(n=+n),isNaN(n)||""===n?a:parseFloat(n))}function P(n){let t,r;if(!n||0===(t=n.length))return a;for(;t--;){if(n[t]instanceof Error)return n[t];if(r=R(n[t]),r instanceof Error)return r;n[t]=r}return n}function L(n){return n instanceof Error?n:null==n?"":n.toString()}function F(){let n=arguments.length;for(;n--;)if("string"==typeof arguments[n])return!0;return!1}function q(n){return null!=n}const U="=",_=[">",">=","<","<=","=","<>"],V="operator",k="literal",j=[V,k],Y=V,G=k;function H(n,t){if(-1===j.indexOf(t))throw new Error("Unsupported token type: "+t);return{value:n,type:t}}function X(n){return function(n){let t="";const r=[];for(let e=0;e<n.length;e++){const o=n[e];0===e&&_.indexOf(o)>=0?r.push(H(o,Y)):t+=o}return t.length>0&&r.push(H(function(n){return"string"!=typeof n||/^\d+(\.\d+)?$/.test(n)&&(n=-1===n.indexOf(".")?parseInt(n,10):parseFloat(n)),n}(t),G)),r.length>0&&r[0].type!==Y&&r.unshift(H(U,Y)),r}(function(n){const t=n.length,r=[];let e=0,o="",i="";for(;e<t;){const t=n.charAt(e);switch(t){case">":case"<":case"=":i+=t,o.length>0&&(r.push(o),o="");break;default:i.length>0&&(r.push(i),i=""),o+=t}e++}return o.length>0&&r.push(o),i.length>0&&r.push(i),r}(n))}const B=function(n){const t=[];let r;for(let e=0;e<n.length;e++){const o=n[e];switch(o.type){case Y:r=o.value;break;case G:t.push(o.value)}}return function(n,t){let r=!1;switch(t){case">":r=n[0]>n[1];break;case">=":r=n[0]>=n[1];break;case"<":r=n[0]<n[1];break;case"<=":r=n[0]<=n[1];break;case"=":r=n[0]==n[1];break;case"<>":r=n[0]!=n[1]}return r}(t,r)},$={};function z(n){return[a,f,u,c,l,i].indexOf(n)>=0||"number"==typeof n&&(isNaN(n)||!isFinite(n))}function W(n){return z(n)||n===s}function K(n){return!0===n||!1===n}function Q(n){return"number"==typeof n&&!isNaN(n)&&isFinite(n)}function Z(n){return"string"==typeof n}function J(){const n=[];for(let t=0;t<arguments.length;++t){let r=!1;const e=arguments[t];for(let t=0;t<n.length&&(r=n[t]===e,!r);++t);r||n.push(e)}return n}function nn(n,t,r,e){if(!t||!r)return s;e=!(0===e||!1===e);let o=s;const i="number"==typeof n;let u=!1;for(let a=0;a<t.length;a++){const l=t[a];if(l[0]===n){o=r<l.length+1?l[r-1]:f;break}!u&&(i&&e&&l[0]<=n||e&&"string"==typeof l[0]&&l[0].localeCompare(n)<0)&&(o=r<l.length+1?l[r-1]:f),i&&l[0]>n&&(u=!0)}return o}function tn(){const n=M(arguments).filter(q);if(0===n.length)return u;const t=T.apply(void 0,n);if(t)return t;const r=C(n),e=r.length;let o,i=0,a=0;for(let n=0;n<e;n++)i+=r[n],a+=1;return o=i/a,isNaN(o)&&(o=c),o}function rn(){const n=M(arguments).filter(q);if(0===n.length)return u;const t=T.apply(void 0,n);if(t)return t;const r=n,e=r.length;let o,i=0,a=0;for(let n=0;n<e;n++){const t=r[n];"number"==typeof t&&(i+=t),!0===t&&i++,null!==t&&a++}return o=i/a,isNaN(o)&&(o=c),o}$.TYPE=n=>{switch(n){case i:return 1;case u:return 2;case a:return 3;case f:return 4;case l:return 5;case c:return 6;case s:return 7;case g:return 8}return s};const en={DIST:function(n,t,r,o,i,u){return arguments.length<4?a:(i=void 0===i?0:i,u=void 0===u?1:u,S(n=R(n),t=R(t),r=R(r),i=R(i),u=R(u))?a:(n=(n-i)/(u-i),o?e.beta.cdf(n,t,r):e.beta.pdf(n,t,r)))},INV:(n,t,r,o,i)=>(o=void 0===o?0:o,i=void 0===i?1:i,S(n=R(n),t=R(t),r=R(r),o=R(o),i=R(i))?a:e.beta.inv(n,t,r)*(i-o)+o)},on={DIST:(n,t,r,o)=>S(n=R(n),t=R(t),r=R(r),o=R(o))?a:o?e.binomial.cdf(n,t,r):e.binomial.pdf(n,t,r)};on.DIST.RANGE=(n,t,r,e)=>{if(e=void 0===e?r:e,S(n=R(n),t=R(t),r=R(r),e=R(e)))return a;let o=0;for(let i=r;i<=e;i++)o+=Gn(n,i)*Math.pow(t,i)*Math.pow(1-t,n-i);return o},on.INV=(n,t,r)=>{if(S(n=R(n),t=R(t),r=R(r)))return a;let o=0;for(;o<=n;){if(e.binomial.cdf(o,n,t)>=r)return o;o++}};const un={DIST:(n,t,r)=>S(n=R(n),t=R(t))?a:r?e.chisquare.cdf(n,t):e.chisquare.pdf(n,t)};un.DIST.RT=(n,t)=>!n|!t?s:n<1||t>Math.pow(10,10)?c:"number"!=typeof n||"number"!=typeof t?a:1-e.chisquare.cdf(n,t),un.INV=(n,t)=>S(n=R(n),t=R(t))?a:e.chisquare.inv(n,t),un.INV.RT=(n,t)=>!n|!t?s:n<0||n>1||t<1||t>Math.pow(10,10)?c:"number"!=typeof n||"number"!=typeof t?a:e.chisquare.inv(1-n,t),un.TEST=function(n,t){if(2!==arguments.length)return s;if(!(n instanceof Array&&t instanceof Array))return a;if(n.length!==t.length)return a;if(n[0]&&t[0]&&n[0].length!==t[0].length)return a;const r=n.length;let e,o,i;for(o=0;o<r;o++)n[o]instanceof Array||(e=n[o],n[o]=[],n[o].push(e)),t[o]instanceof Array||(e=t[o],t[o]=[],t[o].push(e));const u=n[0].length,f=1===u?r-1:(r-1)*(u-1);let l=0;const c=Math.PI;for(o=0;o<r;o++)for(i=0;i<u;i++)l+=Math.pow(n[o][i]-t[o][i],2)/t[o][i];return Math.round(1e6*function(n,t){let r=Math.exp(-.5*n);t%2==1&&(r*=Math.sqrt(2*n/c));let e=t;for(;e>=2;)r=r*n/e,e-=2;let o=r,i=t;for(;o>1e-10*r;)i+=2,o=o*n/i,r+=o;return 1-r}(l,f))/1e6};const an={};function fn(){return C(M(arguments)).length}function ln(){const n=M(arguments);return n.length-cn(n)}function cn(){const n=M(arguments);let t,r=0;for(let e=0;e<n.length;e++)t=n[e],null!=t&&""!==t||r++;return r}an.NORM=(n,t,r)=>S(n=R(n),t=R(t),r=R(r))?a:e.normalci(1,n,t,r)[1]-1,an.T=(n,t,r)=>S(n=R(n),t=R(t),r=R(r))?a:e.tci(1,n,t,r)[1]-1;const sn={P:(n,t)=>{if(S(n=P(M(n)),t=P(M(t))))return a;const r=e.mean(n),o=e.mean(t);let i=0;const u=n.length;for(let e=0;e<u;e++)i+=(n[e]-r)*(t[e]-o);return i/u},S:(n,t)=>S(n=P(M(n)),t=P(M(t)))?a:e.covariance(n,t)},hn={DIST:(n,t,r)=>S(n=R(n),t=R(t))?a:r?e.exponential.cdf(n,t):e.exponential.pdf(n,t)},gn={};function pn(n,t,r){if(S(n=R(n),t=P(M(t)),r=P(M(r))))return a;const o=e.mean(r),i=e.mean(t),u=r.length;let f=0,l=0;for(let n=0;n<u;n++)f+=(r[n]-o)*(t[n]-i),l+=Math.pow(r[n]-o,2);const c=f/l;return i-c*o+c*n}function mn(n){return(n=R(n))instanceof Error?n:0===n||parseInt(n,10)===n&&n<0?c:e.gammafn(n)}function dn(n){return(n=R(n))instanceof Error?n:e.gammaln(n)}gn.DIST=(n,t,r,o)=>S(n=R(n),t=R(t),r=R(r))?a:o?e.centralF.cdf(n,t,r):e.centralF.pdf(n,t,r),gn.DIST.RT=function(n,t,r){return 3!==arguments.length?s:n<0||t<1||r<1?c:"number"!=typeof n||"number"!=typeof t||"number"!=typeof r?a:1-e.centralF.cdf(n,t,r)},gn.INV=(n,t,r)=>S(n=R(n),t=R(t),r=R(r))?a:n<=0||n>1?c:e.centralF.inv(n,t,r),gn.INV.RT=function(n,t,r){return 3!==arguments.length?s:n<0||n>1||t<1||t>Math.pow(10,10)||r<1||r>Math.pow(10,10)?c:"number"!=typeof n||"number"!=typeof t||"number"!=typeof r?a:e.centralF.inv(1-n,t,r)},gn.TEST=(n,t)=>{if(!n||!t)return s;if(!(n instanceof Array&&t instanceof Array))return s;if(n.length<2||t.length<2)return u;const r=(n,t)=>{let r=0;for(let e=0;e<n.length;e++)r+=Math.pow(n[e]-t,2);return r},e=Qn(n)/n.length,o=Qn(t)/t.length;return r(n,e)/(n.length-1)/(r(t,o)/(t.length-1))},mn.DIST=function(n,t,r,o){return 4!==arguments.length?s:n<0||t<=0||r<=0||"number"!=typeof n||"number"!=typeof t||"number"!=typeof r?a:o?e.gamma.cdf(n,t,r,!0):e.gamma.pdf(n,t,r,!1)},mn.INV=function(n,t,r){return 3!==arguments.length?s:n<0||n>1||t<=0||r<=0?c:"number"!=typeof n||"number"!=typeof t||"number"!=typeof r?a:e.gamma.inv(n,t,r)},dn.PRECISE=function(n){return 1!==arguments.length?s:n<=0?c:"number"!=typeof n?a:e.gammaln(n)};const vn={};function En(n,t){return S(n=P(M(n)),t=R(t))?n:t<0||n.length<t?a:n.sort(((n,t)=>t-n))[t-1]}function Mn(n,t){if(S(n=P(M(n)),t=P(M(t))))return a;const r=e.mean(n),o=e.mean(t),i=t.length;let u=0,f=0;for(let e=0;e<i;e++)u+=(t[e]-o)*(n[e]-r),f+=Math.pow(t[e]-o,2);const l=u/f;return[l,r-l*o]}vn.DIST=(n,t,r,e,o)=>{if(S(n=R(n),t=R(t),r=R(r),e=R(e)))return a;function i(n,t,r,e){return Gn(r,n)*Gn(e-r,t-n)/Gn(e,t)}return o?function(n,t,r,e){let o=0;for(let u=0;u<=n;u++)o+=i(u,t,r,e);return o}(n,t,r,e):i(n,t,r,e)};const Nn={};function wn(){const n=M(arguments),t=T.apply(void 0,n);if(t)return t;const r=C(n);return 0===r.length?0:Math.max.apply(Math,r)}function yn(){const n=M(arguments),t=T.apply(void 0,n);if(t)return t;const r=v(n);let o=e.median(r);return isNaN(o)&&(o=c),o}function In(){const n=M(arguments),t=T.apply(void 0,n);if(t)return t;const r=C(n);return 0===r.length?0:Math.min.apply(Math,r)}Nn.DIST=(n,t,r,o)=>S(n=R(n),t=R(t),r=R(r))?a:o?e.lognormal.cdf(n,t,r):e.lognormal.pdf(n,t,r),Nn.INV=(n,t,r)=>S(n=R(n),t=R(t),r=R(r))?a:e.lognormal.inv(n,t,r);const bn={MULT:function(){const n=P(M(arguments));if(n instanceof Error)return n;const t=n.length,r={};let e,o=[],i=0;for(let u=0;u<t;u++)e=n[u],r[e]=r[e]?r[e]+1:1,r[e]>i&&(i=r[e],o=[]),r[e]===i&&(o[o.length]=e);return o},SNGL:function(){const n=P(M(arguments));return n instanceof Error?n:bn.MULT(n).sort(((n,t)=>n-t))[0]}},Tn={DIST:(n,t,r,o)=>S(n=R(n),t=R(t),r=R(r))?a:o?e.negbin.cdf(n,t,r):e.negbin.pdf(n,t,r)},Sn={};function An(n,t){if(S(t=P(M(t)),n=P(M(n))))return a;const r=e.mean(n),o=e.mean(t),i=n.length;let u=0,f=0,l=0;for(let e=0;e<i;e++)u+=(n[e]-r)*(t[e]-o),f+=Math.pow(n[e]-r,2),l+=Math.pow(t[e]-o,2);return u/Math.sqrt(f*l)}Sn.DIST=(n,t,r,o)=>S(n=R(n),t=R(t),r=R(r))?a:r<=0?c:o?e.normal.cdf(n,t,r):e.normal.pdf(n,t,r),Sn.INV=(n,t,r)=>S(n=R(n),t=R(t),r=R(r))?a:e.normal.inv(n,t,r),Sn.S={},Sn.S.DIST=(n,t)=>(n=R(n))instanceof Error?a:t?e.normal.cdf(n,0,1):e.normal.pdf(n,0,1),Sn.S.INV=n=>(n=R(n))instanceof Error?a:e.normal.inv(n,0,1);const Cn={EXC:(n,t)=>{if(S(n=P(M(n)),t=R(t)))return a;const r=(n=n.sort(((n,t)=>n-t))).length;if(t<1/(r+1)||t>1-1/(r+1))return c;const e=t*(r+1)-1,o=Math.floor(e);return A(e===o?n[e]:n[o]+(e-o)*(n[o+1]-n[o]))},INC:(n,t)=>{if(S(n=P(M(n)),t=R(t)))return a;const r=t*((n=n.sort(((n,t)=>n-t))).length-1),e=Math.floor(r);return A(r===e?n[r]:n[e]+(r-e)*(n[e+1]-n[e]))}},Dn={EXC:(n,t,r)=>{if(r=void 0===r?3:r,S(n=P(M(n)),t=R(t),r=R(r)))return a;n=n.sort(((n,t)=>n-t));const e=J.apply(null,n),o=n.length,i=e.length,u=Math.pow(10,r);let f=0,l=!1,c=0;for(;!l&&c<i;)t===e[c]?(f=(n.indexOf(e[c])+1)/(o+1),l=!0):t>=e[c]&&(t<e[c+1]||c===i-1)&&(f=(n.indexOf(e[c])+1+(t-e[c])/(e[c+1]-e[c]))/(o+1),l=!0),c++;return Math.floor(f*u)/u},INC:(n,t,r)=>{if(r=void 0===r?3:r,S(n=P(M(n)),t=R(t),r=R(r)))return a;n=n.sort(((n,t)=>n-t));const e=J.apply(null,n),o=n.length,i=e.length,u=Math.pow(10,r);let f=0,l=!1,c=0;for(;!l&&c<i;)t===e[c]?(f=n.indexOf(e[c])/(o-1),l=!0):t>=e[c]&&(t<e[c+1]||c===i-1)&&(f=(n.indexOf(e[c])+(t-e[c])/(e[c+1]-e[c]))/(o-1),l=!0),c++;return Math.floor(f*u)/u}},On={DIST:(n,t,r)=>S(n=R(n),t=R(t))?a:r?e.poisson.cdf(n,t):e.poisson.pdf(n,t)},xn={EXC:(n,t)=>{if(S(n=P(M(n)),t=R(t)))return a;switch(t){case 1:return Cn.EXC(n,.25);case 2:return Cn.EXC(n,.5);case 3:return Cn.EXC(n,.75);default:return c}},INC:(n,t)=>{if(S(n=P(M(n)),t=R(t)))return a;switch(t){case 1:return Cn.INC(n,.25);case 2:return Cn.INC(n,.5);case 3:return Cn.INC(n,.75);default:return c}}},Rn={};function Pn(){const n=P(M(arguments));if(n instanceof Error)return n;const t=e.mean(n),r=n.length;let o=0;for(let e=0;e<r;e++)o+=Math.pow(n[e]-t,3);return r*o/((r-1)*(r-2)*Math.pow(e.stdev(n,!0),3))}function Ln(n,t){return S(n=P(M(n)),t=R(t))?n:n.sort(((n,t)=>n-t))[t-1]}Rn.AVG=(n,t,r)=>{if(S(n=R(n),t=P(M(t))))return a;const e=(r=r||!1)?(n,t)=>n-t:(n,t)=>t-n,o=(t=(t=M(t)).sort(e)).length;let i=0;for(let r=0;r<o;r++)t[r]===n&&i++;return i>1?(2*t.indexOf(n)+i+1)/2:t.indexOf(n)+1},Rn.EQ=(n,t,r)=>{if(S(n=R(n),t=P(M(t))))return a;const e=(r=r||!1)?(n,t)=>n-t:(n,t)=>t-n;return(t=t.sort(e)).indexOf(n)+1},Pn.P=function(){const n=P(M(arguments));if(n instanceof Error)return n;const t=e.mean(n),r=n.length;let o=0,i=0;for(let e=0;e<r;e++)i+=Math.pow(n[e]-t,3),o+=Math.pow(n[e]-t,2);return i/=r,o/=r,i/Math.pow(o,1.5)};const Fn={P:function(){const n=Un.P.apply(this,arguments);let t=Math.sqrt(n);return isNaN(t)&&(t=c),t},S:function(){const n=Un.S.apply(this,arguments);return Math.sqrt(n)}},qn={DIST:(n,t,r)=>1!==r&&2!==r?c:1===r?qn.DIST.RT(n,t):qn.DIST["2T"](n,t)};qn.DIST["2T"]=function(n,t){return 2!==arguments.length?s:n<0||t<1?c:"number"!=typeof n||"number"!=typeof t?a:2*(1-e.studentt.cdf(n,t))},qn.DIST.RT=function(n,t){return 2!==arguments.length?s:n<0||t<1?c:"number"!=typeof n||"number"!=typeof t?a:1-e.studentt.cdf(n,t)},qn.INV=(n,t)=>S(n=R(n),t=R(t))?a:e.studentt.inv(n,t),qn.INV["2T"]=(n,t)=>(n=R(n),t=R(t),n<=0||n>1||t<1?c:S(n,t)?a:Math.abs(e.studentt.inv(n/2,t))),qn.TEST=(n,t)=>{if(S(n=P(M(n)),t=P(M(t))))return a;const r=e.mean(n),o=e.mean(t);let i,u=0,f=0;for(i=0;i<n.length;i++)u+=Math.pow(n[i]-r,2);for(i=0;i<t.length;i++)f+=Math.pow(t[i]-o,2);u/=n.length-1,f/=t.length-1;const l=Math.abs(r-o)/Math.sqrt(u/n.length+f/t.length);return qn.DIST["2T"](l,n.length+t.length-2)};const Un={};function _n(){const n=M(arguments),t=n.length;let r=0,e=0;const o=rn(n);for(let i=0;i<t;i++){const t=n[i];r+="number"==typeof t?Math.pow(t-o,2):!0===t?Math.pow(1-o,2):Math.pow(0-o,2),null!==t&&e++}return r/(e-1)}function Vn(){const n=M(arguments),t=n.length;let r=0,e=0;const o=rn(n);let i;for(let i=0;i<t;i++){const t=n[i];r+="number"==typeof t?Math.pow(t-o,2):!0===t?Math.pow(1-o,2):Math.pow(0-o,2),null!==t&&e++}return i=r/e,isNaN(i)&&(i=c),i}Un.P=function(){const n=C(M(arguments)),t=n.length;let r=0;const e=tn(n);let o;for(let o=0;o<t;o++)r+=Math.pow(n[o]-e,2);return o=r/t,isNaN(o)&&(o=c),o},Un.S=function(){const n=C(M(arguments)),t=n.length;let r=0;const e=tn(n);for(let o=0;o<t;o++)r+=Math.pow(n[o]-e,2);return r/(t-1)};const kn={DIST:(n,t,r,e)=>S(n=R(n),t=R(t),r=R(r))?a:e?1-Math.exp(-Math.pow(n/r,t)):Math.pow(n,t-1)*Math.exp(-Math.pow(n/r,t))*t/Math.pow(r,t)},jn={};function Yn(n,t,r){const e=T(n=R(n),t=R(t),r=R(r));if(e)return e;if(0===t)return 0;t=Math.abs(t);const o=-Math.floor(Math.log(t)/Math.log(10));return n>=0?Kn(Math.ceil(n/t)*t,o):0===r?-Kn(Math.floor(Math.abs(n)/t)*t,o):-Kn(Math.ceil(Math.abs(n)/t)*t,o)}function Gn(n,t){return T(n=R(n),t=R(t))||(n<t?c:Xn(n)/(Xn(t)*Xn(n-t)))}jn.TEST=(n,t,r)=>{if(S(n=P(M(n)),t=R(t)))return a;r=r||Fn.S(n);const e=n.length;return 1-Sn.S.DIST((tn(n)-t)/(r/Math.sqrt(e)),!0)},Yn.MATH=Yn,Yn.PRECISE=Yn;const Hn=[];function Xn(n){if((n=R(n))instanceof Error)return n;const t=Math.floor(n);return 0===t||1===t?1:(Hn[t]>0||(Hn[t]=Xn(t-1)*t),Hn[t])}function Bn(n,t){const r=T(n=R(n),t=R(t));if(r)return r;if(0===t)return 0;if(!(n>=0&&t>0||n<=0&&t<0))return c;t=Math.abs(t);const e=-Math.floor(Math.log(t)/Math.log(10));return n>=0?Kn(Math.floor(n/t)*t,e):-Kn(Math.ceil(Math.abs(n)/t),e)}Bn.MATH=(n,t,r)=>{if(t instanceof Error)return t;t=void 0===t?0:t;const e=T(n=R(n),t=R(t),r=R(r));if(e)return e;if(0===t)return 0;t=t?Math.abs(t):1;const o=-Math.floor(Math.log(t)/Math.log(10));return n>=0?Kn(Math.floor(n/t)*t,o):0===r||void 0===r?-Kn(Math.ceil(Math.abs(n)/t)*t,o):-Kn(Math.floor(Math.abs(n)/t)*t,o)},Bn.PRECISE=Bn.MATH;const $n={CEILING:Yn};function zn(n,t){const r=T(n=R(n),t=R(t));if(r)return r;if(0===n&&0===t)return c;const e=Math.pow(n,t);return isNaN(e)?c:e}function Wn(){const n=M(arguments).filter((n=>null!=n));if(0===n.length)return 0;const t=P(n);if(t instanceof Error)return t;let r=1;for(let n=0;n<t.length;n++)r*=t[n];return r}function Kn(n,t){return T(n=R(n),t=R(t))||Number(Math.round(Number(n+"e"+t))+"e"+-1*t)}function Qn(){let n=0;return d(m(arguments),(t=>{if(n instanceof Error)return!1;if(t instanceof Error)n=t;else if("number"==typeof t)n+=t;else if("string"==typeof t){const r=parseFloat(t);!isNaN(r)&&(n+=r)}else if(Array.isArray(t)){const r=Qn.apply(null,t);r instanceof Error?n=r:n+=r}})),n}var Zn=Object.freeze({__proto__:null,ADD:function(n,t){if(2!==arguments.length)return s;return T(n=R(n),t=R(t))||n+t},DIVIDE:function(n,t){if(2!==arguments.length)return s;return T(n=R(n),t=R(t))||(0===t?u:n/t)},EQ:function(n,t){return 2!==arguments.length?s:n instanceof Error?n:t instanceof Error?t:(null===n&&(n=void 0),null===t&&(t=void 0),n===t)},GT:function(n,t){if(2!==arguments.length)return s;if(n instanceof Error)return n;if(t instanceof Error)return t;F(n,t)?(n=L(n),t=L(t)):(n=R(n),t=R(t));return T(n,t)||n>t},GTE:function(n,t){if(2!==arguments.length)return s;F(n,t)?(n=L(n),t=L(t)):(n=R(n),t=R(t));return T(n,t)||n>=t},LT:function(n,t){if(2!==arguments.length)return s;F(n,t)?(n=L(n),t=L(t)):(n=R(n),t=R(t));return T(n,t)||n<t},LTE:function(n,t){if(2!==arguments.length)return s;F(n,t)?(n=L(n),t=L(t)):(n=R(n),t=R(t));return T(n,t)||n<=t},MINUS:function(n,t){if(2!==arguments.length)return s;return T(n=R(n),t=R(t))||n-t},MULTIPLY:function(n,t){if(2!==arguments.length)return s;return T(n=R(n),t=R(t))||n*t},NE:function(n,t){return 2!==arguments.length?s:n instanceof Error?n:t instanceof Error?t:(null===n&&(n=void 0),null===t&&(t=void 0),n!==t)},POW:function(n,t){return 2!==arguments.length?s:zn(n,t)}});const Jn=new Date(Date.UTC(1900,0,1)),nt=[void 0,0,1,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,1,2,3,4,5,6,0],tt=[[],[1,2,3,4,5,6,7],[7,1,2,3,4,5,6],[6,0,1,2,3,4,5],[],[],[],[],[],[],[],[7,1,2,3,4,5,6],[6,7,1,2,3,4,5],[5,6,7,1,2,3,4],[4,5,6,7,1,2,3],[3,4,5,6,7,1,2],[2,3,4,5,6,7,1],[1,2,3,4,5,6,7]],rt=[[],[6,0],[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],void 0,void 0,void 0,[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6]];function et(n,t,r){r=r.toUpperCase(),n=O(n),t=O(t);const e=n.getFullYear(),o=n.getMonth(),i=n.getDate(),u=t.getFullYear(),a=t.getMonth(),f=t.getDate();let l;switch(r){case"Y":l=Math.floor(ht(n,t));break;case"D":l=it(t,n);break;case"M":l=a-o+12*(u-e),f<i&&l--;break;case"MD":i<=f?l=f-i:(0===a?(n.setFullYear(u-1),n.setMonth(12)):(n.setFullYear(u),n.setMonth(a-1)),l=it(t,n));break;case"YM":l=a-o+12*(u-e),f<i&&l--,l%=12;break;case"YD":a>o||a===o&&f<i?n.setFullYear(u):n.setFullYear(u-1),l=it(t,n)}return l}function ot(n){const t=new Date(n);return t.setHours(0,0,0,0),t}function it(n,t){return n=O(n),t=O(t),n instanceof Error?n:t instanceof Error?t:gt(ot(n))-gt(ot(t))}function ut(n,t,r){if(r=D(r||"false"),n=O(n),t=O(t),n instanceof Error)return n;if(t instanceof Error)return t;if(r instanceof Error)return r;const e=n.getMonth();let o,i,u=t.getMonth();if(r)o=31===n.getDate()?30:n.getDate(),i=31===t.getDate()?30:t.getDate();else{const r=new Date(n.getFullYear(),e+1,0).getDate(),a=new Date(t.getFullYear(),u+1,0).getDate();o=n.getDate()===r?30:n.getDate(),t.getDate()===a?o<30?(u++,i=1):i=30:i=t.getDate()}return 360*(t.getFullYear()-n.getFullYear())+30*(u-e)+(i-o)}function at(n){if((n=O(n))instanceof Error)return n;(n=ot(n)).setDate(n.getDate()+4-(n.getDay()||7));const t=new Date(n.getFullYear(),0,1);return Math.ceil(((n-t)/864e5+1)/7)}function ft(n,t,r){return ft.INTL(n,t,1,r)}function lt(n,t,r){return lt.INTL(n,t,1,r)}function ct(n){return 1===new Date(n,1,29).getMonth()}function st(n,t){return Math.ceil((t-n)/1e3/60/60/24)}function ht(n,t,r){if((n=O(n))instanceof Error)return n;if((t=O(t))instanceof Error)return t;r=r||0;let e=n.getDate();const o=n.getMonth()+1,i=n.getFullYear();let u=t.getDate();const a=t.getMonth()+1,f=t.getFullYear();switch(r){case 0:return 31===e&&31===u?(e=30,u=30):31===e?e=30:30===e&&31===u&&(u=30),(u+30*a+360*f-(e+30*o+360*i))/360;case 1:{const r=(n,t)=>{const r=n.getFullYear(),e=new Date(r,2,1);if(ct(r)&&n<e&&t>=e)return!0;const o=t.getFullYear(),i=new Date(o,2,1);return ct(o)&&t>=i&&n<i};let l=365;if(i===f||i+1===f&&(o>a||o===a&&e>=u))return(i===f&&ct(i)||r(n,t)||1===a&&29===u)&&(l=366),st(n,t)/l;const c=f-i+1,s=(new Date(f+1,0,1)-new Date(i,0,1))/1e3/60/60/24/c;return st(n,t)/s}case 2:return st(n,t)/360;case 3:return st(n,t)/365;case 4:return(u+30*a+360*f-(e+30*o+360*i))/360}}function gt(n){const t=n>-22038912e5?2:1;return Math.ceil((n-Jn)/864e5)+t}function pt(n){return 0===(n=R(n))?a:n instanceof Error?n:String.fromCharCode(n)}function mt(n){if(S(n))return n;let t=(n=n||"").charCodeAt(0);return isNaN(t)&&(t=a),t}function dt(){const n=M(arguments),t=T.apply(void 0,n);if(t)return t;let r=0;for(;(r=n.indexOf(!0))>-1;)n[r]="TRUE";let e=0;for(;(e=n.indexOf(!1))>-1;)n[e]="FALSE";return n.join("")}ft.INTL=(n,t,r,e)=>{if((n=O(n))instanceof Error)return n;if((t=O(t))instanceof Error)return t;let o=!1;const i=[],u=[1,2,3,4,5,6,0],f=new RegExp("^[0|1]{7}$");if(void 0===r)r=rt[1];else if("string"==typeof r&&f.test(r)){o=!0,r=r.split("");for(let n=0;n<r.length;n++)"1"===r[n]&&i.push(u[n])}else r=rt[r];if(!(r instanceof Array))return a;void 0===e?e=[]:e instanceof Array||(e=[e]);for(let n=0;n<e.length;n++){const t=O(e[n]);if(t instanceof Error)return t;e[n]=t}const l=Math.round((t-n)/864e5)+1;let c=l;const s=n;for(let n=0;n<l;n++){const n=(new Date).getTimezoneOffset()>0?s.getUTCDay():s.getDay();let t=o?i.includes(n):n===r[0]||n===r[1];for(let n=0;n<e.length;n++){const r=e[n];if(r.getDate()===s.getDate()&&r.getMonth()===s.getMonth()&&r.getFullYear()===s.getFullYear()){t=!0;break}}t&&c--,s.setDate(s.getDate()+1)}return c},lt.INTL=(n,t,r,e)=>{if((n=O(n))instanceof Error)return n;if((t=R(t))instanceof Error)return t;if(t<0)return c;if(!((r=void 0===r?rt[1]:rt[r])instanceof Array))return a;void 0===e?e=[]:e instanceof Array||(e=[e]);for(let n=0;n<e.length;n++){const t=O(e[n]);if(t instanceof Error)return t;e[n]=t}let o=0;for(;o<t;){n.setDate(n.getDate()+1);const t=n.getDay();if(t!==r[0]&&t!==r[1]){for(let t=0;t<e.length;t++){const r=e[t];if(r.getDate()===n.getDate()&&r.getMonth()===n.getMonth()&&r.getFullYear()===n.getFullYear()){o--;break}}o++}}return n};const vt=dt;function Et(n,t=2,r=!1){if(n=R(n),isNaN(n))return a;if(t=R(t),isNaN(t))return a;if(t<0){const r=Math.pow(10,-t);n=Math.round(n/r)*r}else n=n.toFixed(t);if(r)n=n.toString().replace(/,/g,"");else{const t=n.toString().split(".");t[0]=t[0].replace(/\B(?=(\d{3})+$)/g,","),n=t.join(".")}return n}function Mt(n,t){return T(n,t)||(n=L(n),(t=R(t))instanceof Error?t:new Array(t+1).join(n))}const Nt=pt,wt=mt;function yt(n){return/^[01]{1,10}$/.test(n)}function It(n,t,r){if(S(n=R(n),t=R(t)))return n;if("i"!==(r=void 0===r?"i":r)&&"j"!==r)return a;if(0===n&&0===t)return 0;if(0===n)return 1===t?r:t.toString()+r;if(0===t)return n.toString();{const e=t>0?"+":"";return n.toString()+e+(1===t?r:t.toString()+r)}}function bt(n,t){return t=void 0===t?0:t,S(n=R(n),t=R(t))?a:e.erf(n)}function Tt(n){return isNaN(n)?a:e.erfc(n)}function St(n){const t=Rt(n),r=At(n);return S(t,r)?a:Math.sqrt(Math.pow(t,2)+Math.pow(r,2))}function At(n){if(void 0===n||!0===n||!1===n)return a;if(0===n||"0"===n)return 0;if(["i","j"].indexOf(n)>=0)return 1;let t=(n=(n+="").replace("+i","+1i").replace("-i","-1i").replace("+j","+1j").replace("-j","-1j")).indexOf("+"),r=n.indexOf("-");0===t&&(t=n.indexOf("+",1)),0===r&&(r=n.indexOf("-",1));const e=n.substring(n.length-1,n.length),o="i"===e||"j"===e;return t>=0||r>=0?o?t>=0?isNaN(n.substring(0,t))||isNaN(n.substring(t+1,n.length-1))?c:Number(n.substring(t+1,n.length-1)):isNaN(n.substring(0,r))||isNaN(n.substring(r+1,n.length-1))?c:-Number(n.substring(r+1,n.length-1)):c:o?isNaN(n.substring(0,n.length-1))?c:n.substring(0,n.length-1):isNaN(n)?c:0}function Ct(n){const t=Rt(n),r=At(n);return S(t,r)?a:0===t&&0===r?u:0===t&&r>0?Math.PI/2:0===t&&r<0?-Math.PI/2:0===r&&t>0?0:0===r&&t<0?-Math.PI:t>0?Math.atan(r/t):t<0&&r>=0?Math.atan(r/t)+Math.PI:Math.atan(r/t)-Math.PI}function Dt(n){const t=Rt(n),r=At(n);if(S(t,r))return a;let e=n.substring(n.length-1);return e="i"===e||"j"===e?e:"i",It(Math.cos(t)*(Math.exp(r)+Math.exp(-r))/2,-Math.sin(t)*(Math.exp(r)-Math.exp(-r))/2,e)}function Ot(n){const t=Rt(n),r=At(n);if(S(t,r))return a;let e=n.substring(n.length-1);return e="i"===e||"j"===e?e:"i",It(Math.cos(r)*(Math.exp(t)+Math.exp(-t))/2,Math.sin(r)*(Math.exp(t)-Math.exp(-t))/2,e)}function xt(n,t){const r=Rt(n),e=At(n),o=Rt(t),i=At(t);if(S(r,e,o,i))return a;const u=n.substring(n.length-1),f=t.substring(t.length-1);let l="i";if(("j"===u||"j"===f)&&(l="j"),0===o&&0===i)return c;const s=o*o+i*i;return It((r*o+e*i)/s,(e*o-r*i)/s,l)}function Rt(n){if(void 0===n||!0===n||!1===n)return a;if(0===n||"0"===n)return 0;if(["i","+i","1i","+1i","-i","-1i","j","+j","1j","+1j","-j","-1j"].indexOf(n)>=0)return 0;let t=(n+="").indexOf("+"),r=n.indexOf("-");0===t&&(t=n.indexOf("+",1)),0===r&&(r=n.indexOf("-",1));const e=n.substring(n.length-1,n.length),o="i"===e||"j"===e;return t>=0||r>=0?o?t>=0?isNaN(n.substring(0,t))||isNaN(n.substring(t+1,n.length-1))?c:Number(n.substring(0,t)):isNaN(n.substring(0,r))||isNaN(n.substring(r+1,n.length-1))?c:Number(n.substring(0,r)):c:o?isNaN(n.substring(0,n.length-1))?c:0:isNaN(n)?c:n}function Pt(n){const t=Rt(n),r=At(n);if(S(t,r))return a;let e=n.substring(n.length-1);return e="i"===e||"j"===e?e:"i",It(Math.sin(t)*(Math.exp(r)+Math.exp(-r))/2,Math.cos(t)*(Math.exp(r)-Math.exp(-r))/2,e)}function Lt(n){const t=Rt(n),r=At(n);if(S(t,r))return a;let e=n.substring(n.length-1);return e="i"===e||"j"===e?e:"i",It(Math.cos(r)*(Math.exp(t)-Math.exp(-t))/2,Math.sin(r)*(Math.exp(t)+Math.exp(-t))/2,e)}bt.PRECISE=()=>{throw new Error("ERF.PRECISE is not implemented")},Tt.PRECISE=()=>{throw new Error("ERFC.PRECISE is not implemented")};const Ft=en.DIST,qt=en.INV,Ut=on.DIST,_t=Yn.MATH,Vt=Yn.PRECISE,kt=un.DIST,jt=un.DIST.RT,Yt=un.INV,Gt=un.INV.RT,Ht=un.TEST,Xt=sn.P,Bt=sn.P,$t=sn.S,zt=on.INV,Wt=Tt.PRECISE,Kt=bt.PRECISE,Qt=hn.DIST,Zt=gn.DIST,Jt=gn.DIST.RT,nr=gn.INV,tr=gn.INV.RT,rr=Bn.MATH,er=Bn.PRECISE,or=gn.TEST,ir=mn.DIST,ur=mn.INV,ar=dn.PRECISE,fr=vn.DIST,lr=Nn.INV,cr=Nn.DIST,sr=Nn.INV,hr=bn.MULT,gr=bn.SNGL,pr=Tn.DIST,mr=ft.INTL,dr=Sn.DIST,vr=Sn.INV,Er=Sn.S.DIST,Mr=Sn.S.INV,Nr=Cn.EXC,wr=Cn.INC,yr=Dn.EXC,Ir=Dn.INC,br=On.DIST,Tr=xn.EXC,Sr=xn.INC,Ar=Rn.AVG,Cr=Rn.EQ,Dr=Pn.P,Or=Fn.P,xr=Fn.S,Rr=qn.DIST,Pr=qn.DIST.RT,Lr=qn.INV,Fr=qn.TEST,qr=Un.P,Ur=Un.S,_r=kn.DIST,Vr=lt.INTL,kr=jn.TEST;function jr(n){const t=[];return d(n,(n=>{n&&t.push(n)})),t}function Yr(n,t){const r={};for(let t=1;t<n[0].length;++t)r[t]=!0;let e=t[0].length;for(let n=1;n<t.length;++n)t[n].length>e&&(e=t[n].length);for(let o=1;o<n.length;++o)for(let i=1;i<n[o].length;++i){let u=!1,a=!1;for(let r=0;r<t.length;++r){const f=t[r];if(f.length<e)continue;const l=f[0];if(n[o][0]===l){a=!0;for(let t=1;t<f.length;++t)if(!u)if(void 0===f[t]||"*"===f[t])u=!0;else{const r=X(f[t]+""),e=[H(n[o][i],G)].concat(r);u=B(e)}}}a&&(r[i]=r[i]&&u)}const o=[];for(let t=0;t<n[0].length;++t)r[t]&&o.push(t-1);return o}function Gr(n){return n&&n.getTime&&!isNaN(n.getTime())}function Hr(n){return n instanceof Date?n:new Date(n)}function Xr(n,t,r,e,o){if(e=e||0,o=o||0,S(n=R(n),t=R(t),r=R(r),e=R(e),o=R(o)))return a;let i;if(0===n)i=e+r*t;else{const u=Math.pow(1+n,t);i=1===o?e*u+r*(1+n)*(u-1)/n:e*u+r*(u-1)/n}return-i}function Br(n,t,r,e,o,i){if(o=o||0,i=i||0,S(n=R(n),t=R(t),r=R(r),e=R(e),o=R(o),i=R(i)))return a;const u=zr(n,r,e,o,i);return(1===t?1===i?0:-e:1===i?Xr(n,t-2,u,e,1)-u:Xr(n,t-1,u,e,0))*n}function $r(){const n=P(M(arguments));if(n instanceof Error)return n;const t=n[0];let r=0;for(let e=1;e<n.length;e++)r+=n[e]/Math.pow(1+t,e);return r}function zr(n,t,r,e,o){if(e=e||0,o=o||0,S(n=R(n),t=R(t),r=R(r),e=R(e),o=R(o)))return a;let i;if(0===n)i=(r+e)/t;else{const u=Math.pow(1+n,t);i=1===o?(e*n/(u-1)+r*n/(1-1/u))/(1+n):e*n/(u-1)+r*n/(1-1/u)}return-i}const Wr={errors:p,symbols:Zn};t.ABS=function(n){return(n=R(n))instanceof Error?n:Math.abs(n)},t.ACCRINT=function(n,t,r,e,o,i,u){return n=Hr(n),t=Hr(t),r=Hr(r),Gr(n)&&Gr(t)&&Gr(r)?e<=0||o<=0||-1===[1,2,4].indexOf(i)||-1===[0,1,2,3,4].indexOf(u)||r<=n?c:(o=o||0)*e*ht(n,r,u=u||0):a},t.ACCRINTM=function(){throw new Error("ACCRINTM is not implemented")},t.ACOS=function(n){if((n=R(n))instanceof Error)return n;let t=Math.acos(n);return isNaN(t)&&(t=c),t},t.ACOSH=function(n){if((n=R(n))instanceof Error)return n;let t=Math.log(n+Math.sqrt(n*n-1));return isNaN(t)&&(t=c),t},t.ACOT=function(n){return(n=R(n))instanceof Error?n:Math.atan(1/n)},t.ACOTH=function(n){if((n=R(n))instanceof Error)return n;let t=.5*Math.log((n+1)/(n-1));return isNaN(t)&&(t=c),t},t.AGGREGATE=function(n,t,r,e){if(S(n=R(n),R(n)))return a;switch(n){case 1:return tn(r);case 2:return fn(r);case 3:return ln(r);case 4:return wn(r);case 5:return In(r);case 6:return Wn(r);case 7:return Fn.S(r);case 8:return Fn.P(r);case 9:return Qn(r);case 10:return Un.S(r);case 11:return Un.P(r);case 12:return yn(r);case 13:return bn.SNGL(r);case 14:return En(r,e);case 15:return Ln(r,e);case 16:return Cn.INC(r,e);case 17:return xn.INC(r,e);case 18:return Cn.EXC(r,e);case 19:return xn.EXC(r,e)}},t.AMORDEGRC=function(){throw new Error("AMORDEGRC is not implemented")},t.AMORLINC=function(){throw new Error("AMORLINC is not implemented")},t.AND=function(){const n=M(arguments);let t=a;for(let r=0;r<n.length;r++){if(n[r]instanceof Error)return n[r];void 0!==n[r]&&null!==n[r]&&"string"!=typeof n[r]&&(t===a&&(t=!0),n[r]||(t=!1))}return t},t.ARABIC=function(n){if(null==n)return 0;if(n instanceof Error)return n;if(!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(n))return a;let t=0;return n.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,(n=>{t+={M:1e3,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1}[n]})),t},t.ASC=function(){throw new Error("ASC is not implemented")},t.ASIN=function(n){if((n=R(n))instanceof Error)return n;let t=Math.asin(n);return isNaN(t)&&(t=c),t},t.ASINH=function(n){return(n=R(n))instanceof Error?n:Math.log(n+Math.sqrt(n*n+1))},t.ATAN=function(n){return(n=R(n))instanceof Error?n:Math.atan(n)},t.ATAN2=function(n,t){return T(n=R(n),t=R(t))||Math.atan2(n,t)},t.ATANH=function(n){if((n=R(n))instanceof Error)return n;let t=Math.log((1+n)/(1-n))/2;return isNaN(t)&&(t=c),t},t.AVEDEV=function(){const n=M(arguments).filter(q);if(0===n.length)return c;const t=P(n);return t instanceof Error?t:e.sum(e(t).subtract(e.mean(t)).abs()[0])/t.length},t.AVERAGE=tn,t.AVERAGEA=rn,t.AVERAGEIF=function(n,t,r){if(arguments.length<=1)return s;if(r=P(M(r=r||n).filter(q)),n=M(n),r instanceof Error)return r;let e=0,o=0;const i=void 0===t||"*"===t,u=i?null:X(t+"");for(let t=0;t<n.length;t++){const a=n[t];if(i)o+=r[t],e++;else{const n=[H(a,G)].concat(u);B(n)&&(o+=r[t],e++)}}return o/e},t.AVERAGEIFS=function(){const n=m(arguments),t=(n.length-1)/2,r=M(n[0]);let e=0,o=0;for(let i=0;i<r.length;i++){let u=!1;for(let r=0;r<t;r++){const t=n[2*r+1][i],e=n[2*r+2];let o=!1;if(void 0===e||"*"===e)o=!0;else{const n=X(e+""),r=[H(t,G)].concat(n);o=B(r)}if(!o){u=!1;break}u=!0}u&&(o+=r[i],e++)}const i=o/e;return isNaN(i)?0:i},t.BAHTTEXT=function(){throw new Error("BAHTTEXT is not implemented")},t.BASE=function(n,t,r){const e=T(n=R(n),t=R(t),r=R(r));if(e)return e;if(0===t)return c;const o=n.toString(t);return new Array(Math.max(r+1-o.length,0)).join("0")+o},t.BESSELI=function(n,t){return S(n=R(n),t=R(t))?a:o.besseli(n,t)},t.BESSELJ=function(n,t){return S(n=R(n),t=R(t))?a:o.besselj(n,t)},t.BESSELK=function(n,t){return S(n=R(n),t=R(t))?a:o.besselk(n,t)},t.BESSELY=function(n,t){return S(n=R(n),t=R(t))?a:o.bessely(n,t)},t.BETA=en,t.BETADIST=Ft,t.BETAINV=qt,t.BIN2DEC=function(n){if(!yt(n))return c;const t=parseInt(n,2),r=n.toString();return 10===r.length&&"1"===r.substring(0,1)?parseInt(r.substring(1),2)-512:t},t.BIN2HEX=function(n,t){if(!yt(n))return c;const r=n.toString();if(10===r.length&&"1"===r.substring(0,1))return(0xfffffffe00+parseInt(r.substring(1),2)).toString(16);const e=parseInt(n,2).toString(16);return void 0===t?e:isNaN(t)?a:t<0?c:(t=Math.floor(t))>=e.length?Mt("0",t-e.length)+e:c},t.BIN2OCT=function(n,t){if(!yt(n))return c;const r=n.toString();if(10===r.length&&"1"===r.substring(0,1))return(1073741312+parseInt(r.substring(1),2)).toString(8);const e=parseInt(n,2).toString(8);return void 0===t?e:isNaN(t)?a:t<0?c:(t=Math.floor(t))>=e.length?Mt("0",t-e.length)+e:c},t.BINOM=on,t.BINOMDIST=Ut,t.BITAND=function(n,t){return S(n=R(n),t=R(t))?a:n<0||t<0||Math.floor(n)!==n||Math.floor(t)!==t||n>0xffffffffffff||t>0xffffffffffff?c:n&t},t.BITLSHIFT=function(n,t){return S(n=R(n),t=R(t))?a:n<0||Math.floor(n)!==n||n>0xffffffffffff||Math.abs(t)>53?c:t>=0?n<<t:n>>-t},t.BITOR=function(n,t){return S(n=R(n),t=R(t))?a:n<0||t<0||Math.floor(n)!==n||Math.floor(t)!==t||n>0xffffffffffff||t>0xffffffffffff?c:n|t},t.BITRSHIFT=function(n,t){return S(n=R(n),t=R(t))?a:n<0||Math.floor(n)!==n||n>0xffffffffffff||Math.abs(t)>53?c:t>=0?n>>t:n<<-t},t.BITXOR=function(n,t){return S(n=R(n),t=R(t))?a:n<0||t<0||Math.floor(n)!==n||Math.floor(t)!==t||n>0xffffffffffff||t>0xffffffffffff?c:n^t},t.CEILING=Yn,t.CEILINGMATH=_t,t.CEILINGPRECISE=Vt,t.CELL=function(){throw new Error("CELL is not implemented")},t.CHAR=pt,t.CHIDIST=kt,t.CHIDISTRT=jt,t.CHIINV=Yt,t.CHIINVRT=Gt,t.CHISQ=un,t.CHITEST=Ht,t.CHOOSE=function(){if(arguments.length<2)return s;const n=arguments[0];return n<1||n>254||arguments.length<n+1?a:arguments[n]},t.CLEAN=function(n){return S(n)?n:(n=n||"").replace(/[\0-\x1F]/g,"")},t.CODE=mt,t.COLUMN=function(n,t){return 2!==arguments.length?s:t<0?c:n instanceof Array&&"number"==typeof t?0!==n.length?e.col(n,t):void 0:a},t.COLUMNS=function(n){return 1!==arguments.length?s:n instanceof Array?0===n.length?0:e.cols(n):a},t.COMBIN=Gn,t.COMBINA=function(n,t){return T(n=R(n),t=R(t))||(n<t?c:0===n&&0===t?1:Gn(n+t-1,n-1))},t.COMPLEX=It,t.CONCAT=vt,t.CONCATENATE=dt,t.CONFIDENCE=an,t.CONVERT=function(n,t,r){if((n=R(n))instanceof Error)return n;const e=[["a.u. of action","?",null,"action",!1,!1,105457168181818e-48],["a.u. of charge","e",null,"electric_charge",!1,!1,160217653141414e-33],["a.u. of energy","Eh",null,"energy",!1,!1,435974417757576e-32],["a.u. of length","a?",null,"length",!1,!1,529177210818182e-25],["a.u. of mass","m?",null,"mass",!1,!1,910938261616162e-45],["a.u. of time","?/Eh",null,"time",!1,!1,241888432650516e-31],["admiralty knot","admkn",null,"speed",!1,!0,.514773333],["ampere","A",null,"electric_current",!0,!1,1],["ampere per meter","A/m",null,"magnetic_field_intensity",!0,!1,1],["ångström","Å",["ang"],"length",!1,!0,1e-10],["are","ar",null,"area",!1,!0,100],["astronomical unit","ua",null,"length",!1,!1,149597870691667e-25],["bar","bar",null,"pressure",!1,!1,1e5],["barn","b",null,"area",!1,!1,1e-28],["becquerel","Bq",null,"radioactivity",!0,!1,1],["bit","bit",["b"],"information",!1,!0,1],["btu","BTU",["btu"],"energy",!1,!0,1055.05585262],["byte","byte",null,"information",!1,!0,8],["candela","cd",null,"luminous_intensity",!0,!1,1],["candela per square metre","cd/m?",null,"luminance",!0,!1,1],["coulomb","C",null,"electric_charge",!0,!1,1],["cubic ångström","ang3",["ang^3"],"volume",!1,!0,1e-30],["cubic foot","ft3",["ft^3"],"volume",!1,!0,.028316846592],["cubic inch","in3",["in^3"],"volume",!1,!0,16387064e-12],["cubic light-year","ly3",["ly^3"],"volume",!1,!0,846786664623715e-61],["cubic metre","m?",null,"volume",!0,!0,1],["cubic mile","mi3",["mi^3"],"volume",!1,!0,4168181825.44058],["cubic nautical mile","Nmi3",["Nmi^3"],"volume",!1,!0,6352182208],["cubic Pica","Pica3",["Picapt3","Pica^3","Picapt^3"],"volume",!1,!0,7.58660370370369e-8],["cubic yard","yd3",["yd^3"],"volume",!1,!0,.764554857984],["cup","cup",null,"volume",!1,!0,.0002365882365],["dalton","Da",["u"],"mass",!1,!1,166053886282828e-41],["day","d",["day"],"time",!1,!0,86400],["degree","°",null,"angle",!1,!1,.0174532925199433],["degrees Rankine","Rank",null,"temperature",!1,!0,.555555555555556],["dyne","dyn",["dy"],"force",!1,!0,1e-5],["electronvolt","eV",["ev"],"energy",!1,!0,1.60217656514141],["ell","ell",null,"length",!1,!0,1.143],["erg","erg",["e"],"energy",!1,!0,1e-7],["farad","F",null,"electric_capacitance",!0,!1,1],["fluid ounce","oz",null,"volume",!1,!0,295735295625e-16],["foot","ft",null,"length",!1,!0,.3048],["foot-pound","flb",null,"energy",!1,!0,1.3558179483314],["gal","Gal",null,"acceleration",!1,!1,.01],["gallon","gal",null,"volume",!1,!0,.003785411784],["gauss","G",["ga"],"magnetic_flux_density",!1,!0,1],["grain","grain",null,"mass",!1,!0,647989e-10],["gram","g",null,"mass",!1,!0,.001],["gray","Gy",null,"absorbed_dose",!0,!1,1],["gross registered ton","GRT",["regton"],"volume",!1,!0,2.8316846592],["hectare","ha",null,"area",!1,!0,1e4],["henry","H",null,"inductance",!0,!1,1],["hertz","Hz",null,"frequency",!0,!1,1],["horsepower","HP",["h"],"power",!1,!0,745.69987158227],["horsepower-hour","HPh",["hh","hph"],"energy",!1,!0,2684519.538],["hour","h",["hr"],"time",!1,!0,3600],["imperial gallon (U.K.)","uk_gal",null,"volume",!1,!0,.00454609],["imperial hundredweight","lcwt",["uk_cwt","hweight"],"mass",!1,!0,50.802345],["imperial quart (U.K)","uk_qt",null,"volume",!1,!0,.0011365225],["imperial ton","brton",["uk_ton","LTON"],"mass",!1,!0,1016.046909],["inch","in",null,"length",!1,!0,.0254],["international acre","uk_acre",null,"area",!1,!0,4046.8564224],["IT calorie","cal",null,"energy",!1,!0,4.1868],["joule","J",null,"energy",!0,!0,1],["katal","kat",null,"catalytic_activity",!0,!1,1],["kelvin","K",["kel"],"temperature",!0,!0,1],["kilogram","kg",null,"mass",!0,!0,1],["knot","kn",null,"speed",!1,!0,.514444444444444],["light-year","ly",null,"length",!1,!0,9460730472580800],["litre","L",["l","lt"],"volume",!1,!0,.001],["lumen","lm",null,"luminous_flux",!0,!1,1],["lux","lx",null,"illuminance",!0,!1,1],["maxwell","Mx",null,"magnetic_flux",!1,!1,1e-18],["measurement ton","MTON",null,"volume",!1,!0,1.13267386368],["meter per hour","m/h",["m/hr"],"speed",!1,!0,.00027777777777778],["meter per second","m/s",["m/sec"],"speed",!0,!0,1],["meter per second squared","m?s??",null,"acceleration",!0,!1,1],["parsec","pc",["parsec"],"length",!1,!0,0x6da012f958ee1c],["meter squared per second","m?/s",null,"kinematic_viscosity",!0,!1,1],["metre","m",null,"length",!0,!0,1],["miles per hour","mph",null,"speed",!1,!0,.44704],["millimetre of mercury","mmHg",null,"pressure",!1,!1,133.322],["minute","?",null,"angle",!1,!1,.000290888208665722],["minute","min",["mn"],"time",!1,!0,60],["modern teaspoon","tspm",null,"volume",!1,!0,5e-6],["mole","mol",null,"amount_of_substance",!0,!1,1],["morgen","Morgen",null,"area",!1,!0,2500],["n.u. of action","?",null,"action",!1,!1,105457168181818e-48],["n.u. of mass","m?",null,"mass",!1,!1,910938261616162e-45],["n.u. of speed","c?",null,"speed",!1,!1,299792458],["n.u. of time","?/(me?c??)",null,"time",!1,!1,128808866778687e-35],["nautical mile","M",["Nmi"],"length",!1,!0,1852],["newton","N",null,"force",!0,!0,1],["œrsted","Oe ",null,"magnetic_field_intensity",!1,!1,79.5774715459477],["ohm","Ω",null,"electric_resistance",!0,!1,1],["ounce mass","ozm",null,"mass",!1,!0,.028349523125],["pascal","Pa",null,"pressure",!0,!1,1],["pascal second","Pa?s",null,"dynamic_viscosity",!0,!1,1],["pferdestärke","PS",null,"power",!1,!0,735.49875],["phot","ph",null,"illuminance",!1,!1,1e-4],["pica (1/6 inch)","pica",null,"length",!1,!0,.00035277777777778],["pica (1/72 inch)","Pica",["Picapt"],"length",!1,!0,.00423333333333333],["poise","P",null,"dynamic_viscosity",!1,!1,.1],["pond","pond",null,"force",!1,!0,.00980665],["pound force","lbf",null,"force",!1,!0,4.4482216152605],["pound mass","lbm",null,"mass",!1,!0,.45359237],["quart","qt",null,"volume",!1,!0,.000946352946],["radian","rad",null,"angle",!0,!1,1],["second","?",null,"angle",!1,!1,484813681109536e-20],["second","s",["sec"],"time",!0,!0,1],["short hundredweight","cwt",["shweight"],"mass",!1,!0,45.359237],["siemens","S",null,"electrical_conductance",!0,!1,1],["sievert","Sv",null,"equivalent_dose",!0,!1,1],["slug","sg",null,"mass",!1,!0,14.59390294],["square ångström","ang2",["ang^2"],"area",!1,!0,1e-20],["square foot","ft2",["ft^2"],"area",!1,!0,.09290304],["square inch","in2",["in^2"],"area",!1,!0,64516e-8],["square light-year","ly2",["ly^2"],"area",!1,!0,895054210748189e17],["square meter","m?",null,"area",!0,!0,1],["square mile","mi2",["mi^2"],"area",!1,!0,2589988.110336],["square nautical mile","Nmi2",["Nmi^2"],"area",!1,!0,3429904],["square Pica","Pica2",["Picapt2","Pica^2","Picapt^2"],"area",!1,!0,1792111111111e-17],["square yard","yd2",["yd^2"],"area",!1,!0,.83612736],["statute mile","mi",null,"length",!1,!0,1609.344],["steradian","sr",null,"solid_angle",!0,!1,1],["stilb","sb",null,"luminance",!1,!1,1e-4],["stokes","St",null,"kinematic_viscosity",!1,!1,1e-4],["stone","stone",null,"mass",!1,!0,6.35029318],["tablespoon","tbs",null,"volume",!1,!0,147868e-10],["teaspoon","tsp",null,"volume",!1,!0,492892e-11],["tesla","T",null,"magnetic_flux_density",!0,!0,1],["thermodynamic calorie","c",null,"energy",!1,!0,4.184],["ton","ton",null,"mass",!1,!0,907.18474],["tonne","t",null,"mass",!1,!1,1e3],["U.K. pint","uk_pt",null,"volume",!1,!0,.00056826125],["U.S. bushel","bushel",null,"volume",!1,!0,.03523907],["U.S. oil barrel","barrel",null,"volume",!1,!0,.158987295],["U.S. pint","pt",["us_pt"],"volume",!1,!0,.000473176473],["U.S. survey mile","survey_mi",null,"length",!1,!0,1609.347219],["U.S. survey/statute acre","us_acre",null,"area",!1,!0,4046.87261],["volt","V",null,"voltage",!0,!1,1],["watt","W",null,"power",!0,!0,1],["watt-hour","Wh",["wh"],"energy",!1,!0,3600],["weber","Wb",null,"magnetic_flux",!0,!1,1],["yard","yd",null,"length",!1,!0,.9144],["year","yr",null,"time",!1,!0,31557600]],o={Yi:["yobi",80,12089258196146292e8,"Yi","yotta"],Zi:["zebi",70,11805916207174113e5,"Zi","zetta"],Ei:["exbi",60,0x1000000000000000,"Ei","exa"],Pi:["pebi",50,0x4000000000000,"Pi","peta"],Ti:["tebi",40,1099511627776,"Ti","tera"],Gi:["gibi",30,1073741824,"Gi","giga"],Mi:["mebi",20,1048576,"Mi","mega"],ki:["kibi",10,1024,"ki","kilo"]},i={Y:["yotta",1e24,"Y"],Z:["zetta",1e21,"Z"],E:["exa",1e18,"E"],P:["peta",1e15,"P"],T:["tera",1e12,"T"],G:["giga",1e9,"G"],M:["mega",1e6,"M"],k:["kilo",1e3,"k"],h:["hecto",100,"h"],e:["dekao",10,"e"],d:["deci",.1,"d"],c:["centi",.01,"c"],m:["milli",.001,"m"],u:["micro",1e-6,"u"],n:["nano",1e-9,"n"],p:["pico",1e-12,"p"],f:["femto",1e-15,"f"],a:["atto",1e-18,"a"],z:["zepto",1e-21,"z"],y:["yocto",1e-24,"y"]};let u,a=null,f=null,l=t,c=r,h=1,g=1;for(let n=0;n<e.length;n++)u=null===e[n][2]?[]:e[n][2],(e[n][1]===l||u.indexOf(l)>=0)&&(a=e[n]),(e[n][1]===c||u.indexOf(c)>=0)&&(f=e[n]);if(null===a){const n=o[t.substring(0,2)];let r=i[t.substring(0,1)];"da"===t.substring(0,2)&&(r=["dekao",10,"da"]),n?(h=n[2],l=t.substring(2)):r&&(h=r[1],l=t.substring(r[2].length));for(let n=0;n<e.length;n++)u=null===e[n][2]?[]:e[n][2],(e[n][1]===l||u.indexOf(l)>=0)&&(a=e[n])}if(null===f){const n=o[r.substring(0,2)];let t=i[r.substring(0,1)];"da"===r.substring(0,2)&&(t=["dekao",10,"da"]),n?(g=n[2],c=r.substring(2)):t&&(g=t[1],c=r.substring(t[2].length));for(let n=0;n<e.length;n++)u=null===e[n][2]?[]:e[n][2],(e[n][1]===c||u.indexOf(c)>=0)&&(f=e[n])}return null===a||null===f||a[3]!==f[3]?s:n*a[6]*h/(f[6]*g)},t.CORREL=function(n,t){return S(n=P(M(n)),t=P(M(t)))?a:e.corrcoeff(n,t)},t.COS=function(n){return(n=R(n))instanceof Error?n:Math.cos(n)},t.COSH=function(n){return(n=R(n))instanceof Error?n:(Math.exp(n)+Math.exp(-n))/2},t.COT=function(n){return(n=R(n))instanceof Error?n:0===n?u:1/Math.tan(n)},t.COTH=function(n){if((n=R(n))instanceof Error)return n;if(0===n)return u;const t=Math.exp(2*n);return(t+1)/(t-1)},t.COUNT=fn,t.COUNTA=ln,t.COUNTBLANK=cn,t.COUNTIF=function(n,t){if(n=M(n),void 0===t||"*"===t)return n.length;let r=0;const e=X(t+"");for(let t=0;t<n.length;t++){const o=[H(n[t],G)].concat(e);B(o)&&r++}return r},t.COUNTIFS=function(){const n=m(arguments),t=new Array(M(n[0]).length);for(let n=0;n<t.length;n++)t[n]=!0;for(let r=0;r<n.length;r+=2){const e=M(n[r]),o=n[r+1];if(void 0!==o&&"*"!==o){const n=X(o+"");for(let r=0;r<e.length;r++){const o=[H(e[r],G)].concat(n);t[r]=t[r]&&B(o)}}}let r=0;for(let n=0;n<t.length;n++)t[n]&&r++;return r},t.COUPDAYBS=function(){throw new Error("COUPDAYBS is not implemented")},t.COUPDAYS=function(){throw new Error("COUPDAYS is not implemented")},t.COUPDAYSNC=function(){throw new Error("COUPDAYSNC is not implemented")},t.COUPNCD=function(){throw new Error("COUPNCD is not implemented")},t.COUPNUM=function(){throw new Error("COUPNUM is not implemented")},t.COUPPCD=function(){throw new Error("COUPPCD is not implemented")},t.COVAR=Xt,t.COVARIANCE=sn,t.COVARIANCEP=Bt,t.COVARIANCES=$t,t.CRITBINOM=zt,t.CSC=function(n){return(n=R(n))instanceof Error?n:0===n?u:1/Math.sin(n)},t.CSCH=function(n){return(n=R(n))instanceof Error?n:0===n?u:2/(Math.exp(n)-Math.exp(-n))},t.CUMIPMT=function(n,t,r,e,o,i){if(S(n=R(n),t=R(t),r=R(r)))return a;if(n<=0||t<=0||r<=0)return c;if(e<1||o<1||e>o)return c;if(0!==i&&1!==i)return c;const u=zr(n,t,r,0,i);let f=0;1===e&&(0===i&&(f=-r),e++);for(let t=e;t<=o;t++)f+=1===i?Xr(n,t-2,u,r,1)-u:Xr(n,t-1,u,r,0);return f*=n,f},t.CUMPRINC=function(n,t,r,e,o,i){if(S(n=R(n),t=R(t),r=R(r)))return a;if(n<=0||t<=0||r<=0)return c;if(e<1||o<1||e>o)return c;if(0!==i&&1!==i)return c;const u=zr(n,t,r,0,i);let f=0;1===e&&(f=0===i?u+r*n:u,e++);for(let t=e;t<=o;t++)f+=i>0?u-(Xr(n,t-2,u,r,1)-u)*n:u-Xr(n,t-1,u,r,0)*n;return f},t.DATE=function(n,t,r){let e;return S(n=R(n),t=R(t),r=R(r))?e=a:(e=new Date(n,t-1,r),e.getFullYear()<0&&(e=c)),e},t.DATEDIF=et,t.DATEVALUE=function(n){if("string"!=typeof n)return a;const t=Date.parse(n);return isNaN(t)?a:new Date(n)},t.DAVERAGE=function(n,t,r){if(isNaN(t)&&"string"!=typeof t)return a;const e=Yr(n,r);let o=[];if("string"==typeof t){const r=b(n,t);o=y(n[r])}else o=y(n[t]);let i=0;return d(e,(n=>{i+=o[n]})),0===e.length?u:i/e.length},t.DAY=function(n){const t=O(n);return t instanceof Error?t:t.getDate()},t.DAYS=it,t.DAYS360=ut,t.DB=function(n,t,r,e,o){if(o=void 0===o?12:o,S(n=R(n),t=R(t),r=R(r),e=R(e),o=R(o)))return a;if(n<0||t<0||r<0||e<0)return c;if(-1===[1,2,3,4,5,6,7,8,9,10,11,12].indexOf(o))return c;if(e>r)return c;if(t>=n)return 0;const i=(1-Math.pow(t/n,1/r)).toFixed(3),u=n*i*o/12;let f=u,l=0;const s=e===r?r-1:e;for(let t=2;t<=s;t++)l=(n-f)*i,f+=l;return 1===e?u:e===r?(n-f)*i:l},t.DBCS=function(){throw new Error("DBCS is not implemented")},t.DCOUNT=function(n,t,r){if(isNaN(t)&&"string"!=typeof t)return a;const e=Yr(n,r);let o=[];if("string"==typeof t){const r=b(n,t);o=y(n[r])}else o=y(n[t]);const i=[];return d(e,(n=>{i.push(o[n])})),fn(i)},t.DCOUNTA=function(n,t,r){if(isNaN(t)&&"string"!=typeof t)return a;const e=Yr(n,r);let o=[];if("string"==typeof t){const r=b(n,t);o=y(n[r])}else o=y(n[t]);const i=[];return d(e,(n=>{i.push(o[n])})),ln(i)},t.DDB=function(n,t,r,e,o){if(o=void 0===o?2:o,S(n=R(n),t=R(t),r=R(r),e=R(e),o=R(o)))return a;if(n<0||t<0||r<0||e<0||o<=0)return c;if(e>r)return c;if(t>=n)return 0;let i=0,u=0;for(let a=1;a<=e;a++)u=Math.min(o/r*(n-i),n-t-i),i+=u;return u},t.DEC2BIN=function(n,t){if((n=R(n))instanceof Error)return n;if(!/^-?[0-9]{1,3}$/.test(n)||n<-512||n>511)return c;if(n<0)return"1"+Mt("0",9-(512+n).toString(2).length)+(512+n).toString(2);const r=parseInt(n,10).toString(2);return void 0===t?r:isNaN(t)?a:t<0?c:(t=Math.floor(t))>=r.length?Mt("0",t-r.length)+r:c},t.DEC2HEX=function(n,t){if((n=R(n))instanceof Error)return n;if(!/^-?[0-9]{1,12}$/.test(n)||n<-549755813888||n>549755813887)return c;if(n<0)return(1099511627776+n).toString(16);const r=parseInt(n,10).toString(16);return void 0===t?r:isNaN(t)?a:t<0?c:(t=Math.floor(t))>=r.length?Mt("0",t-r.length)+r:c},t.DEC2OCT=function(n,t){if((n=R(n))instanceof Error)return n;if(!/^-?[0-9]{1,9}$/.test(n)||n<-536870912||n>536870911)return c;if(n<0)return(1073741824+n).toString(8);const r=parseInt(n,10).toString(8);return void 0===t?r:isNaN(t)?a:t<0?c:(t=Math.floor(t))>=r.length?Mt("0",t-r.length)+r:c},t.DECIMAL=function(n,t){if(arguments.length<1)return a;return T(n=R(n),t=R(t))||(0===t?c:parseInt(n,t))},t.DEGREES=function(n){return(n=R(n))instanceof Error?n:180*n/Math.PI},t.DELTA=function(n,t){return t=void 0===t?0:t,S(n=R(n),t=R(t))?a:n===t?1:0},t.DEVSQ=function(){const n=P(M(arguments));if(n instanceof Error)return n;const t=e.mean(n);let r=0;for(let e=0;e<n.length;e++)r+=Math.pow(n[e]-t,2);return r},t.DGET=function(n,t,r){if(isNaN(t)&&"string"!=typeof t)return a;const e=Yr(n,r);let o=[];return o=y("string"==typeof t?n[b(n,t)]:n[t]),0===e.length?a:e.length>1?c:o[e[0]]},t.DISC=function(n,t,r,e,o){if(S(n=O(n),t=O(t),r=R(r),e=R(e),o=(o=R(o))||0))return a;if(r<=0||e<=0)return c;if(n>=t)return a;let i,u;switch(o){case 0:i=360,u=ut(n,t,!1);break;case 1:case 3:i=365,u=et(n,t,"D");break;case 2:i=360,u=et(n,t,"D");break;case 4:i=360,u=ut(n,t,!0);break;default:return c}return(e-r)/e*i/u},t.DMAX=function(n,t,r){if(isNaN(t)&&"string"!=typeof t)return a;const e=Yr(n,r);let o=[];if("string"==typeof t){const r=b(n,t);o=y(n[r])}else o=y(n[t]);let i=o[e[0]];return d(e,(n=>{i<o[n]&&(i=o[n])})),i},t.DMIN=function(n,t,r){if(isNaN(t)&&"string"!=typeof t)return a;const e=Yr(n,r);let o=[];if("string"==typeof t){const r=b(n,t);o=y(n[r])}else o=y(n[t]);let i=o[e[0]];return d(e,(n=>{i>o[n]&&(i=o[n])})),i},t.DOLLAR=function(n,t=2){if(n=R(n),isNaN(n))return a;const r={style:"currency",currency:"USD",minimumFractionDigits:t>=0?t:0,maximumFractionDigits:t>=0?t:0},e=(n=Kn(n,t)).toLocaleString("en-US",r);return n<0?"$("+e.slice(2)+")":e},t.DOLLARDE=function(n,t){if(S(n=R(n),t=R(t)))return a;if(t<0)return c;if(t>=0&&t<1)return u;t=parseInt(t,10);let r=parseInt(n,10);r+=n%1*Math.pow(10,Math.ceil(Math.log(t)/Math.LN10))/t;const e=Math.pow(10,Math.ceil(Math.log(t)/Math.LN2)+1);return r=Math.round(r*e)/e,r},t.DOLLARFR=function(n,t){if(S(n=R(n),t=R(t)))return a;if(t<0)return c;if(t>=0&&t<1)return u;t=parseInt(t,10);let r=parseInt(n,10);return r+=n%1*Math.pow(10,-Math.ceil(Math.log(t)/Math.LN10))*t,r},t.DPRODUCT=function(n,t,r){if(isNaN(t)&&"string"!=typeof t)return a;const e=Yr(n,r);let o=[];if("string"==typeof t){const r=b(n,t);o=y(n[r])}else o=y(n[t]);let i=[];d(e,(n=>{i.push(o[n])})),i=jr(i);let u=1;return d(i,(n=>{u*=n})),u},t.DSTDEV=function(n,t,r){if(isNaN(t)&&"string"!=typeof t)return a;const e=Yr(n,r);let o=[];if("string"==typeof t){const r=b(n,t);o=y(n[r])}else o=y(n[t]);let i=[];return d(e,(n=>{i.push(o[n])})),i=jr(i),Fn.S(i)},t.DSTDEVP=function(n,t,r){if(isNaN(t)&&"string"!=typeof t)return a;const e=Yr(n,r);let o=[];if("string"==typeof t){const r=b(n,t);o=y(n[r])}else o=y(n[t]);let i=[];return d(e,(n=>{i.push(o[n])})),i=jr(i),Fn.P(i)},t.DSUM=function(n,t,r){if(isNaN(t)&&"string"!=typeof t)return a;const e=Yr(n,r);let o=[];if("string"==typeof t){const r=b(n,t);o=y(n[r])}else o=y(n[t]);const i=[];return d(e,(n=>{i.push(o[n])})),Qn(i)},t.DURATION=function(){throw new Error("DURATION is not implemented")},t.DVAR=function(n,t,r){if(isNaN(t)&&"string"!=typeof t)return a;const e=Yr(n,r);let o=[];if("string"==typeof t){const r=b(n,t);o=y(n[r])}else o=y(n[t]);const i=[];return d(e,(n=>{i.push(o[n])})),Un.S(i)},t.DVARP=function(n,t,r){if(isNaN(t)&&"string"!=typeof t)return a;const e=Yr(n,r);let o=[];if("string"==typeof t){const r=b(n,t);o=y(n[r])}else o=y(n[t]);const i=[];return d(e,(n=>{i.push(o[n])})),Un.P(i)},t.EDATE=function(n,t){return(n=O(n))instanceof Error?n:isNaN(t)?a:(t=parseInt(t,10),n.setMonth(n.getMonth()+t),n)},t.EFFECT=function(n,t){return S(n=R(n),t=R(t))?a:n<=0||t<1?c:(t=parseInt(t,10),Math.pow(1+n/t,t)-1)},t.EOMONTH=function(n,t){return(n=O(n))instanceof Error?n:isNaN(t)?a:(t=parseInt(t,10),new Date(n.getFullYear(),n.getMonth()+t+1,0))},t.ERF=bt,t.ERFC=Tt,t.ERFCPRECISE=Wt,t.ERFPRECISE=Kt,t.ERROR=$,t.EVEN=function(n){return(n=R(n))instanceof Error?n:Yn(n,-2,-1)},t.EXACT=function(n,t){if(2!==arguments.length)return s;return T(n,t)||(n=L(n))===L(t)},t.EXP=function(n){return arguments.length<1?s:arguments.length>1?h:(n=R(n))instanceof Error?n:n=Math.exp(n)},t.EXPON=hn,t.EXPONDIST=Qt,t.F=gn,t.FACT=Xn,t.FACTDOUBLE=function n(t){if((t=R(t))instanceof Error)return t;const r=Math.floor(t);return r<=0?1:r*n(r-2)},t.FALSE=function(){return!1},t.FDIST=Zt,t.FDISTRT=Jt,t.FIND=function(n,t,r){if(arguments.length<2)return s;n=L(n),r=void 0===r?0:r;const e=(t=L(t)).indexOf(n,r-1);return-1===e?a:e+1},t.FINV=nr,t.FINVRT=tr,t.FISHER=function(n){return(n=R(n))instanceof Error?n:Math.log((1+n)/(1-n))/2},t.FISHERINV=function(n){if((n=R(n))instanceof Error)return n;const t=Math.exp(2*n);return(t-1)/(t+1)},t.FIXED=Et,t.FLOOR=Bn,t.FLOORMATH=rr,t.FLOORPRECISE=er,t.FORECAST=pn,t.FREQUENCY=function(n,t){if(S(n=P(M(n)),t=P(M(t))))return a;const r=n.length,e=t.length,o=[];for(let i=0;i<=e;i++){o[i]=0;for(let u=0;u<r;u++)0===i?n[u]<=t[0]&&(o[0]+=1):i<e?n[u]>t[i-1]&&n[u]<=t[i]&&(o[i]+=1):i===e&&n[u]>t[e-1]&&(o[e]+=1)}return o},t.FTEST=or,t.FV=Xr,t.FVSCHEDULE=function(n,t){if(S(n=R(n),t=P(M(t))))return a;const r=t.length;let e=n;for(let n=0;n<r;n++)e*=1+t[n];return e},t.GAMMA=mn,t.GAMMADIST=ir,t.GAMMAINV=ur,t.GAMMALN=dn,t.GAMMALNPRECISE=ar,t.GAUSS=function(n){return(n=R(n))instanceof Error?n:e.normal.cdf(n,0,1)-.5},t.GCD=function(){const n=P(M(arguments));if(n instanceof Error)return n;const t=n.length,r=n[0];let e=r<0?-r:r;for(let r=1;r<t;r++){const t=n[r];let o=t<0?-t:t;for(;e&&o;)e>o?e%=o:o%=e;e+=o}return e},t.GEOMEAN=function(){const n=P(M(arguments));return n instanceof Error?n:e.geomean(n)},t.GESTEP=function(n,t){return S(t=t||0,n=R(n))?n:n>=t?1:0},t.GROWTH=function(n,t,r,e){if((n=P(n))instanceof Error)return n;let o;if(void 0===t)for(t=[],o=1;o<=n.length;o++)t.push(o);if(void 0===r)for(r=[],o=1;o<=n.length;o++)r.push(o);if(S(t=P(t),r=P(r)))return a;void 0===e&&(e=!0);const i=n.length;let u,f,l=0,c=0,s=0,h=0;for(o=0;o<i;o++){const r=t[o],e=Math.log(n[o]);l+=r,c+=e,s+=r*e,h+=r*r}l/=i,c/=i,s/=i,h/=i,e?(u=(s-l*c)/(h-l*l),f=c-u*l):(u=s/h,f=0);const g=[];for(o=0;o<r.length;o++)g.push(Math.exp(f+u*r[o]));return g},t.HARMEAN=function(){const n=P(M(arguments));if(n instanceof Error)return n;const t=n.length;let r=0;for(let e=0;e<t;e++)r+=1/n[e];return t/r},t.HEX2BIN=function(n,t){if(!/^[0-9A-Fa-f]{1,10}$/.test(n))return c;const r=!(10!==n.length||"f"!==n.substring(0,1).toLowerCase()),e=r?parseInt(n,16)-1099511627776:parseInt(n,16);if(e<-512||e>511)return c;if(r)return"1"+Mt("0",9-(512+e).toString(2).length)+(512+e).toString(2);const o=e.toString(2);return void 0===t?o:isNaN(t)?a:t<0?c:(t=Math.floor(t))>=o.length?Mt("0",t-o.length)+o:c},t.HEX2DEC=function(n){if(!/^[0-9A-Fa-f]{1,10}$/.test(n))return c;const t=parseInt(n,16);return t>=549755813888?t-1099511627776:t},t.HEX2OCT=function(n,t){if(!/^[0-9A-Fa-f]{1,10}$/.test(n))return c;const r=parseInt(n,16);if(r>536870911&&r<0xffe0000000)return c;if(r>=0xffe0000000)return(r-0xffc0000000).toString(8);const e=r.toString(8);return void 0===t?e:isNaN(t)?a:t<0?c:(t=Math.floor(t))>=e.length?Mt("0",t-e.length)+e:c},t.HLOOKUP=function(n,t,r,e){return nn(n,I(t),r,e)},t.HOUR=function(n){return(n=O(n))instanceof Error?n:n.getHours()},t.HYPGEOM=vn,t.HYPGEOMDIST=fr,t.IF=function(n,t,r){return n instanceof Error?n:(null==(t=!(arguments.length>=2)||t)&&(t=0),null==(r=3===arguments.length&&r)&&(r=0),n?t:r)},t.IFERROR=function(n,t){return W(n)?t:n},t.IFNA=function(n,t){return n===s?t:n},t.IFS=function(){for(let n=0;n<arguments.length/2;n++)if(arguments[2*n])return arguments[2*n+1];return s},t.IMABS=St,t.IMAGINARY=At,t.IMARGUMENT=Ct,t.IMCONJUGATE=function(n){const t=Rt(n),r=At(n);if(S(t,r))return a;let e=n.substring(n.length-1);return e="i"===e||"j"===e?e:"i",0!==r?It(t,-r,e):n},t.IMCOS=Dt,t.IMCOSH=Ot,t.IMCOT=function(n){return S(Rt(n),At(n))?a:xt(Dt(n),Pt(n))},t.IMCSC=function(n){return!0===n||!1===n?a:S(Rt(n),At(n))?c:xt("1",Pt(n))},t.IMCSCH=function(n){return!0===n||!1===n?a:S(Rt(n),At(n))?c:xt("1",Lt(n))},t.IMDIV=xt,t.IMEXP=function(n){const t=Rt(n),r=At(n);if(S(t,r))return a;let e=n.substring(n.length-1);e="i"===e||"j"===e?e:"i";const o=Math.exp(t);return It(o*Math.cos(r),o*Math.sin(r),e)},t.IMLN=function(n){const t=Rt(n),r=At(n);if(S(t,r))return a;let e=n.substring(n.length-1);return e="i"===e||"j"===e?e:"i",It(Math.log(Math.sqrt(t*t+r*r)),Math.atan(r/t),e)},t.IMLOG10=function(n){const t=Rt(n),r=At(n);if(S(t,r))return a;let e=n.substring(n.length-1);return e="i"===e||"j"===e?e:"i",It(Math.log(Math.sqrt(t*t+r*r))/Math.log(10),Math.atan(r/t)/Math.log(10),e)},t.IMLOG2=function(n){const t=Rt(n),r=At(n);if(S(t,r))return a;let e=n.substring(n.length-1);return e="i"===e||"j"===e?e:"i",It(Math.log(Math.sqrt(t*t+r*r))/Math.log(2),Math.atan(r/t)/Math.log(2),e)},t.IMPOWER=function(n,t){if(S(t=R(t),Rt(n),At(n)))return a;let r=n.substring(n.length-1);r="i"===r||"j"===r?r:"i";const e=Math.pow(St(n),t),o=Ct(n);return It(e*Math.cos(t*o),e*Math.sin(t*o),r)},t.IMPRODUCT=function(){let n=arguments[0];if(!arguments.length)return a;for(let t=1;t<arguments.length;t++){const r=Rt(n),e=At(n),o=Rt(arguments[t]),i=At(arguments[t]);if(S(r,e,o,i))return a;n=It(r*o-e*i,r*i+e*o)}return n},t.IMREAL=Rt,t.IMSEC=function(n){return!0===n||!1===n||S(Rt(n),At(n))?a:xt("1",Dt(n))},t.IMSECH=function(n){return S(Rt(n),At(n))?a:xt("1",Ot(n))},t.IMSIN=Pt,t.IMSINH=Lt,t.IMSQRT=function(n){if(S(Rt(n),At(n)))return a;let t=n.substring(n.length-1);t="i"===t||"j"===t?t:"i";const r=Math.sqrt(St(n)),e=Ct(n);return It(r*Math.cos(e/2),r*Math.sin(e/2),t)},t.IMSUB=function(n,t){const r=Rt(n),e=At(n),o=Rt(t),i=At(t);if(S(r,e,o,i))return a;const u=n.substring(n.length-1),f=t.substring(t.length-1);let l="i";return("j"===u||"j"===f)&&(l="j"),It(r-o,e-i,l)},t.IMSUM=function(){if(!arguments.length)return a;const n=M(arguments);let t=n[0];for(let r=1;r<n.length;r++){const e=Rt(t),o=At(t),i=Rt(n[r]),u=At(n[r]);if(S(e,o,i,u))return a;t=It(e+i,o+u)}return t},t.IMTAN=function(n){return!0===n||!1===n||S(Rt(n),At(n))?a:xt(Pt(n),Dt(n))},t.INDEX=function(n,t,r){const e=T(n,t,r);if(e)return e;if(!Array.isArray(n))return a;const o=n.length>0&&!Array.isArray(n[0]);return o&&!r?(r=t,t=1):(r=r||1,t=t||1),r<0||t<0?a:o&&1===t&&r<=n.length?n[r-1]:t<=n.length&&r<=n[t-1].length?n[t-1][r-1]:f},t.INFO=function(){throw new Error("INFO is not implemented")},t.INT=function(n){return(n=R(n))instanceof Error?n:Math.floor(n)},t.INTERCEPT=function(n,t){return S(n=P(n),t=P(t))?a:n.length!==t.length?s:pn(0,n,t)},t.INTRATE=function(){throw new Error("INTRATE is not implemented")},t.IPMT=Br,t.IRR=function(n,t){if(t=t||0,S(n=P(M(n)),t=R(t)))return a;const r=(n,t,r)=>{const e=r+1;let o=n[0];for(let r=1;r<n.length;r++)o+=n[r]/Math.pow(e,(t[r]-t[0])/365);return o},e=(n,t,r)=>{const e=r+1;let o=0;for(let r=1;r<n.length;r++){const i=(t[r]-t[0])/365;o-=i*n[r]/Math.pow(e,i+1)}return o},o=[];let i=!1,u=!1;for(let t=0;t<n.length;t++)o[t]=0===t?0:o[t-1]+365,n[t]>0&&(i=!0),n[t]<0&&(u=!0);if(!i||!u)return c;let f,l,s,h=t=void 0===t?.1:t,g=!0;do{s=r(n,o,h),f=h-s/e(n,o,h),l=Math.abs(f-h),h=f,g=l>1e-10&&Math.abs(s)>1e-10}while(g);return h},t.ISBLANK=function(n){return null===n},t.ISERR=z,t.ISERROR=W,t.ISEVEN=function(n){return!(1&Math.floor(Math.abs(n)))},t.ISFORMULA=function(){throw new Error("ISFORMULA is not implemented")},t.ISLOGICAL=K,t.ISNA=function(n){return n===s},t.ISNONTEXT=function(n){return"string"!=typeof n},t.ISNUMBER=Q,t.ISO=$n,t.ISODD=function(n){return!!(1&Math.floor(Math.abs(n)))},t.ISOWEEKNUM=at,t.ISPMT=function(n,t,r,e){return S(n=R(n),t=R(t),r=R(r),e=R(e))?a:e*n*(t/r-1)},t.ISREF=function(){throw new Error("ISREF is not implemented")},t.ISTEXT=Z,t.KURT=function(){const n=P(M(arguments));if(n instanceof Error)return n;const t=e.mean(n),r=n.length;let o=0;for(let e=0;e<r;e++)o+=Math.pow(n[e]-t,4);return o/=Math.pow(e.stdev(n,!0),4),r*(r+1)/((r-1)*(r-2)*(r-3))*o-3*(r-1)*(r-1)/((r-2)*(r-3))},t.LARGE=En,t.LCM=function(){const n=P(M(arguments));if(n instanceof Error)return n;for(var t,r,e,o,i=1;void 0!==(e=n.pop());){if(0===e)return 0;for(;e>1;){if(e%2){for(t=3,r=Math.floor(Math.sqrt(e));t<=r&&e%t;t+=2);o=t<=r?t:e}else o=2;for(e/=o,i*=o,t=n.length;t;n[--t]%o==0&&1==(n[t]/=o)&&n.splice(t,1));}}return i},t.LEFT=function(n,t){return T(n,t)||(n=L(n),(t=R(t=void 0===t?1:t))instanceof Error||"string"!=typeof n?a:n.substring(0,t))},t.LEN=function(n){return 0===arguments.length?h:n instanceof Error?n:Array.isArray(n)?a:L(n).length},t.LINEST=Mn,t.LN=function(n){return(n=R(n))instanceof Error?n:0===n?c:Math.log(n)},t.LOG=function(n,t){return T(n=R(n),t=R(t))||(0===n||0===t?c:Math.log(n)/Math.log(t))},t.LOG10=function(n){return(n=R(n))instanceof Error?n:0===n?c:Math.log(n)/Math.log(10)},t.LOGEST=function(n,t){if(S(n=P(M(n)),t=P(M(t))))return a;if(n.length!==t.length)return a;for(let t=0;t<n.length;t++)n[t]=Math.log(n[t]);const r=Mn(n,t);return r[0]=Math.round(1e6*Math.exp(r[0]))/1e6,r[1]=Math.round(1e6*Math.exp(r[1]))/1e6,r},t.LOGINV=lr,t.LOGNORM=Nn,t.LOGNORMDIST=cr,t.LOGNORMINV=sr,t.LOOKUP=function(n,t,r){t=M(t),r=r?M(r):t;const e="number"==typeof n;let o=s;for(let i=0;i<t.length;i++){if(t[i]===n)return r[i];if(e&&t[i]<=n||"string"==typeof t[i]&&t[i].localeCompare(n)<0)o=r[i];else if(e&&t[i]>n)return o}return o},t.LOWER=function(n){return 1!==arguments.length?a:S(n=L(n))?n:n.toLowerCase()},t.MATCH=function(n,t,r){if(!n||!t)return s;if(2===arguments.length&&(r=1),!((t=M(t))instanceof Array))return s;if(-1!==r&&0!==r&&1!==r)return s;let e,o;for(let i=0;i<t.length;i++)if(1===r){if(t[i]===n)return i+1;t[i]<n&&(o?t[i]>o&&(e=i+1,o=t[i]):(e=i+1,o=t[i]))}else if(0===r){if("string"==typeof n&&"string"==typeof t[i]){const r=n.toLowerCase().replace(/\?/g,".").replace(/\*/g,".*").replace(/~/g,"\\");if(new RegExp("^"+r+"$").test(t[i].toLowerCase()))return i+1}else if(t[i]===n)return i+1}else if(-1===r){if(t[i]===n)return i+1;t[i]>n&&(o?t[i]<o&&(e=i+1,o=t[i]):(e=i+1,o=t[i]))}return e||s},t.MAX=wn,t.MAXA=function(){const n=M(arguments),t=T.apply(void 0,n);if(t)return t;let r=v(n);return r=r.map((n=>null==n?0:n)),0===r.length?0:Math.max.apply(Math,r)},t.MDURATION=function(){throw new Error("MDURATION is not implemented")},t.MEDIAN=yn,t.MID=function(n,t,r){if(null==t)return a;if(S(t=R(t),r=R(r))||"string"!=typeof n)return r;const e=t-1,o=e+r;return n.substring(e,o)},t.MIN=In,t.MINA=function(){const n=M(arguments),t=T.apply(void 0,n);if(t)return t;let r=v(n);return r=r.map((n=>null==n?0:n)),0===r.length?0:Math.min.apply(Math,r)},t.MINUTE=function(n){return(n=O(n))instanceof Error?n:n.getMinutes()},t.MIRR=function(n,t,r){if(S(n=P(M(n)),t=R(t),r=R(r)))return a;const e=n.length,o=[],i=[];for(let t=0;t<e;t++)n[t]<0?o.push(n[t]):i.push(n[t]);const u=-$r(r,i)*Math.pow(1+r,e-1),f=$r(t,o)*(1+t);return Math.pow(u/f,1/(e-1))-1},t.MMULT=function(n,t){return!Array.isArray(n)||!Array.isArray(t)||n.some((n=>!n.length))||t.some((n=>!n.length))||N(n).some((n=>"number"!=typeof n))||N(t).some((n=>"number"!=typeof n))||n[0].length!==t.length?a:Array(n.length).fill(0).map((()=>Array(t[0].length).fill(0))).map(((r,e)=>r.map(((r,o)=>n[e].reduce(((n,r,e)=>n+r*t[e][o]),0)))))},t.MOD=function(n,t){const r=T(n=R(n),t=R(t));if(r)return r;if(0===t)return u;let e=Math.abs(n%t);return e=n<0?t-e:e,t>0?e:-e},t.MODE=bn,t.MODEMULT=hr,t.MODESNGL=gr,t.MONTH=function(n){return(n=O(n))instanceof Error?n:n.getMonth()+1},t.MROUND=function(n,t){return T(n=R(n),t=R(t))||(n*t==0?0:n*t<0?c:Math.round(n/t)*t)},t.MULTINOMIAL=function(){const n=P(M(arguments));if(n instanceof Error)return n;let t=0,r=1;for(let e=0;e<n.length;e++)t+=n[e],r*=Xn(n[e]);return Xn(t)/r},t.MUNIT=function(n){return arguments.length>1?s:!(n=parseInt(n))||n<=0?a:Array(n).fill(0).map((()=>Array(n).fill(0))).map(((n,t)=>(n[t]=1,n)))},t.N=function(n){return Q(n)?n:n instanceof Date?n.getTime():!0===n?1:!1===n?0:W(n)?n:0},t.NA=function(){return s},t.NEGBINOM=Tn,t.NEGBINOMDIST=pr,t.NETWORKDAYS=ft,t.NETWORKDAYSINTL=mr,t.NOMINAL=function(n,t){return S(n=R(n),t=R(t))?a:n<=0||t<1?c:(t=parseInt(t,10),(Math.pow(n+1,1/t)-1)*t)},t.NORM=Sn,t.NORMDIST=dr,t.NORMINV=vr,t.NORMSDIST=Er,t.NORMSINV=Mr,t.NOT=function(n){return"string"==typeof n?a:n instanceof Error?n:!n},t.NOW=function(){return new Date},t.NPER=function(n,t,r,e,o){if(o=void 0===o?0:o,e=void 0===e?0:e,S(n=R(n),t=R(t),r=R(r),e=R(e),o=R(o)))return a;if(0===n)return-(r+e)/t;{const i=t*(1+n*o)-e*n,u=r*n+t*(1+n*o);return Math.log(i/u)/Math.log(1+n)}},t.NPV=$r,t.NUMBERVALUE=function(n,t,r){return"number"==typeof(n=q(n)?n:"")?n:"string"!=typeof n?s:(t=void 0===t?".":t,r=void 0===r?",":r,Number(n.replace(t,".").replace(r,"")))},t.OCT2BIN=function(n,t){if(!/^[0-7]{1,10}$/.test(n))return c;const r=!(10!==n.length||"7"!==n.substring(0,1)),e=r?parseInt(n,8)-1073741824:parseInt(n,8);if(e<-512||e>511)return c;if(r)return"1"+Mt("0",9-(512+e).toString(2).length)+(512+e).toString(2);const o=e.toString(2);return void 0===t?o:isNaN(t)?a:t<0?c:(t=Math.floor(t))>=o.length?Mt("0",t-o.length)+o:c},t.OCT2DEC=function(n){if(!/^[0-7]{1,10}$/.test(n))return c;const t=parseInt(n,8);return t>=536870912?t-1073741824:t},t.OCT2HEX=function(n,t){if(!/^[0-7]{1,10}$/.test(n))return c;const r=parseInt(n,8);if(r>=536870912)return"ff"+(r+3221225472).toString(16);const e=r.toString(16);return void 0===t?e:isNaN(t)?a:t<0?c:(t=Math.floor(t))>=e.length?Mt("0",t-e.length)+e:c},t.ODD=function(n){if((n=R(n))instanceof Error)return n;let t=Math.ceil(Math.abs(n));return t=1&t?t:t+1,n>=0?t:-t},t.ODDFPRICE=function(){throw new Error("ODDFPRICE is not implemented")},t.ODDFYIELD=function(){throw new Error("ODDFYIELD is not implemented")},t.ODDLPRICE=function(){throw new Error("ODDLPRICE is not implemented")},t.ODDLYIELD=function(){throw new Error("ODDLYIELD is not implemented")},t.OR=function(){const n=M(arguments);let t=a;for(let r=0;r<n.length;r++){if(n[r]instanceof Error)return n[r];void 0!==n[r]&&null!==n[r]&&"string"!=typeof n[r]&&(t===a&&(t=!1),n[r]&&(t=!0))}return t},t.PDURATION=function(n,t,r){return S(n=R(n),t=R(t),r=R(r))?a:n<=0?c:(Math.log(r)-Math.log(t))/Math.log(1+n)},t.PEARSON=An,t.PERCENTILE=Cn,t.PERCENTILEEXC=Nr,t.PERCENTILEINC=wr,t.PERCENTRANK=Dn,t.PERCENTRANKEXC=yr,t.PERCENTRANKINC=Ir,t.PERMUT=function(n,t){return S(n=R(n),t=R(t))?a:Xn(n)/Xn(n-t)},t.PERMUTATIONA=function(n,t){return S(n=R(n),t=R(t))?a:Math.pow(n,t)},t.PHI=function(n){return(n=R(n))instanceof Error?a:Math.exp(-.5*n*n)/2.5066282746310002},t.PI=function(){return Math.PI},t.PMT=zr,t.POISSON=On,t.POISSONDIST=br,t.POWER=zn,t.PPMT=function(n,t,r,e,o,i){return o=o||0,i=i||0,S(n=R(n),r=R(r),e=R(e),o=R(o),i=R(i))?a:zr(n,r,e,o,i)-Br(n,t,r,e,o,i)},t.PRICE=function(){throw new Error("PRICE is not implemented")},t.PRICEDISC=function(n,t,r,e,o){if(S(n=O(n),t=O(t),r=R(r),e=R(e),o=(o=R(o))||0))return a;if(r<=0||e<=0)return c;if(n>=t)return a;let i,u;switch(o){case 0:i=360,u=ut(n,t,!1);break;case 1:case 3:i=365,u=et(n,t,"D");break;case 2:i=360,u=et(n,t,"D");break;case 4:i=360,u=ut(n,t,!0);break;default:return c}return e-r*e*u/i},t.PRICEMAT=function(){throw new Error("PRICEMAT is not implemented")},t.PROB=function(n,t,r,e){if(void 0===r)return 0;if(e=void 0===e?r:e,S(n=P(M(n)),t=P(M(t)),r=R(r),e=R(e)))return a;if(r===e)return n.indexOf(r)>=0?t[n.indexOf(r)]:0;const o=n.sort(((n,t)=>n-t)),i=o.length;let u=0;for(let a=0;a<i;a++)o[a]>=r&&o[a]<=e&&(u+=t[n.indexOf(o[a])]);return u},t.PRODUCT=Wn,t.PRONETIC=function(){throw new Error("PRONETIC is not implemented")},t.PROPER=function(n){return S(n)?n:isNaN(n)&&"number"==typeof n?a:(n=L(n)).replace(/\w\S*/g,(n=>n.charAt(0).toUpperCase()+n.substr(1).toLowerCase()))},t.PV=function(n,t,r,e,o){return e=e||0,o=o||0,S(n=R(n),t=R(t),r=R(r),e=R(e),o=R(o))?a:0===n?-r*t-e:((1-Math.pow(1+n,t))/n*r*(1+n*o)-e)/Math.pow(1+n,t)},t.QUARTILE=xn,t.QUARTILEEXC=Tr,t.QUARTILEINC=Sr,t.QUOTIENT=function(n,t){return T(n=R(n),t=R(t))||parseInt(n/t,10)},t.RADIANS=function(n){return(n=R(n))instanceof Error?n:n*Math.PI/180},t.RAND=function(){return Math.random()},t.RANDBETWEEN=function(n,t){return T(n=R(n),t=R(t))||n+Math.ceil((t-n+1)*Math.random())-1},t.RANK=Rn,t.RANKAVG=Ar,t.RANKEQ=Cr,t.RATE=function(n,t,r,e,o,i){if(i=void 0===i?.01:i,e=void 0===e?0:e,o=void 0===o?0:o,S(n=R(n),t=R(t),r=R(r),e=R(e),o=R(o),i=R(i)))return a;const u=1e-10;let f=i;o=o?1:0;for(let i=0;i<20;i++){if(f<=-1)return c;let i,a,l;if(Math.abs(f)<u?i=r*(1+n*f)+t*(1+f*o)*n+e:(a=Math.pow(1+f,n),i=r*a+t*(1/f+o)*(a-1)+e),Math.abs(i)<u)return f;if(Math.abs(f)<u)l=r*n+t*o*n;else{a=Math.pow(1+f,n);const e=n*Math.pow(1+f,n-1);l=r*e+t*(1/f+o)*e+t*(-1/(f*f))*(a-1)}f-=i/l}return f},t.RECEIVED=function(){throw new Error("RECEIVED is not implemented")},t.REPLACE=function(n,t,r,e){return S(t=R(t),r=R(r))||"string"!=typeof n||"string"!=typeof e?a:n.substr(0,t-1)+e+n.substr(t-1+r)},t.REPT=Mt,t.RIGHT=function(n,t){return T(n,t)||(n=L(n),(t=R(t=void 0===t?1:t))instanceof Error?t:n.substring(n.length-t))},t.ROMAN=function(n){if((n=R(n))instanceof Error)return n;const t=String(n).split(""),r=["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM","","X","XX","XXX","XL","L","LX","LXX","LXXX","XC","","I","II","III","IV","V","VI","VII","VIII","IX"];let e="",o=3;for(;o--;)e=(r[+t.pop()+10*o]||"")+e;return new Array(+t.join("")+1).join("M")+e},t.ROUND=Kn,t.ROUNDDOWN=function(n,t){return T(n=R(n),t=R(t))||(n>0?1:-1)*Math.floor(Math.abs(n)*Math.pow(10,t))/Math.pow(10,t)},t.ROUNDUP=function(n,t){return T(n=R(n),t=R(t))||(n>0?1:-1)*Math.ceil(Math.abs(n)*Math.pow(10,t))/Math.pow(10,t)},t.ROW=function(n,t){return 2!==arguments.length?s:t<0?c:n instanceof Array&&"number"==typeof t?0!==n.length?e.row(n,t):void 0:a},t.ROWS=function(n){return 1!==arguments.length?s:n instanceof Array?0===n.length?0:e.rows(n):a},t.RRI=function(n,t,r){return S(n=R(n),t=R(t),r=R(r))?a:0===n||0===t?c:Math.pow(r/t,1/n)-1},t.RSQ=function(n,t){return S(n=P(M(n)),t=P(M(t)))?a:Math.pow(An(n,t),2)},t.SEARCH=function(n,t,r){let e;return"string"!=typeof n||"string"!=typeof t?a:(r=void 0===r?0:r,e=t.toLowerCase().indexOf(n.toLowerCase(),r-1)+1,0===e?a:e)},t.SEC=function(n){return(n=R(n))instanceof Error?n:1/Math.cos(n)},t.SECH=function(n){return(n=R(n))instanceof Error?n:2/(Math.exp(n)+Math.exp(-n))},t.SECOND=function(n){return(n=O(n))instanceof Error?n:n.getSeconds()},t.SERIESSUM=function(n,t,r,e){if(S(n=R(n),t=R(t),r=R(r),e=P(e)))return a;let o=e[0]*Math.pow(n,t);for(let i=1;i<e.length;i++)o+=e[i]*Math.pow(n,t+i*r);return o},t.SHEET=function(){throw new Error("SHEET is not implemented")},t.SHEETS=function(){throw new Error("SHEETS is not implemented")},t.SIGN=function(n){return(n=R(n))instanceof Error?n:n<0?-1:0===n?0:1},t.SIN=function(n){return(n=R(n))instanceof Error?n:Math.sin(n)},t.SINH=function(n){return(n=R(n))instanceof Error?n:(Math.exp(n)-Math.exp(-n))/2},t.SKEW=Pn,t.SKEWP=Dr,t.SLN=function(n,t,r){return S(n=R(n),t=R(t),r=R(r))?a:0===r?c:(n-t)/r},t.SLOPE=function(n,t){if(S(n=P(M(n)),t=P(M(t))))return a;const r=e.mean(t),o=e.mean(n),i=t.length;let u=0,f=0;for(let e=0;e<i;e++)u+=(t[e]-r)*(n[e]-o),f+=Math.pow(t[e]-r,2);return u/f},t.SMALL=Ln,t.SORT=function(n,t=1,r=1,e=!1){if(!n||!Array.isArray(n))return s;if(0===n.length)return 0;if(!(t=R(t))||t<1)return a;if(1!==(r=R(r))&&-1!==r)return a;if("boolean"!=typeof(e=D(e)))return l;const o=n=>n.sort(((n,e)=>(n=L(n[t-1]),e=L(e[t-1]),1===r?n<e?-1*r:r:n>e?r:-1*r))),i=E(n),u=e?I(i):i;return t>=1&&t<=u[0].length?e?I(o(u)):o(u):a},t.SQRT=function(n){return(n=R(n))instanceof Error?n:n<0?c:Math.sqrt(n)},t.SQRTPI=function(n){return(n=R(n))instanceof Error?n:Math.sqrt(n*Math.PI)},t.STANDARDIZE=function(n,t,r){return S(n=R(n),t=R(t),r=R(r))?a:(n-t)/r},t.STDEV=Fn,t.STDEVA=function(){const n=_n.apply(this,arguments);return Math.sqrt(n)},t.STDEVP=Or,t.STDEVPA=function(){const n=Vn.apply(this,arguments);let t=Math.sqrt(n);return isNaN(t)&&(t=c),t},t.STDEVS=xr,t.STEYX=function(n,t){if(S(n=P(M(n)),t=P(M(t))))return a;const r=e.mean(t),o=e.mean(n),i=t.length;let u=0,f=0,l=0;for(let e=0;e<i;e++)u+=Math.pow(n[e]-o,2),f+=(t[e]-r)*(n[e]-o),l+=Math.pow(t[e]-r,2);return Math.sqrt((u-f*f/l)/(i-2))},t.SUBSTITUTE=function(n,t,r,e){if(arguments.length<3)return s;if(n&&t){if(void 0===e)return n.split(t).join(r);{if(e=Math.floor(Number(e)),Number.isNaN(e)||e<=0)return a;let o=0,i=0;for(;o>-1&&n.indexOf(t,o)>-1;)if(o=n.indexOf(t,o+1),i++,o>-1&&i===e)return n.substring(0,o)+r+n.substring(o+t.length);return n}}return n},t.SUBTOTAL=function(n,t){if((n=R(n))instanceof Error)return n;switch(n){case 1:case 101:return tn(t);case 2:case 102:return fn(t);case 3:case 103:return ln(t);case 4:case 104:return wn(t);case 5:case 105:return In(t);case 6:case 106:return Wn(t);case 7:case 107:return Fn.S(t);case 8:case 108:return Fn.P(t);case 9:case 109:return Qn(t);case 10:case 110:return Un.S(t);case 11:case 111:return Un.P(t)}},t.SUM=Qn,t.SUMIF=function(n,t,r){if(n=M(n),r=r?M(r):n,n instanceof Error)return n;if(null==t||t instanceof Error)return 0;let e=0;const o="*"===t,i=o?null:X(t+"");for(let t=0;t<n.length;t++){const u=n[t],a=r[t];if(o)e+=u;else{const n=[H(u,G)].concat(i);e+=B(n)?a:0}}return e},t.SUMIFS=function(){const n=m(arguments),t=P(M(n.shift()));if(t instanceof Error)return t;const r=n,e=r.length/2;for(let n=0;n<e;n++)r[2*n]=M(r[2*n]);let o=0;for(let n=0;n<t.length;n++){let i=!1;for(let t=0;t<e;t++){const e=r[2*t][n],o=r[2*t+1];let u=!1;if(void 0===o||"*"===o)u=!0;else{const n=X(o+""),t=[H(e,G)].concat(n);u=B(t)}if(!u){i=!1;break}i=!0}i&&(o+=t[n])}return o},t.SUMPRODUCT=function(){if(!arguments||0===arguments.length)return a;const n=arguments.length+1;let t,r,e,o,i=0;for(let u=0;u<arguments[0].length;u++)if(arguments[0][u]instanceof Array)for(let e=0;e<arguments[0][u].length;e++){for(t=1,r=1;r<n;r++){const n=arguments[r-1][u][e];if(n instanceof Error)return n;if(o=R(n),o instanceof Error)return o;t*=o}i+=t}else{for(t=1,r=1;r<n;r++){const n=arguments[r-1][u];if(n instanceof Error)return n;if(e=R(n),e instanceof Error)return e;t*=e}i+=t}return i},t.SUMSQ=function(){const n=P(M(arguments));if(n instanceof Error)return n;let t=0;const r=n.length;for(let e=0;e<r;e++)t+=Q(n[e])?n[e]*n[e]:0;return t},t.SUMX2MY2=function(n,t){if(S(n=P(M(n)),t=P(M(t))))return a;let r=0;for(let e=0;e<n.length;e++)r+=n[e]*n[e]-t[e]*t[e];return r},t.SUMX2PY2=function(n,t){if(S(n=P(M(n)),t=P(M(t))))return a;let r=0;n=P(M(n)),t=P(M(t));for(let e=0;e<n.length;e++)r+=n[e]*n[e]+t[e]*t[e];return r},t.SUMXMY2=function(n,t){if(S(n=P(M(n)),t=P(M(t))))return a;let r=0;n=M(n),t=M(t);for(let e=0;e<n.length;e++)r+=Math.pow(n[e]-t[e],2);return r},t.SWITCH=function(){let n;if(arguments.length>0){const t=arguments[0],r=arguments.length-1,e=Math.floor(r/2);let o=!1;const i=r%2!=0,u=r%2==0?null:arguments[arguments.length-1];if(e)for(let r=0;r<e;r++)if(t===arguments[2*r+1]){n=arguments[2*r+2],o=!0;break}o||(n=i?u:s)}else n=a;return n},t.SYD=function(n,t,r,e){return S(n=R(n),t=R(t),r=R(r),e=R(e))?a:0===r||e<1||e>r?c:(n-t)*(r-(e=parseInt(e,10))+1)*2/(r*(r+1))},t.T=function(n){return n instanceof Error||"string"==typeof n?n:""},t.TAN=function(n){return(n=R(n))instanceof Error?n:Math.tan(n)},t.TANH=function(n){if((n=R(n))instanceof Error)return n;const t=Math.exp(2*n);return(t-1)/(t+1)},t.TBILLEQ=function(n,t,r){return S(n=O(n),t=O(t),r=R(r))?a:r<=0||n>t||t-n>31536e6?c:365*r/(360-r*ut(n,t,!1))},t.TBILLPRICE=function(n,t,r){return S(n=O(n),t=O(t),r=R(r))?a:r<=0||n>t||t-n>31536e6?c:100*(1-r*ut(n,t,!1)/360)},t.TBILLYIELD=function(n,t,r){return S(n=O(n),t=O(t),r=R(r))?a:r<=0||n>t||t-n>31536e6?c:360*(100-r)/(r*ut(n,t,!1))},t.TDIST=Rr,t.TDISTRT=Pr,t.TEXT=function(n,t){if(void 0===n||n instanceof Error||t instanceof Error)return s;if(null==t)return"";if("number"==typeof t)return String(t);if("string"!=typeof t)return a;const r=t.startsWith("$")?"$":"",e=t.endsWith("%");return e&&(n*=100),n=(n=Et(n,(t=t.replace(/%/g,"").replace(/\$/g,"")).split(".")[1].match(/0/g).length,!t.includes(","))).startsWith("-")?"-"+r+(n=n.replace("-","")):r+n,e&&(n+="%"),n},t.TEXTJOIN=function(n,t,...r){if("boolean"!=typeof t&&(t=D(t)),arguments.length<3)return s;n=null!=n?n:"";let e=M(r),o=t?e.filter((n=>n)):e;if(Array.isArray(n)){n=M(n);let t=o.map((n=>[n])),r=0;for(let e=0;e<t.length-1;e++)t[e].push(n[r]),r++,r===n.length&&(r=0);return o=M(t),o.join("")}return o.join(n)},t.TIME=function(n,t,r){return S(n=R(n),t=R(t),r=R(r))?a:n<0||t<0||r<0?c:(3600*n+60*t+r)/86400},t.TIMEVALUE=function(n){return(n=O(n))instanceof Error?n:(3600*n.getHours()+60*n.getMinutes()+n.getSeconds())/86400},t.TINV=Lr,t.TODAY=function(){return ot(new Date)},t.TRANSPOSE=function(n){return n?I(E(n)):s},t.TREND=function(n,t,r){if(S(n=P(M(n)),t=P(M(t)),r=P(M(r))))return a;const e=Mn(n,t),o=e[0],i=e[1],u=[];return r.forEach((n=>{u.push(o*n+i)})),u},t.TRIM=function(n){return(n=L(n))instanceof Error?n:n.replace(/\s+/g," ").trim()},t.TRIMMEAN=function(n,t){if(S(n=P(M(n)),t=R(t)))return a;const r=Bn(n.length*t,2)/2;return e.mean((i=(i=r)||1,(o=y(n.sort(((n,t)=>n-t)),r))&&"function"==typeof o.slice?o.slice(0,o.length-i):o));var o,i},t.TRUE=function(){return!0},t.TRUNC=function(n,t){return T(n=R(n),t=R(t))||(n>0?1:-1)*Math.floor(Math.abs(n)*Math.pow(10,t))/Math.pow(10,t)},t.TTEST=Fr,t.TYPE=function(n){return Q(n)?1:Z(n)?2:K(n)?4:W(n)?16:Array.isArray(n)?64:void 0},t.UNICHAR=Nt,t.UNICODE=wt,t.UNIQUE=J,t.UPPER=function(n){return(n=L(n))instanceof Error?n:n.toUpperCase()},t.VALUE=function(n){const t=T(n);if(t)return t;if("number"==typeof n)return n;if(q(n)||(n=""),"string"!=typeof n)return a;const r=/(%)$/.test(n)||/^(%)/.test(n);if(""===(n=(n=(n=n.replace(/^[^0-9-]{0,3}/,"")).replace(/[^0-9]{0,3}$/,"")).replace(/[ ,]/g,"")))return 0;let e=Number(n);return isNaN(e)?a:(e=e||0,r&&(e*=.01),e)},t.VAR=Un,t.VARA=_n,t.VARP=qr,t.VARPA=Vn,t.VARS=Ur,t.VDB=function(){throw new Error("VDB is not implemented")},t.VLOOKUP=nn,t.WEEKDAY=function(n,t){if((n=O(n))instanceof Error)return n;void 0===t&&(t=1);const r=n.getDay();return tt[t][r]},t.WEEKNUM=function(n,t){if((n=O(n))instanceof Error)return n;if(void 0===t&&(t=1),21===t)return at(n);const r=nt[t];let e=new Date(n.getFullYear(),0,1);const o=e.getDay()<r?1:0;return e-=24*Math.abs(e.getDay()-r)*60*60*1e3,Math.floor((n-e)/864e5/7+1)+o},t.WEIBULL=kn,t.WEIBULLDIST=_r,t.WORKDAY=lt,t.WORKDAYINTL=Vr,t.XIRR=function(n,t,r){if(S(n=P(M(n)),t=x(M(t)),r=R(r)))return a;const e=(n,t,r)=>{const e=r+1;let o=n[0];for(let r=1;r<n.length;r++)o+=n[r]/Math.pow(e,it(t[r],t[0])/365);return o},o=(n,t,r)=>{const e=r+1;let o=0;for(let r=1;r<n.length;r++){const i=it(t[r],t[0])/365;o-=i*n[r]/Math.pow(e,i+1)}return o};let i=!1,u=!1;for(let t=0;t<n.length;t++)n[t]>0&&(i=!0),n[t]<0&&(u=!0);if(!i||!u)return c;let f,l,s,h=r=r||.1,g=!0;do{s=e(n,t,h),f=h-s/o(n,t,h),l=Math.abs(f-h),h=f,g=l>1e-10&&Math.abs(s)>1e-10}while(g);return h},t.XNPV=function(n,t,r){if(S(n=R(n),t=P(M(t)),r=x(M(r))))return a;let e=0;for(let o=0;o<t.length;o++)e+=t[o]/Math.pow(1+n,it(r[o],r[0])/365);return e},t.XOR=function(){const n=M(arguments);let t=a;for(let r=0;r<n.length;r++){if(n[r]instanceof Error)return n[r];void 0!==n[r]&&null!==n[r]&&"string"!=typeof n[r]&&(t===a&&(t=0),n[r]&&t++)}return t===a?t:!!(1&Math.floor(Math.abs(t)))},t.YEAR=function(n){return(n=O(n))instanceof Error?n:n.getFullYear()},t.YEARFRAC=ht,t.YIELD=function(){throw new Error("YIELD is not implemented")},t.YIELDDISC=function(){throw new Error("YIELDDISC is not implemented")},t.YIELDMAT=function(){throw new Error("YIELDMAT is not implemented")},t.Z=jn,t.ZTEST=kr,t.utils=Wr}},t={};function r(e){var o=t[e];if(void 0!==o)return o.exports;var i=t[e]={exports:{}};return n[e].call(i.exports,i,i.exports,r),i.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}();var e=r(960);Formula=e}();

return Formula;

})));

/***/ }),

/***/ 138:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Jspreadsheet v4.13.0
 *
 * Website: https://bossanova.uk/jspreadsheet/
 * Description: Create amazing web based spreadsheets.
 *
 * This software is distribute under MIT License
 */

if (! formula && "function" === 'function') {
    var formula = __webpack_require__(243);
}

;(function (global, factory) {
     true ? module.exports = factory() :
    0;
}(this, (function () {

    'use strict';

    // Basic version information
    var Version = function() {
        // Information
        var info = {
            title: 'Jspreadsheet',
            version: '4.13.0',
            type: 'CE',
            host: 'https://bossanova.uk/jspreadsheet',
            license: 'MIT',
            print: function() {
                return [ this.title + ' ' + this.type + ' ' + this.version, this.host, this.license ].join('\r\n');
            }
        }

        return function() {
            return info;
        };
    }();

    /**
     * The value is a formula
     */
    var isFormula = function(value) {
        var v = (''+value)[0];
        return v == '=' || v == '#' ? true : false;
    }

    /**
     * Get the mask in the jSuites.mask format
     */
    var getMask = function(o) {
        if (o.format || o.mask || o.locale) {
            var opt = {};
            if (o.mask) {
                opt.mask = o.mask;
            } else if (o.format) {
                opt.mask = o.format;
            } else {
                opt.locale = o.locale;
                opt.options = o.options;
            }

            if (o.decimal) {
                if (! opt.options) {
                    opt.options = {};
                }
                opt.options = { decimal: o.decimal };
            }
            return opt;
        }

        return null;
    }

    // Jspreadsheet core object
    var jexcel = (function(el, options) {
        // Create jspreadsheet object
        var obj = {};
        obj.options = {};

        if (! (el instanceof Element || el instanceof HTMLDocument)) {
            console.error('Jspreadsheet: el is not a valid DOM element');
            return false;
        } else if (el.tagName == 'TABLE') {
            if (options = jexcel.createFromTable(el, options)) {
                var div = document.createElement('div');
                el.parentNode.insertBefore(div, el);
                el.remove();
                el = div;
            } else {
                console.error('Jspreadsheet: el is not a valid DOM element');
                return false;
            }
        }

        // Loading default configuration
        var defaults = {
            // External data
            url:null,
            // Ajax options
            method: 'GET',
            requestVariables: null,
            // Data
            data:null,
            // Custom sorting handler
            sorting:null,
            // Copy behavior
            copyCompatibility:false,
            root:null,
            // Rows and columns definitions
            rows:[],
            columns:[],
            // Deprected legacy options
            colHeaders:[],
            colWidths:[],
            colAlignments:[],
            nestedHeaders:null,
            // Column width that is used by default
            defaultColWidth:50,
            defaultColAlign:'center',
            // Rows height default
            defaultRowHeight: null,
            // Spare rows and columns
            minSpareRows:0,
            minSpareCols:0,
            // Minimal table dimensions
            minDimensions:[0,0],
            // Allow Export
            allowExport:true,
            // @type {boolean} - Include the header titles on download
            includeHeadersOnDownload:false,
            // @type {boolean} - Include the header titles on copy
            includeHeadersOnCopy:false,
            // Allow column sorting
            columnSorting:true,
            // Allow column dragging
            columnDrag:false,
            // Allow column resizing
            columnResize:true,
            // Allow row resizing
            rowResize:false,
            // Allow row dragging
            rowDrag:true,
            // Allow table edition
            editable:true,
            // Allow new rows
            allowInsertRow:true,
            // Allow new rows
            allowManualInsertRow:true,
            // Allow new columns
            allowInsertColumn:true,
            // Allow new rows
            allowManualInsertColumn:true,
            // Allow row delete
            allowDeleteRow:true,
            // Allow deleting of all rows
            allowDeletingAllRows:false,
            // Allow column delete
            allowDeleteColumn:true,
            // Allow rename column
            allowRenameColumn:true,
            // Allow comments
            allowComments:false,
            // Global wrap
            wordWrap:false,
            // Image options
            imageOptions: null,
            // CSV source
            csv:null,
            // Filename
            csvFileName:'jspreadsheet',
            // Consider first line as header
            csvHeaders:true,
            // Delimiters
            csvDelimiter:',',
            // First row as header
            parseTableFirstRowAsHeader:false,
            parseTableAutoCellType:false,
            // Disable corner selection
            selectionCopy:true,
            // Merged cells
            mergeCells:{},
            // Create toolbar
            toolbar:null,
            // Allow search
            search:false,
            // Create pagination
            pagination:false,
            paginationOptions:null,
            // Full screen
            fullscreen:false,
            // Lazy loading
            lazyLoading:false,
            loadingSpin:false,
            // Table overflow
            tableOverflow:false,
            tableHeight:'300px',
            tableWidth:null,
            textOverflow:false,
            // Meta
            meta: null,
            // Style
            style:null,
            classes:null,
            // Execute formulas
            parseFormulas:true,
            autoIncrement:true,
            autoCasting:true,
            // Security
            secureFormulas:true,
            stripHTML:true,
            stripHTMLOnCopy:false,
            // Filters
            filters:false,
            footers:null,
            // Event handles
            onundo:null,
            onredo:null,
            onload:null,
            onchange:null,
            oncomments:null,
            onbeforechange:null,
            onafterchanges:null,
            onbeforeinsertrow: null,
            oninsertrow:null,
            onbeforeinsertcolumn: null,
            oninsertcolumn:null,
            onbeforedeleterow:null,
            ondeleterow:null,
            onbeforedeletecolumn:null,
            ondeletecolumn:null,
            onmoverow:null,
            onmovecolumn:null,
            onresizerow:null,
            onresizecolumn:null,
            onsort:null,
            onselection:null,
            oncopy:null,
            onpaste:null,
            onbeforepaste:null,
            onmerge:null,
            onfocus:null,
            onblur:null,
            onchangeheader:null,
            oncreateeditor:null,
            oneditionstart:null,
            oneditionend:null,
            onchangestyle:null,
            onchangemeta:null,
            onchangepage:null,
            onbeforesave:null,
            onsave:null,
            // Global event dispatcher
            onevent:null,
            // Persistance
            persistance:false,
            // Customize any cell behavior
            updateTable:null,
            // Detach the HTML table when calling updateTable
            detachForUpdates: false,
            freezeColumns:null,
            // Texts
            text:{
                noRecordsFound: 'No records found',
                showingPage: 'Showing page {0} of {1} entries',
                show: 'Show ',
                search: 'Search',
                entries: ' entries',
                columnName: 'Column name',
                insertANewColumnBefore: 'Insert a new column before',
                insertANewColumnAfter: 'Insert a new column after',
                deleteSelectedColumns: 'Delete selected columns',
                renameThisColumn: 'Rename this column',
                orderAscending: 'Order ascending',
                orderDescending: 'Order descending',
                insertANewRowBefore: 'Insert a new row before',
                insertANewRowAfter: 'Insert a new row after',
                deleteSelectedRows: 'Delete selected rows',
                editComments: 'Edit comments',
                addComments: 'Add comments',
                comments: 'Comments',
                clearComments: 'Clear comments',
                copy: 'Copy...',
                paste: 'Paste...',
                saveAs: 'Save as...',
                about: 'About',
                areYouSureToDeleteTheSelectedRows: 'Are you sure to delete the selected rows?',
                areYouSureToDeleteTheSelectedColumns: 'Are you sure to delete the selected columns?',
                thisActionWillDestroyAnyExistingMergedCellsAreYouSure: 'This action will destroy any existing merged cells. Are you sure?',
                thisActionWillClearYourSearchResultsAreYouSure: 'This action will clear your search results. Are you sure?',
                thereIsAConflictWithAnotherMergedCell: 'There is a conflict with another merged cell',
                invalidMergeProperties: 'Invalid merged properties',
                cellAlreadyMerged: 'Cell already merged',
                noCellsSelected: 'No cells selected',
            },
            // About message
            about: true,
        };

        // Loading initial configuration from user
        for (var property in defaults) {
            if (options && options.hasOwnProperty(property)) {
                if (property === 'text') {
                    obj.options[property] = defaults[property];
                    for (var textKey in options[property]) {
                        if (options[property].hasOwnProperty(textKey)){
                            obj.options[property][textKey] = options[property][textKey];
                        }
                    }
                } else {
                    obj.options[property] = options[property];
                }
            } else {
                obj.options[property] = defaults[property];
            }
        }

        // Global elements
        obj.el = el;
        obj.corner = null;
        obj.contextMenu = null;
        obj.textarea = null;
        obj.ads = null;
        obj.content = null;
        obj.table = null;
        obj.thead = null;
        obj.tbody = null;
        obj.rows = [];
        obj.results = null;
        obj.searchInput = null;
        obj.toolbar = null;
        obj.pagination = null;
        obj.pageNumber = null;
        obj.headerContainer = null;
        obj.colgroupContainer = null;

        // Containers
        obj.headers = [];
        obj.records = [];
        obj.history = [];
        obj.formula = [];
        obj.colgroup = [];
        obj.selection = [];
        obj.highlighted  = [];
        obj.selectedCell = null;
        obj.selectedContainer = null;
        obj.style = [];
        obj.data = null;
        obj.filter = null;
        obj.filters = [];

        // Internal controllers
        obj.cursor = null;
        obj.historyIndex = -1;
        obj.ignoreEvents = false;
        obj.ignoreHistory = false;
        obj.edition = null;
        obj.hashString = null;
        obj.resizing = null;
        obj.dragging = null;

        // Lazy loading
        if (obj.options.lazyLoading == true && (obj.options.tableOverflow == false && obj.options.fullscreen == false)) {
            console.error('Jspreadsheet: The lazyloading only works when tableOverflow = yes or fullscreen = yes');
            obj.options.lazyLoading = false;
        }

        /**
         * Activate/Disable fullscreen
         * use programmatically : table.fullscreen(); or table.fullscreen(true); or table.fullscreen(false);
         * @Param {boolean} activate
         */
        obj.fullscreen = function(activate) {
            // If activate not defined, get reverse options.fullscreen
            if (activate == null) {
                activate = ! obj.options.fullscreen;
            }

            // If change
            if (obj.options.fullscreen != activate) {
                obj.options.fullscreen = activate;

                // Test LazyLoading conflict
                if (activate == true) {
                    el.classList.add('fullscreen');
                } else {
                    el.classList.remove('fullscreen');
                }
            }
        }

        /**
         * Trigger events
         */
        obj.dispatch = function(event) {
            // Dispatch events
            if (! obj.ignoreEvents) {
                // Call global event
                if (typeof(obj.options.onevent) == 'function') {
                    var ret = obj.options.onevent.apply(this, arguments);
                }
                // Call specific events
                if (typeof(obj.options[event]) == 'function') {
                    var ret = obj.options[event].apply(this, Array.prototype.slice.call(arguments, 1));
                }
            }

            // Persistance
            if (event == 'onafterchanges' && obj.options.persistance) {
                var url = obj.options.persistance == true ? obj.options.url : obj.options.persistance;
                var data = obj.prepareJson(arguments[2]);
                obj.save(url, data);
            }

            return ret;
        }

        /**
         * Prepare the jspreadsheet table
         *
         * @Param config
         */
        obj.prepareTable = function() {
            // Loading initial data from remote sources
            var results = [];

            // Number of columns
            var size = obj.options.columns.length;

            if (obj.options.data && typeof(obj.options.data[0]) !== 'undefined') {
                // Data keys
                var keys = Object.keys(obj.options.data[0]);

                if (keys.length > size) {
                    size = keys.length;
                }
            }

            // Minimal dimensions
            if (obj.options.minDimensions[0] > size) {
                size = obj.options.minDimensions[0];
            }

            // Requests
            var multiple = [];

            // Preparations
            for (var i = 0; i < size; i++) {
                // Deprected options. You should use only columns
                if (! obj.options.colHeaders[i]) {
                    obj.options.colHeaders[i] = '';
                }
                if (! obj.options.colWidths[i]) {
                    obj.options.colWidths[i] = obj.options.defaultColWidth;
                }
                if (! obj.options.colAlignments[i]) {
                    obj.options.colAlignments[i] = obj.options.defaultColAlign;
                }

                // Default column description
                if (! obj.options.columns[i]) {
                    obj.options.columns[i] = { type:'text' };
                } else if (! obj.options.columns[i].type) {
                    obj.options.columns[i].type = 'text';
                }
                if (! obj.options.columns[i].name) {
                    obj.options.columns[i].name = keys && keys[i] ? keys[i] : i;
                }
                if (! obj.options.columns[i].source) {
                    obj.options.columns[i].source = [];
                }
                if (! obj.options.columns[i].options) {
                    obj.options.columns[i].options = [];
                }
                if (! obj.options.columns[i].editor) {
                    obj.options.columns[i].editor = null;
                }
                if (! obj.options.columns[i].allowEmpty) {
                    obj.options.columns[i].allowEmpty = false;
                }
                if (! obj.options.columns[i].title) {
                    obj.options.columns[i].title = obj.options.colHeaders[i] ? obj.options.colHeaders[i] : '';
                }
                if (! obj.options.columns[i].width) {
                    obj.options.columns[i].width = obj.options.colWidths[i] ? obj.options.colWidths[i] : obj.options.defaultColWidth;
                }
                if (! obj.options.columns[i].align) {
                    obj.options.columns[i].align = obj.options.colAlignments[i] ? obj.options.colAlignments[i] : 'center';
                }

                // Pre-load initial source for json autocomplete
                if (obj.options.columns[i].type == 'autocomplete' || obj.options.columns[i].type == 'dropdown') {
                    // if remote content
                    if (obj.options.columns[i].url) {
                        multiple.push({
                            url: obj.options.columns[i].url,
                            index: i,
                            method: 'GET',
                            dataType: 'json',
                            success: function(data) {
                                var source = [];
                                for (var i = 0; i < data.length; i++) {
                                    obj.options.columns[this.index].source.push(data[i]);
                                }
                            }
                        });
                    }
                } else if (obj.options.columns[i].type == 'calendar') {
                    // Default format for date columns
                    if (! obj.options.columns[i].options.format) {
                        obj.options.columns[i].options.format = 'DD/MM/YYYY';
                    }
                }
            }
            // Create the table when is ready
            if (! multiple.length) {
                obj.createTable();
            } else {
                jSuites.ajax(multiple, function() {
                    obj.createTable();
                });
            }
        }

        obj.createTable = function() {
            // Elements
            obj.table = document.createElement('table');
            obj.thead = document.createElement('thead');
            obj.tbody = document.createElement('tbody');

            // Create headers controllers
            obj.headers = [];
            obj.colgroup = [];

            // Create table container
            obj.content = document.createElement('div');
            obj.content.classList.add('jexcel_content');
            obj.content.onscroll = function(e) {
                obj.scrollControls(e);
            }
            obj.content.onwheel = function(e) {
                obj.wheelControls(e);
            }

            // Create toolbar object
            obj.toolbar = document.createElement('div');
            obj.toolbar.classList.add('jexcel_toolbar');

            // Search
            var searchContainer = document.createElement('div');
            var searchText = document.createTextNode((obj.options.text.search) + ': ');
            obj.searchInput = document.createElement('input');
            obj.searchInput.classList.add('jexcel_search');
            searchContainer.appendChild(searchText);
            searchContainer.appendChild(obj.searchInput);
            obj.searchInput.onfocus = function() {
                obj.resetSelection();
            }

            // Pagination select option
            var paginationUpdateContainer = document.createElement('div');

            if (obj.options.pagination > 0 && obj.options.paginationOptions && obj.options.paginationOptions.length > 0) {
                obj.paginationDropdown = document.createElement('select');
                obj.paginationDropdown.classList.add('jexcel_pagination_dropdown');
                obj.paginationDropdown.onchange = function() {
                    obj.options.pagination = parseInt(this.value);
                    obj.page(0);
                }

                for (var i = 0; i < obj.options.paginationOptions.length; i++) {
                    var temp = document.createElement('option');
                    temp.value = obj.options.paginationOptions[i];
                    temp.innerHTML = obj.options.paginationOptions[i];
                    obj.paginationDropdown.appendChild(temp);
                }

                // Set initial pagination value
                obj.paginationDropdown.value = obj.options.pagination;

                paginationUpdateContainer.appendChild(document.createTextNode(obj.options.text.show));
                paginationUpdateContainer.appendChild(obj.paginationDropdown);
                paginationUpdateContainer.appendChild(document.createTextNode(obj.options.text.entries));
            }

            // Filter and pagination container
            var filter = document.createElement('div');
            filter.classList.add('jexcel_filter');
            filter.appendChild(paginationUpdateContainer);
            filter.appendChild(searchContainer);

            // Colsgroup
            obj.colgroupContainer = document.createElement('colgroup');
            var tempCol = document.createElement('col');
            tempCol.setAttribute('width', '50');
            obj.colgroupContainer.appendChild(tempCol);

            // Nested
            if (obj.options.nestedHeaders && obj.options.nestedHeaders.length > 0) {
                // Flexible way to handle nestedheaders
                if (obj.options.nestedHeaders[0] && obj.options.nestedHeaders[0][0]) {
                    for (var j = 0; j < obj.options.nestedHeaders.length; j++) {
                        obj.thead.appendChild(obj.createNestedHeader(obj.options.nestedHeaders[j]));
                    }
                } else {
                    obj.thead.appendChild(obj.createNestedHeader(obj.options.nestedHeaders));
                }
            }

            // Row
            obj.headerContainer = document.createElement('tr');
            var tempCol = document.createElement('td');
            tempCol.classList.add('jexcel_selectall');
            obj.headerContainer.appendChild(tempCol);

            for (var i = 0; i < obj.options.columns.length; i++) {
                // Create header
                obj.createCellHeader(i);
                // Append cell to the container
                obj.headerContainer.appendChild(obj.headers[i]);
                obj.colgroupContainer.appendChild(obj.colgroup[i]);
            }

            obj.thead.appendChild(obj.headerContainer);

            // Filters
            if (obj.options.filters == true) {
                obj.filter = document.createElement('tr');
                var td = document.createElement('td');
                obj.filter.appendChild(td);

                for (var i = 0; i < obj.options.columns.length; i++) {
                    var td = document.createElement('td');
                    td.innerHTML = '&nbsp;';
                    td.setAttribute('data-x', i);
                    td.className = 'jexcel_column_filter';
                    if (obj.options.columns[i].type == 'hidden') {
                        td.style.display = 'none';
                    }
                    obj.filter.appendChild(td);
                }

                obj.thead.appendChild(obj.filter);
            }

            // Content table
            obj.table = document.createElement('table');
            obj.table.classList.add('jexcel');
            obj.table.setAttribute('cellpadding', '0');
            obj.table.setAttribute('cellspacing', '0');
            obj.table.setAttribute('unselectable', 'yes');
            //obj.table.setAttribute('onselectstart', 'return false');
            obj.table.appendChild(obj.colgroupContainer);
            obj.table.appendChild(obj.thead);
            obj.table.appendChild(obj.tbody);

            if (! obj.options.textOverflow) {
                obj.table.classList.add('jexcel_overflow');
            }

            // Spreadsheet corner
            obj.corner = document.createElement('div');
            obj.corner.className = 'jexcel_corner';
            obj.corner.setAttribute('unselectable', 'on');
            obj.corner.setAttribute('onselectstart', 'return false');

            if (obj.options.selectionCopy == false) {
                obj.corner.style.display = 'none';
            }

            // Textarea helper
            obj.textarea = document.createElement('textarea');
            obj.textarea.className = 'jexcel_textarea';
            obj.textarea.id = 'jexcel_textarea';
            obj.textarea.tabIndex = '-1';

            // Contextmenu container
            obj.contextMenu = document.createElement('div');
            obj.contextMenu.className = 'jexcel_contextmenu';

            // Create element
            jSuites.contextmenu(obj.contextMenu, {
                onclick:function() {
                    obj.contextMenu.contextmenu.close(false);
                }
            });

            // Powered by Jspreadsheet
            var ads = document.createElement('a');
            ads.setAttribute('href', 'https://bossanova.uk/jspreadsheet/');
            obj.ads = document.createElement('div');
            obj.ads.className = 'jexcel_about';
            try {
                if (typeof(sessionStorage) !== "undefined" && ! sessionStorage.getItem('jexcel')) {
                    sessionStorage.setItem('jexcel', true);
                    var img = document.createElement('img');
                    img.src = '//bossanova.uk/jspreadsheet/logo.png';
                    ads.appendChild(img);
                }
            } catch (exception) {
            }
            var span = document.createElement('span');
            span.innerHTML = 'Jspreadsheet CE';
            ads.appendChild(span);
            obj.ads.appendChild(ads);

            // Create table container TODO: frozen columns
            var container = document.createElement('div');
            container.classList.add('jexcel_table');

            // Pagination
            obj.pagination = document.createElement('div');
            obj.pagination.classList.add('jexcel_pagination');
            var paginationInfo = document.createElement('div');
            var paginationPages = document.createElement('div');
            obj.pagination.appendChild(paginationInfo);
            obj.pagination.appendChild(paginationPages);

            // Hide pagination if not in use
            if (! obj.options.pagination) {
                obj.pagination.style.display = 'none';
            }

            // Append containers to the table
            if (obj.options.search == true) {
                el.appendChild(filter);
            }

            // Elements
            obj.content.appendChild(obj.table);
            obj.content.appendChild(obj.corner);
            obj.content.appendChild(obj.textarea);

            el.appendChild(obj.toolbar);
            el.appendChild(obj.content);
            el.appendChild(obj.pagination);
            el.appendChild(obj.contextMenu);
            el.appendChild(obj.ads);
            el.classList.add('jexcel_container');

            // Create toolbar
            if (obj.options.toolbar && obj.options.toolbar.length) {
                obj.createToolbar();
            }

            // Fullscreen
            if (obj.options.fullscreen == true) {
                el.classList.add('fullscreen');
            } else {
                // Overflow
                if (obj.options.tableOverflow == true) {
                    if (obj.options.tableHeight) {
                        obj.content.style['overflow-y'] = 'auto';
                        obj.content.style['box-shadow'] = 'rgb(221 221 221) 2px 2px 5px 0.1px';
                        obj.content.style.maxHeight = obj.options.tableHeight;
                    }
                    if (obj.options.tableWidth) {
                        obj.content.style['overflow-x'] = 'auto';
                        obj.content.style.width = obj.options.tableWidth;
                    }
                }
            }

            // With toolbars
            if (obj.options.tableOverflow != true && obj.options.toolbar) {
                el.classList.add('with-toolbar');
            }

            // Actions
            if (obj.options.columnDrag == true) {
                obj.thead.classList.add('draggable');
            }
            if (obj.options.columnResize == true) {
                obj.thead.classList.add('resizable');
            }
            if (obj.options.rowDrag == true) {
                obj.tbody.classList.add('draggable');
            }
            if (obj.options.rowResize == true) {
                obj.tbody.classList.add('resizable');
            }

            // Load data
            obj.setData();

            // Style
            if (obj.options.style) {
                obj.setStyle(obj.options.style, null, null, 1, 1);
            }

            // Classes
            if (obj.options.classes) {
                var k = Object.keys(obj.options.classes);
                for (var i = 0; i < k.length; i++) {
                    var cell = jexcel.getIdFromColumnName(k[i], true);
                    obj.records[cell[1]][cell[0]].classList.add(obj.options.classes[k[i]]);
                }
            }
        }

        /**
         * Refresh the data
         *
         * @return void
         */
        obj.refresh = function() {
            if (obj.options.url) {
                // Loading
                if (obj.options.loadingSpin == true) {
                    jSuites.loading.show();
                }

                jSuites.ajax({
                    url: obj.options.url,
                    method: obj.options.method,
                    data: obj.options.requestVariables,
                    dataType: 'json',
                    success: function(result) {
                        // Data
                        obj.options.data = (result.data) ? result.data : result;
                        // Prepare table
                        obj.setData();
                        // Hide spin
                        if (obj.options.loadingSpin == true) {
                            jSuites.loading.hide();
                        }
                    }
                });
            } else {
                obj.setData();
            }
        }

        /**
         * Set data
         *
         * @param array data In case no data is sent, default is reloaded
         * @return void
         */
        obj.setData = function(data) {
            // Update data
            if (data) {
                if (typeof(data) == 'string') {
                    data = JSON.parse(data);
                }

                obj.options.data = data;
            }

            // Data
            if (! obj.options.data) {
                obj.options.data = [];
            }

            // Prepare data
            if (obj.options.data && obj.options.data[0]) {
                if (! Array.isArray(obj.options.data[0])) {
                    var data = [];
                    for (var j = 0; j < obj.options.data.length; j++) {
                        var row = [];
                        for (var i = 0; i < obj.options.columns.length; i++) {
                            row[i] = obj.options.data[j][obj.options.columns[i].name];
                        }
                        data.push(row);
                    }

                    obj.options.data = data;
                }
            }

            // Adjust minimal dimensions
            var j = 0;
            var i = 0;
            var size_i = obj.options.columns.length;
            var size_j = obj.options.data.length;
            var min_i = obj.options.minDimensions[0];
            var min_j = obj.options.minDimensions[1];
            var max_i = min_i > size_i ? min_i : size_i;
            var max_j = min_j > size_j ? min_j : size_j;

            for (j = 0; j < max_j; j++) {
                for (i = 0; i < max_i; i++) {
                    if (obj.options.data[j] == undefined) {
                        obj.options.data[j] = [];
                    }

                    if (obj.options.data[j][i] == undefined) {
                        obj.options.data[j][i] = '';
                    }
                }
            }

            // Reset containers
            obj.rows = [];
            obj.results = null;
            obj.records = [];
            obj.history = [];

            // Reset internal controllers
            obj.historyIndex = -1;

            // Reset data
            obj.tbody.innerHTML = '';

            // Lazy loading
            if (obj.options.lazyLoading == true) {
                // Load only 100 records
                var startNumber = 0
                var finalNumber = obj.options.data.length < 100 ? obj.options.data.length : 100;

                if (obj.options.pagination) {
                    obj.options.pagination = false;
                    console.error('Jspreadsheet: Pagination will be disable due the lazyLoading');
                }
            } else if (obj.options.pagination) {
                // Pagination
                if (! obj.pageNumber) {
                    obj.pageNumber = 0;
                }
                var quantityPerPage = obj.options.pagination;
                startNumber = (obj.options.pagination * obj.pageNumber);
                finalNumber = (obj.options.pagination * obj.pageNumber) + obj.options.pagination;

                if (obj.options.data.length < finalNumber) {
                    finalNumber = obj.options.data.length;
                }
            } else {
                var startNumber = 0;
                var finalNumber = obj.options.data.length;
            }

            // Append nodes to the HTML
            for (j = 0; j < obj.options.data.length; j++) {
                // Create row
                var tr = obj.createRow(j, obj.options.data[j]);
                // Append line to the table
                if (j >= startNumber && j < finalNumber) {
                    obj.tbody.appendChild(tr);
                }
            }

            if (obj.options.lazyLoading == true) {
                // Do not create pagination with lazyloading activated
            } else if (obj.options.pagination) {
                obj.updatePagination();
            }

            // Merge cells
            if (obj.options.mergeCells) {
                var keys = Object.keys(obj.options.mergeCells);
                for (var i = 0; i < keys.length; i++) {
                    var num = obj.options.mergeCells[keys[i]];
                    obj.setMerge(keys[i], num[0], num[1], 1);
                }
            }

            // Updata table with custom configurations if applicable
            obj.updateTable();

            // Onload
            obj.dispatch('onload', el, obj);
        }

        /**
         * Get the whole table data
         *
         * @param bool get highlighted cells only
         * @return array data
         */
        obj.getData = function(highlighted, dataOnly) {
            // Control vars
            var dataset = [];
            var px = 0;
            var py = 0;

            // Data type
            var dataType = dataOnly == true || obj.options.copyCompatibility == false ? true : false;

            // Column and row length
            var x = obj.options.columns.length
            var y = obj.options.data.length

            // Go through the columns to get the data
            for (var j = 0; j < y; j++) {
                px = 0;
                for (var i = 0; i < x; i++) {
                    // Cell selected or fullset
                    if (! highlighted || obj.records[j][i].classList.contains('highlight')) {
                        // Get value
                        if (! dataset[py]) {
                            dataset[py] = [];
                        }
                        if (! dataType) {
                            dataset[py][px] = obj.records[j][i].innerHTML;
                        } else {
                            dataset[py][px] = obj.options.data[j][i];
                        }
                        px++;
                    }
                }
                if (px > 0) {
                    py++;
                }
           }

           return dataset;
        }

        /**
        * Get json data by row number
        *
        * @param integer row number
        * @return object
        */
        obj.getJsonRow = function(rowNumber) {
            var rowData = obj.options.data[rowNumber];
            var x = obj.options.columns.length

            var row = {};
            for (var i = 0; i < x; i++) {
                if (! obj.options.columns[i].name) {
                    obj.options.columns[i].name = i;
                }
                row[obj.options.columns[i].name] = rowData[i];
            }

            return row;
        }

        /**
         * Get the whole table data
         *
         * @param bool highlighted cells only
         * @return string value
         */
        obj.getJson = function(highlighted) {
            // Control vars
            var data = [];

            // Column and row length
            var x = obj.options.columns.length
            var y = obj.options.data.length

            // Go through the columns to get the data
            for (var j = 0; j < y; j++) {
                var row = null;
                for (var i = 0; i < x; i++) {
                    if (! highlighted || obj.records[j][i].classList.contains('highlight')) {
                        if (row == null) {
                            row = {};
                        }
                        if (! obj.options.columns[i].name) {
                            obj.options.columns[i].name = i;
                        }
                        row[obj.options.columns[i].name] = obj.options.data[j][i];
                    }
                }

                if (row != null) {
                    data.push(row);
                }
           }

           return data;
        }

        /**
         * Prepare JSON in the correct format
         */
        obj.prepareJson = function(data) {
            var rows = [];
            for (var i = 0; i < data.length; i++) {
                var x = data[i].x;
                var y = data[i].y;
                var k = obj.options.columns[x].name ? obj.options.columns[x].name : x;

                // Create row
                if (! rows[y]) {
                    rows[y] = {
                        row: y,
                        data: {},
                    };
                }
                rows[y].data[k] = data[i].newValue;
            }

            // Filter rows
            return rows.filter(function (el) {
                return el != null;
            });
        }

        /**
         * Post json to a remote server
         */
        obj.save = function(url, data) {
            // Parse anything in the data before sending to the server
            var ret = obj.dispatch('onbeforesave', el, obj, data);
            if (ret) {
                var data = ret;
            } else {
                if (ret === false) {
                    return false;
                }
            }

            // Remove update
            jSuites.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: { data: JSON.stringify(data) },
                success: function(result) {
                    // Event
                    obj.dispatch('onsave', el, obj, data);
                }
            });
        }

        /**
         * Get a row data by rowNumber
         */
        obj.getRowData = function(rowNumber) {
            return obj.options.data[rowNumber];
        }

        /**
         * Set a row data by rowNumber
         */
        obj.setRowData = function(rowNumber, data) {
            for (var i = 0; i < obj.headers.length; i++) {
                // Update cell
                var columnName = jexcel.getColumnNameFromId([ i, rowNumber ]);
                // Set value
                if (data[i] != null) {
                    obj.setValue(columnName, data[i]);
                }
            }
        }

        /**
         * Get a column data by columnNumber
         */
        obj.getColumnData = function(columnNumber) {
            var dataset = [];
            // Go through the rows to get the data
            for (var j = 0; j < obj.options.data.length; j++) {
                dataset.push(obj.options.data[j][columnNumber]);
            }
            return dataset;
        }

        /**
         * Set a column data by colNumber
         */
        obj.setColumnData = function(colNumber, data) {
            for (var j = 0; j < obj.rows.length; j++) {
                // Update cell
                var columnName = jexcel.getColumnNameFromId([ colNumber, j ]);
                // Set value
                if (data[j] != null) {
                    obj.setValue(columnName, data[j]);
                }
            }
        }

        /**
         * Create row
         */
        obj.createRow = function(j, data) {
            // Create container
            if (! obj.records[j]) {
                obj.records[j] = [];
            }
            // Default data
            if (! data) {
                var data = obj.options.data[j];
            }
            // New line of data to be append in the table
            obj.rows[j] = document.createElement('tr');
            obj.rows[j].setAttribute('data-y', j);
            // Index
            var index = null;

            // Set default row height
            if (obj.options.defaultRowHeight) {
                obj.rows[j].style.height = obj.options.defaultRowHeight + 'px'
            }

            // Definitions
            if (obj.options.rows[j]) {
                if (obj.options.rows[j].height) {
                    obj.rows[j].style.height = obj.options.rows[j].height;
                }
                if (obj.options.rows[j].title) {
                    index = obj.options.rows[j].title;
                }
            }
            if (! index) {
                index = parseInt(j + 1);
            }
            // Row number label
            var td = document.createElement('td');
            td.innerHTML = index;
            td.setAttribute('data-y', j);
            td.className = 'jexcel_row';
            obj.rows[j].appendChild(td);

            // Data columns
            for (var i = 0; i < obj.options.columns.length; i++) {
                // New column of data to be append in the line
                obj.records[j][i] = obj.createCell(i, j, data[i]);
                // Add column to the row
                obj.rows[j].appendChild(obj.records[j][i]);
            }

            // Add row to the table body
            return obj.rows[j];
        }

        obj.parseValue = function(i, j, value, cell) {
            if ((''+value).substr(0,1) == '=' && obj.options.parseFormulas == true) {
                value = obj.executeFormula(value, i, j)
            }

            // Column options
            var options = obj.options.columns[i];
            if (options && ! isFormula(value)) {
                // Mask options
                var opt = null;
                if (opt = getMask(options)) {
                    if (value && value == Number(value)) {
                        value = Number(value);
                    }
                    // Process the decimals to match the mask
                    var masked = jSuites.mask.render(value, opt, true);
                    // Negative indication
                    if (cell) {
                        if (opt.mask) {
                            var t = opt.mask.split(';');
                            if (t[1]) {
                                var t1 = t[1].match(new RegExp('\\[Red\\]', 'gi'));
                                if (t1) {
                                    if (value < 0) {
                                        cell.classList.add('red');
                                    } else {
                                        cell.classList.remove('red');
                                    }
                                }
                                var t2 = t[1].match(new RegExp('\\(', 'gi'));
                                if (t2) {
                                    if (value < 0) {
                                        masked = '(' + masked + ')';
                                    }
                                }
                            }
                        }
                    }

                    if (masked) {
                        value = masked;
                    }
                }
            }

            return value;
        }

        var validDate = function(date) {
            date = ''+date;
            if (date.substr(4,1) == '-' && date.substr(7,1) == '-') {
                return true;
            } else {
                date = date.split('-');
                if ((date[0].length == 4 && date[0] == Number(date[0]) && date[1].length == 2 && date[1] == Number(date[1]))) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Create cell
         */
        obj.createCell = function(i, j, value) {
            // Create cell and properties
            var td = document.createElement('td');
            td.setAttribute('data-x', i);
            td.setAttribute('data-y', j);

            // Security
            if ((''+value).substr(0,1) == '=' && obj.options.secureFormulas == true) {
                var val = secureFormula(value);
                if (val != value) {
                    // Update the data container
                    value = val;
                }
            }

            // Custom column
            if (obj.options.columns[i].editor) {
                if (obj.options.stripHTML === false || obj.options.columns[i].stripHTML === false) {
                    td.innerHTML = value;
                } else {
                    td.textContent = value;
                }
                if (typeof(obj.options.columns[i].editor.createCell) == 'function') {
                    td = obj.options.columns[i].editor.createCell(td);
                }
            } else {
                // Hidden column
                if (obj.options.columns[i].type == 'hidden') {
                    td.style.display = 'none';
                    td.textContent = value;
                } else if (obj.options.columns[i].type == 'checkbox' || obj.options.columns[i].type == 'radio') {
                    // Create input
                    var element = document.createElement('input');
                    element.type = obj.options.columns[i].type;
                    element.name = 'c' + i;
                    element.checked = (value == 1 || value == true || value == 'true') ? true : false;
                    element.onclick = function() {
                        obj.setValue(td, this.checked);
                    }

                    if (obj.options.columns[i].readOnly == true || obj.options.editable == false) {
                        element.setAttribute('disabled', 'disabled');
                    }

                    // Append to the table
                    td.appendChild(element);
                    // Make sure the values are correct
                    obj.options.data[j][i] = element.checked;
                } else if (obj.options.columns[i].type == 'calendar') {
                    // Try formatted date
                    var formatted = null;
                    if (! validDate(value)) {
                        var tmp = jSuites.calendar.extractDateFromString(value, obj.options.columns[i].options.format);
                        if (tmp) {
                            formatted = tmp;
                        }
                    }
                    // Create calendar cell
                    td.textContent = jSuites.calendar.getDateString(formatted ? formatted : value, obj.options.columns[i].options.format);
                } else if (obj.options.columns[i].type == 'dropdown' || obj.options.columns[i].type == 'autocomplete') {
                    // Create dropdown cell
                    td.classList.add('jexcel_dropdown');
                    td.textContent = obj.getDropDownValue(i, value);
                } else if (obj.options.columns[i].type == 'color') {
                    if (obj.options.columns[i].render == 'square') {
                        var color = document.createElement('div');
                        color.className = 'color';
                        color.style.backgroundColor = value;
                        td.appendChild(color);
                    } else {
                        td.style.color = value;
                        td.textContent = value;
                    }
                } else if (obj.options.columns[i].type == 'image') {
                    if (value && value.substr(0, 10) == 'data:image') {
                        var img = document.createElement('img');
                        img.src = value;
                        td.appendChild(img);
                    }
                } else {
                    if (obj.options.columns[i].type == 'html') {
                        td.innerHTML = stripScript(obj.parseValue(i, j, value, td));
                    } else {
                        if (obj.options.stripHTML === false || obj.options.columns[i].stripHTML === false) {
                            td.innerHTML = stripScript(obj.parseValue(i, j, value, td));
                        } else {
                            td.textContent = obj.parseValue(i, j, value, td);
                        }
                    }
                }
            }

            // Readonly
            if (obj.options.columns[i].readOnly == true) {
                td.className = 'readonly';
            }

            // Text align
            var colAlign = obj.options.columns[i].align ? obj.options.columns[i].align : 'center';
            td.style.textAlign = colAlign;

            // Wrap option
            if (obj.options.columns[i].wordWrap != false && (obj.options.wordWrap == true || obj.options.columns[i].wordWrap == true || td.innerHTML.length > 200)) {
                td.style.whiteSpace = 'pre-wrap';
            }

            // Overflow
            if (i > 0) {
                if (this.options.textOverflow == true) {
                    if (value || td.innerHTML) {
                        obj.records[j][i-1].style.overflow = 'hidden';
                    } else {
                        if (i == obj.options.columns.length - 1) {
                            td.style.overflow = 'hidden';
                        }
                    }
                }
            }
            return td;
        }

        obj.createCellHeader = function(colNumber) {
            // Create col global control
            var colWidth = obj.options.columns[colNumber].width ? obj.options.columns[colNumber].width : obj.options.defaultColWidth;
            var colAlign = obj.options.columns[colNumber].align ? obj.options.columns[colNumber].align : obj.options.defaultColAlign;

            // Create header cell
            obj.headers[colNumber] = document.createElement('td');
            if (obj.options.stripHTML) {
                obj.headers[colNumber].textContent = obj.options.columns[colNumber].title ? obj.options.columns[colNumber].title : jexcel.getColumnName(colNumber);
            } else {
                obj.headers[colNumber].innerHTML = obj.options.columns[colNumber].title ? obj.options.columns[colNumber].title : jexcel.getColumnName(colNumber);
            }
            obj.headers[colNumber].setAttribute('data-x', colNumber);
            obj.headers[colNumber].style.textAlign = colAlign;
            if (obj.options.columns[colNumber].title) {
                obj.headers[colNumber].setAttribute('title', obj.headers[colNumber].innerText);
            }
            if (obj.options.columns[colNumber].id) {
                obj.headers[colNumber].setAttribute('id', obj.options.columns[colNumber].id);
            }

            // Width control
            obj.colgroup[colNumber] = document.createElement('col');
            obj.colgroup[colNumber].setAttribute('width', colWidth);

            // Hidden column
            if (obj.options.columns[colNumber].type == 'hidden') {
                obj.headers[colNumber].style.display = 'none';
                obj.colgroup[colNumber].style.display = 'none';
            }
        }

        /**
         * Update a nested header title
         */
        obj.updateNestedHeader = function(x, y, title) {
            if (obj.options.nestedHeaders[y][x].title) {
                obj.options.nestedHeaders[y][x].title = title;
                obj.options.nestedHeaders[y].element.children[x+1].textContent = title;
            }
        }

        /**
         * Create a nested header object
         */
        obj.createNestedHeader = function(nestedInformation) {
            var tr = document.createElement('tr');
            tr.classList.add('jexcel_nested');
            var td = document.createElement('td');
            tr.appendChild(td);
            // Element
            nestedInformation.element = tr;

            var headerIndex = 0;
            for (var i = 0; i < nestedInformation.length; i++) {
                // Default values
                if (! nestedInformation[i].colspan) {
                    nestedInformation[i].colspan = 1;
                }
                if (! nestedInformation[i].align) {
                    nestedInformation[i].align = 'center';
                }
                if (! nestedInformation[i].title) {
                    nestedInformation[i].title = '';
                }
                if (! nestedInformation[i].id) {
                    nestedInformation[i].id = '';
                }

                // Number of columns
                var numberOfColumns = nestedInformation[i].colspan;

                // Classes container
                var column = [];
                // Header classes for this cell
                for (var x = 0; x < numberOfColumns; x++) {
                    if (obj.options.columns[headerIndex] && obj.options.columns[headerIndex].type == 'hidden') {
                        numberOfColumns++;
                    }
                    column.push(headerIndex);
                    headerIndex++;
                }

                // Created the nested cell
                var td = document.createElement('td');
                td.setAttribute('data-column', column.join(','));
                td.setAttribute('colspan', nestedInformation[i].colspan);
                td.setAttribute('align', nestedInformation[i].align);
                td.setAttribute('id', nestedInformation[i].id);
                td.textContent = nestedInformation[i].title;
                tr.appendChild(td);
            }

            return tr;
        }

        /**
         * Create toolbar
         */
        obj.createToolbar = function(toolbar) {
            if (toolbar) {
                obj.options.toolbar = toolbar;
            } else {
                var toolbar = obj.options.toolbar;
            }
            for (var i = 0; i < toolbar.length; i++) {
                if (toolbar[i].type == 'i') {
                    var toolbarItem = document.createElement('i');
                    toolbarItem.classList.add('jexcel_toolbar_item');
                    toolbarItem.classList.add('material-icons');
                    toolbarItem.setAttribute('data-k', toolbar[i].k);
                    toolbarItem.setAttribute('data-v', toolbar[i].v);
                    toolbarItem.setAttribute('id', toolbar[i].id);

                    // Tooltip
                    if (toolbar[i].tooltip) {
                        toolbarItem.setAttribute('title', toolbar[i].tooltip);
                    }
                    // Handle click
                    if (toolbar[i].onclick && typeof(toolbar[i].onclick)) {
                        toolbarItem.onclick = (function (a) {
                            var b = a;
                            return function () {
                                toolbar[b].onclick(el, obj, this);
                            };
                        })(i);
                    } else {
                        toolbarItem.onclick = function() {
                            var k = this.getAttribute('data-k');
                            var v = this.getAttribute('data-v');
                            obj.setStyle(obj.highlighted, k, v);
                        }
                    }
                    // Append element
                    toolbarItem.textContent = toolbar[i].content;
                    obj.toolbar.appendChild(toolbarItem);
                } else if (toolbar[i].type == 'select') {
                   var toolbarItem = document.createElement('select');
                   toolbarItem.classList.add('jexcel_toolbar_item');
                   toolbarItem.setAttribute('data-k', toolbar[i].k);
                   // Tooltip
                   if (toolbar[i].tooltip) {
                       toolbarItem.setAttribute('title', toolbar[i].tooltip);
                   }
                   // Handle onchange
                   if (toolbar[i].onchange && typeof(toolbar[i].onchange)) {
                       toolbarItem.onchange = toolbar[i].onchange;
                   } else {
                       toolbarItem.onchange = function() {
                           var k = this.getAttribute('data-k');
                           obj.setStyle(obj.highlighted, k, this.value);
                       }
                   }
                   // Add options to the dropdown
                   for(var j = 0; j < toolbar[i].v.length; j++) {
                        var toolbarDropdownOption = document.createElement('option');
                        toolbarDropdownOption.value = toolbar[i].v[j];
                        toolbarDropdownOption.textContent = toolbar[i].v[j];
                        toolbarItem.appendChild(toolbarDropdownOption);
                   }
                   obj.toolbar.appendChild(toolbarItem);
                } else if (toolbar[i].type == 'color') {
                     var toolbarItem = document.createElement('i');
                     toolbarItem.classList.add('jexcel_toolbar_item');
                     toolbarItem.classList.add('material-icons');
                     toolbarItem.setAttribute('data-k', toolbar[i].k);
                     toolbarItem.setAttribute('data-v', '');
                     // Tooltip
                     if (toolbar[i].tooltip) {
                         toolbarItem.setAttribute('title', toolbar[i].tooltip);
                     }
                     obj.toolbar.appendChild(toolbarItem);
                     toolbarItem.textContent = toolbar[i].content;
                     jSuites.color(toolbarItem, {
                         onchange:function(o, v) {
                             var k = o.getAttribute('data-k');
                             obj.setStyle(obj.highlighted, k, v);
                         }
                     });
                }
            }
        }

        /**
         * Merge cells
         * @param cellName
         * @param colspan
         * @param rowspan
         * @param ignoreHistoryAndEvents
         */
        obj.setMerge = function(cellName, colspan, rowspan, ignoreHistoryAndEvents) {
            var test = false;

            if (! cellName) {
                if (! obj.highlighted.length) {
                    alert(obj.options.text.noCellsSelected);
                    return null;
                } else {
                    var x1 = parseInt(obj.highlighted[0].getAttribute('data-x'));
                    var y1 = parseInt(obj.highlighted[0].getAttribute('data-y'));
                    var x2 = parseInt(obj.highlighted[obj.highlighted.length-1].getAttribute('data-x'));
                    var y2 = parseInt(obj.highlighted[obj.highlighted.length-1].getAttribute('data-y'));
                    var cellName = jexcel.getColumnNameFromId([ x1, y1 ]);
                    var colspan = (x2 - x1) + 1;
                    var rowspan = (y2 - y1) + 1;
                }
            }

            var cell = jexcel.getIdFromColumnName(cellName, true);

            if (obj.options.mergeCells[cellName]) {
                if (obj.records[cell[1]][cell[0]].getAttribute('data-merged')) {
                    test = obj.options.text.cellAlreadyMerged;
                }
            } else if ((! colspan || colspan < 2) && (! rowspan || rowspan < 2)) {
                test = obj.options.text.invalidMergeProperties;
            } else {
                var cells = [];
                for (var j = cell[1]; j < cell[1] + rowspan; j++) {
                    for (var i = cell[0]; i < cell[0] + colspan; i++) {
                        var columnName = jexcel.getColumnNameFromId([i, j]);
                        if (obj.records[j][i].getAttribute('data-merged')) {
                            test = obj.options.text.thereIsAConflictWithAnotherMergedCell;
                        }
                    }
                }
            }

            if (test) {
                alert(test);
            } else {
                // Add property
                if (colspan > 1) {
                    obj.records[cell[1]][cell[0]].setAttribute('colspan', colspan);
                } else {
                    colspan = 1;
                }
                if (rowspan > 1) {
                    obj.records[cell[1]][cell[0]].setAttribute('rowspan', rowspan);
                } else {
                    rowspan = 1;
                }
                // Keep links to the existing nodes
                obj.options.mergeCells[cellName] = [ colspan, rowspan, [] ];
                // Mark cell as merged
                obj.records[cell[1]][cell[0]].setAttribute('data-merged', 'true');
                // Overflow
                obj.records[cell[1]][cell[0]].style.overflow = 'hidden';
                // History data
                var data = [];
                // Adjust the nodes
                for (var y = cell[1]; y < cell[1] + rowspan; y++) {
                    for (var x = cell[0]; x < cell[0] + colspan; x++) {
                        if (! (cell[0] == x && cell[1] == y)) {
                            data.push(obj.options.data[y][x]);
                            obj.updateCell(x, y, '', true);
                            obj.options.mergeCells[cellName][2].push(obj.records[y][x]);
                            obj.records[y][x].style.display = 'none';
                            obj.records[y][x] = obj.records[cell[1]][cell[0]];
                        }
                    }
                }
                // In the initialization is not necessary keep the history
                obj.updateSelection(obj.records[cell[1]][cell[0]]);

                if (! ignoreHistoryAndEvents) {
                    obj.setHistory({
                        action:'setMerge',
                        column:cellName,
                        colspan:colspan,
                        rowspan:rowspan,
                        data:data,
                    });

                    obj.dispatch('onmerge', el, cellName, colspan, rowspan);
                }
            }
        }

        /**
         * Merge cells
         * @param cellName
         * @param colspan
         * @param rowspan
         * @param ignoreHistoryAndEvents
         */
        obj.getMerge = function(cellName) {
            var data = {};
            if (cellName) {
                if (obj.options.mergeCells[cellName]) {
                    data = [ obj.options.mergeCells[cellName][0], obj.options.mergeCells[cellName][1] ];
                } else {
                    data = null;
                }
            } else {
                if (obj.options.mergeCells) {
                    var mergedCells = obj.options.mergeCells;
                    var keys = Object.keys(obj.options.mergeCells);
                    for (var i = 0; i < keys.length; i++) {
                        data[keys[i]] = [ obj.options.mergeCells[keys[i]][0], obj.options.mergeCells[keys[i]][1] ];
                    }
                }
            }

            return data;
        }

        /**
         * Remove merge by cellname
         * @param cellName
         */
        obj.removeMerge = function(cellName, data, keepOptions) {
            if (obj.options.mergeCells[cellName]) {
                var cell = jexcel.getIdFromColumnName(cellName, true);
                obj.records[cell[1]][cell[0]].removeAttribute('colspan');
                obj.records[cell[1]][cell[0]].removeAttribute('rowspan');
                obj.records[cell[1]][cell[0]].removeAttribute('data-merged');
                var info = obj.options.mergeCells[cellName];

                var index = 0;
                for (var j = 0; j < info[1]; j++) {
                    for (var i = 0; i < info[0]; i++) {
                        if (j > 0 || i > 0) {
                            obj.records[cell[1]+j][cell[0]+i] = info[2][index];
                            obj.records[cell[1]+j][cell[0]+i].style.display = '';
                            // Recover data
                            if (data && data[index]) {
                                obj.updateCell(cell[0]+i, cell[1]+j, data[index]);
                            }
                            index++;
                        }
                    }
                }

                // Update selection
                obj.updateSelection(obj.records[cell[1]][cell[0]], obj.records[cell[1]+j-1][cell[0]+i-1]);

                if (! keepOptions) {
                    delete(obj.options.mergeCells[cellName]);
                }
            }
        }

        /**
         * Remove all merged cells
         */
        obj.destroyMerged = function(keepOptions) {
            // Remove any merged cells
            if (obj.options.mergeCells) {
                var mergedCells = obj.options.mergeCells;
                var keys = Object.keys(obj.options.mergeCells);
                for (var i = 0; i < keys.length; i++) {
                    obj.removeMerge(keys[i], null, keepOptions);
                }
            }
        }

        /**
         * Is column merged
         */
        obj.isColMerged = function(x, insertBefore) {
            var cols = [];
            // Remove any merged cells
            if (obj.options.mergeCells) {
                var keys = Object.keys(obj.options.mergeCells);
                for (var i = 0; i < keys.length; i++) {
                    var info = jexcel.getIdFromColumnName(keys[i], true);
                    var colspan = obj.options.mergeCells[keys[i]][0];
                    var x1 = info[0];
                    var x2 = info[0] + (colspan > 1 ? colspan - 1 : 0);

                    if (insertBefore == null) {
                        if ((x1 <= x && x2 >= x)) {
                            cols.push(keys[i]);
                        }
                    } else {
                        if (insertBefore) {
                            if ((x1 < x && x2 >= x)) {
                                cols.push(keys[i]);
                            }
                        } else {
                            if ((x1 <= x && x2 > x)) {
                                cols.push(keys[i]);
                            }
                        }
                    }
                }
            }

            return cols;
        }

        /**
         * Is rows merged
         */
        obj.isRowMerged = function(y, insertBefore) {
            var rows = [];
            // Remove any merged cells
            if (obj.options.mergeCells) {
                var keys = Object.keys(obj.options.mergeCells);
                for (var i = 0; i < keys.length; i++) {
                    var info = jexcel.getIdFromColumnName(keys[i], true);
                    var rowspan = obj.options.mergeCells[keys[i]][1];
                    var y1 = info[1];
                    var y2 = info[1] + (rowspan > 1 ? rowspan - 1 : 0);

                    if (insertBefore == null) {
                        if ((y1 <= y && y2 >= y)) {
                            rows.push(keys[i]);
                        }
                    } else {
                        if (insertBefore) {
                            if ((y1 < y && y2 >= y)) {
                                rows.push(keys[i]);
                            }
                        } else {
                            if ((y1 <= y && y2 > y)) {
                                rows.push(keys[i]);
                            }
                        }
                    }
                }
            }

            return rows;
        }

        /**
         * Open the column filter
         */
        obj.openFilter = function(columnId) {
            if (! obj.options.filters) {
                console.log('Jspreadsheet: filters not enabled.');
            } else {
                // Make sure is integer
                columnId = parseInt(columnId);
                // Reset selection
                obj.resetSelection();
                // Load options
                var optionsFiltered = [];
                if (obj.options.columns[columnId].type == 'checkbox') {
                    optionsFiltered.push({ id: 'true', name: 'True' });
                    optionsFiltered.push({ id: 'false', name: 'False' });
                } else {
                    var options = [];
                    var hasBlanks = false;
                    for (var j = 0; j < obj.options.data.length; j++) {
                        var k = obj.options.data[j][columnId];
                        var v = obj.records[j][columnId].innerHTML;
                        if (k && v) {
                            options[k] = v;
                        } else {
                            var hasBlanks = true;
                        }
                    }
                    var keys = Object.keys(options);
                    var optionsFiltered = [];
                    for (var j = 0; j < keys.length; j++) {
                        optionsFiltered.push({ id: keys[j], name: options[keys[j]] });
                    }
                    // Has blank options
                    if (hasBlanks) {
                        optionsFiltered.push({ value: '', id: '', name: '(Blanks)' });
                    }
                }

                // Create dropdown
                var div = document.createElement('div');
                obj.filter.children[columnId + 1].innerHTML = '';
                obj.filter.children[columnId + 1].appendChild(div);
                obj.filter.children[columnId + 1].style.paddingLeft = '0px';
                obj.filter.children[columnId + 1].style.paddingRight = '0px';
                obj.filter.children[columnId + 1].style.overflow = 'initial';

                var opt = {
                    data: optionsFiltered,
                    multiple: true,
                    autocomplete: true,
                    opened: true,
                    value: obj.filters[columnId] !== undefined ? obj.filters[columnId] : null,
                    width:'100%',
                    position: (obj.options.tableOverflow == true || obj.options.fullscreen == true) ? true : false,
                    onclose: function(o) {
                        obj.resetFilters();
                        obj.filters[columnId] = o.dropdown.getValue(true);
                        obj.filter.children[columnId + 1].innerHTML = o.dropdown.getText();
                        obj.filter.children[columnId + 1].style.paddingLeft = '';
                        obj.filter.children[columnId + 1].style.paddingRight = '';
                        obj.filter.children[columnId + 1].style.overflow = '';
                        obj.closeFilter(columnId);
                        obj.refreshSelection();
                    }
                };

                // Dynamic dropdown
                jSuites.dropdown(div, opt);
            }
        }

        obj.resetFilters = function() {
            if (obj.options.filters) {
                for (var i = 0; i < obj.filter.children.length; i++) {
                    obj.filter.children[i].innerHTML = '&nbsp;';
                    obj.filters[i] = null;
                }
            }

            obj.results = null;
            obj.updateResult();
        }

        obj.closeFilter = function(columnId) {
            if (! columnId) {
                for (var i = 0; i < obj.filter.children.length; i++) {
                    if (obj.filters[i]) {
                        columnId = i;
                    }
                }
            }

            // Search filter
            var search = function(query, x, y) {
                for (var i = 0; i < query.length; i++) {
                    var value = ''+obj.options.data[y][x];
                    var label = ''+obj.records[y][x].innerHTML;
                    if (query[i] == value || query[i] == label) {
                        return true;
                    }
                }
                return false;
            }

            var query = obj.filters[columnId];
            obj.results = [];
            for (var j = 0; j < obj.options.data.length; j++) {
                if (search(query, columnId, j)) {
                    obj.results.push(j);
                }
            }
            if (! obj.results.length) {
                obj.results = null;
            }

            obj.updateResult();
        }

        /**
         * Open the editor
         *
         * @param object cell
         * @return void
         */
        obj.openEditor = function(cell, empty, e) {
            // Get cell position
            var y = cell.getAttribute('data-y');
            var x = cell.getAttribute('data-x');

            // On edition start
            obj.dispatch('oneditionstart', el, cell, x, y);

            // Overflow
            if (x > 0) {
                obj.records[y][x-1].style.overflow = 'hidden';
            }

            // Create editor
            var createEditor = function(type) {
                // Cell information
                var info = cell.getBoundingClientRect();

                // Create dropdown
                var editor = document.createElement(type);
                editor.style.width = (info.width) + 'px';
                editor.style.height = (info.height - 2) + 'px';
                editor.style.minHeight = (info.height - 2) + 'px';

                // Edit cell
                cell.classList.add('editor');
                cell.innerHTML = '';
                cell.appendChild(editor);

                // On edition start
                obj.dispatch('oncreateeditor', el, cell, x, y, editor);

                return editor;
            }

            // Readonly
            if (cell.classList.contains('readonly') == true) {
                // Do nothing
            } else {
                // Holder
                obj.edition = [ obj.records[y][x], obj.records[y][x].innerHTML, x, y ];

                // If there is a custom editor for it
                if (obj.options.columns[x].editor) {
                    // Custom editors
                    obj.options.columns[x].editor.openEditor(cell, el, empty, e);
                } else {
                    // Native functions
                    if (obj.options.columns[x].type == 'hidden') {
                        // Do nothing
                    } else if (obj.options.columns[x].type == 'checkbox' || obj.options.columns[x].type == 'radio') {
                        // Get value
                        var value = cell.children[0].checked ? false : true;
                        // Toogle value
                        obj.setValue(cell, value);
                        // Do not keep edition open
                        obj.edition = null;
                    } else if (obj.options.columns[x].type == 'dropdown' || obj.options.columns[x].type == 'autocomplete') {
                        // Get current value
                        var value = obj.options.data[y][x];
                        if (obj.options.columns[x].multiple && !Array.isArray(value)) {
                            value = value.split(';');
                        }

                        // Create dropdown
                        if (typeof(obj.options.columns[x].filter) == 'function') {
                            var source = obj.options.columns[x].filter(el, cell, x, y, obj.options.columns[x].source);
                        } else {
                            var source = obj.options.columns[x].source;
                        }

                        // Do not change the original source
                        var data = [];
                        for (var j = 0; j < source.length; j++) {
                            data.push(source[j]);
                        }

                        // Create editor
                        var editor = createEditor('div');
                        var options = {
                            data: data,
                            multiple: obj.options.columns[x].multiple ? true : false,
                            autocomplete: obj.options.columns[x].autocomplete || obj.options.columns[x].type == 'autocomplete' ? true : false,
                            opened:true,
                            value: value,
                            width:'100%',
                            height:editor.style.minHeight,
                            position: (obj.options.tableOverflow == true || obj.options.fullscreen == true) ? true : false,
                            onclose:function() {
                                obj.closeEditor(cell, true);
                            }
                        };
                        if (obj.options.columns[x].options && obj.options.columns[x].options.type) {
                            options.type = obj.options.columns[x].options.type;
                        }
                        jSuites.dropdown(editor, options);
                    } else if (obj.options.columns[x].type == 'calendar' || obj.options.columns[x].type == 'color') {
                        // Value
                        var value = obj.options.data[y][x];
                        // Create editor
                        var editor = createEditor('input');
                        editor.value = value;

                        if (obj.options.tableOverflow == true || obj.options.fullscreen == true) {
                            obj.options.columns[x].options.position = true;
                        }
                        obj.options.columns[x].options.value = obj.options.data[y][x];
                        obj.options.columns[x].options.opened = true;
                        obj.options.columns[x].options.onclose = function(el, value) {
                            obj.closeEditor(cell, true);
                        }
                        // Current value
                        if (obj.options.columns[x].type == 'color') {
                            jSuites.color(editor, obj.options.columns[x].options);
                        } else {
                            jSuites.calendar(editor, obj.options.columns[x].options);
                        }
                        // Focus on editor
                        editor.focus();
                    } else if (obj.options.columns[x].type == 'html') {
                        var value = obj.options.data[y][x];
                        // Create editor
                        var editor = createEditor('div');
                        editor.style.position = 'relative';
                        var div = document.createElement('div');
                        div.classList.add('jexcel_richtext');
                        editor.appendChild(div);
                        jSuites.editor(div, {
                            focus: true,
                            value: value,
                        });
                        var rect = cell.getBoundingClientRect();
                        var rectContent = div.getBoundingClientRect();
                        if (window.innerHeight < rect.bottom + rectContent.height) {
                            div.style.top = (rect.top - (rectContent.height + 2)) + 'px';
                        } else {
                            div.style.top = (rect.top) + 'px';
                        }
                    } else if (obj.options.columns[x].type == 'image') {
                        // Value
                        var img = cell.children[0];
                        // Create editor
                        var editor = createEditor('div');
                        editor.style.position = 'relative';
                        var div = document.createElement('div');
                        div.classList.add('jclose');
                        if (img && img.src) {
                            div.appendChild(img);
                        }
                        editor.appendChild(div);
                        jSuites.image(div, obj.options.imageOptions);
                        var rect = cell.getBoundingClientRect();
                        var rectContent = div.getBoundingClientRect();
                        if (window.innerHeight < rect.bottom + rectContent.height) {
                            div.style.top = (rect.top - (rectContent.height + 2)) + 'px';
                        } else {
                            div.style.top = (rect.top) + 'px';
                        }
                    } else {
                        // Value
                        var value = empty == true ? '' : obj.options.data[y][x];

                        // Basic editor
                        if (obj.options.columns[x].wordWrap != false && (obj.options.wordWrap == true || obj.options.columns[x].wordWrap == true)) {
                            var editor = createEditor('textarea');
                        } else {
                            var editor = createEditor('input');
                        }

                        editor.focus();
                        editor.value = value;

                        // Column options
                        var options = obj.options.columns[x];
                        // Format
                        var opt = null;

                        // Apply format when is not a formula
                        if (! isFormula(value)) {
                            // Format
                            if (opt = getMask(options)) {
                                // Masking
                                if (! options.disabledMaskOnEdition) {
                                    if (options.mask) {
                                        var m = options.mask.split(';')
                                        editor.setAttribute('data-mask', m[0]);
                                    } else if (options.locale) {
                                        editor.setAttribute('data-locale', options.locale);
                                    }
                                }
                                // Input
                                opt.input = editor;
                                // Configuration
                                editor.mask = opt;
                                // Do not treat the decimals
                                jSuites.mask.render(value, opt, false);
                            }
                        }

                        editor.onblur = function() {
                            obj.closeEditor(cell, true);
                        };
                        editor.scrollLeft = editor.scrollWidth;
                    }
                }
            }
        }

        /**
         * Close the editor and save the information
         *
         * @param object cell
         * @param boolean save
         * @return void
         */
        obj.closeEditor = function(cell, save) {
            var x = parseInt(cell.getAttribute('data-x'));
            var y = parseInt(cell.getAttribute('data-y'));

            // Get cell properties
            if (save == true) {
                // If custom editor
                if (obj.options.columns[x].editor) {
                    // Custom editor
                    var value = obj.options.columns[x].editor.closeEditor(cell, save);
                } else {
                    // Native functions
                    if (obj.options.columns[x].type == 'checkbox' || obj.options.columns[x].type == 'radio' || obj.options.columns[x].type == 'hidden') {
                        // Do nothing
                    } else if (obj.options.columns[x].type == 'dropdown' || obj.options.columns[x].type == 'autocomplete') {
                        var value = cell.children[0].dropdown.close(true);
                    } else if (obj.options.columns[x].type == 'calendar') {
                        var value = cell.children[0].calendar.close(true);
                    } else if (obj.options.columns[x].type == 'color') {
                        var value = cell.children[0].color.close(true);
                    } else if (obj.options.columns[x].type == 'html') {
                        var value = cell.children[0].children[0].editor.getData();
                    } else if (obj.options.columns[x].type == 'image') {
                        var img = cell.children[0].children[0].children[0];
                        var value = img && img.tagName == 'IMG' ? img.src : '';
                    } else if (obj.options.columns[x].type == 'numeric') {
                        var value = cell.children[0].value;
                        if ((''+value).substr(0,1) != '=') {
                            if (value == '') {
                                value = obj.options.columns[x].allowEmpty ? '' : 0;
                            }
                        }
                        cell.children[0].onblur = null;
                    } else {
                        var value = cell.children[0].value;
                        cell.children[0].onblur = null;

                        // Column options
                        var options = obj.options.columns[x];
                        // Format
                        var opt = null;
                        if (opt = getMask(options)) {
                            // Keep numeric in the raw data
                            if (value !== '' && ! isFormula(value) && typeof(value) !== 'number') {
                                var t = jSuites.mask.extract(value, opt, true);
                                if (t && t.value !== '') {
                                    value = t.value;
                                }
                            }
                        }
                    }
                }

                // Ignore changes if the value is the same
                if (obj.options.data[y][x] == value) {
                    cell.innerHTML = obj.edition[1];
                } else {
                    obj.setValue(cell, value);
                }
            } else {
                if (obj.options.columns[x].editor) {
                    // Custom editor
                    obj.options.columns[x].editor.closeEditor(cell, save);
                } else {
                    if (obj.options.columns[x].type == 'dropdown' || obj.options.columns[x].type == 'autocomplete') {
                        cell.children[0].dropdown.close(true);
                    } else if (obj.options.columns[x].type == 'calendar') {
                        cell.children[0].calendar.close(true);
                    } else if (obj.options.columns[x].type == 'color') {
                        cell.children[0].color.close(true);
                    } else {
                        cell.children[0].onblur = null;
                    }
                }

                // Restore value
                cell.innerHTML = obj.edition && obj.edition[1] ? obj.edition[1] : '';
            }

            // On edition end
            obj.dispatch('oneditionend', el, cell, x, y, value, save);

            // Remove editor class
            cell.classList.remove('editor');

            // Finish edition
            obj.edition = null;
        }

        /**
         * Get the cell object
         *
         * @param object cell
         * @return string value
         */
        obj.getCell = function(cell) {
            // Convert in case name is excel liked ex. A10, BB92
            cell = jexcel.getIdFromColumnName(cell, true);
            var x = cell[0];
            var y = cell[1];

            return obj.records[y][x];
        }

        /**
         * Get the column options
         * @param x
         * @param y
         * @returns {{type: string}}
         */
        obj.getColumnOptions = function(x, y) {
            // Type
            var options = obj.options.columns[x];

            // Cell type
            if (! options) {
                options = { type: 'text' };
            }

            return options;
        }

        /**
         * Get the cell object from coords
         *
         * @param object cell
         * @return string value
         */
        obj.getCellFromCoords = function(x, y) {
            return obj.records[y][x];
        }

        /**
         * Get label
         *
         * @param object cell
         * @return string value
         */
        obj.getLabel = function(cell) {
            // Convert in case name is excel liked ex. A10, BB92
            cell = jexcel.getIdFromColumnName(cell, true);
            var x = cell[0];
            var y = cell[1];

            return obj.records[y][x].innerHTML;
        }

        /**
         * Get labelfrom coords
         *
         * @param object cell
         * @return string value
         */
        obj.getLabelFromCoords = function(x, y) {
            return obj.records[y][x].innerHTML;
        }

        /**
         * Get the value from a cell
         *
         * @param object cell
         * @return string value
         */
        obj.getValue = function(cell, processedValue) {
            if (typeof(cell) == 'object') {
                var x = cell.getAttribute('data-x');
                var y = cell.getAttribute('data-y');
            } else {
                cell = jexcel.getIdFromColumnName(cell, true);
                var x = cell[0];
                var y = cell[1];
            }

            var value = null;

            if (x != null && y != null) {
                if (obj.records[y] && obj.records[y][x] && (processedValue || obj.options.copyCompatibility == true)) {
                    value = obj.records[y][x].innerHTML;
                } else {
                    if (obj.options.data[y] && obj.options.data[y][x] != 'undefined') {
                        value = obj.options.data[y][x];
                    }
                }
            }

            return value;
        }

        /**
         * Get the value from a coords
         *
         * @param int x
         * @param int y
         * @return string value
         */
        obj.getValueFromCoords = function(x, y, processedValue) {
            var value = null;

            if (x != null && y != null) {
                if ((obj.records[y] && obj.records[y][x]) && processedValue || obj.options.copyCompatibility == true) {
                    value = obj.records[y][x].innerHTML;
                } else {
                    if (obj.options.data[y] && obj.options.data[y][x] != 'undefined') {
                        value = obj.options.data[y][x];
                    }
                }
            }

            return value;
        }

        /**
         * Set a cell value
         *
         * @param mixed cell destination cell
         * @param string value value
         * @return void
         */
        obj.setValue = function(cell, value, force) {
            var records = [];

            if (typeof(cell) == 'string') {
                var columnId = jexcel.getIdFromColumnName(cell, true);
                var x = columnId[0];
                var y = columnId[1];

                // Update cell
                records.push(obj.updateCell(x, y, value, force));

                // Update all formulas in the chain
                obj.updateFormulaChain(x, y, records);
            } else {
                var x = null;
                var y = null;
                if (cell && cell.getAttribute) {
                    var x = cell.getAttribute('data-x');
                    var y = cell.getAttribute('data-y');
                }

                // Update cell
                if (x != null && y != null) {
                    records.push(obj.updateCell(x, y, value, force));

                    // Update all formulas in the chain
                    obj.updateFormulaChain(x, y, records);
                } else {
                    var keys = Object.keys(cell);
                    if (keys.length > 0) {
                        for (var i = 0; i < keys.length; i++) {
                            if (typeof(cell[i]) == 'string') {
                                var columnId = jexcel.getIdFromColumnName(cell[i], true);
                                var x = columnId[0];
                                var y = columnId[1];
                            } else {
                                if (cell[i].x != null && cell[i].y != null) {
                                    var x = cell[i].x;
                                    var y = cell[i].y;
                                    // Flexible setup
                                    if (cell[i].newValue != null) {
                                        value = cell[i].newValue;
                                    } else if (cell[i].value != null) {
                                        value = cell[i].value;
                                    }
                                } else {
                                    var x = cell[i].getAttribute('data-x');
                                    var y = cell[i].getAttribute('data-y');
                                }
                            }

                             // Update cell
                            if (x != null && y != null) {
                                records.push(obj.updateCell(x, y, value, force));

                                // Update all formulas in the chain
                                obj.updateFormulaChain(x, y, records);
                            }
                        }
                    }
                }
            }

            // Update history
            obj.setHistory({
                action:'setValue',
                records:records,
                selection:obj.selectedCell,
            });

            // Update table with custom configurations if applicable
            obj.updateTable();

            // On after changes
            obj.onafterchanges(el, records);
        }

        /**
         * Set a cell value based on coordinates
         *
         * @param int x destination cell
         * @param int y destination cell
         * @param string value
         * @return void
         */
        obj.setValueFromCoords = function(x, y, value, force) {
            var records = [];
            records.push(obj.updateCell(x, y, value, force));

            // Update all formulas in the chain
            obj.updateFormulaChain(x, y, records);

            // Update history
            obj.setHistory({
                action:'setValue',
                records:records,
                selection:obj.selectedCell,
            });

            // Update table with custom configurations if applicable
            obj.updateTable();

            // On after changes
            obj.onafterchanges(el, records);
        }

        /**
         * Toogle
         */
        obj.setCheckRadioValue = function() {
            var records = [];
            var keys = Object.keys(obj.highlighted);
            for (var i = 0; i < keys.length; i++) {
                var x = obj.highlighted[i].getAttribute('data-x');
                var y = obj.highlighted[i].getAttribute('data-y');

                if (obj.options.columns[x].type == 'checkbox' || obj.options.columns[x].type == 'radio') {
                    // Update cell
                    records.push(obj.updateCell(x, y, ! obj.options.data[y][x]));
                }
            }

            if (records.length) {
                // Update history
                obj.setHistory({
                    action:'setValue',
                    records:records,
                    selection:obj.selectedCell,
                });

                // On after changes
                obj.onafterchanges(el, records);
            }
        }
        /**
         * Strip tags
         */
        var stripScript = function(a) {
            var b = new Option;
            b.innerHTML = a;
            var c = null;
            for (a = b.getElementsByTagName('script'); c=a[0];) c.parentNode.removeChild(c);
            return b.innerHTML;
        }

        /**
         * Update cell content
         *
         * @param object cell
         * @return void
         */
        obj.updateCell = function(x, y, value, force) {
            // Changing value depending on the column type
            if (obj.records[y][x].classList.contains('readonly') == true && ! force) {
                // Do nothing
                var record = {
                    x: x,
                    y: y,
                    col: x,
                    row: y
                }
            } else {
                // Security
                if ((''+value).substr(0,1) == '=' && obj.options.secureFormulas == true) {
                    var val = secureFormula(value);
                    if (val != value) {
                        // Update the data container
                        value = val;
                    }
                }

                // On change
                var val = obj.dispatch('onbeforechange', el, obj.records[y][x], x, y, value);

                // If you return something this will overwrite the value
                if (val != undefined) {
                    value = val;
                }

                if (obj.options.columns[x].editor && typeof(obj.options.columns[x].editor.updateCell) == 'function') {
                    value = obj.options.columns[x].editor.updateCell(obj.records[y][x], value, force);
                }

                // History format
                var record = {
                    x: x,
                    y: y,
                    col: x,
                    row: y,
                    newValue: value,
                    oldValue: obj.options.data[y][x],
                }

                if (obj.options.columns[x].editor) {
                    // Update data and cell
                    obj.options.data[y][x] = value;
                } else {
                    // Native functions
                    if (obj.options.columns[x].type == 'checkbox' || obj.options.columns[x].type == 'radio') {
                        // Unchecked all options
                        if (obj.options.columns[x].type == 'radio') {
                            for (var j = 0; j < obj.options.data.length; j++) {
                                obj.options.data[j][x] = false;
                            }
                        }

                        // Update data and cell
                        obj.records[y][x].children[0].checked = (value == 1 || value == true || value == 'true' || value == 'TRUE') ? true : false;
                        obj.options.data[y][x] = obj.records[y][x].children[0].checked;
                    } else if (obj.options.columns[x].type == 'dropdown' || obj.options.columns[x].type == 'autocomplete') {
                        // Update data and cell
                        obj.options.data[y][x] = value;
                        obj.records[y][x].textContent = obj.getDropDownValue(x, value);
                    } else if (obj.options.columns[x].type == 'calendar') {
                        // Try formatted date
                        var formatted = null;
                        if (! validDate(value)) {
                            var tmp = jSuites.calendar.extractDateFromString(value, obj.options.columns[x].options.format);
                            if (tmp) {
                                formatted = tmp;
                            }
                        }
                        // Update data and cell
                        obj.options.data[y][x] = value;
                        obj.records[y][x].textContent = jSuites.calendar.getDateString(formatted ? formatted : value, obj.options.columns[x].options.format);
                    } else if (obj.options.columns[x].type == 'color') {
                        // Update color
                        obj.options.data[y][x] = value;
                        // Render
                        if (obj.options.columns[x].render == 'square') {
                            var color = document.createElement('div');
                            color.className = 'color';
                            color.style.backgroundColor = value;
                            obj.records[y][x].textContent = '';
                            obj.records[y][x].appendChild(color);
                        } else {
                            obj.records[y][x].style.color = value;
                            obj.records[y][x].textContent = value;
                        }
                    } else if (obj.options.columns[x].type == 'image') {
                        value = ''+value;
                        obj.options.data[y][x] = value;
                        obj.records[y][x].innerHTML = '';
                        if (value && value.substr(0, 10) == 'data:image') {
                            var img = document.createElement('img');
                            img.src = value;
                            obj.records[y][x].appendChild(img);
                        }
                    } else {
                        // Update data and cell
                        obj.options.data[y][x] = value;
                        // Label
                        if (obj.options.columns[x].type == 'html') {
                            obj.records[y][x].innerHTML = stripScript(obj.parseValue(x, y, value));
                        } else {
                            if (obj.options.stripHTML === false || obj.options.columns[x].stripHTML === false) {
                                obj.records[y][x].innerHTML = stripScript(obj.parseValue(x, y, value, obj.records[y][x]));
                            } else {
                                obj.records[y][x].textContent = obj.parseValue(x, y, value, obj.records[y][x]);
                            }
                        }
                        // Handle big text inside a cell
                        if (obj.options.columns[x].wordWrap != false && (obj.options.wordWrap == true || obj.options.columns[x].wordWrap == true || obj.records[y][x].innerHTML.length > 200)) {
                            obj.records[y][x].style.whiteSpace = 'pre-wrap';
                        } else {
                            obj.records[y][x].style.whiteSpace = '';
                        }
                    }
                }

                // Overflow
                if (x > 0) {
                    if (value) {
                        obj.records[y][x-1].style.overflow = 'hidden';
                    } else {
                        obj.records[y][x-1].style.overflow = '';
                    }
                }

                // On change
                obj.dispatch('onchange', el, (obj.records[y] && obj.records[y][x] ? obj.records[y][x] : null), x, y, value, record.oldValue);
            }

            return record;
        }

        /**
         * Helper function to copy data using the corner icon
         */
        obj.copyData = function(o, d) {
            // Get data from all selected cells
            var data = obj.getData(true, true);

            // Selected cells
            var h = obj.selectedContainer;

            // Cells
            var x1 = parseInt(o.getAttribute('data-x'));
            var y1 = parseInt(o.getAttribute('data-y'));
            var x2 = parseInt(d.getAttribute('data-x'));
            var y2 = parseInt(d.getAttribute('data-y'));

            // Records
            var records = [];
            var breakControl = false;

            if (h[0] == x1) {
                // Vertical copy
                if (y1 < h[1]) {
                    var rowNumber = y1 - h[1];
                } else {
                    var rowNumber = 1;
                }
                var colNumber = 0;
            } else {
                if (x1 < h[0]) {
                    var colNumber = x1 - h[0];
                } else {
                    var colNumber = 1;
                }
                var rowNumber = 0;
            }

            // Copy data procedure
            var posx = 0;
            var posy = 0;

            for (var j = y1; j <= y2; j++) {
                // Skip hidden rows
                if (obj.rows[j] && obj.rows[j].style.display == 'none') {
                    continue;
                }

                // Controls
                if (data[posy] == undefined) {
                    posy = 0;
                }
                posx = 0;

                // Data columns
                if (h[0] != x1) {
                    if (x1 < h[0]) {
                        var colNumber = x1 - h[0];
                    } else {
                        var colNumber = 1;
                    }
                }
                // Data columns
                for (var i = x1; i <= x2; i++) {
                    // Update non-readonly
                    if (obj.records[j][i] && ! obj.records[j][i].classList.contains('readonly') && obj.records[j][i].style.display != 'none' && breakControl == false) {
                        // Stop if contains value
                        if (! obj.selection.length) {
                            if (obj.options.data[j][i] != '') {
                                breakControl = true;
                                continue;
                            }
                        }

                        // Column
                        if (data[posy] == undefined) {
                            posx = 0;
                        } else if (data[posy][posx] == undefined) {
                            posx = 0;
                        }

                        // Value
                        var value = data[posy][posx];

                        if (value && ! data[1] && obj.options.autoIncrement == true) {
                            if (obj.options.columns[i].type == 'text' || obj.options.columns[i].type == 'number') {
                                if ((''+value).substr(0,1) == '=') {
                                    var tokens = value.match(/([A-Z]+[0-9]+)/g);

                                    if (tokens) {
                                        var affectedTokens = [];
                                        for (var index = 0; index < tokens.length; index++) {
                                            var position = jexcel.getIdFromColumnName(tokens[index], 1);
                                            position[0] += colNumber;
                                            position[1] += rowNumber;
                                            if (position[1] < 0) {
                                                position[1] = 0;
                                            }
                                            var token = jexcel.getColumnNameFromId([position[0], position[1]]);

                                            if (token != tokens[index]) {
                                                affectedTokens[tokens[index]] = token;
                                            }
                                        }
                                        // Update formula
                                        if (affectedTokens) {
                                            value = obj.updateFormula(value, affectedTokens)
                                        }
                                    }
                                } else {
                                    if (value == Number(value)) {
                                        value = Number(value) + rowNumber;
                                    }
                                }
                            } else if (obj.options.columns[i].type == 'calendar') {
                                var date = new Date(value);
                                date.setDate(date.getDate() + rowNumber);
                                value = date.getFullYear() + '-' + jexcel.doubleDigitFormat(parseInt(date.getMonth() + 1)) + '-' + jexcel.doubleDigitFormat(date.getDate()) + ' ' + '00:00:00';
                            }
                        }

                        records.push(obj.updateCell(i, j, value));

                        // Update all formulas in the chain
                        obj.updateFormulaChain(i, j, records);
                    }
                    posx++;
                    if (h[0] != x1) {
                        colNumber++;
                    }
                }
                posy++;
                rowNumber++;
            }

            // Update history
            obj.setHistory({
                action:'setValue',
                records:records,
                selection:obj.selectedCell,
            });

            // Update table with custom configuration if applicable
            obj.updateTable();

            // On after changes
            obj.onafterchanges(el, records);
        }

        /**
         * Refresh current selection
         */
        obj.refreshSelection = function() {
            if (obj.selectedCell) {
                obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
            }
        }

        /**
         * Move coords to A1 in case overlaps with an excluded cell
         */
        obj.conditionalSelectionUpdate = function(type, o, d) {
            if (type == 1) {
                if (obj.selectedCell && ((o >= obj.selectedCell[1] && o <= obj.selectedCell[3]) || (d >= obj.selectedCell[1] && d <= obj.selectedCell[3]))) {
                    obj.resetSelection();
                    return;
                }
            } else {
                if (obj.selectedCell && ((o >= obj.selectedCell[0] && o <= obj.selectedCell[2]) || (d >= obj.selectedCell[0] && d <= obj.selectedCell[2]))) {
                    obj.resetSelection();
                    return;
                }
            }
        }

        /**
         * Clear table selection
         */
        obj.resetSelection = function(blur) {
            // Remove style
            if (! obj.highlighted.length) {
                var previousStatus = 0;
            } else {
                var previousStatus = 1;

                for (var i = 0; i < obj.highlighted.length; i++) {
                    obj.highlighted[i].classList.remove('highlight');
                    obj.highlighted[i].classList.remove('highlight-left');
                    obj.highlighted[i].classList.remove('highlight-right');
                    obj.highlighted[i].classList.remove('highlight-top');
                    obj.highlighted[i].classList.remove('highlight-bottom');
                    obj.highlighted[i].classList.remove('highlight-selected');

                    var px = parseInt(obj.highlighted[i].getAttribute('data-x'));
                    var py = parseInt(obj.highlighted[i].getAttribute('data-y'));

                    // Check for merged cells
                    if (obj.highlighted[i].getAttribute('data-merged')) {
                        var colspan = parseInt(obj.highlighted[i].getAttribute('colspan'));
                        var rowspan = parseInt(obj.highlighted[i].getAttribute('rowspan'));
                        var ux = colspan > 0 ? px + (colspan - 1) : px;
                        var uy = rowspan > 0 ? py + (rowspan - 1): py;
                    } else {
                        var ux = px;
                        var uy = py;
                    }

                    // Remove selected from headers
                    for (var j = px; j <= ux; j++) {
                        if (obj.headers[j]) {
                            obj.headers[j].classList.remove('selected');
                        }
                    }

                    // Remove selected from rows
                    for (var j = py; j <= uy; j++) {
                        if (obj.rows[j]) {
                            obj.rows[j].classList.remove('selected');
                        }
                    }
                }
            }

            // Reset highlighted cells
            obj.highlighted = [];

            // Reset
            obj.selectedCell = null;

            // Hide corner
            obj.corner.style.top = '-2000px';
            obj.corner.style.left = '-2000px';

            if (blur == true && previousStatus == 1) {
                obj.dispatch('onblur', el);
            }

            return previousStatus;
        }

        /**
         * Update selection based on two cells
         */
        obj.updateSelection = function(el1, el2, origin) {
            var x1 = el1.getAttribute('data-x');
            var y1 = el1.getAttribute('data-y');
            if (el2) {
                var x2 = el2.getAttribute('data-x');
                var y2 = el2.getAttribute('data-y');
            } else {
                var x2 = x1;
                var y2 = y1;
            }

            obj.updateSelectionFromCoords(x1, y1, x2, y2, origin);
        }

        /**
         * Update selection from coords
         */
        obj.updateSelectionFromCoords = function(x1, y1, x2, y2, origin) {
            // Reset Selection
            var updated = null;
            var previousState = obj.resetSelection();

            // select column
            if (y1 == null) {
                y1 = 0;
                y2 = obj.rows.length - 1;
            }

            // Same element
            if (x2 == null) {
                x2 = x1;
            }
            if (y2 == null) {
                y2 = y1;
            }

            // Selection must be within the existing data
            if (x1 >= obj.headers.length) {
                x1 = obj.headers.length - 1;
            }
            if (y1 >= obj.rows.length) {
                y1 = obj.rows.length - 1;
            }
            if (x2 >= obj.headers.length) {
                x2 = obj.headers.length - 1;
            }
            if (y2 >= obj.rows.length) {
                y2 = obj.rows.length - 1;
            }

            // Keep selected cell
            obj.selectedCell = [x1, y1, x2, y2];

            // Select cells
            if (x1 != null) {
                // Add selected cell
                if (obj.records[y1][x1]) {
                    obj.records[y1][x1].classList.add('highlight-selected');
                }

                // Origin & Destination
                if (parseInt(x1) < parseInt(x2)) {
                    var px = parseInt(x1);
                    var ux = parseInt(x2);
                } else {
                    var px = parseInt(x2);
                    var ux = parseInt(x1);
                }

                if (parseInt(y1) < parseInt(y2)) {
                    var py = parseInt(y1);
                    var uy = parseInt(y2);
                } else {
                    var py = parseInt(y2);
                    var uy = parseInt(y1);
                }

                // Verify merged columns
                for (var i = px; i <= ux; i++) {
                    for (var j = py; j <= uy; j++) {
                        if (obj.records[j][i] && obj.records[j][i].getAttribute('data-merged')) {
                            var x = parseInt(obj.records[j][i].getAttribute('data-x'));
                            var y = parseInt(obj.records[j][i].getAttribute('data-y'));
                            var colspan = parseInt(obj.records[j][i].getAttribute('colspan'));
                            var rowspan = parseInt(obj.records[j][i].getAttribute('rowspan'));

                            if (colspan > 1) {
                                if (x < px) {
                                    px = x;
                                }
                                if (x + colspan > ux) {
                                    ux = x + colspan - 1;
                                }
                            }

                            if (rowspan) {
                                if (y < py) {
                                    py = y;

                                }
                                if (y + rowspan > uy) {
                                    uy = y + rowspan - 1;
                                }
                            }
                        }
                    }
                }

                // Limits
                var borderLeft = null;
                var borderRight = null;
                var borderTop = null;
                var borderBottom = null;

                // Vertical limits
                for (var j = py; j <= uy; j++) {
                    if (obj.rows[j].style.display != 'none') {
                        if (borderTop == null) {
                            borderTop = j;
                        }
                        borderBottom = j;
                    }
                }

                // Redefining styles
                for (var i = px; i <= ux; i++) {
                    for (var j = py; j <= uy; j++) {
                        if (obj.rows[j].style.display != 'none' && obj.records[j][i].style.display != 'none') {
                            obj.records[j][i].classList.add('highlight');
                            obj.highlighted.push(obj.records[j][i]);
                        }
                    }

                    // Horizontal limits
                    if (obj.options.columns[i].type != 'hidden') {
                        if (borderLeft == null) {
                            borderLeft = i;
                        }
                        borderRight = i;
                    }
                }

                // Create borders
                if (! borderLeft) {
                    borderLeft = 0;
                }
                if (! borderRight) {
                    borderRight = 0;
                }
                for (var i = borderLeft; i <= borderRight; i++) {
                    if (obj.options.columns[i].type != 'hidden') {
                        // Top border
                        if (obj.records[borderTop] && obj.records[borderTop][i]) {
                            obj.records[borderTop][i].classList.add('highlight-top');
                        }
                        // Bottom border
                        if (obj.records[borderBottom] && obj.records[borderBottom][i]) {
                            obj.records[borderBottom][i].classList.add('highlight-bottom');
                        }
                        // Add selected from headers
                        obj.headers[i].classList.add('selected');
                    }
                }

                for (var j = borderTop; j <= borderBottom; j++) {
                    if (obj.rows[j] && obj.rows[j].style.display != 'none') {
                        // Left border
                        obj.records[j][borderLeft].classList.add('highlight-left');
                        // Right border
                        obj.records[j][borderRight].classList.add('highlight-right');
                        // Add selected from rows
                        obj.rows[j].classList.add('selected');
                    }
                }

                obj.selectedContainer = [ borderLeft, borderTop, borderRight, borderBottom ];
            }

            // Handle events
            if (previousState == 0) {
                obj.dispatch('onfocus', el);

                obj.removeCopyingSelection();
            }

            obj.dispatch('onselection', el, borderLeft, borderTop, borderRight, borderBottom, origin);

            // Find corner cell
            obj.updateCornerPosition();
        }

        /**
         * Remove copy selection
         *
         * @return void
         */
        obj.removeCopySelection = function() {
            // Remove current selection
            for (var i = 0; i < obj.selection.length; i++) {
                obj.selection[i].classList.remove('selection');
                obj.selection[i].classList.remove('selection-left');
                obj.selection[i].classList.remove('selection-right');
                obj.selection[i].classList.remove('selection-top');
                obj.selection[i].classList.remove('selection-bottom');
            }

            obj.selection = [];
        }

        /**
         * Update copy selection
         *
         * @param int x, y
         * @return void
         */
        obj.updateCopySelection = function(x3, y3) {
            // Remove selection
            obj.removeCopySelection();

            // Get elements first and last
            var x1 = obj.selectedContainer[0];
            var y1 = obj.selectedContainer[1];
            var x2 = obj.selectedContainer[2];
            var y2 = obj.selectedContainer[3];

            if (x3 != null && y3 != null) {
                if (x3 - x2 > 0) {
                    var px = parseInt(x2) + 1;
                    var ux = parseInt(x3);
                } else {
                    var px = parseInt(x3);
                    var ux = parseInt(x1) - 1;
                }

                if (y3 - y2 > 0) {
                    var py = parseInt(y2) + 1;
                    var uy = parseInt(y3);
                } else {
                    var py = parseInt(y3);
                    var uy = parseInt(y1) - 1;
                }

                if (ux - px <= uy - py) {
                    var px = parseInt(x1);
                    var ux = parseInt(x2);
                } else {
                    var py = parseInt(y1);
                    var uy = parseInt(y2);
                }

                for (var j = py; j <= uy; j++) {
                    for (var i = px; i <= ux; i++) {
                        if (obj.records[j][i] && obj.rows[j].style.display != 'none' && obj.records[j][i].style.display != 'none') {
                            obj.records[j][i].classList.add('selection');
                            obj.records[py][i].classList.add('selection-top');
                            obj.records[uy][i].classList.add('selection-bottom');
                            obj.records[j][px].classList.add('selection-left');
                            obj.records[j][ux].classList.add('selection-right');

                            // Persist selected elements
                            obj.selection.push(obj.records[j][i]);
                        }
                    }
                }
            }
        }

        /**
         * Update corner position
         *
         * @return void
         */
        obj.updateCornerPosition = function() {
            // If any selected cells
            if (! obj.highlighted.length) {
                obj.corner.style.top = '-2000px';
                obj.corner.style.left = '-2000px';
            } else {
                // Get last cell
                var last = obj.highlighted[obj.highlighted.length-1];
                var lastX = last.getAttribute('data-x');

                var contentRect = obj.content.getBoundingClientRect();
                var x1 = contentRect.left;
                var y1 = contentRect.top;

                var lastRect = last.getBoundingClientRect();
                var x2 = lastRect.left;
                var y2 = lastRect.top;
                var w2 = lastRect.width;
                var h2 = lastRect.height;

                var x = (x2 - x1) + obj.content.scrollLeft + w2 - 4;
                var y = (y2 - y1) + obj.content.scrollTop + h2 - 4;

                // Place the corner in the correct place
                obj.corner.style.top = y + 'px';
                obj.corner.style.left = x + 'px';

                if (obj.options.freezeColumns) {
                    var width = obj.getFreezeWidth();
                    // Only check if the last column is not part of the merged cells
                    if (lastX > obj.options.freezeColumns-1 && x2 - x1 + w2 < width) {
                        obj.corner.style.display = 'none';
                    } else {
                        if (obj.options.selectionCopy == true) {
                            obj.corner.style.display = '';
                        }
                    }
                } else {
                    if (obj.options.selectionCopy == true) {
                        obj.corner.style.display = '';
                    }
                }
            }
        }

        /**
         * Update scroll position based on the selection
         */
        obj.updateScroll = function(direction) {
            // Jspreadsheet Container information
            var contentRect = obj.content.getBoundingClientRect();
            var x1 = contentRect.left;
            var y1 = contentRect.top;
            var w1 = contentRect.width;
            var h1 = contentRect.height;

            // Direction Left or Up
            var reference = obj.records[obj.selectedCell[3]][obj.selectedCell[2]];

            // Reference
            var referenceRect = reference.getBoundingClientRect();
            var x2 = referenceRect.left;
            var y2 = referenceRect.top;
            var w2 = referenceRect.width;
            var h2 = referenceRect.height;

            // Direction
            if (direction == 0 || direction == 1) {
                var x = (x2 - x1) + obj.content.scrollLeft;
                var y = (y2 - y1) + obj.content.scrollTop - 2;
            } else {
                var x = (x2 - x1) + obj.content.scrollLeft + w2;
                var y = (y2 - y1) + obj.content.scrollTop + h2;
            }

            // Top position check
            if (y > (obj.content.scrollTop + 30) && y < (obj.content.scrollTop + h1)) {
                // In the viewport
            } else {
                // Out of viewport
                if (y < obj.content.scrollTop + 30) {
                    obj.content.scrollTop = y - h2;
                } else {
                    obj.content.scrollTop = y - (h1 - 2);
                }
            }

            // Freeze columns?
            var freezed = obj.getFreezeWidth();

            // Left position check - TODO: change that to the bottom border of the element
            if (x > (obj.content.scrollLeft + freezed) && x < (obj.content.scrollLeft + w1)) {
                // In the viewport
            } else {
                // Out of viewport
                if (x < obj.content.scrollLeft + 30) {
                    obj.content.scrollLeft = x;
                    if (obj.content.scrollLeft < 50) {
                        obj.content.scrollLeft = 0;
                    }
                } else if (x < obj.content.scrollLeft + freezed) {
                    obj.content.scrollLeft = x - freezed - 1;
                } else {
                    obj.content.scrollLeft = x - (w1 - 20);
                }
            }
        }

        /**
         * Get the column width
         *
         * @param int column column number (first column is: 0)
         * @return int current width
         */
        obj.getWidth = function(column) {
            if (typeof column === 'undefined') {
                // Get all headers
                var data = [];
                for (var i = 0; i < obj.headers.length; i++) {
                    data.push(obj.options.columns[i].width);
                }
            } else {
                // In case the column is an object
                if (typeof(column) == 'object') {
                    column = $(column).getAttribute('data-x');
                }

                data = obj.colgroup[column].getAttribute('width')
            }

            return data;
        }


        /**
         * Set the column width
         *
         * @param int column number (first column is: 0)
         * @param int new column width
         * @param int old column width
         */
        obj.setWidth = function (column, width, oldWidth) {
            if (width) {
                if (Array.isArray(column)) {
                    // Oldwidth
                    if (! oldWidth) {
                        var oldWidth = [];
                    }
                    // Set width
                    for (var i = 0; i < column.length; i++) {
                        if (! oldWidth[i]) {
                            oldWidth[i] = obj.colgroup[column[i]].getAttribute('width');
                        }
                        var w = Array.isArray(width) && width[i] ? width[i] : width;
                        obj.colgroup[column[i]].setAttribute('width', w);
                        obj.options.columns[column[i]].width = w;
                    }
                } else {
                    // Oldwidth
                    if (! oldWidth) {
                        oldWidth = obj.colgroup[column].getAttribute('width');
                    }
                    // Set width
                    obj.colgroup[column].setAttribute('width', width);
                    obj.options.columns[column].width = width;
                }

                // Keeping history of changes
                obj.setHistory({
                    action:'setWidth',
                    column:column,
                    oldValue:oldWidth,
                    newValue:width,
                });

                // On resize column
                obj.dispatch('onresizecolumn', el, column, width, oldWidth);

                // Update corner position
                obj.updateCornerPosition();
            }
        }

        /**
         * Set the row height
         *
         * @param row - row number (first row is: 0)
         * @param height - new row height
         * @param oldHeight - old row height
         */
        obj.setHeight = function (row, height, oldHeight) {
            if (height > 0) {
                // In case the column is an object
                if (typeof(row) == 'object') {
                    row = row.getAttribute('data-y');
                }

                // Oldwidth
                if (! oldHeight) {
                    oldHeight = obj.rows[row].getAttribute('height');

                    if (! oldHeight) {
                        var rect = obj.rows[row].getBoundingClientRect();
                        oldHeight = rect.height;
                    }
                }

                // Integer
                height = parseInt(height);

                // Set width
                obj.rows[row].style.height = height + 'px';

                // Keep options updated
                if (! obj.options.rows[row]) {
                    obj.options.rows[row] = {};
                }
                obj.options.rows[row].height = height;

                // Keeping history of changes
                obj.setHistory({
                    action:'setHeight',
                    row:row,
                    oldValue:oldHeight,
                    newValue:height,
                });

                // On resize column
                obj.dispatch('onresizerow', el, row, height, oldHeight);

                // Update corner position
                obj.updateCornerPosition();
            }
        }

        /**
         * Get the row height
         *
         * @param row - row number (first row is: 0)
         * @return height - current row height
         */
        obj.getHeight = function(row) {
            if (typeof row === 'undefined') {
                // Get height of all rows
                var data = [];
                for (var j = 0; j < obj.rows.length; j++) {
                    var h = obj.rows[j].style.height;
                    if (h) {
                        data[j] = h;
                    }
                }
            } else {
                // In case the row is an object
                if (typeof(row) == 'object') {
                    row = $(row).getAttribute('data-y');
                }

                var data = obj.rows[row].style.height;
            }

            return data;
        }

        obj.setFooter = function(data) {
            if (data) {
                obj.options.footers = data;
            }

            if (obj.options.footers) {
                if (! obj.tfoot) {
                    obj.tfoot = document.createElement('tfoot');
                    obj.table.appendChild(obj.tfoot);
                }

                for (var j = 0; j < obj.options.footers.length; j++) {
                    if (obj.tfoot.children[j]) {
                        var tr = obj.tfoot.children[j];
                    } else {
                        var tr = document.createElement('tr');
                        var td = document.createElement('td');
                        tr.appendChild(td);
                        obj.tfoot.appendChild(tr);
                    }
                    for (var i = 0; i < obj.headers.length; i++) {
                        if (! obj.options.footers[j][i]) {
                            obj.options.footers[j][i] = '';
                        }
                        if (obj.tfoot.children[j].children[i+1]) {
                            var td = obj.tfoot.children[j].children[i+1];
                        } else {
                            var td = document.createElement('td');
                            tr.appendChild(td);

                            // Text align
                            var colAlign = obj.options.columns[i].align ? obj.options.columns[i].align : 'center';
                            td.style.textAlign = colAlign;
                        }
                        td.textContent = obj.parseValue(+obj.records.length + i, j, obj.options.footers[j][i]);

                        // Hide/Show with hideColumn()/showColumn()
                        td.style.display = obj.colgroup[i].style.display;
                    }
                }
            }
        }

        /**
         * Get the column title
         *
         * @param column - column number (first column is: 0)
         * @param title - new column title
         */
        obj.getHeader = function(column) {
            return obj.headers[column].textContent;
        }

        /**
         * Set the column title
         *
         * @param column - column number (first column is: 0)
         * @param title - new column title
         */
        obj.setHeader = function(column, newValue) {
            if (obj.headers[column]) {
                var oldValue = obj.headers[column].textContent;

                if (! newValue) {
                    newValue = prompt(obj.options.text.columnName, oldValue)
                }

                if (newValue) {
                    obj.headers[column].textContent = newValue;
                    // Keep the title property
                    obj.headers[column].setAttribute('title', newValue);
                    // Update title
                    obj.options.columns[column].title = newValue;
                }

                obj.setHistory({
                    action: 'setHeader',
                    column: column,
                    oldValue: oldValue,
                    newValue: newValue
                });

                // On onchange header
                obj.dispatch('onchangeheader', el, column, oldValue, newValue);
            }
        }

        /**
         * Get the headers
         *
         * @param asArray
         * @return mixed
         */
        obj.getHeaders = function (asArray) {
            var title = [];

            for (var i = 0; i < obj.headers.length; i++) {
                title.push(obj.getHeader(i));
            }

            return asArray ? title : title.join(obj.options.csvDelimiter);
        }

        /**
         * Get meta information from cell(s)
         *
         * @return integer
         */
        obj.getMeta = function(cell, key) {
            if (! cell) {
                return obj.options.meta;
            } else {
                if (key) {
                    return obj.options.meta[cell] && obj.options.meta[cell][key] ? obj.options.meta[cell][key] : null;
                } else {
                    return obj.options.meta[cell] ? obj.options.meta[cell] : null;
                }
            }
        }

        /**
         * Set meta information to cell(s)
         *
         * @return integer
         */
        obj.setMeta = function(o, k, v) {
            if (! obj.options.meta) {
                obj.options.meta = {}
            }

            if (k && v) {
                // Set data value
                if (! obj.options.meta[o]) {
                    obj.options.meta[o] = {};
                }
                obj.options.meta[o][k] = v;
            } else {
                // Apply that for all cells
                var keys = Object.keys(o);
                for (var i = 0; i < keys.length; i++) {
                    if (! obj.options.meta[keys[i]]) {
                        obj.options.meta[keys[i]] = {};
                    }

                    var prop = Object.keys(o[keys[i]]);
                    for (var j = 0; j < prop.length; j++) {
                        obj.options.meta[keys[i]][prop[j]] = o[keys[i]][prop[j]];
                    }
                }
            }

            obj.dispatch('onchangemeta', el, o, k, v);
        }

        /**
         * Update meta information
         *
         * @return integer
         */
        obj.updateMeta = function(affectedCells) {
            if (obj.options.meta) {
                var newMeta = {};
                var keys = Object.keys(obj.options.meta);
                for (var i = 0; i < keys.length; i++) {
                    if (affectedCells[keys[i]]) {
                        newMeta[affectedCells[keys[i]]] = obj.options.meta[keys[i]];
                    } else {
                        newMeta[keys[i]] = obj.options.meta[keys[i]];
                    }
                }
                // Update meta information
                obj.options.meta = newMeta;
            }
        }

        /**
         * Get style information from cell(s)
         *
         * @return integer
         */
        obj.getStyle = function(cell, key) {
            // Cell
            if (! cell) {
                // Control vars
                var data = {};

                // Column and row length
                var x = obj.options.data[0].length;
                var y = obj.options.data.length;

                // Go through the columns to get the data
                for (var j = 0; j < y; j++) {
                    for (var i = 0; i < x; i++) {
                        // Value
                        var v = key ? obj.records[j][i].style[key] : obj.records[j][i].getAttribute('style');

                        // Any meta data for this column?
                        if (v) {
                            // Column name
                            var k = jexcel.getColumnNameFromId([i, j]);
                            // Value
                            data[k] = v;
                        }
                    }
                }

               return data;
            } else {
                cell = jexcel.getIdFromColumnName(cell, true);

                return key ? obj.records[cell[1]][cell[0]].style[key] : obj.records[cell[1]][cell[0]].getAttribute('style');
            }
        },

        obj.resetStyle = function(o, ignoreHistoryAndEvents) {
            var keys = Object.keys(o);
            for (var i = 0; i < keys.length; i++) {
                // Position
                var cell = jexcel.getIdFromColumnName(keys[i], true);
                if (obj.records[cell[1]] && obj.records[cell[1]][cell[0]]) {
                    obj.records[cell[1]][cell[0]].setAttribute('style', '');
                }
            }
            obj.setStyle(o, null, null, null, ignoreHistoryAndEvents);
        }

        /**
         * Set meta information to cell(s)
         *
         * @return integer
         */
        obj.setStyle = function(o, k, v, force, ignoreHistoryAndEvents) {
            var newValue = {};
            var oldValue = {};

            // Apply style
            var applyStyle = function(cellId, key, value) {
                // Position
                var cell = jexcel.getIdFromColumnName(cellId, true);

                if (obj.records[cell[1]] && obj.records[cell[1]][cell[0]] && (obj.records[cell[1]][cell[0]].classList.contains('readonly')==false || force)) {
                    // Current value
                    var currentValue = obj.records[cell[1]][cell[0]].style[key];

                    // Change layout
                    if (currentValue == value && ! force) {
                        value = '';
                        obj.records[cell[1]][cell[0]].style[key] = '';
                    } else {
                        obj.records[cell[1]][cell[0]].style[key] = value;
                    }

                    // History
                    if (! oldValue[cellId]) {
                        oldValue[cellId] = [];
                    }
                    if (! newValue[cellId]) {
                        newValue[cellId] = [];
                    }

                    oldValue[cellId].push([key + ':' + currentValue]);
                    newValue[cellId].push([key + ':' + value]);
                }
            }

            if (k && v) {
                // Get object from string
                if (typeof(o) == 'string') {
                    applyStyle(o, k, v);
                } else {
                    // Avoid duplications
                    var oneApplication = [];
                    // Apply that for all cells
                    for (var i = 0; i < o.length; i++) {
                        var x = o[i].getAttribute('data-x');
                        var y = o[i].getAttribute('data-y');
                        var cellName = jexcel.getColumnNameFromId([x, y]);
                        // This happens when is a merged cell
                        if (! oneApplication[cellName]) {
                            applyStyle(cellName, k, v);
                            oneApplication[cellName] = true;
                        }
                    }
                }
            } else {
                var keys = Object.keys(o);
                for (var i = 0; i < keys.length; i++) {
                    var style = o[keys[i]];
                    if (typeof(style) == 'string') {
                        style = style.split(';');
                    }
                    for (var j = 0; j < style.length; j++) {
                        if (typeof(style[j]) == 'string') {
                            style[j] = style[j].split(':');
                        }
                        // Apply value
                        if (style[j][0].trim()) {
                            applyStyle(keys[i], style[j][0].trim(), style[j][1]);
                        }
                    }
                }
            }

            var keys = Object.keys(oldValue);
            for (var i = 0; i < keys.length; i++) {
                oldValue[keys[i]] = oldValue[keys[i]].join(';');
            }
            var keys = Object.keys(newValue);
            for (var i = 0; i < keys.length; i++) {
                newValue[keys[i]] = newValue[keys[i]].join(';');
            }

            if (! ignoreHistoryAndEvents) {
                // Keeping history of changes
                obj.setHistory({
                    action: 'setStyle',
                    oldValue: oldValue,
                    newValue: newValue,
                });
            }

            obj.dispatch('onchangestyle', el, o, k, v);
        }

        /**
         * Get cell comments, null cell for all
         */
        obj.getComments = function(cell, withAuthor) {
            if (cell) {
                if (typeof(cell) == 'string') {
                    var cell = jexcel.getIdFromColumnName(cell, true);
                }

                if (withAuthor) {
                    return [obj.records[cell[1]][cell[0]].getAttribute('title'), obj.records[cell[1]][cell[0]].getAttribute('author')];
                } else {
                    return obj.records[cell[1]][cell[0]].getAttribute('title') || '';
                }
            } else {
                var data = {};
                for (var j = 0; j < obj.options.data.length; j++) {
                    for (var i = 0; i < obj.options.columns.length; i++) {
                        var comments = obj.records[j][i].getAttribute('title');
                        if (comments) {
                            var cell = jexcel.getColumnNameFromId([i, j]);
                            data[cell] = comments;
                        }
                    }
                }
                return data;
            }
        }

        /**
         * Set cell comments
         */
        obj.setComments = function(cellId, comments, author) {
            if (typeof(cellId) == 'string') {
                var cell = jexcel.getIdFromColumnName(cellId, true);
            } else {
                var cell = cellId;
            }

            // Keep old value
            var title = obj.records[cell[1]][cell[0]].getAttribute('title');
            var author = obj.records[cell[1]][cell[0]].getAttribute('data-author');
            var oldValue = [ title, author ];

            // Set new values
            obj.records[cell[1]][cell[0]].setAttribute('title', comments ? comments : '');
            obj.records[cell[1]][cell[0]].setAttribute('data-author', author ? author : '');

            // Remove class if there is no comment
            if (comments) {
                obj.records[cell[1]][cell[0]].classList.add('jexcel_comments');
            } else {
                obj.records[cell[1]][cell[0]].classList.remove('jexcel_comments');
            }

            // Save history
            obj.setHistory({
                action:'setComments',
                column: cellId,
                newValue: [ comments, author ],
                oldValue: oldValue,
            });
            // Set comments
            obj.dispatch('oncomments', el, comments, title, cell, cell[0], cell[1]);
        }

        /**
         * Get table config information
         */
        obj.getConfig = function() {
            var options = obj.options;
            options.style = obj.getStyle();
            options.mergeCells = obj.getMerge();
            options.comments = obj.getComments();

            return options;
        }

        /**
         * Sort data and reload table
         */
        obj.orderBy = function(column, order) {
            if (column >= 0) {
                // Merged cells
                if (Object.keys(obj.options.mergeCells).length > 0) {
                    if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                        return false;
                    } else {
                        // Remove merged cells
                        obj.destroyMerged();
                    }
                }

                // Direction
                if (order == null) {
                    order = obj.headers[column].classList.contains('arrow-down') ? 1 : 0;
                } else {
                    order = order ? 1 : 0;
                }

                // Test order
                var temp = [];
                if (obj.options.columns[column].type == 'number' || obj.options.columns[column].type == 'numeric' || obj.options.columns[column].type == 'percentage' || obj.options.columns[column].type == 'autonumber' || obj.options.columns[column].type == 'color') {
                    for (var j = 0; j < obj.options.data.length; j++) {
                        temp[j] = [ j, Number(obj.options.data[j][column]) ];
                    }
                } else if (obj.options.columns[column].type == 'calendar' || obj.options.columns[column].type == 'checkbox' || obj.options.columns[column].type == 'radio') {
                    for (var j = 0; j < obj.options.data.length; j++) {
                        temp[j] = [ j, obj.options.data[j][column] ];
                    }
                } else {
                    for (var j = 0; j < obj.options.data.length; j++) {
                        temp[j] = [ j, obj.records[j][column].textContent.toLowerCase() ];
                    }
                }

                // Default sorting method
                if (typeof(obj.options.sorting) !== 'function') {
                    obj.options.sorting = function(direction) {
                        return function(a, b) {
                            var valueA = a[1];
                            var valueB = b[1];

                            if (! direction) {
                                return (valueA === '' && valueB !== '') ? 1 : (valueA !== '' && valueB === '') ? -1 : (valueA > valueB) ? 1 : (valueA < valueB) ? -1 :  0;
                            } else {
                                return (valueA === '' && valueB !== '') ? 1 : (valueA !== '' && valueB === '') ? -1 : (valueA > valueB) ? -1 : (valueA < valueB) ? 1 :  0;
                            }
                        }
                    }
                }

                temp = temp.sort(obj.options.sorting(order));

                // Save history
                var newValue = [];
                for (var j = 0; j < temp.length; j++) {
                    newValue[j] = temp[j][0];
                }

                // Save history
                obj.setHistory({
                    action: 'orderBy',
                    rows: newValue,
                    column: column,
                    order: order,
                });

                // Update order
                obj.updateOrderArrow(column, order);
                obj.updateOrder(newValue);

                // On sort event
                obj.dispatch('onsort', el, column, order);

                return true;
            }
        }

        /**
         * Update order arrow
         */
        obj.updateOrderArrow = function(column, order) {
            // Remove order
            for (var i = 0; i < obj.headers.length; i++) {
                obj.headers[i].classList.remove('arrow-up');
                obj.headers[i].classList.remove('arrow-down');
            }

            // No order specified then toggle order
            if (order) {
                obj.headers[column].classList.add('arrow-up');
            } else {
                obj.headers[column].classList.add('arrow-down');
            }
        }

        /**
         * Update rows position
         */
        obj.updateOrder = function(rows) {
            // History
            var data = []
            for (var j = 0; j < rows.length; j++) {
                data[j] = obj.options.data[rows[j]];
            }
            obj.options.data = data;

            var data = []
            for (var j = 0; j < rows.length; j++) {
                data[j] = obj.records[rows[j]];
            }
            obj.records = data;

            var data = []
            for (var j = 0; j < rows.length; j++) {
                data[j] = obj.rows[rows[j]];
            }
            obj.rows = data;

            // Update references
            obj.updateTableReferences();

            // Redo search
            if (obj.results && obj.results.length) {
                if (obj.searchInput.value) {
                    obj.search(obj.searchInput.value);
                } else {
                    obj.closeFilter();
                }
            } else {
                // Create page
                obj.results = null;
                obj.pageNumber = 0;

                if (obj.options.pagination > 0) {
                    obj.page(0);
                } else if (obj.options.lazyLoading == true) {
                    obj.loadPage(0);
                } else {
                    for (var j = 0; j < obj.rows.length; j++) {
                        obj.tbody.appendChild(obj.rows[j]);
                    }
                }
            }
        }

        /**
         * Move row
         *
         * @return void
         */
        obj.moveRow = function(o, d, ignoreDom) {
            if (Object.keys(obj.options.mergeCells).length > 0) {
                if (o > d) {
                    var insertBefore = 1;
                } else {
                    var insertBefore = 0;
                }

                if (obj.isRowMerged(o).length || obj.isRowMerged(d, insertBefore).length) {
                    if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                        return false;
                    } else {
                        obj.destroyMerged();
                    }
                }
            }

            if (obj.options.search == true) {
                if (obj.results && obj.results.length != obj.rows.length) {
                    if (confirm(obj.options.text.thisActionWillClearYourSearchResultsAreYouSure)) {
                        obj.resetSearch();
                    } else {
                        return false;
                    }
                }

                obj.results = null;
            }

            if (! ignoreDom) {
                if (Array.prototype.indexOf.call(obj.tbody.children, obj.rows[d]) >= 0) {
                    if (o > d) {
                        obj.tbody.insertBefore(obj.rows[o], obj.rows[d]);
                    } else {
                        obj.tbody.insertBefore(obj.rows[o], obj.rows[d].nextSibling);
                    }
                } else {
                    obj.tbody.removeChild(obj.rows[o]);
                }
            }

            // Place references in the correct position
            obj.rows.splice(d, 0, obj.rows.splice(o, 1)[0]);
            obj.records.splice(d, 0, obj.records.splice(o, 1)[0]);
            obj.options.data.splice(d, 0, obj.options.data.splice(o, 1)[0]);

            // Respect pagination
            if (obj.options.pagination > 0 && obj.tbody.children.length != obj.options.pagination) {
                obj.page(obj.pageNumber);
            }

            // Keeping history of changes
            obj.setHistory({
                action:'moveRow',
                oldValue: o,
                newValue: d,
            });

            // Update table references
            obj.updateTableReferences();

            // Events
            obj.dispatch('onmoverow', el, o, d);
        }

        /**
         * Insert a new row
         *
         * @param mixed - number of blank lines to be insert or a single array with the data of the new row
         * @param rowNumber
         * @param insertBefore
         * @return void
         */
        obj.insertRow = function(mixed, rowNumber, insertBefore) {
            // Configuration
            if (obj.options.allowInsertRow == true) {
                // Records
                var records = [];

                // Data to be insert
                var data = [];

                // The insert could be lead by number of rows or the array of data
                if (mixed > 0) {
                    var numOfRows = mixed;
                } else {
                    var numOfRows = 1;

                    if (mixed) {
                        data = mixed;
                    }
                }

                // Direction
                var insertBefore = insertBefore ? true : false;

                // Current column number
                var lastRow = obj.options.data.length - 1;

                if (rowNumber == undefined || rowNumber >= parseInt(lastRow) || rowNumber < 0) {
                    rowNumber = lastRow;
                }

                // Onbeforeinsertrow
                if (obj.dispatch('onbeforeinsertrow', el, rowNumber, numOfRows, insertBefore) === false) {
                    return false;
                }

                // Merged cells
                if (Object.keys(obj.options.mergeCells).length > 0) {
                    if (obj.isRowMerged(rowNumber, insertBefore).length) {
                        if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                            return false;
                        } else {
                            obj.destroyMerged();
                        }
                    }
                }

                // Clear any search
                if (obj.options.search == true) {
                    if (obj.results && obj.results.length != obj.rows.length) {
                        if (confirm(obj.options.text.thisActionWillClearYourSearchResultsAreYouSure)) {
                            obj.resetSearch();
                        } else {
                            return false;
                        }
                    }

                    obj.results = null;
                }

                // Insertbefore
                var rowIndex = (! insertBefore) ? rowNumber + 1 : rowNumber;

                // Keep the current data
                var currentRecords = obj.records.splice(rowIndex);
                var currentData = obj.options.data.splice(rowIndex);
                var currentRows = obj.rows.splice(rowIndex);

                // Adding lines
                var rowRecords = [];
                var rowData = [];
                var rowNode = [];

                for (var row = rowIndex; row < (numOfRows + rowIndex); row++) {
                    // Push data to the data container
                    obj.options.data[row] = [];
                    for (var col = 0; col < obj.options.columns.length; col++) {
                        obj.options.data[row][col]  = data[col] ? data[col] : '';
                    }
                    // Create row
                    var tr = obj.createRow(row, obj.options.data[row]);
                    // Append node
                    if (currentRows[0]) {
                        if (Array.prototype.indexOf.call(obj.tbody.children, currentRows[0]) >= 0) {
                            obj.tbody.insertBefore(tr, currentRows[0]);
                        }
                    } else {
                        if (Array.prototype.indexOf.call(obj.tbody.children, obj.rows[rowNumber]) >= 0) {
                            obj.tbody.appendChild(tr);
                        }
                    }
                    // Record History
                    rowRecords.push(obj.records[row]);
                    rowData.push(obj.options.data[row]);
                    rowNode.push(tr);
                }

                // Copy the data back to the main data
                Array.prototype.push.apply(obj.records, currentRecords);
                Array.prototype.push.apply(obj.options.data, currentData);
                Array.prototype.push.apply(obj.rows, currentRows);

                // Respect pagination
                if (obj.options.pagination > 0) {
                    obj.page(obj.pageNumber);
                }

                // Keep history
                obj.setHistory({
                    action: 'insertRow',
                    rowNumber: rowNumber,
                    numOfRows: numOfRows,
                    insertBefore: insertBefore,
                    rowRecords: rowRecords,
                    rowData: rowData,
                    rowNode: rowNode,
                });

                // Remove table references
                obj.updateTableReferences();

                // Events
                obj.dispatch('oninsertrow', el, rowNumber, numOfRows, rowRecords, insertBefore);
            }
        }

        /**
         * Delete a row by number
         *
         * @param integer rowNumber - row number to be excluded
         * @param integer numOfRows - number of lines
         * @return void
         */
        obj.deleteRow = function(rowNumber, numOfRows) {
            // Global Configuration
            if (obj.options.allowDeleteRow == true) {
                if (obj.options.allowDeletingAllRows == true || obj.options.data.length > 1) {
                    // Delete row definitions
                    if (rowNumber == undefined) {
                        var number = obj.getSelectedRows();

                        if (! number[0]) {
                            rowNumber = obj.options.data.length - 1;
                            numOfRows = 1;
                        } else {
                            rowNumber = parseInt(number[0].getAttribute('data-y'));
                            numOfRows = number.length;
                        }
                    }

                    // Last column
                    var lastRow = obj.options.data.length - 1;

                    if (rowNumber == undefined || rowNumber > lastRow || rowNumber < 0) {
                        rowNumber = lastRow;
                    }

                    if (! numOfRows) {
                        numOfRows = 1;
                    }

                    // Do not delete more than the number of records
                    if (rowNumber + numOfRows >= obj.options.data.length) {
                        numOfRows = obj.options.data.length - rowNumber;
                    }

                    // Onbeforedeleterow
                    if (obj.dispatch('onbeforedeleterow', el, rowNumber, numOfRows) === false) {
                        return false;
                    }

                    if (parseInt(rowNumber) > -1) {
                        // Merged cells
                        var mergeExists = false;
                        if (Object.keys(obj.options.mergeCells).length > 0) {
                            for (var row = rowNumber; row < rowNumber + numOfRows; row++) {
                                if (obj.isRowMerged(row, false).length) {
                                    mergeExists = true;
                                }
                            }
                        }
                        if (mergeExists) {
                            if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                                return false;
                            } else {
                                obj.destroyMerged();
                            }
                        }

                        // Clear any search
                        if (obj.options.search == true) {
                            if (obj.results && obj.results.length != obj.rows.length) {
                                if (confirm(obj.options.text.thisActionWillClearYourSearchResultsAreYouSure)) {
                                    obj.resetSearch();
                                } else {
                                    return false;
                                }
                            }

                            obj.results = null;
                        }

                        // If delete all rows, and set allowDeletingAllRows false, will stay one row
                        if (obj.options.allowDeletingAllRows == false && lastRow + 1 === numOfRows) {
                            numOfRows--;
                            console.error('Jspreadsheet: It is not possible to delete the last row');
                        }

                        // Remove node
                        for (var row = rowNumber; row < rowNumber + numOfRows; row++) {
                            if (Array.prototype.indexOf.call(obj.tbody.children, obj.rows[row]) >= 0) {
                                obj.rows[row].className = '';
                                obj.rows[row].parentNode.removeChild(obj.rows[row]);
                            }
                        }

                        // Remove data
                        var rowRecords = obj.records.splice(rowNumber, numOfRows);
                        var rowData = obj.options.data.splice(rowNumber, numOfRows);
                        var rowNode = obj.rows.splice(rowNumber, numOfRows);

                        // Respect pagination
                        if (obj.options.pagination > 0 && obj.tbody.children.length != obj.options.pagination) {
                            obj.page(obj.pageNumber);
                        }

                        // Remove selection
                        obj.conditionalSelectionUpdate(1, rowNumber, (rowNumber + numOfRows) - 1);

                        // Keep history
                        obj.setHistory({
                            action: 'deleteRow',
                            rowNumber: rowNumber,
                            numOfRows: numOfRows,
                            insertBefore: 1,
                            rowRecords: rowRecords,
                            rowData: rowData,
                            rowNode: rowNode
                        });

                        // Remove table references
                        obj.updateTableReferences();

                        // Events
                        obj.dispatch('ondeleterow', el, rowNumber, numOfRows, rowRecords);
                    }
                } else {
                    console.error('Jspreadsheet: It is not possible to delete the last row');
                }
            }
        }


        /**
         * Move column
         *
         * @return void
         */
        obj.moveColumn = function(o, d) {
            if (Object.keys(obj.options.mergeCells).length > 0) {
                if (o > d) {
                    var insertBefore = 1;
                } else {
                    var insertBefore = 0;
                }

                if (obj.isColMerged(o).length || obj.isColMerged(d, insertBefore).length) {
                    if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                        return false;
                    } else {
                        obj.destroyMerged();
                    }
                }
            }

            var o = parseInt(o);
            var d = parseInt(d);

            if (o > d) {
                obj.headerContainer.insertBefore(obj.headers[o], obj.headers[d]);
                obj.colgroupContainer.insertBefore(obj.colgroup[o], obj.colgroup[d]);

                for (var j = 0; j < obj.rows.length; j++) {
                    obj.rows[j].insertBefore(obj.records[j][o], obj.records[j][d]);
                }
            } else {
                obj.headerContainer.insertBefore(obj.headers[o], obj.headers[d].nextSibling);
                obj.colgroupContainer.insertBefore(obj.colgroup[o], obj.colgroup[d].nextSibling);

                for (var j = 0; j < obj.rows.length; j++) {
                    obj.rows[j].insertBefore(obj.records[j][o], obj.records[j][d].nextSibling);
                }
            }

            obj.options.columns.splice(d, 0, obj.options.columns.splice(o, 1)[0]);
            obj.headers.splice(d, 0, obj.headers.splice(o, 1)[0]);
            obj.colgroup.splice(d, 0, obj.colgroup.splice(o, 1)[0]);

            for (var j = 0; j < obj.rows.length; j++) {
                obj.options.data[j].splice(d, 0, obj.options.data[j].splice(o, 1)[0]);
                obj.records[j].splice(d, 0, obj.records[j].splice(o, 1)[0]);
            }

            // Update footers position
            if (obj.options.footers) {
                for (var j = 0; j < obj.options.footers.length; j++) {
                    obj.options.footers[j].splice(d, 0, obj.options.footers[j].splice(o, 1)[0]);
                }
            }

            // Keeping history of changes
            obj.setHistory({
                action:'moveColumn',
                oldValue: o,
                newValue: d,
            });

            // Update table references
            obj.updateTableReferences();

            // Events
            obj.dispatch('onmovecolumn', el, o, d);
        }

        /**
         * Insert a new column
         *
         * @param mixed - num of columns to be added or data to be added in one single column
         * @param int columnNumber - number of columns to be created
         * @param bool insertBefore
         * @param object properties - column properties
         * @return void
         */
        obj.insertColumn = function(mixed, columnNumber, insertBefore, properties) {
            // Configuration
            if (obj.options.allowInsertColumn == true) {
                // Records
                var records = [];

                // Data to be insert
                var data = [];

                // The insert could be lead by number of rows or the array of data
                if (mixed > 0) {
                    var numOfColumns = mixed;
                } else {
                    var numOfColumns = 1;

                    if (mixed) {
                        data = mixed;
                    }
                }

                // Direction
                var insertBefore = insertBefore ? true : false;

                // Current column number
                var lastColumn = obj.options.columns.length - 1;

                // Confirm position
                if (columnNumber == undefined || columnNumber >= parseInt(lastColumn) || columnNumber < 0) {
                    columnNumber = lastColumn;
                }

                // Onbeforeinsertcolumn
                if (obj.dispatch('onbeforeinsertcolumn', el, columnNumber, numOfColumns, insertBefore) === false) {
                    return false;
                }

                // Merged cells
                if (Object.keys(obj.options.mergeCells).length > 0) {
                    if (obj.isColMerged(columnNumber, insertBefore).length) {
                        if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                            return false;
                        } else {
                            obj.destroyMerged();
                        }
                    }
                }

                // Create default properties
                if (! properties) {
                    properties = [];
                }

                for (var i = 0; i < numOfColumns; i++) {
                    if (! properties[i]) {
                        properties[i] = { type:'text', source:[], options:[], width:obj.options.defaultColWidth, align:obj.options.defaultColAlign };
                    }
                }

                // Insert before
                var columnIndex = (! insertBefore) ? columnNumber + 1 : columnNumber;
                obj.options.columns = jexcel.injectArray(obj.options.columns, columnIndex, properties);

                // Open space in the containers
                var currentHeaders = obj.headers.splice(columnIndex);
                var currentColgroup = obj.colgroup.splice(columnIndex);

                // History
                var historyHeaders = [];
                var historyColgroup = [];
                var historyRecords = [];
                var historyData = [];
                var historyFooters = [];

                // Add new headers
                for (var col = columnIndex; col < (numOfColumns + columnIndex); col++) {
                    obj.createCellHeader(col);
                    obj.headerContainer.insertBefore(obj.headers[col], obj.headerContainer.children[col+1]);
                    obj.colgroupContainer.insertBefore(obj.colgroup[col], obj.colgroupContainer.children[col+1]);

                    historyHeaders.push(obj.headers[col]);
                    historyColgroup.push(obj.colgroup[col]);
                }

                // Add new footer cells
                if (obj.options.footers) {
                    for (var j = 0; j < obj.options.footers.length; j++) {
                        historyFooters[j] = [];
                        for (var i = 0; i < numOfColumns; i++) {
                            historyFooters[j].push('');
                        }
                        obj.options.footers[j].splice(columnIndex, 0, historyFooters[j]);
                    }
                }

                // Adding visual columns
                for (var row = 0; row < obj.options.data.length; row++) {
                    // Keep the current data
                    var currentData = obj.options.data[row].splice(columnIndex);
                    var currentRecord = obj.records[row].splice(columnIndex);

                    // History
                    historyData[row] = [];
                    historyRecords[row] = [];

                    for (var col = columnIndex; col < (numOfColumns + columnIndex); col++) {
                        // New value
                        var value = data[row] ? data[row] : '';
                        obj.options.data[row][col] = value;
                        // New cell
                        var td = obj.createCell(col, row, obj.options.data[row][col]);
                        obj.records[row][col] = td;
                        // Add cell to the row
                        if (obj.rows[row]) {
                            obj.rows[row].insertBefore(td, obj.rows[row].children[col+1]);
                        }

                        // Record History
                        historyData[row].push(value);
                        historyRecords[row].push(td);
                    }

                    // Copy the data back to the main data
                    Array.prototype.push.apply(obj.options.data[row], currentData);
                    Array.prototype.push.apply(obj.records[row], currentRecord);
                }

                Array.prototype.push.apply(obj.headers, currentHeaders);
                Array.prototype.push.apply(obj.colgroup, currentColgroup);

                // Adjust nested headers
                if (obj.options.nestedHeaders && obj.options.nestedHeaders.length > 0) {
                    // Flexible way to handle nestedheaders
                    if (obj.options.nestedHeaders[0] && obj.options.nestedHeaders[0][0]) {
                        for (var j = 0; j < obj.options.nestedHeaders.length; j++) {
                            var colspan = parseInt(obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan) + numOfColumns;
                            obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan = colspan;
                            obj.thead.children[j].children[obj.thead.children[j].children.length-1].setAttribute('colspan', colspan);
                            var o = obj.thead.children[j].children[obj.thead.children[j].children.length-1].getAttribute('data-column');
                            o = o.split(',');
                            for (var col = columnIndex; col < (numOfColumns + columnIndex); col++) {
                                o.push(col);
                            }
                            obj.thead.children[j].children[obj.thead.children[j].children.length-1].setAttribute('data-column', o);
                        }
                    } else {
                        var colspan = parseInt(obj.options.nestedHeaders[0].colspan) + numOfColumns;
                        obj.options.nestedHeaders[0].colspan = colspan;
                        obj.thead.children[0].children[obj.thead.children[0].children.length-1].setAttribute('colspan', colspan);
                    }
                }

                // Keep history
                obj.setHistory({
                    action: 'insertColumn',
                    columnNumber:columnNumber,
                    numOfColumns:numOfColumns,
                    insertBefore:insertBefore,
                    columns:properties,
                    headers:historyHeaders,
                    colgroup:historyColgroup,
                    records:historyRecords,
                    footers:historyFooters,
                    data:historyData,
                });

                // Remove table references
                obj.updateTableReferences();

                // Events
                obj.dispatch('oninsertcolumn', el, columnNumber, numOfColumns, historyRecords, insertBefore);
            }
        }

        /**
         * Delete a column by number
         *
         * @param integer columnNumber - reference column to be excluded
         * @param integer numOfColumns - number of columns to be excluded from the reference column
         * @return void
         */
        obj.deleteColumn = function(columnNumber, numOfColumns) {
            // Global Configuration
            if (obj.options.allowDeleteColumn == true) {
                if (obj.headers.length > 1) {
                    // Delete column definitions
                    if (columnNumber == undefined) {
                        var number = obj.getSelectedColumns(true);

                        if (! number.length) {
                            // Remove last column
                            columnNumber = obj.headers.length - 1;
                            numOfColumns = 1;
                        } else {
                            // Remove selected
                            columnNumber = parseInt(number[0]);
                            numOfColumns = parseInt(number.length);
                        }
                    }

                    // Lasat column
                    var lastColumn = obj.options.data[0].length - 1;

                    if (columnNumber == undefined || columnNumber > lastColumn || columnNumber < 0) {
                        columnNumber = lastColumn;
                    }

                    // Minimum of columns to be delete is 1
                    if (! numOfColumns) {
                        numOfColumns = 1;
                    }

                    // Can't delete more than the limit of the table
                    if (numOfColumns > obj.options.data[0].length - columnNumber) {
                        numOfColumns = obj.options.data[0].length - columnNumber;
                    }

                    // onbeforedeletecolumn
                   if (obj.dispatch('onbeforedeletecolumn', el, columnNumber, numOfColumns) === false) {
                      return false;
                   }

                    // Can't remove the last column
                    if (parseInt(columnNumber) > -1) {
                        // Merged cells
                        var mergeExists = false;
                        if (Object.keys(obj.options.mergeCells).length > 0) {
                            for (var col = columnNumber; col < columnNumber + numOfColumns; col++) {
                                if (obj.isColMerged(col, false).length) {
                                    mergeExists = true;
                                }
                            }
                        }
                        if (mergeExists) {
                            if (! confirm(obj.options.text.thisActionWillDestroyAnyExistingMergedCellsAreYouSure)) {
                                return false;
                            } else {
                                obj.destroyMerged();
                            }
                        }

                        // Delete the column properties
                        var columns = obj.options.columns.splice(columnNumber, numOfColumns);

                        for (var col = columnNumber; col < columnNumber + numOfColumns; col++) {
                            obj.colgroup[col].className = '';
                            obj.headers[col].className = '';
                            obj.colgroup[col].parentNode.removeChild(obj.colgroup[col]);
                            obj.headers[col].parentNode.removeChild(obj.headers[col]);
                        }

                        var historyHeaders = obj.headers.splice(columnNumber, numOfColumns);
                        var historyColgroup = obj.colgroup.splice(columnNumber, numOfColumns);
                        var historyRecords = [];
                        var historyData = [];
                        var historyFooters = [];

                        for (var row = 0; row < obj.options.data.length; row++) {
                            for (var col = columnNumber; col < columnNumber + numOfColumns; col++) {
                                obj.records[row][col].className = '';
                                obj.records[row][col].parentNode.removeChild(obj.records[row][col]);
                            }
                        }

                        // Delete headers
                        for (var row = 0; row < obj.options.data.length; row++) {
                            // History
                            historyData[row] = obj.options.data[row].splice(columnNumber, numOfColumns);
                            historyRecords[row] = obj.records[row].splice(columnNumber, numOfColumns);
                        }

                        // Delete footers
                        if (obj.options.footers) {
                            for (var row = 0; row < obj.options.footers.length; row++) {
                                historyFooters[row] = obj.options.footers[row].splice(columnNumber, numOfColumns);
                            }
                        }

                        // Remove selection
                        obj.conditionalSelectionUpdate(0, columnNumber, (columnNumber + numOfColumns) - 1);

                        // Adjust nested headers
                        if (obj.options.nestedHeaders && obj.options.nestedHeaders.length > 0) {
                            // Flexible way to handle nestedheaders
                            if (obj.options.nestedHeaders[0] && obj.options.nestedHeaders[0][0]) {
                                for (var j = 0; j < obj.options.nestedHeaders.length; j++) {
                                    var colspan = parseInt(obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan) - numOfColumns;
                                    obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan = colspan;
                                    obj.thead.children[j].children[obj.thead.children[j].children.length-1].setAttribute('colspan', colspan);
                                }
                            } else {
                                var colspan = parseInt(obj.options.nestedHeaders[0].colspan) - numOfColumns;
                                obj.options.nestedHeaders[0].colspan = colspan;
                                obj.thead.children[0].children[obj.thead.children[0].children.length-1].setAttribute('colspan', colspan);
                            }
                        }

                        // Keeping history of changes
                        obj.setHistory({
                            action:'deleteColumn',
                            columnNumber:columnNumber,
                            numOfColumns:numOfColumns,
                            insertBefore: 1,
                            columns:columns,
                            headers:historyHeaders,
                            colgroup:historyColgroup,
                            records:historyRecords,
                            footers:historyFooters,
                            data:historyData,
                        });

                        // Update table references
                        obj.updateTableReferences();

                        // Delete
                        obj.dispatch('ondeletecolumn', el, columnNumber, numOfColumns, historyRecords);
                    }
                } else {
                    console.error('Jspreadsheet: It is not possible to delete the last column');
                }
            }
        }

        /**
         * Get selected rows numbers
         *
         * @return array
         */
        obj.getSelectedRows = function(asIds) {
            var rows = [];
            // Get all selected rows
            for (var j = 0; j < obj.rows.length; j++) {
                if (obj.rows[j].classList.contains('selected')) {
                    if (asIds) {
                        rows.push(j);
                    } else {
                        rows.push(obj.rows[j]);
                    }
                }
            }

            return rows;
        },

        /**
         * Get selected column numbers
         *
         * @return array
         */
        obj.getSelectedColumns = function() {
            var cols = [];
            // Get all selected cols
            for (var i = 0; i < obj.headers.length; i++) {
                if (obj.headers[i].classList.contains('selected')) {
                    cols.push(i);
                }
            }

            return cols;
        }

        /**
         * Get highlighted
         *
         * @return array
         */
        obj.getHighlighted = function() {
            return obj.highlighted;
        }

        /**
         * Update cell references
         *
         * @return void
         */
        obj.updateTableReferences = function() {
            // Update headers
            for (var i = 0; i < obj.headers.length; i++) {
                var x = obj.headers[i].getAttribute('data-x');

                if (x != i) {
                    // Update coords
                    obj.headers[i].setAttribute('data-x', i);
                    // Title
                    if (! obj.headers[i].getAttribute('title')) {
                        obj.headers[i].innerHTML = jexcel.getColumnName(i);
                    }
                }
            }

            // Update all rows
            for (var j = 0; j < obj.rows.length; j++) {
                if (obj.rows[j]) {
                    var y = obj.rows[j].getAttribute('data-y');

                    if (y != j) {
                        // Update coords
                        obj.rows[j].setAttribute('data-y', j);
                        obj.rows[j].children[0].setAttribute('data-y', j);
                        // Row number
                        obj.rows[j].children[0].innerHTML = j + 1;
                    }
                }
            }

            // Regular cells affected by this change
            var affectedTokens = [];
            var mergeCellUpdates = [];

            // Update cell
            var updatePosition = function(x,y,i,j) {
                if (x != i) {
                    obj.records[j][i].setAttribute('data-x', i);
                }
                if (y != j) {
                    obj.records[j][i].setAttribute('data-y', j);
                }

                // Other updates
                if (x != i || y != j) {
                    var columnIdFrom = jexcel.getColumnNameFromId([x, y]);
                    var columnIdTo = jexcel.getColumnNameFromId([i, j]);
                    affectedTokens[columnIdFrom] = columnIdTo;
                }
            }

            for (var j = 0; j < obj.records.length; j++) {
                for (var i = 0; i < obj.records[0].length; i++) {
                    if (obj.records[j][i]) {
                        // Current values
                        var x = obj.records[j][i].getAttribute('data-x');
                        var y = obj.records[j][i].getAttribute('data-y');

                        // Update column
                        if (obj.records[j][i].getAttribute('data-merged')) {
                            var columnIdFrom = jexcel.getColumnNameFromId([x, y]);
                            var columnIdTo = jexcel.getColumnNameFromId([i, j]);
                            if (mergeCellUpdates[columnIdFrom] == null) {
                                if (columnIdFrom == columnIdTo) {
                                    mergeCellUpdates[columnIdFrom] = false;
                                } else {
                                    var totalX = parseInt(i - x);
                                    var totalY = parseInt(j - y);
                                    mergeCellUpdates[columnIdFrom] = [ columnIdTo, totalX, totalY ];
                                }
                            }
                        } else {
                            updatePosition(x,y,i,j);
                        }
                    }
                }
            }

            // Update merged if applicable
            var keys = Object.keys(mergeCellUpdates);
            if (keys.length) {
                for (var i = 0; i < keys.length; i++) {
                    if (mergeCellUpdates[keys[i]]) {
                        var info = jexcel.getIdFromColumnName(keys[i], true)
                        var x = info[0];
                        var y = info[1];
                        updatePosition(x,y,x + mergeCellUpdates[keys[i]][1],y + mergeCellUpdates[keys[i]][2]);

                        var columnIdFrom = keys[i];
                        var columnIdTo = mergeCellUpdates[keys[i]][0];
                        for (var j = 0; j < obj.options.mergeCells[columnIdFrom][2].length; j++) {
                            var x = parseInt(obj.options.mergeCells[columnIdFrom][2][j].getAttribute('data-x'));
                            var y = parseInt(obj.options.mergeCells[columnIdFrom][2][j].getAttribute('data-y'));
                            obj.options.mergeCells[columnIdFrom][2][j].setAttribute('data-x', x + mergeCellUpdates[keys[i]][1]);
                            obj.options.mergeCells[columnIdFrom][2][j].setAttribute('data-y', y + mergeCellUpdates[keys[i]][2]);
                        }

                        obj.options.mergeCells[columnIdTo] = obj.options.mergeCells[columnIdFrom];
                        delete(obj.options.mergeCells[columnIdFrom]);
                    }
                }
            }

            // Update formulas
            obj.updateFormulas(affectedTokens);

            // Update meta data
            obj.updateMeta(affectedTokens);

            // Refresh selection
            obj.refreshSelection();

            // Update table with custom configuration if applicable
            obj.updateTable();
        }

        /**
         * Custom settings for the cells
         */
        obj.updateTable = function() {
            // Check for spare
            if (obj.options.minSpareRows > 0) {
                var numBlankRows = 0;
                for (var j = obj.rows.length - 1; j >= 0; j--) {
                    var test = false;
                    for (var i = 0; i < obj.headers.length; i++) {
                        if (obj.options.data[j][i]) {
                            test = true;
                        }
                    }
                    if (test) {
                        break;
                    } else {
                        numBlankRows++;
                    }
                }

                if (obj.options.minSpareRows - numBlankRows > 0) {
                    obj.insertRow(obj.options.minSpareRows - numBlankRows)
                }
            }

            if (obj.options.minSpareCols > 0) {
                var numBlankCols = 0;
                for (var i = obj.headers.length - 1; i >= 0 ; i--) {
                    var test = false;
                    for (var j = 0; j < obj.rows.length; j++) {
                        if (obj.options.data[j][i]) {
                            test = true;
                        }
                    }
                    if (test) {
                        break;
                    } else {
                        numBlankCols++;
                    }
                }

                if (obj.options.minSpareCols - numBlankCols > 0) {
                    obj.insertColumn(obj.options.minSpareCols - numBlankCols)
                }
            }

            // Customizations by the developer
            if (typeof(obj.options.updateTable) == 'function') {
                if (obj.options.detachForUpdates) {
                    el.removeChild(obj.content);
                }

                for (var j = 0; j < obj.rows.length; j++) {
                    for (var i = 0; i < obj.headers.length; i++) {
                        obj.options.updateTable(el, obj.records[j][i], i, j, obj.options.data[j][i], obj.records[j][i].textContent, jexcel.getColumnNameFromId([i, j]));
                    }
                }

                if (obj.options.detachForUpdates) {
                    el.insertBefore(obj.content, obj.pagination);
                }
            }

            // Update footers
            if (obj.options.footers) {
                obj.setFooter();
            }

            // Update corner position
            setTimeout(function() {
                obj.updateCornerPosition();
            },0);
        }

        /**
         * Readonly
         */
        obj.isReadOnly = function(cell) {
            if (cell = obj.getCell(cell)) {
                return cell.classList.contains('readonly') ? true : false;
            }
        }

        /**
         * Readonly
         */
        obj.setReadOnly = function(cell, state) {
            if (cell = obj.getCell(cell)) {
                if (state) {
                    cell.classList.add('readonly');
                } else {
                    cell.classList.remove('readonly');
                }
            }
        }

        /**
         * Show row
         */
        obj.showRow = function(rowNumber) {
            obj.rows[rowNumber].style.display = '';
        }

        /**
         * Hide row
         */
        obj.hideRow = function(rowNumber) {
            obj.rows[rowNumber].style.display = 'none';
        }

        /**
         * Show column
         */
        obj.showColumn = function(colNumber) {
            obj.headers[colNumber].style.display = '';
            obj.colgroup[colNumber].style.display = '';
            if (obj.filter && obj.filter.children.length > colNumber + 1) {
                obj.filter.children[colNumber + 1].style.display = '';
            }
            for (var j = 0; j < obj.options.data.length; j++) {
                obj.records[j][colNumber].style.display = '';
            }

            // Update footers
            if (obj.options.footers) {
                obj.setFooter();
            }

            obj.resetSelection();
        }

        /**
         * Hide column
         */
        obj.hideColumn = function(colNumber) {
            obj.headers[colNumber].style.display = 'none';
            obj.colgroup[colNumber].style.display = 'none';
            if (obj.filter && obj.filter.children.length > colNumber + 1) {
                obj.filter.children[colNumber + 1].style.display = 'none';
            }
            for (var j = 0; j < obj.options.data.length; j++) {
                obj.records[j][colNumber].style.display = 'none';
            }

            // Update footers
            if (obj.options.footers) {
                obj.setFooter();
            }

            obj.resetSelection();
        }

        /**
         * Show index column
         */
        obj.showIndex = function() {
            obj.table.classList.remove('jexcel_hidden_index');
        }

        /**
         * Hide index column
         */
        obj.hideIndex = function() {
            obj.table.classList.add('jexcel_hidden_index');
        }

        /**
         * Update all related cells in the chain
         */
        var chainLoopProtection = [];

        obj.updateFormulaChain = function(x, y, records) {
            var cellId = jexcel.getColumnNameFromId([x, y]);
            if (obj.formula[cellId] && obj.formula[cellId].length > 0) {
                if (chainLoopProtection[cellId]) {
                    obj.records[y][x].innerHTML = '#ERROR';
                    obj.formula[cellId] = '';
                } else {
                    // Protection
                    chainLoopProtection[cellId] = true;

                    for (var i = 0; i < obj.formula[cellId].length; i++) {
                        var cell = jexcel.getIdFromColumnName(obj.formula[cellId][i], true);
                        // Update cell
                        var value = ''+obj.options.data[cell[1]][cell[0]];
                        if (value.substr(0,1) == '=') {
                            records.push(obj.updateCell(cell[0], cell[1], value, true));
                        } else {
                            // No longer a formula, remove from the chain
                            Object.keys(obj.formula)[i] = null;
                        }
                        obj.updateFormulaChain(cell[0], cell[1], records);
                    }
                }
            }

            chainLoopProtection = [];
        }

        /**
         * Update formulas
         */
        obj.updateFormulas = function(referencesToUpdate) {
            // Update formulas
            for (var j = 0; j < obj.options.data.length; j++) {
                for (var i = 0; i < obj.options.data[0].length; i++) {
                    var value = '' + obj.options.data[j][i];
                    // Is formula
                    if (value.substr(0,1) == '=') {
                        // Replace tokens
                        var newFormula = obj.updateFormula(value, referencesToUpdate);
                        if (newFormula != value) {
                            obj.options.data[j][i] = newFormula;
                        }
                    }
                }
            }

            // Update formula chain
            var formula = [];
            var keys = Object.keys(obj.formula);
            for (var j = 0; j < keys.length; j++) {
                // Current key and values
                var key = keys[j];
                var value = obj.formula[key];
                // Update key
                if (referencesToUpdate[key]) {
                    key = referencesToUpdate[key];
                }
                // Update values
                formula[key] = [];
                for (var i = 0; i < value.length; i++) {
                    var letter = value[i];
                    if (referencesToUpdate[letter]) {
                        letter = referencesToUpdate[letter];
                    }
                    formula[key].push(letter);
                }
            }
            obj.formula = formula;
        }

        /**
         * Update formula
         */
        obj.updateFormula = function(formula, referencesToUpdate) {
            var testLetter = /[A-Z]/;
            var testNumber = /[0-9]/;

            var newFormula = '';
            var letter = null;
            var number = null;
            var token = '';

            for (var index = 0; index < formula.length; index++) {
                if (testLetter.exec(formula[index])) {
                    letter = 1;
                    number = 0;
                    token += formula[index];
                } else if (testNumber.exec(formula[index])) {
                    number = letter ? 1 : 0;
                    token += formula[index];
                } else {
                    if (letter && number) {
                        token = referencesToUpdate[token] ? referencesToUpdate[token] : token;
                    }
                    newFormula += token;
                    newFormula += formula[index];
                    letter = 0;
                    number = 0;
                    token = '';
                }
            }

            if (token) {
                if (letter && number) {
                    token = referencesToUpdate[token] ? referencesToUpdate[token] : token;
                }
                newFormula += token;
            }

            return newFormula;
        }

        /**
         * Secure formula
         */
        var secureFormula = function(oldValue) {
            var newValue = '';
            var inside = 0;

            for (var i = 0; i < oldValue.length; i++) {
                if (oldValue[i] == '"') {
                    if (inside == 0) {
                        inside = 1;
                    } else {
                        inside = 0;
                    }
                }

                if (inside == 1) {
                    newValue += oldValue[i];
                } else {
                    newValue += oldValue[i].toUpperCase();
                }
            }

            return newValue;
        }

        /**
         * Parse formulas
         */
        obj.executeFormula = function(expression, x, y) {

            var formulaResults = [];
            var formulaLoopProtection = [];

            // Execute formula with loop protection
            var execute = function(expression, x, y) {
             // Parent column identification
                var parentId = jexcel.getColumnNameFromId([x, y]);

                // Code protection
                if (formulaLoopProtection[parentId]) {
                    console.error('Reference loop detected');
                    return '#ERROR';
                }

                formulaLoopProtection[parentId] = true;

                // Convert range tokens
                var tokensUpdate = function(tokens) {
                    for (var index = 0; index < tokens.length; index++) {
                        var f = [];
                        var token = tokens[index].split(':');
                        var e1 = jexcel.getIdFromColumnName(token[0], true);
                        var e2 = jexcel.getIdFromColumnName(token[1], true);

                        if (e1[0] <= e2[0]) {
                            var x1 = e1[0];
                            var x2 = e2[0];
                        } else {
                            var x1 = e2[0];
                            var x2 = e1[0];
                        }

                        if (e1[1] <= e2[1]) {
                            var y1 = e1[1];
                            var y2 = e2[1];
                        } else {
                            var y1 = e2[1];
                            var y2 = e1[1];
                        }

                        for (var j = y1; j <= y2; j++) {
                            for (var i = x1; i <= x2; i++) {
                                f.push(jexcel.getColumnNameFromId([i, j]));
                            }
                        }

                        expression = expression.replace(tokens[index], f.join(','));
                    }
                }

                // Range with $ remove $
                expression = expression.replace(/\$?([A-Z]+)\$?([0-9]+)/g, "$1$2");

                var tokens = expression.match(/([A-Z]+[0-9]+)\:([A-Z]+[0-9]+)/g);
                if (tokens && tokens.length) {
                    tokensUpdate(tokens);
                }

                // Get tokens
                var tokens = expression.match(/([A-Z]+[0-9]+)/g);

                // Direct self-reference protection
                if (tokens && tokens.indexOf(parentId) > -1) {
                    console.error('Self Reference detected');
                    return '#ERROR';
                } else {
                    // Expressions to be used in the parsing
                    var formulaExpressions = {};

                    if (tokens) {
                        for (var i = 0; i < tokens.length; i++) {
                            // Keep chain
                            if (! obj.formula[tokens[i]]) {
                                obj.formula[tokens[i]] = [];
                            }
                            // Is already in the register
                            if (obj.formula[tokens[i]].indexOf(parentId) < 0) {
                                obj.formula[tokens[i]].push(parentId);
                            }

                            // Do not calculate again
                            if (eval('typeof(' + tokens[i] + ') == "undefined"')) {
                                // Coords
                                var position = jexcel.getIdFromColumnName(tokens[i], 1);
                                // Get value
                                if (typeof(obj.options.data[position[1]]) != 'undefined' && typeof(obj.options.data[position[1]][position[0]]) != 'undefined') {
                                    var value = obj.options.data[position[1]][position[0]];
                                } else {
                                    var value = '';
                                }
                                // Get column data
                                if ((''+value).substr(0,1) == '=') {
                                    if (formulaResults[tokens[i]]) {
                                        value = formulaResults[tokens[i]];
                                    } else {
                                        value = execute(value, position[0], position[1]);
                                        formulaResults[tokens[i]] = value;
                                    }
                                }
                                // Type!
                                if ((''+value).trim() == '') {
                                    // Null
                                    formulaExpressions[tokens[i]] = null;
                                } else {
                                    if (value == Number(value) && obj.options.autoCasting == true) {
                                        // Number
                                        formulaExpressions[tokens[i]] = Number(value);
                                    } else {
                                        // Trying any formatted number
                                        var number = obj.parseNumber(value, position[0])
                                        if (obj.options.autoCasting == true && number) {
                                            formulaExpressions[tokens[i]] = number;
                                        } else {
                                            formulaExpressions[tokens[i]] = '"' + value + '"';
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // Convert formula to javascript
                    try {
                        var res = jexcel.formula(expression.substr(1), formulaExpressions, x, y, obj);
                    } catch (e) {
                        var res = '#ERROR';
                        console.log(e)
                    }

                    return res;
                }
            }

            return execute(expression, x, y);
        }

        /**
         * Trying to extract a number from a string
         */
        obj.parseNumber = function(value, columnNumber) {
            // Decimal point
            var decimal = columnNumber && obj.options.columns[columnNumber].decimal ? obj.options.columns[columnNumber].decimal : '.';

            // Parse both parts of the number
            var number = ('' + value);
            number = number.split(decimal);
            number[0] = number[0].match(/[+-]?[0-9]/g);
            if (number[0]) {
                number[0] = number[0].join('');
            }
            if (number[1]) {
                number[1] = number[1].match(/[0-9]*/g).join('');
            }

            // Is a valid number
            if (number[0] && Number.isInteger(Number(number[0]))) {
                if (! number[1]) {
                    var value = Number(number[0] + '.00');
                } else {
                    var value = Number(number[0] + '.' + number[1]);
                }
            } else {
                var value = null;
            }

            return value;
        }

        /**
         * Get row number
         */
        obj.row = function(cell) {
        }

        /**
         * Get col number
         */
        obj.col = function(cell) {
        }

        obj.up = function(shiftKey, ctrlKey) {
            if (shiftKey) {
                if (obj.selectedCell[3] > 0) {
                    obj.up.visible(1, ctrlKey ? 0 : 1)
                }
            } else {
                if (obj.selectedCell[1] > 0) {
                    obj.up.visible(0, ctrlKey ? 0 : 1)
                }
                obj.selectedCell[2] = obj.selectedCell[0];
                obj.selectedCell[3] = obj.selectedCell[1];
            }

            // Update selection
            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);

            // Change page
            if (obj.options.lazyLoading == true) {
                if (obj.selectedCell[1] == 0 || obj.selectedCell[3] == 0) {
                    obj.loadPage(0);
                    obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                } else {
                    if (obj.loadValidation()) {
                        obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                    } else {
                        var item = parseInt(obj.tbody.firstChild.getAttribute('data-y'));
                        if (obj.selectedCell[1] - item < 30) {
                            obj.loadUp();
                            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                        }
                    }
                }
            } else if (obj.options.pagination > 0) {
                var pageNumber = obj.whichPage(obj.selectedCell[3]);
                if (pageNumber != obj.pageNumber) {
                    obj.page(pageNumber);
                }
            }

            obj.updateScroll(1);
        }

        obj.up.visible = function(group, direction) {
            if (group == 0) {
                var x = parseInt(obj.selectedCell[0]);
                var y = parseInt(obj.selectedCell[1]);
            } else {
                var x = parseInt(obj.selectedCell[2]);
                var y = parseInt(obj.selectedCell[3]);
            }

            if (direction == 0) {
                for (var j = 0; j < y; j++) {
                    if (obj.records[j][x].style.display != 'none' && obj.rows[j].style.display != 'none') {
                        y = j;
                        break;
                    }
                }
            } else {
                y = obj.up.get(x, y);
            }

            if (group == 0) {
                obj.selectedCell[0] = x;
                obj.selectedCell[1] = y;
            } else {
                obj.selectedCell[2] = x;
                obj.selectedCell[3] = y;
            }
        }

        obj.up.get = function(x, y) {
            var x = parseInt(x);
            var y = parseInt(y);
            for (var j = (y - 1); j >= 0; j--) {
                if (obj.records[j][x].style.display != 'none' && obj.rows[j].style.display != 'none') {
                    if (obj.records[j][x].getAttribute('data-merged')) {
                        if (obj.records[j][x] == obj.records[y][x]) {
                            continue;
                        }
                    }
                    y = j;
                    break;
                }
            }

            return y;
        }

        obj.down = function(shiftKey, ctrlKey) {
            if (shiftKey) {
                if (obj.selectedCell[3] < obj.records.length - 1) {
                    obj.down.visible(1, ctrlKey ? 0 : 1)
                }
            } else {
                if (obj.selectedCell[1] < obj.records.length - 1) {
                    obj.down.visible(0, ctrlKey ? 0 : 1)
                }
                obj.selectedCell[2] = obj.selectedCell[0];
                obj.selectedCell[3] = obj.selectedCell[1];
            }

            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);

            // Change page
            if (obj.options.lazyLoading == true) {
                if ((obj.selectedCell[1] == obj.records.length - 1 || obj.selectedCell[3] == obj.records.length - 1)) {
                    obj.loadPage(-1);
                    obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                } else {
                    if (obj.loadValidation()) {
                        obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                    } else {
                        var item = parseInt(obj.tbody.lastChild.getAttribute('data-y'));
                        if (item - obj.selectedCell[3] < 30) {
                            obj.loadDown();
                            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
                        }
                    }
                }
            } else if (obj.options.pagination > 0) {
                var pageNumber = obj.whichPage(obj.selectedCell[3]);
                if (pageNumber != obj.pageNumber) {
                    obj.page(pageNumber);
                }
            }

            obj.updateScroll(3);
        }

        obj.down.visible = function(group, direction) {
            if (group == 0) {
                var x = parseInt(obj.selectedCell[0]);
                var y = parseInt(obj.selectedCell[1]);
            } else {
                var x = parseInt(obj.selectedCell[2]);
                var y = parseInt(obj.selectedCell[3]);
            }

            if (direction == 0) {
                for (var j = obj.rows.length - 1; j > y; j--) {
                    if (obj.records[j][x].style.display != 'none' && obj.rows[j].style.display != 'none') {
                        y = j;
                        break;
                    }
                }
            } else {
                y = obj.down.get(x, y);
            }

            if (group == 0) {
                obj.selectedCell[0] = x;
                obj.selectedCell[1] = y;
            } else {
                obj.selectedCell[2] = x;
                obj.selectedCell[3] = y;
            }
        }

        obj.down.get = function(x, y) {
            var x = parseInt(x);
            var y = parseInt(y);
            for (var j = (y + 1); j < obj.rows.length; j++) {
                if (obj.records[j][x].style.display != 'none' && obj.rows[j].style.display != 'none') {
                    if (obj.records[j][x].getAttribute('data-merged')) {
                        if (obj.records[j][x] == obj.records[y][x]) {
                            continue;
                        }
                    }
                    y = j;
                    break;
                }
            }

            return y;
        }

        obj.right = function(shiftKey, ctrlKey) {
            if (shiftKey) {
                if (obj.selectedCell[2] < obj.headers.length - 1) {
                    obj.right.visible(1, ctrlKey ? 0 : 1)
                }
            } else {
                if (obj.selectedCell[0] < obj.headers.length - 1) {
                    obj.right.visible(0, ctrlKey ? 0 : 1)
                }
                obj.selectedCell[2] = obj.selectedCell[0];
                obj.selectedCell[3] = obj.selectedCell[1];
            }

            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
            obj.updateScroll(2);
        }

        obj.right.visible = function(group, direction) {
            if (group == 0) {
                var x = parseInt(obj.selectedCell[0]);
                var y = parseInt(obj.selectedCell[1]);
            } else {
                var x = parseInt(obj.selectedCell[2]);
                var y = parseInt(obj.selectedCell[3]);
            }

            if (direction == 0) {
                for (var i = obj.headers.length - 1; i > x; i--) {
                    if (obj.records[y][i].style.display != 'none') {
                        x = i;
                        break;
                    }
                }
            } else {
                x = obj.right.get(x, y);
            }

            if (group == 0) {
                obj.selectedCell[0] = x;
                obj.selectedCell[1] = y;
            } else {
                obj.selectedCell[2] = x;
                obj.selectedCell[3] = y;
            }
        }

        obj.right.get = function(x, y) {
            var x = parseInt(x);
            var y = parseInt(y);

            for (var i = (x + 1); i < obj.headers.length; i++) {
                if (obj.records[y][i].style.display != 'none') {
                    if (obj.records[y][i].getAttribute('data-merged')) {
                        if (obj.records[y][i] == obj.records[y][x]) {
                            continue;
                        }
                    }
                    x = i;
                    break;
                }
            }

            return x;
        }

        obj.left = function(shiftKey, ctrlKey) {
            if (shiftKey) {
                if (obj.selectedCell[2] > 0) {
                    obj.left.visible(1, ctrlKey ? 0 : 1)
                }
            } else {
                if (obj.selectedCell[0] > 0) {
                    obj.left.visible(0, ctrlKey ? 0 : 1)
                }
                obj.selectedCell[2] = obj.selectedCell[0];
                obj.selectedCell[3] = obj.selectedCell[1];
            }

            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
            obj.updateScroll(0);
        }

        obj.left.visible = function(group, direction) {
            if (group == 0) {
                var x = parseInt(obj.selectedCell[0]);
                var y = parseInt(obj.selectedCell[1]);
            } else {
                var x = parseInt(obj.selectedCell[2]);
                var y = parseInt(obj.selectedCell[3]);
            }

            if (direction == 0) {
                for (var i = 0; i < x; i++) {
                    if (obj.records[y][i].style.display != 'none') {
                        x = i;
                        break;
                    }
                }
            } else {
                x = obj.left.get(x, y);
            }

            if (group == 0) {
                obj.selectedCell[0] = x;
                obj.selectedCell[1] = y;
            } else {
                obj.selectedCell[2] = x;
                obj.selectedCell[3] = y;
            }
        }

        obj.left.get = function(x, y) {
            var x = parseInt(x);
            var y = parseInt(y);
            for (var i = (x - 1); i >= 0; i--) {
                if (obj.records[y][i].style.display != 'none') {
                    if (obj.records[y][i].getAttribute('data-merged')) {
                        if (obj.records[y][i] == obj.records[y][x]) {
                            continue;
                        }
                    }
                    x = i;
                    break;
                }
            }

            return x;
        }

        obj.first = function(shiftKey, ctrlKey) {
            if (shiftKey) {
                if (ctrlKey) {
                    obj.selectedCell[3] = 0;
                } else {
                    obj.left.visible(1, 0);
                }
            } else {
                if (ctrlKey) {
                    obj.selectedCell[1] = 0;
                } else {
                    obj.left.visible(0, 0);
                }
                obj.selectedCell[2] = obj.selectedCell[0];
                obj.selectedCell[3] = obj.selectedCell[1];
            }

            // Change page
            if (obj.options.lazyLoading == true && (obj.selectedCell[1] == 0 || obj.selectedCell[3] == 0)) {
                obj.loadPage(0);
            } else if (obj.options.pagination > 0) {
                var pageNumber = obj.whichPage(obj.selectedCell[3]);
                if (pageNumber != obj.pageNumber) {
                    obj.page(pageNumber);
                }
            }

            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
            obj.updateScroll(1);
        }

        obj.last = function(shiftKey, ctrlKey) {
            if (shiftKey) {
                if (ctrlKey) {
                    obj.selectedCell[3] = obj.records.length - 1;
                } else {
                    obj.right.visible(1, 0);
                }
            } else {
                if (ctrlKey) {
                    obj.selectedCell[1] = obj.records.length - 1;
                } else {
                    obj.right.visible(0, 0);
                }
                obj.selectedCell[2] = obj.selectedCell[0];
                obj.selectedCell[3] = obj.selectedCell[1];
            }

            // Change page
            if (obj.options.lazyLoading == true && (obj.selectedCell[1] == obj.records.length - 1 || obj.selectedCell[3] == obj.records.length - 1)) {
                obj.loadPage(-1);
            } else if (obj.options.pagination > 0) {
                var pageNumber = obj.whichPage(obj.selectedCell[3]);
                if (pageNumber != obj.pageNumber) {
                    obj.page(pageNumber);
                }
            }

            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
            obj.updateScroll(3);
        }

        obj.selectAll = function() {
            if (! obj.selectedCell) {
                obj.selectedCell = [];
            }

            obj.selectedCell[0] = 0;
            obj.selectedCell[1] = 0;
            obj.selectedCell[2] = obj.headers.length - 1;
            obj.selectedCell[3] = obj.records.length - 1;

            obj.updateSelectionFromCoords(obj.selectedCell[0], obj.selectedCell[1], obj.selectedCell[2], obj.selectedCell[3]);
        }

        /**
         * Go to a page in a lazyLoading
         */
        obj.loadPage = function(pageNumber) {
            // Search
            if ((obj.options.search == true || obj.options.filters == true) && obj.results) {
                var results = obj.results;
            } else {
                var results = obj.rows;
            }

            // Per page
            var quantityPerPage = 100;

            // pageNumber
            if (pageNumber == null || pageNumber == -1) {
                // Last page
                pageNumber = Math.ceil(results.length / quantityPerPage) - 1;
            }

            var startRow = (pageNumber * quantityPerPage);
            var finalRow = (pageNumber * quantityPerPage) + quantityPerPage;
            if (finalRow > results.length) {
                finalRow = results.length;
            }
            startRow = finalRow - 100;
            if (startRow < 0) {
                startRow = 0;
            }

            // Appeding items
            for (var j = startRow; j < finalRow; j++) {
                if ((obj.options.search == true || obj.options.filters == true) && obj.results) {
                    obj.tbody.appendChild(obj.rows[results[j]]);
                } else {
                    obj.tbody.appendChild(obj.rows[j]);
                }

                if (obj.tbody.children.length > quantityPerPage) {
                    obj.tbody.removeChild(obj.tbody.firstChild);
                }
            }
        }

        obj.loadUp = function() {
            // Search
            if ((obj.options.search == true || obj.options.filters == true) && obj.results) {
                var results = obj.results;
            } else {
                var results = obj.rows;
            }
            var test = 0;
            if (results.length > 100) {
                // Get the first element in the page
                var item = parseInt(obj.tbody.firstChild.getAttribute('data-y'));
                if ((obj.options.search == true || obj.options.filters == true) && obj.results) {
                    item = results.indexOf(item);
                }
                if (item > 0) {
                    for (var j = 0; j < 30; j++) {
                        item = item - 1;
                        if (item > -1) {
                            if ((obj.options.search == true || obj.options.filters == true) && obj.results) {
                                obj.tbody.insertBefore(obj.rows[results[item]], obj.tbody.firstChild);
                            } else {
                                obj.tbody.insertBefore(obj.rows[item], obj.tbody.firstChild);
                            }
                            if (obj.tbody.children.length > 100) {
                                obj.tbody.removeChild(obj.tbody.lastChild);
                                test = 1;
                            }
                        }
                    }
                }
            }
            return test;
        }

        obj.loadDown = function() {
            // Search
            if ((obj.options.search == true || obj.options.filters == true) && obj.results) {
                var results = obj.results;
            } else {
                var results = obj.rows;
            }
            var test = 0;
            if (results.length > 100) {
                // Get the last element in the page
                var item = parseInt(obj.tbody.lastChild.getAttribute('data-y'));
                if ((obj.options.search == true || obj.options.filters == true) && obj.results) {
                    item = results.indexOf(item);
                }
                if (item < obj.rows.length - 1) {
                    for (var j = 0; j <= 30; j++) {
                        if (item < results.length) {
                            if ((obj.options.search == true || obj.options.filters == true) && obj.results) {
                                obj.tbody.appendChild(obj.rows[results[item]]);
                            } else {
                                obj.tbody.appendChild(obj.rows[item]);
                            }
                            if (obj.tbody.children.length > 100) {
                                obj.tbody.removeChild(obj.tbody.firstChild);
                                test = 1;
                            }
                        }
                        item = item + 1;
                    }
                }
            }

            return test;
        }

        obj.loadValidation = function() {
            if (obj.selectedCell) {
                var currentPage = parseInt(obj.tbody.firstChild.getAttribute('data-y')) / 100;
                var selectedPage = parseInt(obj.selectedCell[3] / 100);
                var totalPages = parseInt(obj.rows.length / 100);

                if (currentPage != selectedPage && selectedPage <= totalPages) {
                    if (! Array.prototype.indexOf.call(obj.tbody.children, obj.rows[obj.selectedCell[3]])) {
                        obj.loadPage(selectedPage);
                        return true;
                    }
                }
            }

            return false;
        }

        /**
         * Reset search
         */
        obj.resetSearch = function() {
            obj.searchInput.value = '';
            obj.search('');
            obj.results = null;
        }

        /**
         * Search
         */
        obj.search = function(query) {
            // Query
            if (query) {
                var query = query.toLowerCase();
            }

            // Reset any filter
            if (obj.options.filters) {
                obj.resetFilters();
            }

            // Reset selection
            obj.resetSelection();

            // Total of results
            obj.pageNumber = 0;
            obj.results = [];

            if (query) {
                // Search filter
                var search = function(item, query, index) {
                    for (var i = 0; i < item.length; i++) {
                        if ((''+item[i]).toLowerCase().search(query) >= 0 ||
                            (''+obj.records[index][i].innerHTML).toLowerCase().search(query) >= 0) {
                            return true;
                        }
                    }
                    return false;
                }

                // Result
                var addToResult = function(k) {
                    if (obj.results.indexOf(k) == -1) {
                        obj.results.push(k);
                    }
                }

                // Filter
                var data = obj.options.data.filter(function(v, k) {
                    if (search(v, query, k)) {
                        // Merged rows found
                        var rows = obj.isRowMerged(k);
                        if (rows.length) {
                            for (var i = 0; i < rows.length; i++) {
                                var row = jexcel.getIdFromColumnName(rows[i], true);
                                for (var j = 0; j < obj.options.mergeCells[rows[i]][1]; j++) {
                                    addToResult(row[1]+j);
                                }
                            }
                        } else {
                            // Normal row found
                            addToResult(k);
                        }
                        return true;
                    } else {
                        return false;
                    }
                });
            } else {
                obj.results = null;
            }

            return obj.updateResult();
        }

        obj.updateResult = function() {
            var total = 0;
            var index = 0;

            // Page 1
            if (obj.options.lazyLoading == true) {
                total = 100;
            } else if (obj.options.pagination > 0) {
                total = obj.options.pagination;
            } else {
                if (obj.results) {
                    total = obj.results.length;
                } else {
                    total = obj.rows.length;
                }
            }

            // Reset current nodes
            while (obj.tbody.firstChild) {
                obj.tbody.removeChild(obj.tbody.firstChild);
            }

            // Hide all records from the table
            for (var j = 0; j < obj.rows.length; j++) {
                if (! obj.results || obj.results.indexOf(j) > -1) {
                    if (index < total) {
                        obj.tbody.appendChild(obj.rows[j]);
                        index++;
                    }
                    obj.rows[j].style.display = '';
                } else {
                    obj.rows[j].style.display = 'none';
                }
            }

            // Update pagination
            if (obj.options.pagination > 0) {
                obj.updatePagination();
            }

            obj.updateCornerPosition();

            return total;
        }

        /**
         * Which page the cell is
         */
        obj.whichPage = function(cell) {
            // Search
            if ((obj.options.search == true || obj.options.filters == true) && obj.results) {
                cell = obj.results.indexOf(cell);
            }

            return (Math.ceil((parseInt(cell) + 1) / parseInt(obj.options.pagination))) - 1;
        }

        /**
         * Go to page
         */
        obj.page = function(pageNumber) {
            var oldPage = obj.pageNumber;

            // Search
            if ((obj.options.search == true || obj.options.filters == true) && obj.results) {
                var results = obj.results;
            } else {
                var results = obj.rows;
            }

            // Per page
            var quantityPerPage = parseInt(obj.options.pagination);

            // pageNumber
            if (pageNumber == null || pageNumber == -1) {
                // Last page
                pageNumber = Math.ceil(results.length / quantityPerPage) - 1;
            }

            // Page number
            obj.pageNumber = pageNumber;

            var startRow = (pageNumber * quantityPerPage);
            var finalRow = (pageNumber * quantityPerPage) + quantityPerPage;
            if (finalRow > results.length) {
                finalRow = results.length;
            }
            if (startRow < 0) {
                startRow = 0;
            }

            // Reset container
            while (obj.tbody.firstChild) {
                obj.tbody.removeChild(obj.tbody.firstChild);
            }

            // Appeding items
            for (var j = startRow; j < finalRow; j++) {
                if ((obj.options.search == true || obj.options.filters == true) && obj.results) {
                    obj.tbody.appendChild(obj.rows[results[j]]);
                } else {
                    obj.tbody.appendChild(obj.rows[j]);
                }
            }

            if (obj.options.pagination > 0) {
                obj.updatePagination();
            }

            // Update corner position
            obj.updateCornerPosition();

            // Events
            obj.dispatch('onchangepage', el, pageNumber, oldPage);
        }

        /**
         * Update the pagination
         */
        obj.updatePagination = function() {
            // Reset container
            obj.pagination.children[0].innerHTML = '';
            obj.pagination.children[1].innerHTML = '';

            // Start pagination
            if (obj.options.pagination) {
                // Searchable
                if ((obj.options.search == true || obj.options.filters == true) && obj.results) {
                    var results = obj.results.length;
                } else {
                    var results = obj.rows.length;
                }

                if (! results) {
                    // No records found
                    obj.pagination.children[0].innerHTML = obj.options.text.noRecordsFound;
                } else {
                    // Pagination container
                    var quantyOfPages = Math.ceil(results / obj.options.pagination);

                    if (obj.pageNumber < 6) {
                        var startNumber = 1;
                        var finalNumber = quantyOfPages < 10 ? quantyOfPages : 10;
                    } else if (quantyOfPages - obj.pageNumber < 5) {
                        var startNumber = quantyOfPages - 9;
                        var finalNumber = quantyOfPages;
                        if (startNumber < 1) {
                            startNumber = 1;
                        }
                    } else {
                        var startNumber = obj.pageNumber - 4;
                        var finalNumber = obj.pageNumber + 5;
                    }

                    // First
                    if (startNumber > 1) {
                        var paginationItem = document.createElement('div');
                        paginationItem.className = 'jexcel_page';
                        paginationItem.innerHTML = '<';
                        paginationItem.title = 1;
                        obj.pagination.children[1].appendChild(paginationItem);
                    }

                    // Get page links
                    for (var i = startNumber; i <= finalNumber; i++) {
                        var paginationItem = document.createElement('div');
                        paginationItem.className = 'jexcel_page';
                        paginationItem.innerHTML = i;
                        obj.pagination.children[1].appendChild(paginationItem);

                        if (obj.pageNumber == (i-1)) {
                            paginationItem.classList.add('jexcel_page_selected');
                        }
                    }

                    // Last
                    if (finalNumber < quantyOfPages) {
                        var paginationItem = document.createElement('div');
                        paginationItem.className = 'jexcel_page';
                        paginationItem.innerHTML = '>';
                        paginationItem.title = quantyOfPages;
                        obj.pagination.children[1].appendChild(paginationItem);
                    }

                    // Text
                    var format = function(format) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        return format.replace(/{(\d+)}/g, function(match, number) {
                          return typeof args[number] != 'undefined'
                            ? args[number]
                            : match
                          ;
                        });
                    };

                    obj.pagination.children[0].innerHTML = format(obj.options.text.showingPage, obj.pageNumber + 1, quantyOfPages)
                }
            }
        }

        /**
         * Download CSV table
         *
         * @return null
         */
        obj.download = function(includeHeaders) {
            if (obj.options.allowExport == false) {
                console.error('Export not allowed');
            } else {
                // Data
                var data = '';

                // Get data
                data += obj.copy(false, obj.options.csvDelimiter, true, includeHeaders, true);

                // Download element
                var blob = new Blob(["\uFEFF"+data], {type: 'text/csv;charset=utf-8;'});

                // IE Compatibility
                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveOrOpenBlob(blob, obj.options.csvFileName + '.csv');
                } else {
                    // Download element
                    var pom = document.createElement('a');
                    var url = URL.createObjectURL(blob);
                    pom.href = url;
                    pom.setAttribute('download', obj.options.csvFileName + '.csv');
                    document.body.appendChild(pom);
                    pom.click();
                    pom.parentNode.removeChild(pom);
                }
            }
        }

        /**
         * Initializes a new history record for undo/redo
         *
         * @return null
         */
        obj.setHistory = function(changes) {
            if (obj.ignoreHistory != true) {
                // Increment and get the current history index
                var index = ++obj.historyIndex;

                // Slice the array to discard undone changes
                obj.history = (obj.history = obj.history.slice(0, index + 1));

                // Keep history
                obj.history[index] = changes;
            }
        }

        /**
         * Copy method
         *
         * @param bool highlighted - Get only highlighted cells
         * @param delimiter - \t default to keep compatibility with excel
         * @return string value
         */
        obj.copy = function(highlighted, delimiter, returnData, includeHeaders, download) {
            if (! delimiter) {
                delimiter = "\t";
            }

            var div = new RegExp(delimiter, 'ig');

            // Controls
            var header = [];
            var col = [];
            var colLabel = [];
            var row = [];
            var rowLabel = [];
            var x = obj.options.data[0].length;
            var y = obj.options.data.length;
            var tmp = '';
            var copyHeader = false;
            var headers = '';
            var nestedHeaders = '';
            var numOfCols = 0;
            var numOfRows = 0;

            // Partial copy
            var copyX = 0;
            var copyY = 0;
            var isPartialCopy = true;
            // Go through the columns to get the data
            for (var j = 0; j < y; j++) {
                for (var i = 0; i < x; i++) {
                    // If cell is highlighted
                    if (! highlighted || obj.records[j][i].classList.contains('highlight')) {
                        if (copyX <= i) {
                            copyX = i;
                        }
                        if (copyY <= j) {
                            copyY = j;
                        }
                    }
                }
            }
            if (x === copyX+1 && y === copyY+1) {
                isPartialCopy = false;
            }

            if ((download && obj.options.includeHeadersOnDownload == true) ||
                (! download && obj.options.includeHeadersOnCopy == true && ! isPartialCopy) || (includeHeaders)) {
                // Nested headers
                if (obj.options.nestedHeaders && obj.options.nestedHeaders.length > 0) {
                    // Flexible way to handle nestedheaders
                    if (! (obj.options.nestedHeaders[0] && obj.options.nestedHeaders[0][0])) {
                        tmp = [obj.options.nestedHeaders];
                    } else {
                        tmp = obj.options.nestedHeaders;
                    }

                    for (var j = 0; j < tmp.length; j++) {
                        var nested = [];
                        for (var i = 0; i < tmp[j].length; i++) {
                            var colspan = parseInt(tmp[j][i].colspan);
                            nested.push(tmp[j][i].title);
                            for (var c = 0; c < colspan - 1; c++) {
                                nested.push('');
                            }
                        }
                        nestedHeaders += nested.join(delimiter) + "\r\n";
                    }
                }

                copyHeader = true;
            }

            // Reset container
            obj.style = [];

            // Go through the columns to get the data
            for (var j = 0; j < y; j++) {
                col = [];
                colLabel = [];

                for (var i = 0; i < x; i++) {
                    // If cell is highlighted
                    if (! highlighted || obj.records[j][i].classList.contains('highlight')) {
                        if (copyHeader == true) {
                            header.push(obj.headers[i].textContent);
                        }
                        // Values
                        var value = obj.options.data[j][i];
                        if (value.match && (value.match(div) || value.match(/,/g) || value.match(/\n/) || value.match(/\"/))) {
                            value = value.replace(new RegExp('"', 'g'), '""');
                            value = '"' + value + '"';
                        }
                        col.push(value);

                        // Labels
                        if (obj.options.columns[i].type == 'checkbox' || obj.options.columns[i].type == 'radio') {
                            var label = value;
                        } else {
                            if (obj.options.stripHTMLOnCopy == true) {
                                var label = obj.records[j][i].textContent;
                            } else {
                                var label = obj.records[j][i].innerHTML;
                            }
                            if (label.match && (label.match(div) || label.match(/,/g) || label.match(/\n/) || label.match(/\"/))) {
                                // Scape double quotes
                                label = label.replace(new RegExp('"', 'g'), '""');
                                label = '"' + label + '"';
                            }
                        }
                        colLabel.push(label);

                        // Get style
                        tmp = obj.records[j][i].getAttribute('style');
                        tmp = tmp.replace('display: none;', '');
                        obj.style.push(tmp ? tmp : '');
                    }
                }

                if (col.length) {
                    if (copyHeader) {
                        numOfCols = col.length;
                        row.push(header.join(delimiter));
                    }
                    row.push(col.join(delimiter));
                }
                if (colLabel.length) {
                    numOfRows++;
                    if (copyHeader) {
                        rowLabel.push(header.join(delimiter));
                        copyHeader = false;
                    }
                    rowLabel.push(colLabel.join(delimiter));
                }
            }

            if (x == numOfCols &&  y == numOfRows) {
                headers = nestedHeaders;
            }

            // Final string
            var str = headers + row.join("\r\n");
            var strLabel = headers + rowLabel.join("\r\n");

            // Create a hidden textarea to copy the values
            if (! returnData) {
                if (obj.options.copyCompatibility == true) {
                    obj.textarea.value = strLabel;
                } else {
                    obj.textarea.value = str;
                }
                obj.textarea.select();
                document.execCommand("copy");
            }

            // Keep data
            if (obj.options.copyCompatibility == true) {
                obj.data = strLabel;
            } else {
                obj.data = str;
            }
            // Keep non visible information
            obj.hashString = obj.hash(obj.data);

            // Any exiting border should go
            if (! returnData) {
                obj.removeCopyingSelection();

                // Border
                if (obj.highlighted) {
                    for (var i = 0; i < obj.highlighted.length; i++) {
                        obj.highlighted[i].classList.add('copying');
                        if (obj.highlighted[i].classList.contains('highlight-left')) {
                            obj.highlighted[i].classList.add('copying-left');
                        }
                        if (obj.highlighted[i].classList.contains('highlight-right')) {
                            obj.highlighted[i].classList.add('copying-right');
                        }
                        if (obj.highlighted[i].classList.contains('highlight-top')) {
                            obj.highlighted[i].classList.add('copying-top');
                        }
                        if (obj.highlighted[i].classList.contains('highlight-bottom')) {
                            obj.highlighted[i].classList.add('copying-bottom');
                        }
                    }
                }

                // Paste event
                obj.dispatch('oncopy', el, obj.options.copyCompatibility == true ? rowLabel : row, obj.hashString);
            }

            return obj.data;
        }

        /**
         * Jspreadsheet paste method
         *
         * @param integer row number
         * @return string value
         */
        obj.paste = function(x, y, data) {
            // Paste filter
            var ret = obj.dispatch('onbeforepaste', el, data, x, y);

            if (ret === false) {
                return false;
            } else if (ret) {
                var data = ret;
            }

            // Controls
            var hash = obj.hash(data);
            var style = (hash == obj.hashString) ? obj.style : null;

            // Depending on the behavior
            if (obj.options.copyCompatibility == true && hash == obj.hashString) {
                var data = obj.data;
            }

            // Split new line
            var data = obj.parseCSV(data, "\t");

            if (x != null && y != null && data) {
                // Records
                var i = 0;
                var j = 0;
                var records = [];
                var newStyle = {};
                var oldStyle = {};
                var styleIndex = 0;

                // Index
                var colIndex = parseInt(x);
                var rowIndex = parseInt(y);
                var row = null;

                // Go through the columns to get the data
                while (row = data[j]) {
                    i = 0;
                    colIndex = parseInt(x);

                    while (row[i] != null) {
                        // Update and keep history
                        var record = obj.updateCell(colIndex, rowIndex, row[i]);
                        // Keep history
                        records.push(record);
                        // Update all formulas in the chain
                        obj.updateFormulaChain(colIndex, rowIndex, records);
                        // Style
                        if (style && style[styleIndex]) {
                            var columnName = jexcel.getColumnNameFromId([colIndex, rowIndex]);
                            newStyle[columnName] = style[styleIndex];
                            oldStyle[columnName] = obj.getStyle(columnName);
                            obj.records[rowIndex][colIndex].setAttribute('style', style[styleIndex]);
                            styleIndex++
                        }
                        i++;
                        if (row[i] != null) {
                            if (colIndex >= obj.headers.length - 1) {
                                // If the pasted column is out of range, create it if possible
                                if (obj.options.allowInsertColumn == true) {
                                    obj.insertColumn();
                                    // Otherwise skip the pasted data that overflows
                                } else {
                                    break;
                                }
                            }
                            colIndex = obj.right.get(colIndex, rowIndex);
                        }
                    }

                    j++;
                    if (data[j]) {
                        if (rowIndex >= obj.rows.length-1) {
                            // If the pasted row is out of range, create it if possible
                            if (obj.options.allowInsertRow == true) {
                                obj.insertRow();
                                // Otherwise skip the pasted data that overflows
                            } else {
                                break;
                            }
                        }
                        rowIndex = obj.down.get(x, rowIndex);
                    }
                }

                // Select the new cells
                obj.updateSelectionFromCoords(x, y, colIndex, rowIndex);

                // Update history
                obj.setHistory({
                    action:'setValue',
                    records:records,
                    selection:obj.selectedCell,
                    newStyle:newStyle,
                    oldStyle:oldStyle,
                });

                // Update table
                obj.updateTable();

                // Paste event
                obj.dispatch('onpaste', el, data);

                // On after changes
                obj.onafterchanges(el, records);
            }

            obj.removeCopyingSelection();
        }

        /**
         * Remove copying border
         */
        obj.removeCopyingSelection = function() {
            var copying = document.querySelectorAll('.jexcel .copying');
            for (var i = 0; i < copying.length; i++) {
                copying[i].classList.remove('copying');
                copying[i].classList.remove('copying-left');
                copying[i].classList.remove('copying-right');
                copying[i].classList.remove('copying-top');
                copying[i].classList.remove('copying-bottom');
            }
        }

        /**
         * Process row
         */
        obj.historyProcessRow = function(type, historyRecord) {
            var rowIndex = (! historyRecord.insertBefore) ? historyRecord.rowNumber + 1 : +historyRecord.rowNumber;

            if (obj.options.search == true) {
                if (obj.results && obj.results.length != obj.rows.length) {
                    obj.resetSearch();
                }
            }

            // Remove row
            if (type == 1) {
                var numOfRows = historyRecord.numOfRows;
                // Remove nodes
                for (var j = rowIndex; j < (numOfRows + rowIndex); j++) {
                    obj.rows[j].parentNode.removeChild(obj.rows[j]);
                }
                // Remove references
                obj.records.splice(rowIndex, numOfRows);
                obj.options.data.splice(rowIndex, numOfRows);
                obj.rows.splice(rowIndex, numOfRows);

                obj.conditionalSelectionUpdate(1, rowIndex, (numOfRows + rowIndex) - 1);
            } else {
                // Insert data
                obj.records = jexcel.injectArray(obj.records, rowIndex, historyRecord.rowRecords);
                obj.options.data = jexcel.injectArray(obj.options.data, rowIndex, historyRecord.rowData);
                obj.rows = jexcel.injectArray(obj.rows, rowIndex, historyRecord.rowNode);
                // Insert nodes
                var index = 0
                for (var j = rowIndex; j < (historyRecord.numOfRows + rowIndex); j++) {
                    obj.tbody.insertBefore(historyRecord.rowNode[index], obj.tbody.children[j]);
                    index++;
                }
            }

            // Respect pagination
            if (obj.options.pagination > 0) {
                obj.page(obj.pageNumber);
            }

            obj.updateTableReferences();
        }

        /**
         * Process column
         */
        obj.historyProcessColumn = function(type, historyRecord) {
            var columnIndex = (! historyRecord.insertBefore) ? historyRecord.columnNumber + 1 : historyRecord.columnNumber;

            // Remove column
            if (type == 1) {
                var numOfColumns = historyRecord.numOfColumns;

                obj.options.columns.splice(columnIndex, numOfColumns);
                for (var i = columnIndex; i < (numOfColumns + columnIndex); i++) {
                    obj.headers[i].parentNode.removeChild(obj.headers[i]);
                    obj.colgroup[i].parentNode.removeChild(obj.colgroup[i]);
                }
                obj.headers.splice(columnIndex, numOfColumns);
                obj.colgroup.splice(columnIndex, numOfColumns);
                for (var j = 0; j < historyRecord.data.length; j++) {
                    for (var i = columnIndex; i < (numOfColumns + columnIndex); i++) {
                        obj.records[j][i].parentNode.removeChild(obj.records[j][i]);
                    }
                    obj.records[j].splice(columnIndex, numOfColumns);
                    obj.options.data[j].splice(columnIndex, numOfColumns);
                }
                // Process footers
                if (obj.options.footers) {
                    for (var j = 0; j < obj.options.footers.length; j++) {
                        obj.options.footers[j].splice(columnIndex, numOfColumns);
                    }
                }
            } else {
                // Insert data
                obj.options.columns = jexcel.injectArray(obj.options.columns, columnIndex, historyRecord.columns);
                obj.headers = jexcel.injectArray(obj.headers, columnIndex, historyRecord.headers);
                obj.colgroup = jexcel.injectArray(obj.colgroup, columnIndex, historyRecord.colgroup);

                var index = 0
                for (var i = columnIndex; i < (historyRecord.numOfColumns + columnIndex); i++) {
                    obj.headerContainer.insertBefore(historyRecord.headers[index], obj.headerContainer.children[i+1]);
                    obj.colgroupContainer.insertBefore(historyRecord.colgroup[index], obj.colgroupContainer.children[i+1]);
                    index++;
                }

                for (var j = 0; j < historyRecord.data.length; j++) {
                    obj.options.data[j] = jexcel.injectArray(obj.options.data[j], columnIndex, historyRecord.data[j]);
                    obj.records[j] = jexcel.injectArray(obj.records[j], columnIndex, historyRecord.records[j]);
                    var index = 0
                    for (var i = columnIndex; i < (historyRecord.numOfColumns + columnIndex); i++) {
                        obj.rows[j].insertBefore(historyRecord.records[j][index], obj.rows[j].children[i+1]);
                        index++;
                    }
                }
                // Process footers
                if (obj.options.footers) {
                    for (var j = 0; j < obj.options.footers.length; j++) {
                        obj.options.footers[j] = jexcel.injectArray(obj.options.footers[j], columnIndex, historyRecord.footers[j]);
                    }
                }
            }

            // Adjust nested headers
            if (obj.options.nestedHeaders && obj.options.nestedHeaders.length > 0) {
                // Flexible way to handle nestedheaders
                if (obj.options.nestedHeaders[0] && obj.options.nestedHeaders[0][0]) {
                    for (var j = 0; j < obj.options.nestedHeaders.length; j++) {
                        if (type == 1) {
                            var colspan = parseInt(obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan) - historyRecord.numOfColumns;
                        } else {
                            var colspan = parseInt(obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan) + historyRecord.numOfColumns;
                        }
                        obj.options.nestedHeaders[j][obj.options.nestedHeaders[j].length-1].colspan = colspan;
                        obj.thead.children[j].children[obj.thead.children[j].children.length-1].setAttribute('colspan', colspan);
                    }
                } else {
                    if (type == 1) {
                        var colspan = parseInt(obj.options.nestedHeaders[0].colspan) - historyRecord.numOfColumns;
                    } else {
                        var colspan = parseInt(obj.options.nestedHeaders[0].colspan) + historyRecord.numOfColumns;
                    }
                    obj.options.nestedHeaders[0].colspan = colspan;
                    obj.thead.children[0].children[obj.thead.children[0].children.length-1].setAttribute('colspan', colspan);
                }
            }

            obj.updateTableReferences();
        }

        /**
         * Undo last action
         */
        obj.undo = function() {
            // Ignore events and history
            var ignoreEvents = obj.ignoreEvents ? true : false;
            var ignoreHistory = obj.ignoreHistory ? true : false;

            obj.ignoreEvents = true;
            obj.ignoreHistory = true;

            // Records
            var records = [];

            // Update cells
            if (obj.historyIndex >= 0) {
                // History
                var historyRecord = obj.history[obj.historyIndex--];

                if (historyRecord.action == 'insertRow') {
                    obj.historyProcessRow(1, historyRecord);
                } else if (historyRecord.action == 'deleteRow') {
                    obj.historyProcessRow(0, historyRecord);
                } else if (historyRecord.action == 'insertColumn') {
                    obj.historyProcessColumn(1, historyRecord);
                } else if (historyRecord.action == 'deleteColumn') {
                    obj.historyProcessColumn(0, historyRecord);
                } else if (historyRecord.action == 'moveRow') {
                    obj.moveRow(historyRecord.newValue, historyRecord.oldValue);
                } else if (historyRecord.action == 'moveColumn') {
                    obj.moveColumn(historyRecord.newValue, historyRecord.oldValue);
                } else if (historyRecord.action == 'setMerge') {
                    obj.removeMerge(historyRecord.column, historyRecord.data);
                } else if (historyRecord.action == 'setStyle') {
                    obj.setStyle(historyRecord.oldValue, null, null, 1);
                } else if (historyRecord.action == 'setWidth') {
                    obj.setWidth(historyRecord.column, historyRecord.oldValue);
                } else if (historyRecord.action == 'setHeight') {
                    obj.setHeight(historyRecord.row, historyRecord.oldValue);
                } else if (historyRecord.action == 'setHeader') {
                    obj.setHeader(historyRecord.column, historyRecord.oldValue);
                } else if (historyRecord.action == 'setComments') {
                    obj.setComments(historyRecord.column, historyRecord.oldValue[0], historyRecord.oldValue[1]);
                } else if (historyRecord.action == 'orderBy') {
                    var rows = [];
                    for (var j = 0; j < historyRecord.rows.length; j++) {
                        rows[historyRecord.rows[j]] = j;
                    }
                    obj.updateOrderArrow(historyRecord.column, historyRecord.order ? 0 : 1);
                    obj.updateOrder(rows);
                } else if (historyRecord.action == 'setValue') {
                    // Redo for changes in cells
                    for (var i = 0; i < historyRecord.records.length; i++) {
                        records.push({
                            x: historyRecord.records[i].x,
                            y: historyRecord.records[i].y,
                            newValue: historyRecord.records[i].oldValue,
                        });

                        if (historyRecord.oldStyle) {
                            obj.resetStyle(historyRecord.oldStyle);
                        }
                    }
                    // Update records
                    obj.setValue(records);

                    // Update selection
                    if (historyRecord.selection) {
                        obj.updateSelectionFromCoords(historyRecord.selection[0], historyRecord.selection[1], historyRecord.selection[2], historyRecord.selection[3]);
                    }
                }
            }
            obj.ignoreEvents = ignoreEvents;
            obj.ignoreHistory = ignoreHistory;

            // Events
            obj.dispatch('onundo', el, historyRecord);
        }

        /**
         * Redo previously undone action
         */
        obj.redo = function() {
            // Ignore events and history
            var ignoreEvents = obj.ignoreEvents ? true : false;
            var ignoreHistory = obj.ignoreHistory ? true : false;

            obj.ignoreEvents = true;
            obj.ignoreHistory = true;

            // Records
            var records = [];

            // Update cells
            if (obj.historyIndex < obj.history.length - 1) {
                // History
                var historyRecord = obj.history[++obj.historyIndex];

                if (historyRecord.action == 'insertRow') {
                    obj.historyProcessRow(0, historyRecord);
                } else if (historyRecord.action == 'deleteRow') {
                    obj.historyProcessRow(1, historyRecord);
                } else if (historyRecord.action == 'insertColumn') {
                    obj.historyProcessColumn(0, historyRecord);
                } else if (historyRecord.action == 'deleteColumn') {
                    obj.historyProcessColumn(1, historyRecord);
                } else if (historyRecord.action == 'moveRow') {
                    obj.moveRow(historyRecord.oldValue, historyRecord.newValue);
                } else if (historyRecord.action == 'moveColumn') {
                    obj.moveColumn(historyRecord.oldValue, historyRecord.newValue);
                } else if (historyRecord.action == 'setMerge') {
                    obj.setMerge(historyRecord.column, historyRecord.colspan, historyRecord.rowspan, 1);
                } else if (historyRecord.action == 'setStyle') {
                    obj.setStyle(historyRecord.newValue, null, null, 1);
                } else if (historyRecord.action == 'setWidth') {
                    obj.setWidth(historyRecord.column, historyRecord.newValue);
                } else if (historyRecord.action == 'setHeight') {
                    obj.setHeight(historyRecord.row, historyRecord.newValue);
                } else if (historyRecord.action == 'setHeader') {
                    obj.setHeader(historyRecord.column, historyRecord.newValue);
                } else if (historyRecord.action == 'setComments') {
                    obj.setComments(historyRecord.column, historyRecord.newValue[0], historyRecord.newValue[1]);
                } else if (historyRecord.action == 'orderBy') {
                    obj.updateOrderArrow(historyRecord.column, historyRecord.order);
                    obj.updateOrder(historyRecord.rows);
                } else if (historyRecord.action == 'setValue') {
                    obj.setValue(historyRecord.records);
                    // Redo for changes in cells
                    for (var i = 0; i < historyRecord.records.length; i++) {
                        if (historyRecord.oldStyle) {
                            obj.resetStyle(historyRecord.newStyle);
                        }
                    }
                    // Update selection
                    if (historyRecord.selection) {
                        obj.updateSelectionFromCoords(historyRecord.selection[0], historyRecord.selection[1], historyRecord.selection[2], historyRecord.selection[3]);
                    }
                }
            }
            obj.ignoreEvents = ignoreEvents;
            obj.ignoreHistory = ignoreHistory;

            // Events
            obj.dispatch('onredo', el, historyRecord);
        }

        /**
         * Get dropdown value from key
         */
        obj.getDropDownValue = function(column, key) {
            var value = [];

            if (obj.options.columns[column] && obj.options.columns[column].source) {
                // Create array from source
                var combo = [];
                var source = obj.options.columns[column].source;

                for (var i = 0; i < source.length; i++) {
                    if (typeof(source[i]) == 'object') {
                        combo[source[i].id] = source[i].name;
                    } else {
                        combo[source[i]] = source[i];
                    }
                }

                // Guarantee single multiple compatibility
                var keys = Array.isArray(key) ? key : ('' + key).split(';');

                for (var i = 0; i < keys.length; i++) {
                    if (typeof(keys[i]) === 'object') {
                        value.push(combo[keys[i].id]);
                    } else {
                        if (combo[keys[i]]) {
                            value.push(combo[keys[i]]);
                        }
                    }
                }
            } else {
                console.error('Invalid column');
            }

            return (value.length > 0) ? value.join('; ') : '';
        }

        /**
         * From stack overflow contributions
         */
        obj.parseCSV = function(str, delimiter) {
            // Remove last line break
            str = str.replace(/\r?\n$|\r$|\n$/g, "");
            // Last caracter is the delimiter
            if (str.charCodeAt(str.length-1) == 9) {
                str += "\0";
            }
            // user-supplied delimeter or default comma
            delimiter = (delimiter || ",");

            var arr = [];
            var quote = false;  // true means we're inside a quoted field
            // iterate over each character, keep track of current row and column (of the returned array)
            for (var row = 0, col = 0, c = 0; c < str.length; c++) {
                var cc = str[c], nc = str[c+1];
                arr[row] = arr[row] || [];
                arr[row][col] = arr[row][col] || '';

                // If the current character is a quotation mark, and we're inside a quoted field, and the next character is also a quotation mark, add a quotation mark to the current column and skip the next character
                if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

                // If it's just one quotation mark, begin/end quoted field
                if (cc == '"') { quote = !quote; continue; }

                // If it's a comma and we're not in a quoted field, move on to the next column
                if (cc == delimiter && !quote) { ++col; continue; }

                // If it's a newline (CRLF) and we're not in a quoted field, skip the next character and move on to the next row and move to column 0 of that new row
                if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }

                // If it's a newline (LF or CR) and we're not in a quoted field, move on to the next row and move to column 0 of that new row
                if (cc == '\n' && !quote) { ++row; col = 0; continue; }
                if (cc == '\r' && !quote) { ++row; col = 0; continue; }

                // Otherwise, append the current character to the current column
                arr[row][col] += cc;
            }
            return arr;
        }

        obj.hash = function(str) {
            var hash = 0, i, chr;

            if (str.length === 0) {
                return hash;
            } else {
                for (i = 0; i < str.length; i++) {
                  chr = str.charCodeAt(i);
                  hash = ((hash << 5) - hash) + chr;
                  hash |= 0;
                }
            }
            return hash;
        }

        obj.onafterchanges = function(el, records) {
            // Events
            obj.dispatch('onafterchanges', el, records);
        }

        obj.destroy = function() {
            jexcel.destroy(el);
        }

        /**
         * Initialization method
         */
        obj.init = function() {
            jexcel.current = obj;

            // Build handlers
            if (typeof(jexcel.build) == 'function') {
                if (obj.options.root) {
                    jexcel.build(obj.options.root);
                } else {
                    jexcel.build(document);
                    jexcel.build = null;
                }
            }

            // Event
            el.setAttribute('tabindex', 1);
            el.addEventListener('focus', function(e) {
                if (jexcel.current && ! obj.selectedCell) {
                    obj.updateSelectionFromCoords(0,0,0,0);
                    obj.left();
                }
            });

            // Load the table data based on an CSV file
            if (obj.options.csv) {
                // Loading
                if (obj.options.loadingSpin == true) {
                    jSuites.loading.show();
                }

                // Load CSV file
                jSuites.ajax({
                    url: obj.options.csv,
                    method: obj.options.method,
                    data: obj.options.requestVariables,
                    dataType: 'text',
                    success: function(result) {
                        // Convert data
                        var newData = obj.parseCSV(result, obj.options.csvDelimiter)

                        // Headers
                        if (obj.options.csvHeaders == true && newData.length > 0) {
                            var headers = newData.shift();
                            for(var i = 0; i < headers.length; i++) {
                                if (! obj.options.columns[i]) {
                                    obj.options.columns[i] = { type:'text', align:obj.options.defaultColAlign, width:obj.options.defaultColWidth };
                                }
                                // Precedence over pre-configurated titles
                                if (typeof obj.options.columns[i].title === 'undefined') {
                                  obj.options.columns[i].title = headers[i];
                                }
                            }
                        }
                        // Data
                        obj.options.data = newData;
                        // Prepare table
                        obj.prepareTable();
                        // Hide spin
                        if (obj.options.loadingSpin == true) {
                            jSuites.loading.hide();
                        }
                    }
                });
            } else if (obj.options.url) {
                // Loading
                if (obj.options.loadingSpin == true) {
                    jSuites.loading.show();
                }

                jSuites.ajax({
                    url: obj.options.url,
                    method: obj.options.method,
                    data: obj.options.requestVariables,
                    dataType: 'json',
                    success: function(result) {
                        // Data
                        obj.options.data = (result.data) ? result.data : result;
                        // Prepare table
                        obj.prepareTable();
                        // Hide spin
                        if (obj.options.loadingSpin == true) {
                            jSuites.loading.hide();
                        }
                    }
                });
            } else {
                // Prepare table
                obj.prepareTable();
            }
        }

        // Context menu
        if (options && options.contextMenu != null) {
            obj.options.contextMenu = options.contextMenu;
        } else {
            obj.options.contextMenu = function(el, x, y, e) {
                var items = [];

                if (y == null) {
                    // Insert a new column
                    if (obj.options.allowInsertColumn == true) {
                        items.push({
                            title:obj.options.text.insertANewColumnBefore,
                            onclick:function() {
                                obj.insertColumn(1, parseInt(x), 1);
                            }
                        });
                    }

                    if (obj.options.allowInsertColumn == true) {
                        items.push({
                            title:obj.options.text.insertANewColumnAfter,
                            onclick:function() {
                                obj.insertColumn(1, parseInt(x), 0);
                            }
                        });
                    }

                    // Delete a column
                    if (obj.options.allowDeleteColumn == true) {
                        items.push({
                            title:obj.options.text.deleteSelectedColumns,
                            onclick:function() {
                                obj.deleteColumn(obj.getSelectedColumns().length ? undefined : parseInt(x));
                            }
                        });
                    }

                    // Rename column
                    if (obj.options.allowRenameColumn == true) {
                        items.push({
                            title:obj.options.text.renameThisColumn,
                            onclick:function() {
                                obj.setHeader(x);
                            }
                        });
                    }

                    // Sorting
                    if (obj.options.columnSorting == true) {
                        // Line
                        items.push({ type:'line' });

                        items.push({
                            title:obj.options.text.orderAscending,
                            onclick:function() {
                                obj.orderBy(x, 0);
                            }
                        });
                        items.push({
                            title:obj.options.text.orderDescending,
                            onclick:function() {
                                obj.orderBy(x, 1);
                            }
                        });
                    }
                } else {
                    // Insert new row
                    if (obj.options.allowInsertRow == true) {
                        items.push({
                            title:obj.options.text.insertANewRowBefore,
                            onclick:function() {
                                obj.insertRow(1, parseInt(y), 1);
                            }
                        });

                        items.push({
                            title:obj.options.text.insertANewRowAfter,
                            onclick:function() {
                                obj.insertRow(1, parseInt(y));
                            }
                        });
                    }

                    if (obj.options.allowDeleteRow == true) {
                        items.push({
                            title:obj.options.text.deleteSelectedRows,
                            onclick:function() {
                                obj.deleteRow(obj.getSelectedRows().length ? undefined : parseInt(y));
                            }
                        });
                    }

                    if (x) {
                        if (obj.options.allowComments == true) {
                            items.push({ type:'line' });

                            var title = obj.records[y][x].getAttribute('title') || '';

                            items.push({
                                title: title ? obj.options.text.editComments : obj.options.text.addComments,
                                onclick:function() {
                                    var comment = prompt(obj.options.text.comments, title);
                                    if (comment) {
                                        obj.setComments([ x, y ], comment);
                                    }
                                }
                            });

                            if (title) {
                                items.push({
                                    title:obj.options.text.clearComments,
                                    onclick:function() {
                                        obj.setComments([ x, y ], '');
                                    }
                                });
                            }
                        }
                    }
                }

                // Line
                items.push({ type:'line' });

                // Copy
                items.push({
                    title:obj.options.text.copy,
                    shortcut:'Ctrl + C',
                    onclick:function() {
                        obj.copy(true);
                    }
                });

                // Paste
                if (navigator && navigator.clipboard) {
                    items.push({
                        title:obj.options.text.paste,
                        shortcut:'Ctrl + V',
                        onclick:function() {
                            if (obj.selectedCell) {
                                navigator.clipboard.readText().then(function(text) {
                                    if (text) {
                                        jexcel.current.paste(obj.selectedCell[0], obj.selectedCell[1], text);
                                    }
                                });
                            }
                        }
                    });
                }

                // Save
                if (obj.options.allowExport) {
                    items.push({
                        title: obj.options.text.saveAs,
                        shortcut: 'Ctrl + S',
                        onclick: function () {
                            obj.download();
                        }
                    });
                }

                // About
                if (obj.options.about) {
                    items.push({
                        title:obj.options.text.about,
                        onclick:function() {
                            if (obj.options.about === true) {
                                alert(Version().print());
                            } else {
                                alert(obj.options.about);
                            }
                        }
                    });
                }

                return items;
            }
        }

        obj.scrollControls = function(e) {
            obj.wheelControls();

            if (obj.options.freezeColumns > 0 && obj.content.scrollLeft != scrollLeft) {
                obj.updateFreezePosition();
            }

            // Close editor
            if (obj.options.lazyLoading == true || obj.options.tableOverflow == true) {
                if (obj.edition && e.target.className.substr(0,9) != 'jdropdown') {
                    obj.closeEditor(obj.edition[0], true);
                }
            }
        }

        obj.wheelControls = function(e) {
            if (obj.options.lazyLoading == true) {
                if (jexcel.timeControlLoading == null) {
                    jexcel.timeControlLoading = setTimeout(function() {
                        if (obj.content.scrollTop + obj.content.clientHeight >= obj.content.scrollHeight - 10) {
                            if (obj.loadDown()) {
                                if (obj.content.scrollTop + obj.content.clientHeight > obj.content.scrollHeight - 10) {
                                    obj.content.scrollTop = obj.content.scrollTop - obj.content.clientHeight;
                                }
                                obj.updateCornerPosition();
                            }
                        } else if (obj.content.scrollTop <= obj.content.clientHeight) {
                            if (obj.loadUp()) {
                                if (obj.content.scrollTop < 10) {
                                    obj.content.scrollTop = obj.content.scrollTop + obj.content.clientHeight;
                                }
                                obj.updateCornerPosition();
                            }
                        }

                        jexcel.timeControlLoading = null;
                    }, 100);
                }
            }
        }

        // Get width of all freezed cells together
        obj.getFreezeWidth = function() {
            var width = 0;
            if (obj.options.freezeColumns > 0) {
                for (var i = 0; i < obj.options.freezeColumns; i++) {
                    width += parseInt(obj.options.columns[i].width);
                }
            }
            return width;
        }

        var scrollLeft = 0;

        obj.updateFreezePosition = function() {
            scrollLeft = obj.content.scrollLeft;
            var width = 0;
            if (scrollLeft > 50) {
                for (var i = 0; i < obj.options.freezeColumns; i++) {
                    if (i > 0) {
                        // Must check if the previous column is hidden or not to determin whether the width shoule be added or not!
                        if (obj.options.columns[i-1].type !== "hidden") {
                            width += parseInt(obj.options.columns[i-1].width);
                        }
                    }
                    obj.headers[i].classList.add('jexcel_freezed');
                    obj.headers[i].style.left = width + 'px';
                    for (var j = 0; j < obj.rows.length; j++) {
                        if (obj.rows[j] && obj.records[j][i]) {
                            var shifted = (scrollLeft + (i > 0 ? obj.records[j][i-1].style.width : 0)) - 51 + 'px';
                            obj.records[j][i].classList.add('jexcel_freezed');
                            obj.records[j][i].style.left = shifted;
                        }
                    }
                }
            } else {
                for (var i = 0; i < obj.options.freezeColumns; i++) {
                    obj.headers[i].classList.remove('jexcel_freezed');
                    obj.headers[i].style.left = '';
                    for (var j = 0; j < obj.rows.length; j++) {
                        if (obj.records[j][i]) {
                            obj.records[j][i].classList.remove('jexcel_freezed');
                            obj.records[j][i].style.left = '';
                        }
                    }
                }
            }

            // Place the corner in the correct place
            obj.updateCornerPosition();
        }

        el.addEventListener("DOMMouseScroll", obj.wheelControls);
        el.addEventListener("mousewheel", obj.wheelControls);

        el.jexcel = obj;
        el.jspreadsheet = obj;

        obj.init();

        return obj;
    });

    // Define dictionary
    jexcel.setDictionary = function(o) {
        jSuites.setDictionary(o);
    }

    // Define extensions
    jexcel.setExtensions = function(o) {
        var k = Object.keys(o);
        for (var i = 0; i < k.length; i++) {
            if (typeof(o[k[i]]) === 'function') {
                jexcel[k[i]] = o[k[i]];
                if (jexcel.license && typeof(o[k[i]].license) == 'function') {
                    o[k[i]].license(jexcel.license);
                }
            }
        }
    }

    /**
     * Formulas
     */
    if (typeof(formula) !== 'undefined') {
        jexcel.formula = formula;
    }
    jexcel.version = Version;

    jexcel.current = null;
    jexcel.timeControl = null;
    jexcel.timeControlLoading = null;

    const destroyEvents = function(root) {
        root.removeEventListener("mouseup", jexcel.mouseUpControls);
        root.removeEventListener("mousedown", jexcel.mouseDownControls);
        root.removeEventListener("mousemove", jexcel.mouseMoveControls);
        root.removeEventListener("mouseover", jexcel.mouseOverControls);
        root.removeEventListener("dblclick", jexcel.doubleClickControls);
        root.removeEventListener("paste", jexcel.pasteControls);
        root.removeEventListener("contextmenu", jexcel.contextMenuControls);
        root.removeEventListener("touchstart", jexcel.touchStartControls);
        root.removeEventListener("touchend", jexcel.touchEndControls);
        root.removeEventListener("touchcancel", jexcel.touchEndControls);
        document.removeEventListener("keydown", jexcel.keyDownControls);
    }

    jexcel.destroy = function(element, destroyEventHandlers) {
        if (element.jexcel) {
            var root = element.jexcel.options.root ? element.jexcel.options.root : document;
            element.removeEventListener("DOMMouseScroll", element.jexcel.scrollControls);
            element.removeEventListener("mousewheel", element.jexcel.scrollControls);
            element.jexcel = null;
            element.innerHTML = '';

            if (destroyEventHandlers) {
                destroyEvents(root);
                jexcel = null;
            }
        }
    }

    jexcel.build = function(root) {
        destroyEvents(root);
        root.addEventListener("mouseup", jexcel.mouseUpControls);
        root.addEventListener("mousedown", jexcel.mouseDownControls);
        root.addEventListener("mousemove", jexcel.mouseMoveControls);
        root.addEventListener("mouseover", jexcel.mouseOverControls);
        root.addEventListener("dblclick", jexcel.doubleClickControls);
        root.addEventListener("paste", jexcel.pasteControls);
        root.addEventListener("contextmenu", jexcel.contextMenuControls);
        root.addEventListener("touchstart", jexcel.touchStartControls);
        root.addEventListener("touchend", jexcel.touchEndControls);
        root.addEventListener("touchcancel", jexcel.touchEndControls);
        root.addEventListener("touchmove", jexcel.touchEndControls);
        document.addEventListener("keydown", jexcel.keyDownControls);
    }

    /**
     * Events
     */
    jexcel.keyDownControls = function(e) {
        if (jexcel.current) {
            if (jexcel.current.edition) {
                if (e.which == 27) {
                    // Escape
                    if (jexcel.current.edition) {
                        // Exit without saving
                        jexcel.current.closeEditor(jexcel.current.edition[0], false);
                    }
                    e.preventDefault();
                } else if (e.which == 13) {
                    // Enter
                    if (jexcel.current.options.columns[jexcel.current.edition[2]].type == 'calendar') {
                        jexcel.current.closeEditor(jexcel.current.edition[0], true);
                    } else if (jexcel.current.options.columns[jexcel.current.edition[2]].type == 'dropdown' ||
                               jexcel.current.options.columns[jexcel.current.edition[2]].type == 'autocomplete') {
                        // Do nothing
                    } else {
                        // Alt enter -> do not close editor
                        if ((jexcel.current.options.wordWrap == true ||
                             jexcel.current.options.columns[jexcel.current.edition[2]].wordWrap == true ||
                             jexcel.current.options.data[jexcel.current.edition[3]][jexcel.current.edition[2]].length > 200) && e.altKey) {
                            // Add new line to the editor
                            var editorTextarea = jexcel.current.edition[0].children[0];
                            var editorValue = jexcel.current.edition[0].children[0].value;
                            var editorIndexOf = editorTextarea.selectionStart;
                            editorValue = editorValue.slice(0, editorIndexOf) + "\n" + editorValue.slice(editorIndexOf);
                            editorTextarea.value = editorValue;
                            editorTextarea.focus();
                            editorTextarea.selectionStart = editorIndexOf + 1;
                            editorTextarea.selectionEnd = editorIndexOf + 1;
                        } else {
                            jexcel.current.edition[0].children[0].blur();
                        }
                    }
                } else if (e.which == 9) {
                    // Tab
                    if (['calendar', 'html'].includes(
                    jexcel.current.options.columns[jexcel.current.edition[2]].type)) {
                        jexcel.current.closeEditor(jexcel.current.edition[0], true);
                    } else {
                        jexcel.current.edition[0].children[0].blur();
                    }
                }
            }

            if (! jexcel.current.edition && jexcel.current.selectedCell) {
                // Which key
                if (e.which == 37) {
                    jexcel.current.left(e.shiftKey, e.ctrlKey);
                    e.preventDefault();
                } else if (e.which == 39) {
                    jexcel.current.right(e.shiftKey, e.ctrlKey);
                    e.preventDefault();
                } else if (e.which == 38) {
                    jexcel.current.up(e.shiftKey, e.ctrlKey);
                    e.preventDefault();
                } else if (e.which == 40) {
                    jexcel.current.down(e.shiftKey, e.ctrlKey);
                    e.preventDefault();
                } else if (e.which == 36) {
                    jexcel.current.first(e.shiftKey, e.ctrlKey);
                    e.preventDefault();
                } else if (e.which == 35) {
                    jexcel.current.last(e.shiftKey, e.ctrlKey);
                    e.preventDefault();
                } else if (e.which == 46) {
                    // Delete
                    if (jexcel.current.options.editable == true) {
                        if (jexcel.current.selectedRow) {
                            if (jexcel.current.options.allowDeleteRow == true) {
                                if (confirm(jexcel.current.options.text.areYouSureToDeleteTheSelectedRows)) {
                                    jexcel.current.deleteRow();
                                }
                            }
                        } else if (jexcel.current.selectedHeader) {
                            if (jexcel.current.options.allowDeleteColumn == true) {
                                if (confirm(jexcel.current.options.text.areYouSureToDeleteTheSelectedColumns)) {
                                    jexcel.current.deleteColumn();
                                }
                            }
                        } else {
                            // Change value
                            jexcel.current.setValue(jexcel.current.highlighted, '');
                        }
                    }
                } else if (e.which == 13) {
                    // Move cursor
                    if (e.shiftKey) {
                        jexcel.current.up();
                    } else {
                        if (jexcel.current.options.allowInsertRow == true) {
                            if (jexcel.current.options.allowManualInsertRow == true) {
                                if (jexcel.current.selectedCell[1] == jexcel.current.options.data.length - 1) {
                                    // New record in case selectedCell in the last row
                                    jexcel.current.insertRow();
                                }
                            }
                        }

                        jexcel.current.down();
                    }
                    e.preventDefault();
                } else if (e.which == 9) {
                    // Tab
                    if (e.shiftKey) {
                        jexcel.current.left();
                    } else {
                        if (jexcel.current.options.allowInsertColumn == true) {
                            if (jexcel.current.options.allowManualInsertColumn == true) {
                                if (jexcel.current.selectedCell[0] == jexcel.current.options.data[0].length - 1) {
                                    // New record in case selectedCell in the last column
                                    jexcel.current.insertColumn();
                                }
                            }
                        }

                        jexcel.current.right();
                    }
                    e.preventDefault();
                } else {
                    if ((e.ctrlKey || e.metaKey) && ! e.shiftKey) {
                        if (e.which == 65) {
                            // Ctrl + A
                            jexcel.current.selectAll();
                            e.preventDefault();
                        } else if (e.which == 83) {
                            // Ctrl + S
                            jexcel.current.download();
                            e.preventDefault();
                        } else if (e.which == 89) {
                            // Ctrl + Y
                            jexcel.current.redo();
                            e.preventDefault();
                        } else if (e.which == 90) {
                            // Ctrl + Z
                            jexcel.current.undo();
                            e.preventDefault();
                        } else if (e.which == 67) {
                            // Ctrl + C
                            jexcel.current.copy(true);
                            e.preventDefault();
                        } else if (e.which == 88) {
                            // Ctrl + X
                            if (jexcel.current.options.editable == true) {
                                jexcel.cutControls();
                            } else {
                                jexcel.copyControls();
                            }
                            e.preventDefault();
                        } else if (e.which == 86) {
                            // Ctrl + V
                            jexcel.pasteControls();
                        }
                    } else {
                        if (jexcel.current.selectedCell) {
                            if (jexcel.current.options.editable == true) {
                                var rowId = jexcel.current.selectedCell[1];
                                var columnId = jexcel.current.selectedCell[0];

                                // If is not readonly
                                if (jexcel.current.options.columns[columnId].type != 'readonly') {
                                    // Characters able to start a edition
                                    if (e.keyCode == 32) {
                                        // Space
                                        e.preventDefault()
                                        if (jexcel.current.options.columns[columnId].type == 'checkbox' ||
                                            jexcel.current.options.columns[columnId].type == 'radio') {
                                            jexcel.current.setCheckRadioValue();
                                        } else {
                                            // Start edition
                                            jexcel.current.openEditor(jexcel.current.records[rowId][columnId], true);
                                        }
                                    } else if (e.keyCode == 113) {
                                        // Start edition with current content F2
                                        jexcel.current.openEditor(jexcel.current.records[rowId][columnId], false);
                                    } else if ((e.keyCode == 8) ||
                                               (e.keyCode >= 48 && e.keyCode <= 57) ||
                                               (e.keyCode >= 96 && e.keyCode <= 111) ||
                                               (e.keyCode >= 187 && e.keyCode <= 190) ||
                                               ((String.fromCharCode(e.keyCode) == e.key || String.fromCharCode(e.keyCode).toLowerCase() == e.key.toLowerCase()) && jexcel.validLetter(String.fromCharCode(e.keyCode)))) {
                                        // Start edition
                                        jexcel.current.openEditor(jexcel.current.records[rowId][columnId], true);
                                        // Prevent entries in the calendar
                                        if (jexcel.current.options.columns[columnId].type == 'calendar') {
                                            e.preventDefault();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (e.target.classList.contains('jexcel_search')) {
                    if (jexcel.timeControl) {
                        clearTimeout(jexcel.timeControl);
                    }

                    jexcel.timeControl = setTimeout(function() {
                        jexcel.current.search(e.target.value);
                    }, 200);
                }
            }
        }
    }

    jexcel.isMouseAction = false;

    jexcel.mouseDownControls = function(e) {
        e = e || window.event;
        if (e.buttons) {
            var mouseButton = e.buttons;
        } else if (e.button) {
            var mouseButton = e.button;
        } else {
            var mouseButton = e.which;
        }

        // Get elements
        var jexcelTable = jexcel.getElement(e.target);

        if (jexcelTable[0]) {
            if (jexcel.current != jexcelTable[0].jexcel) {
                if (jexcel.current) {
                    if (jexcel.current.edition) {
                        jexcel.current.closeEditor(jexcel.current.edition[0], true);
                    }
                    jexcel.current.resetSelection();
                }
                jexcel.current = jexcelTable[0].jexcel;
            }
        } else {
            if (jexcel.current) {
                if (jexcel.current.edition) {
                    jexcel.current.closeEditor(jexcel.current.edition[0], true);
                }

                jexcel.current.resetSelection(true);
                jexcel.current = null;
            }
        }

        if (jexcel.current && mouseButton == 1) {
            if (e.target.classList.contains('jexcel_selectall')) {
                if (jexcel.current) {
                    jexcel.current.selectAll();
                }
            } else if (e.target.classList.contains('jexcel_corner')) {
                if (jexcel.current.options.editable == true) {
                    jexcel.current.selectedCorner = true;
                }
            } else {
                // Header found
                if (jexcelTable[1] == 1) {
                    var columnId = e.target.getAttribute('data-x');
                    if (columnId) {
                        // Update cursor
                        var info = e.target.getBoundingClientRect();
                        if (jexcel.current.options.columnResize == true && info.width - e.offsetX < 6) {
                            // Resize helper
                            jexcel.current.resizing = {
                                mousePosition: e.pageX,
                                column: columnId,
                                width: info.width,
                            };

                            // Border indication
                            jexcel.current.headers[columnId].classList.add('resizing');
                            for (var j = 0; j < jexcel.current.records.length; j++) {
                                if (jexcel.current.records[j][columnId]) {
                                    jexcel.current.records[j][columnId].classList.add('resizing');
                                }
                            }
                        } else if (jexcel.current.options.columnDrag == true && info.height - e.offsetY < 6) {
                            if (jexcel.current.isColMerged(columnId).length) {
                                console.error('Jspreadsheet: This column is part of a merged cell.');
                            } else {
                                // Reset selection
                                jexcel.current.resetSelection();
                                // Drag helper
                                jexcel.current.dragging = {
                                    element: e.target,
                                    column: columnId,
                                    destination: columnId,
                                };
                                // Border indication
                                jexcel.current.headers[columnId].classList.add('dragging');
                                for (var j = 0; j < jexcel.current.records.length; j++) {
                                    if (jexcel.current.records[j][columnId]) {
                                        jexcel.current.records[j][columnId].classList.add('dragging');
                                    }
                                }
                            }
                        } else {
                            if (jexcel.current.selectedHeader && (e.shiftKey || e.ctrlKey)) {
                                var o = jexcel.current.selectedHeader;
                                var d = columnId;
                            } else {
                                // Press to rename
                                if (jexcel.current.selectedHeader == columnId && jexcel.current.options.allowRenameColumn == true) {
                                    jexcel.timeControl = setTimeout(function() {
                                        jexcel.current.setHeader(columnId);
                                    }, 800);
                                }

                                // Keep track of which header was selected first
                                jexcel.current.selectedHeader = columnId;

                                // Update selection single column
                                var o = columnId;
                                var d = columnId;
                            }

                            // Update selection
                            jexcel.current.updateSelectionFromCoords(o, 0, d, jexcel.current.options.data.length - 1);
                        }
                    } else {
                        if (e.target.parentNode.classList.contains('jexcel_nested')) {
                            if (e.target.getAttribute('data-column')) {
                                var column = e.target.getAttribute('data-column').split(',');
                                var c1 = parseInt(column[0]);
                                var c2 = parseInt(column[column.length-1]);
                            } else {
                                var c1 = 0;
                                var c2 = jexcel.current.options.columns.length - 1;
                            }
                            jexcel.current.updateSelectionFromCoords(c1, 0, c2, jexcel.current.options.data.length - 1);
                        }
                    }
                } else {
                    jexcel.current.selectedHeader = false;
                }

                // Body found
                if (jexcelTable[1] == 2) {
                    var rowId = e.target.getAttribute('data-y');

                    if (e.target.classList.contains('jexcel_row')) {
                        var info = e.target.getBoundingClientRect();
                        if (jexcel.current.options.rowResize == true && info.height - e.offsetY < 6) {
                            // Resize helper
                            jexcel.current.resizing = {
                                element: e.target.parentNode,
                                mousePosition: e.pageY,
                                row: rowId,
                                height: info.height,
                            };
                            // Border indication
                            e.target.parentNode.classList.add('resizing');
                        } else if (jexcel.current.options.rowDrag == true && info.width - e.offsetX < 6) {
                            if (jexcel.current.isRowMerged(rowId).length) {
                                console.error('Jspreadsheet: This row is part of a merged cell');
                            } else if (jexcel.current.options.search == true && jexcel.current.results) {
                                console.error('Jspreadsheet: Please clear your search before perform this action');
                            } else {
                                // Reset selection
                                jexcel.current.resetSelection();
                                // Drag helper
                                jexcel.current.dragging = {
                                    element: e.target.parentNode,
                                    row:rowId,
                                    destination:rowId,
                                };
                                // Border indication
                                e.target.parentNode.classList.add('dragging');
                            }
                        } else {
                            if (jexcel.current.selectedRow && (e.shiftKey || e.ctrlKey)) {
                                var o = jexcel.current.selectedRow;
                                var d = rowId;
                            } else {
                                // Keep track of which header was selected first
                                jexcel.current.selectedRow = rowId;

                                // Update selection single column
                                var o = rowId;
                                var d = rowId;
                            }

                            // Update selection
                            jexcel.current.updateSelectionFromCoords(0, o, jexcel.current.options.data[0].length - 1, d);
                        }
                    } else {
                        // Jclose
                        if (e.target.classList.contains('jclose') && e.target.clientWidth - e.offsetX < 50 && e.offsetY < 50) {
                            jexcel.current.closeEditor(jexcel.current.edition[0], true);
                        } else {
                            var getCellCoords = function(element) {
                                var x = element.getAttribute('data-x');
                                var y = element.getAttribute('data-y');
                                if (x && y) {
                                    return [x, y];
                                } else {
                                    if (element.parentNode) {
                                        return getCellCoords(element.parentNode);
                                    }
                                }
                            };

                            var position = getCellCoords(e.target);
                            if (position) {

                                var columnId = position[0];
                                var rowId = position[1];
                                // Close edition
                                if (jexcel.current.edition) {
                                    if (jexcel.current.edition[2] != columnId || jexcel.current.edition[3] != rowId) {
                                        jexcel.current.closeEditor(jexcel.current.edition[0], true);
                                    }
                                }

                                if (! jexcel.current.edition) {
                                    // Update cell selection
                                    if (e.shiftKey) {
                                        jexcel.current.updateSelectionFromCoords(jexcel.current.selectedCell[0], jexcel.current.selectedCell[1], columnId, rowId);
                                    } else {
                                        jexcel.current.updateSelectionFromCoords(columnId, rowId);
                                    }
                                }

                                // No full row selected
                                jexcel.current.selectedHeader = null;
                                jexcel.current.selectedRow = null;
                            }
                        }
                    }
                } else {
                    jexcel.current.selectedRow = false;
                }

                // Pagination
                if (e.target.classList.contains('jexcel_page')) {
                    if (e.target.textContent == '<') {
                        jexcel.current.page(0);
                    } else if (e.target.textContent == '>') {
                        jexcel.current.page(e.target.getAttribute('title') - 1);
                    } else {
                        jexcel.current.page(e.target.textContent - 1);
                    }
                }
            }

            if (jexcel.current.edition) {
                jexcel.isMouseAction = false;
            } else {
                jexcel.isMouseAction = true;
            }
        } else {
            jexcel.isMouseAction = false;
        }
    }

    jexcel.mouseUpControls = function(e) {
        if (jexcel.current) {
            // Update cell size
            if (jexcel.current.resizing) {
                // Columns to be updated
                if (jexcel.current.resizing.column) {
                    // New width
                    var newWidth = jexcel.current.colgroup[jexcel.current.resizing.column].getAttribute('width');
                    // Columns
                    var columns = jexcel.current.getSelectedColumns();
                    if (columns.length > 1) {
                        var currentWidth = [];
                        for (var i = 0; i < columns.length; i++) {
                            currentWidth.push(parseInt(jexcel.current.colgroup[columns[i]].getAttribute('width')));
                        }
                        // Previous width
                        var index = columns.indexOf(parseInt(jexcel.current.resizing.column));
                        currentWidth[index] = jexcel.current.resizing.width;
                        jexcel.current.setWidth(columns, newWidth, currentWidth);
                    } else {
                        jexcel.current.setWidth(jexcel.current.resizing.column, newWidth, jexcel.current.resizing.width);
                    }
                    // Remove border
                    jexcel.current.headers[jexcel.current.resizing.column].classList.remove('resizing');
                    for (var j = 0; j < jexcel.current.records.length; j++) {
                        if (jexcel.current.records[j][jexcel.current.resizing.column]) {
                            jexcel.current.records[j][jexcel.current.resizing.column].classList.remove('resizing');
                        }
                    }
                } else {
                    // Remove Class
                    jexcel.current.rows[jexcel.current.resizing.row].children[0].classList.remove('resizing');
                    var newHeight = jexcel.current.rows[jexcel.current.resizing.row].getAttribute('height');
                    jexcel.current.setHeight(jexcel.current.resizing.row, newHeight, jexcel.current.resizing.height);
                    // Remove border
                    jexcel.current.resizing.element.classList.remove('resizing');
                }
                // Reset resizing helper
                jexcel.current.resizing = null;
            } else if (jexcel.current.dragging) {
                // Reset dragging helper
                if (jexcel.current.dragging) {
                    if (jexcel.current.dragging.column) {
                        // Target
                        var columnId = e.target.getAttribute('data-x');
                        // Remove move style
                        jexcel.current.headers[jexcel.current.dragging.column].classList.remove('dragging');
                        for (var j = 0; j < jexcel.current.rows.length; j++) {
                            if (jexcel.current.records[j][jexcel.current.dragging.column]) {
                                jexcel.current.records[j][jexcel.current.dragging.column].classList.remove('dragging');
                            }
                        }
                        for (var i = 0; i < jexcel.current.headers.length; i++) {
                            jexcel.current.headers[i].classList.remove('dragging-left');
                            jexcel.current.headers[i].classList.remove('dragging-right');
                        }
                        // Update position
                        if (columnId) {
                            if (jexcel.current.dragging.column != jexcel.current.dragging.destination) {
                                jexcel.current.moveColumn(jexcel.current.dragging.column, jexcel.current.dragging.destination);
                            }
                        }
                    } else {
                        if (jexcel.current.dragging.element.nextSibling) {
                            var position = parseInt(jexcel.current.dragging.element.nextSibling.getAttribute('data-y'));
                            if (jexcel.current.dragging.row < position) {
                                position -= 1;
                            }
                        } else {
                            var position = parseInt(jexcel.current.dragging.element.previousSibling.getAttribute('data-y'));
                        }
                        if (jexcel.current.dragging.row != jexcel.current.dragging.destination) {
                            jexcel.current.moveRow(jexcel.current.dragging.row, position, true);
                        }
                        jexcel.current.dragging.element.classList.remove('dragging');
                    }
                    jexcel.current.dragging = null;
                }
            } else {
                // Close any corner selection
                if (jexcel.current.selectedCorner) {
                    jexcel.current.selectedCorner = false;

                    // Data to be copied
                    if (jexcel.current.selection.length > 0) {
                        // Copy data
                        jexcel.current.copyData(jexcel.current.selection[0], jexcel.current.selection[jexcel.current.selection.length - 1]);

                        // Remove selection
                        jexcel.current.removeCopySelection();
                    }
                }
            }
        }

        // Clear any time control
        if (jexcel.timeControl) {
            clearTimeout(jexcel.timeControl);
            jexcel.timeControl = null;
        }

        // Mouse up
        jexcel.isMouseAction = false;
    }

    // Mouse move controls
    jexcel.mouseMoveControls = function(e) {
        e = e || window.event;
        if (e.buttons) {
            var mouseButton = e.buttons;
        } else if (e.button) {
            var mouseButton = e.button;
        } else {
            var mouseButton = e.which;
        }

        if (! mouseButton) {
            jexcel.isMouseAction = false;
        }

        if (jexcel.current) {
            if (jexcel.isMouseAction == true) {
                // Resizing is ongoing
                if (jexcel.current.resizing) {
                    if (jexcel.current.resizing.column) {
                        var width = e.pageX - jexcel.current.resizing.mousePosition;

                        if (jexcel.current.resizing.width + width > 0) {
                            var tempWidth = jexcel.current.resizing.width + width;
                            jexcel.current.colgroup[jexcel.current.resizing.column].setAttribute('width', tempWidth);

                            jexcel.current.updateCornerPosition();
                        }
                    } else {
                        var height = e.pageY - jexcel.current.resizing.mousePosition;

                        if (jexcel.current.resizing.height + height > 0) {
                            var tempHeight = jexcel.current.resizing.height + height;
                            jexcel.current.rows[jexcel.current.resizing.row].setAttribute('height', tempHeight);

                            jexcel.current.updateCornerPosition();
                        }
                    }
                } else if (jexcel.current.dragging) {
                    if (jexcel.current.dragging.column) {
                        var columnId = e.target.getAttribute('data-x');
                        if (columnId) {

                            if (jexcel.current.isColMerged(columnId).length) {
                                console.error('Jspreadsheet: This column is part of a merged cell.');
                            } else {
                                for (var i = 0; i < jexcel.current.headers.length; i++) {
                                    jexcel.current.headers[i].classList.remove('dragging-left');
                                    jexcel.current.headers[i].classList.remove('dragging-right');
                                }

                                if (jexcel.current.dragging.column == columnId) {
                                    jexcel.current.dragging.destination = parseInt(columnId);
                                } else {
                                    if (e.target.clientWidth / 2 > e.offsetX) {
                                        if (jexcel.current.dragging.column < columnId) {
                                            jexcel.current.dragging.destination = parseInt(columnId) - 1;
                                        } else {
                                            jexcel.current.dragging.destination = parseInt(columnId);
                                        }
                                        jexcel.current.headers[columnId].classList.add('dragging-left');
                                    } else {
                                        if (jexcel.current.dragging.column < columnId) {
                                            jexcel.current.dragging.destination = parseInt(columnId);
                                        } else {
                                            jexcel.current.dragging.destination = parseInt(columnId) + 1;
                                        }
                                        jexcel.current.headers[columnId].classList.add('dragging-right');
                                    }
                                }
                            }
                        }
                    } else {
                        var rowId = e.target.getAttribute('data-y');
                        if (rowId) {
                            if (jexcel.current.isRowMerged(rowId).length) {
                                console.error('Jspreadsheet: This row is part of a merged cell.');
                            } else {
                                var target = (e.target.clientHeight / 2 > e.offsetY) ? e.target.parentNode.nextSibling : e.target.parentNode;
                                if (jexcel.current.dragging.element != target) {
                                    e.target.parentNode.parentNode.insertBefore(jexcel.current.dragging.element, target);
                                    jexcel.current.dragging.destination = Array.prototype.indexOf.call(jexcel.current.dragging.element.parentNode.children, jexcel.current.dragging.element);
                                }
                            }
                        }
                    }
                }
            } else {
                var x = e.target.getAttribute('data-x');
                var y = e.target.getAttribute('data-y');
                var rect = e.target.getBoundingClientRect();

                if (jexcel.current.cursor) {
                    jexcel.current.cursor.style.cursor = '';
                    jexcel.current.cursor = null;
                }

                if (e.target.parentNode.parentNode && e.target.parentNode.parentNode.className) {
                    if (e.target.parentNode.parentNode.classList.contains('resizable')) {
                        if (e.target && x && ! y && (rect.width - (e.clientX - rect.left) < 6)) {
                            jexcel.current.cursor = e.target;
                            jexcel.current.cursor.style.cursor = 'col-resize';
                        } else if (e.target && ! x && y && (rect.height - (e.clientY - rect.top) < 6)) {
                            jexcel.current.cursor = e.target;
                            jexcel.current.cursor.style.cursor = 'row-resize';
                        }
                    }

                    if (e.target.parentNode.parentNode.classList.contains('draggable')) {
                        if (e.target && ! x && y && (rect.width - (e.clientX - rect.left) < 6)) {
                            jexcel.current.cursor = e.target;
                            jexcel.current.cursor.style.cursor = 'move';
                        } else if (e.target && x && ! y && (rect.height - (e.clientY - rect.top) < 6)) {
                            jexcel.current.cursor = e.target;
                            jexcel.current.cursor.style.cursor = 'move';
                        }
                    }
                }
            }
        }
    }

    jexcel.mouseOverControls = function(e) {
        e = e || window.event;
        if (e.buttons) {
            var mouseButton = e.buttons;
        } else if (e.button) {
            var mouseButton = e.button;
        } else {
            var mouseButton = e.which;
        }

        if (! mouseButton) {
            jexcel.isMouseAction = false;
        }

        if (jexcel.current && jexcel.isMouseAction == true) {
            // Get elements
            var jexcelTable = jexcel.getElement(e.target);

            if (jexcelTable[0]) {
                // Avoid cross reference
                if (jexcel.current != jexcelTable[0].jexcel) {
                    if (jexcel.current) {
                        return false;
                    }
                }

                var columnId = e.target.getAttribute('data-x');
                var rowId = e.target.getAttribute('data-y');
                if (jexcel.current.resizing || jexcel.current.dragging) {
                } else {
                    // Header found
                    if (jexcelTable[1] == 1) {
                        if (jexcel.current.selectedHeader) {
                            var columnId = e.target.getAttribute('data-x');
                            var o = jexcel.current.selectedHeader;
                            var d = columnId;
                            // Update selection
                            jexcel.current.updateSelectionFromCoords(o, 0, d, jexcel.current.options.data.length - 1);
                        }
                    }

                    // Body found
                    if (jexcelTable[1] == 2) {
                        if (e.target.classList.contains('jexcel_row')) {
                            if (jexcel.current.selectedRow) {
                                var o = jexcel.current.selectedRow;
                                var d = rowId;
                                // Update selection
                                jexcel.current.updateSelectionFromCoords(0, o, jexcel.current.options.data[0].length - 1, d);
                            }
                        } else {
                            // Do not select edtion is in progress
                            if (! jexcel.current.edition) {
                                if (columnId && rowId) {
                                    if (jexcel.current.selectedCorner) {
                                        jexcel.current.updateCopySelection(columnId, rowId);
                                    } else {
                                        if (jexcel.current.selectedCell) {
                                            jexcel.current.updateSelectionFromCoords(jexcel.current.selectedCell[0], jexcel.current.selectedCell[1], columnId, rowId);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // Clear any time control
        if (jexcel.timeControl) {
            clearTimeout(jexcel.timeControl);
            jexcel.timeControl = null;
        }
    }

    /**
     * Double click event handler: controls the double click in the corner, cell edition or column re-ordering.
     */
    jexcel.doubleClickControls = function(e) {
        // Jexcel is selected
        if (jexcel.current) {
            // Corner action
            if (e.target.classList.contains('jexcel_corner')) {
                // Any selected cells
                if (jexcel.current.highlighted.length > 0) {
                    // Copy from this
                    var x1 = jexcel.current.highlighted[0].getAttribute('data-x');
                    var y1 = parseInt(jexcel.current.highlighted[jexcel.current.highlighted.length - 1].getAttribute('data-y')) + 1;
                    // Until this
                    var x2 = jexcel.current.highlighted[jexcel.current.highlighted.length - 1].getAttribute('data-x');
                    var y2 = jexcel.current.records.length - 1
                    // Execute copy
                    jexcel.current.copyData(jexcel.current.records[y1][x1], jexcel.current.records[y2][x2]);
                }
            } else if (e.target.classList.contains('jexcel_column_filter')) {
                // Column
                var columnId = e.target.getAttribute('data-x');
                // Open filter
                jexcel.current.openFilter(columnId);

            } else {
                // Get table
                var jexcelTable = jexcel.getElement(e.target);

                // Double click over header
                if (jexcelTable[1] == 1 && jexcel.current.options.columnSorting == true) {
                    // Check valid column header coords
                    var columnId = e.target.getAttribute('data-x');
                    if (columnId) {
                        jexcel.current.orderBy(columnId);
                    }
                }

                // Double click over body
                if (jexcelTable[1] == 2 && jexcel.current.options.editable == true) {
                    if (! jexcel.current.edition) {
                        var getCellCoords = function(element) {
                            if (element.parentNode) {
                                var x = element.getAttribute('data-x');
                                var y = element.getAttribute('data-y');
                                if (x && y) {
                                    return element;
                                } else {
                                    return getCellCoords(element.parentNode);
                                }
                            }
                        }
                        var cell = getCellCoords(e.target);
                        if (cell && cell.classList.contains('highlight')) {
                            jexcel.current.openEditor(cell);
                        }
                    }
                }
            }
        }
    }

    jexcel.copyControls = function(e) {
        if (jexcel.current && jexcel.copyControls.enabled) {
            if (! jexcel.current.edition) {
                jexcel.current.copy(true);
            }
        }
    }

    jexcel.cutControls = function(e) {
        if (jexcel.current) {
            if (! jexcel.current.edition) {
                jexcel.current.copy(true);
                if (jexcel.current.options.editable == true) {
                    jexcel.current.setValue(jexcel.current.highlighted, '');
                }
            }
        }
    }

    jexcel.pasteControls = function(e) {
        if (jexcel.current && jexcel.current.selectedCell) {
            if (! jexcel.current.edition) {
                if (jexcel.current.options.editable == true) {
                    if (e && e.clipboardData) {
                        jexcel.current.paste(jexcel.current.selectedCell[0], jexcel.current.selectedCell[1], e.clipboardData.getData('text'));
                        e.preventDefault();
                    } else if (window.clipboardData) {
                        jexcel.current.paste(jexcel.current.selectedCell[0], jexcel.current.selectedCell[1], window.clipboardData.getData('text'));
                    }
                }
            }
        }
    }

    jexcel.contextMenuControls = function(e) {
        e = e || window.event;
        if ("buttons" in e) {
            var mouseButton = e.buttons;
        } else {
            var mouseButton = e.which || e.button;
        }

        if (jexcel.current) {
            if (jexcel.current.edition) {
                e.preventDefault();
            } else if (jexcel.current.options.contextMenu) {
                jexcel.current.contextMenu.contextmenu.close();

                if (jexcel.current) {
                    var x = e.target.getAttribute('data-x');
                    var y = e.target.getAttribute('data-y');

                    if (x || y) {
                        if ((x < parseInt(jexcel.current.selectedCell[0])) || (x > parseInt(jexcel.current.selectedCell[2])) ||
                            (y < parseInt(jexcel.current.selectedCell[1])) || (y > parseInt(jexcel.current.selectedCell[3])))
                        {
                            jexcel.current.updateSelectionFromCoords(x, y, x, y);
                        }

                        // Table found
                        var items = jexcel.current.options.contextMenu(jexcel.current, x, y, e);
                        // The id is depending on header and body
                        jexcel.current.contextMenu.contextmenu.open(e, items);
                        // Avoid the real one
                        e.preventDefault();
                    }
                }
            }
        }
    }

    jexcel.touchStartControls = function(e) {
        var jexcelTable = jexcel.getElement(e.target);

        if (jexcelTable[0]) {
            if (jexcel.current != jexcelTable[0].jexcel) {
                if (jexcel.current) {
                    jexcel.current.resetSelection();
                }
                jexcel.current = jexcelTable[0].jexcel;
            }
        } else {
            if (jexcel.current) {
                jexcel.current.resetSelection();
                jexcel.current = null;
            }
        }

        if (jexcel.current) {
            if (! jexcel.current.edition) {
                var columnId = e.target.getAttribute('data-x');
                var rowId = e.target.getAttribute('data-y');

                if (columnId && rowId) {
                    jexcel.current.updateSelectionFromCoords(columnId, rowId);

                    jexcel.timeControl = setTimeout(function() {
                        // Keep temporary reference to the element
                        if (jexcel.current.options.columns[columnId].type == 'color') {
                            jexcel.tmpElement = null;
                        } else {
                            jexcel.tmpElement = e.target;
                        }
                        jexcel.current.openEditor(e.target, false, e);
                    }, 500);
                }
            }
        }
    }

    jexcel.touchEndControls = function(e) {
        // Clear any time control
        if (jexcel.timeControl) {
            clearTimeout(jexcel.timeControl);
            jexcel.timeControl = null;
            // Element
            if (jexcel.tmpElement && jexcel.tmpElement.children[0].tagName == 'INPUT') {
                jexcel.tmpElement.children[0].focus();
            }
            jexcel.tmpElement = null;
        }
    }

    /**
     * Jexcel extensions
     */

    jexcel.tabs = function(tabs, result) {
        var instances = [];
        // Create tab container
        if (! tabs.classList.contains('jexcel_tabs')) {
            tabs.innerHTML = '';
            tabs.classList.add('jexcel_tabs')
            tabs.jexcel = [];

            var div = document.createElement('div');
            var headers = tabs.appendChild(div);
            var div = document.createElement('div');
            var content = tabs.appendChild(div);
        } else {
            var headers = tabs.children[0];
            var content = tabs.children[1];
        }

        var spreadsheet = []
        var link = [];
        for (var i = 0; i < result.length; i++) {
            // Spreadsheet container
            spreadsheet[i] = document.createElement('div');
            spreadsheet[i].classList.add('jexcel_tab');
            var worksheet = jexcel(spreadsheet[i], result[i]);
            content.appendChild(spreadsheet[i]);
            instances[i] = tabs.jexcel.push(worksheet);

            // Tab link
            link[i] = document.createElement('div');
            link[i].classList.add('jexcel_tab_link');
            link[i].setAttribute('data-spreadsheet', tabs.jexcel.length-1);
            link[i].innerHTML = result[i].sheetName;
            link[i].onclick = function() {
                for (var j = 0; j < headers.children.length; j++) {
                    headers.children[j].classList.remove('selected');
                    content.children[j].style.display = 'none';
                }
                var i = this.getAttribute('data-spreadsheet');
                content.children[i].style.display = 'block';
                headers.children[i].classList.add('selected')
            }
            headers.appendChild(link[i]);
        }

        // First tab
        for (var j = 0; j < headers.children.length; j++) {
            headers.children[j].classList.remove('selected');
            content.children[j].style.display = 'none';
        }
        headers.children[headers.children.length - 1].classList.add('selected');
        content.children[headers.children.length - 1].style.display = 'block';

        return instances;
    }

    // Compability to older versions
    jexcel.createTabs = jexcel.tabs;

    jexcel.fromSpreadsheet = function(file, __callback) {
        var convert = function(workbook) {
            var spreadsheets = [];
            workbook.SheetNames.forEach(function(sheetName) {
                var spreadsheet = {};
                spreadsheet.rows = [];
                spreadsheet.columns = [];
                spreadsheet.data = [];
                spreadsheet.style = {};
                spreadsheet.sheetName = sheetName;

                // Column widths
                var temp = workbook.Sheets[sheetName]['!cols'];
                if (temp && temp.length) {
                    for (var i = 0; i < temp.length; i++) {
                        spreadsheet.columns[i] = {};
                        if (temp[i] && temp[i].wpx) {
                            spreadsheet.columns[i].width = temp[i].wpx + 'px';
                        }
                     }
                }
                // Rows heights
                var temp = workbook.Sheets[sheetName]['!rows'];
                if (temp && temp.length) {
                    for (var i = 0; i < temp.length; i++) {
                        if (temp[i] && temp[i].hpx) {
                            spreadsheet.rows[i] = {};
                            spreadsheet.rows[i].height = temp[i].hpx + 'px';
                        }
                    }
                }
                // Merge cells
                var temp = workbook.Sheets[sheetName]['!merges'];
                if (temp && temp.length > 0) {
                    spreadsheet.mergeCells = [];
                    for (var i = 0; i < temp.length; i++) {
                        var x1 = temp[i].s.c;
                        var y1 = temp[i].s.r;
                        var x2 = temp[i].e.c;
                        var y2 = temp[i].e.r;
                        var key = jexcel.getColumnNameFromId([x1,y1]);
                        spreadsheet.mergeCells[key] = [ x2-x1+1, y2-y1+1 ];
                    }
                }
                // Data container
                var max_x = 0;
                var max_y = 0;
                var temp = Object.keys(workbook.Sheets[sheetName]);
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i].substr(0,1) != '!') {
                        var cell = workbook.Sheets[sheetName][temp[i]];
                        var info = jexcel.getIdFromColumnName(temp[i], true);
                        if (! spreadsheet.data[info[1]]) {
                            spreadsheet.data[info[1]] = [];
                        }
                        spreadsheet.data[info[1]][info[0]] = cell.f ? '=' + cell.f : cell.w;
                        if (max_x < info[0]) {
                            max_x = info[0];
                        }
                        if (max_y < info[1]) {
                            max_y = info[1];
                        }
                        // Style
                        if (cell.style && Object.keys(cell.style).length > 0) {
                            spreadsheet.style[temp[i]] = cell.style;
                        }
                        if (cell.s && cell.s.fgColor) {
                            if (spreadsheet.style[temp[i]]) {
                                spreadsheet.style[temp[i]] += ';';
                            }
                            spreadsheet.style[temp[i]] += 'background-color:#' + cell.s.fgColor.rgb;
                        }
                    }
                }
                var numColumns = spreadsheet.columns;
                for (var j = 0; j <= max_y; j++) {
                    for (var i = 0; i <= max_x; i++) {
                        if (! spreadsheet.data[j]) {
                            spreadsheet.data[j] = [];
                        }
                        if (! spreadsheet.data[j][i]) {
                            if (numColumns < i) {
                                spreadsheet.data[j][i] = '';
                            }
                        }
                    }
                }
                spreadsheets.push(spreadsheet);
            });

            return spreadsheets;
        }

        var oReq;
        oReq = new XMLHttpRequest();
        oReq.open("GET", file, true);

        if(typeof Uint8Array !== 'undefined') {
            oReq.responseType = "arraybuffer";
            oReq.onload = function(e) {
                var arraybuffer = oReq.response;
                var data = new Uint8Array(arraybuffer);
                var wb = XLSX.read(data, {type:"array", cellFormula:true, cellStyles:true });
                __callback(convert(wb))
            };
        } else {
            oReq.setRequestHeader("Accept-Charset", "x-user-defined");
            oReq.onreadystatechange = function() { if(oReq.readyState == 4 && oReq.status == 200) {
                var ff = convertResponseBodyToText(oReq.responseBody);
                var wb = XLSX.read(ff, {type:"binary", cellFormula:true, cellStyles:true });
                __callback(convert(wb))
            }};
        }

        oReq.send();
    }

    /**
     * Valid international letter
     */

    jexcel.validLetter = function (text) {
        var regex = /([\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC-\u0400-\u04FF']+)/g;
        return text.match(regex) ? 1 : 0;
    }

    /**
     * Helper injectArray
     */
    jexcel.injectArray = function(o, idx, arr) {
        return o.slice(0, idx).concat(arr).concat(o.slice(idx));
    }

    /**
     * Get letter based on a number
     *
     * @param integer i
     * @return string letter
     */
    jexcel.getColumnName = function(i) {
        var letter = '';
        if (i > 701) {
            letter += String.fromCharCode(64 + parseInt(i / 676));
            letter += String.fromCharCode(64 + parseInt((i % 676) / 26));
        } else if (i > 25) {
            letter += String.fromCharCode(64 + parseInt(i / 26));
        }
        letter += String.fromCharCode(65 + (i % 26));

        return letter;
    }

    /**
     * Convert excel like column to jexcel id
     *
     * @param string id
     * @return string id
     */
    jexcel.getIdFromColumnName = function (id, arr) {
        // Get the letters
        var t = /^[a-zA-Z]+/.exec(id);

        if (t) {
            // Base 26 calculation
            var code = 0;
            for (var i = 0; i < t[0].length; i++) {
                code += parseInt(t[0].charCodeAt(i) - 64) * Math.pow(26, (t[0].length - 1 - i));
            }
            code--;
            // Make sure jexcel starts on zero
            if (code < 0) {
                code = 0;
            }

            // Number
            var number = parseInt(/[0-9]+$/.exec(id));
            if (number > 0) {
                number--;
            }

            if (arr == true) {
                id = [ code, number ];
            } else {
                id = code + '-' + number;
            }
        }

        return id;
    }

    /**
     * Convert jexcel id to excel like column name
     *
     * @param string id
     * @return string id
     */
    jexcel.getColumnNameFromId = function (cellId) {
        if (! Array.isArray(cellId)) {
            cellId = cellId.split('-');
        }

        return jexcel.getColumnName(parseInt(cellId[0])) + (parseInt(cellId[1]) + 1);
    }

    /**
     * Verify element inside jexcel table
     *
     * @param string id
     * @return string id
     */
    jexcel.getElement = function(element) {
        var jexcelSection = 0;
        var jexcelElement = 0;

        function path (element) {
            if (element.className) {
                if (element.classList.contains('jexcel_container')) {
                    jexcelElement = element;
                }
            }

            if (element.tagName == 'THEAD') {
                jexcelSection = 1;
            } else if (element.tagName == 'TBODY') {
                jexcelSection = 2;
            }

            if (element.parentNode) {
                if (! jexcelElement) {
                    path(element.parentNode);
                }
            }
        }

        path(element);

        return [ jexcelElement, jexcelSection ];
    }

    jexcel.doubleDigitFormat = function(v) {
        v = ''+v;
        if (v.length == 1) {
            v = '0'+v;
        }
        return v;
    }

    jexcel.createFromTable = function(el, options) {
        if (el.tagName != 'TABLE') {
            console.log('Element is not a table');
        } else {
            // Configuration
            if (! options) {
                options = {};
            }
            options.columns = [];
            options.data = [];

            // Colgroup
            var colgroup = el.querySelectorAll('colgroup > col');
            if (colgroup.length) {
                // Get column width
                for (var i = 0; i < colgroup.length; i++) {
                    var width = colgroup[i].style.width;
                    if (! width) {
                        var width = colgroup[i].getAttribute('width');
                    }
                    // Set column width
                    if (width) {
                        if (! options.columns[i]) {
                            options.columns[i] = {}
                        }
                        options.columns[i].width = width;
                    }
                }
            }

            // Parse header
            var parseHeader = function(header) {
                // Get width information
                var info = header.getBoundingClientRect();
                var width = info.width > 50 ? info.width : 50;

                // Create column option
                if (! options.columns[i]) {
                    options.columns[i] = {};
                }
                if (header.getAttribute('data-celltype')) {
                    options.columns[i].type = header.getAttribute('data-celltype');
                } else {
                    options.columns[i].type = 'text';
                }
                options.columns[i].width = width + 'px';
                options.columns[i].title = header.innerHTML;
                options.columns[i].align = header.style.textAlign || 'center';

                if (info = header.getAttribute('name')) {
                    options.columns[i].name = info;
                }
                if (info = header.getAttribute('id')) {
                    options.columns[i].id = info;
                }
                if (info = header.getAttribute('data-mask')) {
                    options.columns[i].mask = info;
                }
            }

            // Headers
            var nested = [];
            var headers = el.querySelectorAll(':scope > thead > tr');
            if (headers.length) {
                for (var j = 0; j < headers.length - 1; j++) {
                    var cells = [];
                    for (var i = 0; i < headers[j].children.length; i++) {
                        var row = {
                            title: headers[j].children[i].textContent,
                            colspan: headers[j].children[i].getAttribute('colspan') || 1,
                        };
                        cells.push(row);
                    }
                    nested.push(cells);
                }
                // Get the last row in the thead
                headers = headers[headers.length-1].children;
                // Go though the headers
                for (var i = 0; i < headers.length; i++) {
                    parseHeader(headers[i]);
                }
            }

            // Content
            var rowNumber = 0;
            var mergeCells = {};
            var rows = {};
            var style = {};
            var classes = {};

            var content = el.querySelectorAll(':scope > tr, :scope > tbody > tr');
            for (var j = 0; j < content.length; j++) {
                options.data[rowNumber] = [];
                if (options.parseTableFirstRowAsHeader == true && ! headers.length && j == 0) {
                    for (var i = 0; i < content[j].children.length; i++) {
                        parseHeader(content[j].children[i]);
                    }
                } else {
                    for (var i = 0; i < content[j].children.length; i++) {
                        // WickedGrid formula compatibility
                        var value = content[j].children[i].getAttribute('data-formula');
                        if (value) {
                            if (value.substr(0,1) != '=') {
                                value = '=' + value;
                            }
                        } else {
                            var value = content[j].children[i].innerHTML;
                        }
                        options.data[rowNumber].push(value);

                        // Key
                        var cellName = jexcel.getColumnNameFromId([ i, j ]);

                        // Classes
                        var tmp = content[j].children[i].getAttribute('class');
                        if (tmp) {
                            classes[cellName] = tmp;
                        }

                        // Merged cells
                        var mergedColspan = parseInt(content[j].children[i].getAttribute('colspan')) || 0;
                        var mergedRowspan = parseInt(content[j].children[i].getAttribute('rowspan')) || 0;
                        if (mergedColspan || mergedRowspan) {
                            mergeCells[cellName] = [ mergedColspan || 1, mergedRowspan || 1 ];
                        }

                        // Avoid problems with hidden cells
                        if (s = content[j].children[i].style && content[j].children[i].style.display == 'none') {
                            content[j].children[i].style.display = '';
                        }
                        // Get style
                        var s = content[j].children[i].getAttribute('style');
                        if (s) {
                            style[cellName] = s;
                        }
                        // Bold
                        if (content[j].children[i].classList.contains('styleBold')) {
                            if (style[cellName]) {
                                style[cellName] += '; font-weight:bold;';
                            } else {
                                style[cellName] = 'font-weight:bold;';
                            }
                        }
                    }

                    // Row Height
                    if (content[j].style && content[j].style.height) {
                        rows[j] = { height: content[j].style.height };
                    }

                    // Index
                    rowNumber++;
                }
            }

            // Nested
            if (Object.keys(nested).length > 0) {
                options.nestedHeaders = nested;
            }
            // Style
            if (Object.keys(style).length > 0) {
                options.style = style;
            }
            // Merged
            if (Object.keys(mergeCells).length > 0) {
                options.mergeCells = mergeCells;
            }
            // Row height
            if (Object.keys(rows).length > 0) {
                options.rows = rows;
            }
            // Classes
            if (Object.keys(classes).length > 0) {
                options.classes = classes;
            }

            var content = el.querySelectorAll('tfoot tr');
            if (content.length) {
                var footers = [];
                for (var j = 0; j < content.length; j++) {
                    var footer = [];
                    for (var i = 0; i < content[j].children.length; i++) {
                        footer.push(content[j].children[i].textContent);
                    }
                    footers.push(footer);
                }
                if (Object.keys(footers).length > 0) {
                    options.footers = footers;
                }
            }
            // TODO: data-hiddencolumns="3,4"

            // I guess in terms the better column type
            if (options.parseTableAutoCellType == true) {
                var pattern = [];
                for (var i = 0; i < options.columns.length; i++) {
                    var test = true;
                    var testCalendar = true;
                    pattern[i] = [];
                    for (var j = 0; j < options.data.length; j++) {
                        var value = options.data[j][i];
                        if (! pattern[i][value]) {
                            pattern[i][value] = 0;
                        }
                        pattern[i][value]++;
                        if (value.length > 25) {
                            test = false;
                        }
                        if (value.length == 10) {
                            if (! (value.substr(4,1) == '-' && value.substr(7,1) == '-')) {
                                testCalendar = false;
                            }
                        } else {
                            testCalendar = false;
                        }
                    }

                    var keys = Object.keys(pattern[i]).length;
                    if (testCalendar) {
                        options.columns[i].type = 'calendar';
                    } else if (test == true && keys > 1 && keys <= parseInt(options.data.length * 0.1)) {
                        options.columns[i].type = 'dropdown';
                        options.columns[i].source = Object.keys(pattern[i]);
                    }
                }
            }

            return options;
        }
    }

    // Helpers
    jexcel.helpers = (function() {
        var component = {};

        /**
         * Get carret position for one element
         */
        component.getCaretIndex = function(e) {
            if (this.config.root) {
                var d = this.config.root;
            } else {
                var d = window;
            }
            var pos = 0;
            var s = d.getSelection();
            if (s) {
                if (s.rangeCount !== 0) {
                    var r = s.getRangeAt(0);
                    var p = r.cloneRange();
                    p.selectNodeContents(e);
                    p.setEnd(r.endContainer, r.endOffset);
                    pos = p.toString().length;
                }
            }
            return pos;
        }

        /**
         * Invert keys and values
         */
        component.invert = function(o) {
            var d = [];
            var k = Object.keys(o);
            for (var i = 0; i < k.length; i++) {
                d[o[k[i]]] = k[i];
            }
            return d;
        }

        /**
         * Get letter based on a number
         *
         * @param integer i
         * @return string letter
         */
        component.getColumnName = function(i) {
            var letter = '';
            if (i > 701) {
                letter += String.fromCharCode(64 + parseInt(i / 676));
                letter += String.fromCharCode(64 + parseInt((i % 676) / 26));
            } else if (i > 25) {
                letter += String.fromCharCode(64 + parseInt(i / 26));
            }
            letter += String.fromCharCode(65 + (i % 26));

            return letter;
        }

        /**
         * Get column name from coords
         */
        component.getColumnNameFromCoords = function(x, y) {
            return component.getColumnName(parseInt(x)) + (parseInt(y) + 1);
        }

        component.getCoordsFromColumnName = function(columnName) {
            // Get the letters
            var t = /^[a-zA-Z]+/.exec(columnName);

            if (t) {
                // Base 26 calculation
                var code = 0;
                for (var i = 0; i < t[0].length; i++) {
                    code += parseInt(t[0].charCodeAt(i) - 64) * Math.pow(26, (t[0].length - 1 - i));
                }
                code--;
                // Make sure jspreadsheet starts on zero
                if (code < 0) {
                    code = 0;
                }

                // Number
                var number = parseInt(/[0-9]+$/.exec(columnName)) || null;
                if (number > 0) {
                    number--;
                }

                return [ code, number ];
            }
        }

        /**
         * Extract json configuration from a TABLE DOM tag
         */
        component.createFromTable = function() {}

        /**
         * Helper injectArray
         */
        component.injectArray = function(o, idx, arr) {
            return o.slice(0, idx).concat(arr).concat(o.slice(idx));
        }

        /**
         * Parse CSV string to JS array
         */
        component.parseCSV = function(str, delimiter) {
            // user-supplied delimeter or default comma
            delimiter = (delimiter || ",");

            // Final data
            var col = 0;
            var row = 0;
            var num = 0;
            var data = [[]];
            var limit = 0;
            var flag = null;
            var inside = false;
            var closed = false;

            // Go over all chars
            for (var i = 0; i < str.length; i++) {
                // Create new row
                if (! data[row]) {
                    data[row] = [];
                }
                // Create new column
                if (! data[row][col]) {
                    data[row][col] = '';
                }

                // Ignore
                if (str[i] == '\r') {
                    continue;
                }

                // New row
                if ((str[i] == '\n' || str[i] == delimiter) && (inside == false || closed == true || ! flag)) {
                    // Restart flags
                    flag = null;
                    inside = false;
                    closed = false;

                    if (data[row][col][0] == '"') {
                        var val = data[row][col].trim();
                        if (val[val.length-1] == '"') {
                            data[row][col] = val.substr(1, val.length-2);
                        }
                    }

                    // Go to the next cell
                    if (str[i] == '\n') {
                        // New line
                        col = 0;
                        row++;
                    } else {
                        // New column
                        col++;
                        if (col > limit) {
                            // Keep the reference of max column
                            limit = col;
                        }
                    }
                } else {
                    // Inside quotes
                    if (str[i] == '"') {
                        inside = ! inside;
                    }

                    if (flag === null) {
                        flag = inside;
                        if (flag == true) {
                            continue;
                        }
                    } else if (flag === true && ! closed) {
                        if (str[i] == '"') {
                            if (str[i+1] == '"') {
                                inside = true;
                                data[row][col] += str[i];
                                i++;
                            } else {
                                closed = true;
                            }
                            continue;
                        }
                    }

                    data[row][col] += str[i];
                }
            }

            // Make sure a square matrix is generated
            for (var j = 0; j < data.length; j++) {
                for (var i = 0; i <= limit; i++) {
                    if (data[j][i] === undefined) {
                        data[j][i] = '';
                    }
                }
            }

            return data;
        }

        return component;
    })();

    /**
     * Jquery Support
     */
    if (typeof(jQuery) != 'undefined') {
        (function($){
            $.fn.jspreadsheet = $.fn.jexcel = function(mixed) {
                var spreadsheetContainer = $(this).get(0);
                if (! spreadsheetContainer.jexcel) {
                    return jexcel($(this).get(0), arguments[0]);
                } else {
                    if (Array.isArray(spreadsheetContainer.jexcel)) {
                        return spreadsheetContainer.jexcel[mixed][arguments[1]].apply(this, Array.prototype.slice.call( arguments, 2 ));
                    } else {
                        return spreadsheetContainer.jexcel[mixed].apply(this, Array.prototype.slice.call( arguments, 1 ));
                    }
                }
            };

        })(jQuery);
    }

    return jexcel;
})));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(138);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});