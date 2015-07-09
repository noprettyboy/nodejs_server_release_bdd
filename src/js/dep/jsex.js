/**
 * @file: js-ex, to extend ecma5
 * @author: wenghanyi
 */

if (! Date.prototype.format) {
    Object.defineProperty(Date.prototype, 'format',
        {
            enumerable:   false,
            configurable: false,
            value:        function (fmt) {
                var o = {
                    'M+' : this.getMonth() + 1,
                    'd+' : this.getDate(),
                    'h+' : this.getHours(),
                    'm+' : this.getMinutes(),
                    's+' : this.getSeconds(),
                    'q+' : Math.floor((this.getMonth()+3)/3),
                    'S'  : this.getMilliseconds()
                };
                if(/(y+)/.test(fmt))
                    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+'').substr(4 - RegExp.$1.length));
                for(var k in o)
                    if(new RegExp('('+ k +')').test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00'+ o[k]).substr((''+ o[k]).length)));
                return fmt;
            }
        });
}
//console.log('Debug:' + new Date().format('yyyy-MM-dd'));

if (!Array.prototype.uniq) {
    Object.defineProperty(Array.prototype, 'uniq',
        {
            enumerable:   false,
            configurable: false,
            value:        function () {
                var hash = {};
                var un   = [];
                for (var i=0; i<this.length; i++)
                {
                    if (!hash[this[i]])
                    {
                        hash[this[i]] = true;
                        un.push(this[i]);
                    }
                }
                return un;
            }
        });
}
//var test = ['a','b','c','d','d','d','e','f','a','b','d','x','y','x','y','a'];
//console.log('Debug: ' + test.uniq().join(','));

if (!Array.prototype.findObjItemByKey) {
    Object.defineProperty(Array.prototype, 'findObjItemByKey',
        {
            enumerable: false,
            configurable: false,
            value: function (key, exp) {
                for (var i = 0, l = this.length; i < l; i++) {
                    var obj = this[i];
                    if (typeof obj === 'object' && obj.hasOwnProperty(key)) {
                        if (obj[key] === exp) {
                            return [obj, i];
                        }
                    }
                }
                return null;
            }
        });
}
/***
var test = [
    {
        name: 'abc',
        a: 1,
        b: 2,
        c: 3
    },
    {
        name: 'def',
        a: 10,
        b: 20,
        c: 30
    },
    {
        name: 'xyz',
        a: 11,
        b: 22,
        c: 33
    },
    [5,6,7,8,9,10,11],
    {xxx: 'yyy'},
    {yyy: 'zzz'},
    new Date(),
    100000000000,
    200000000000,
    true,
    {
        Name: 'xyz',
        a: 111,
        b: 222,
        c: 333
    }
];
console.log('Debug findObjItemBykey: ');
console.log(test.findObjItemByKey('name', 'def'));
var o = test.findObjItemByKey('Name', 'xyz');
o[0].ttt = 1;
console.log(test);
***/
