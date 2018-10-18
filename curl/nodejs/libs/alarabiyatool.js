/**
 * Created by liwei on 2018/10/18.
 */

function setCookie(c_name, value, expiredays) { // Local function for setting a value of a cookie
    var exdate = new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    var str =  c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
    return str;
}


module.exports.decode = function(app) {
    return function(req, res) {
        try {
            var c_name ,value,expiredays;

            if(req.body.c_name) c_name = req.body.c_name;
            if(req.body.value) value = req.body.value;
            if(req.body.expiredays) expiredays = req.body.expiredays;
            var value = setCookie(c_name,value,expiredays);
            res.write("'"+value+"'");
        } catch(e) {
        }
        res.end();
    };
};