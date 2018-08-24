/**
 * Created by liwei on 2018/8/23.
 */





module.exports.decode = function(app) {
    return function(req, res) {
        try {
            var host = null;
            var param1 = null;
            var param2 = null;

            if(req.body.host) host = req.body.host;
            if(req.body.param1) param1 = req.body.param1;
            if(req.body.param2) param2 = req.body.param2;

            if(param1 && param2) {
                var result='';
                var value='';
                var str = "result= " + param1;
                eval(str);
                var t = host;
                var str2 = param2;
                eval(str2);
                // console.log(str2);
                console.log(value);
                res.write("'"+value+"'");
            }
        } catch(e) {
        }
        res.end();
    };
};