console.MakeList = function () {
    if(!console.list) {
        console.list = [];
        console.listify = function (k) {
            var z = console[k];
            console['old_'+k] = z;
            console[k] = function (...args) {
                console.list.push({
                    args: args,
                    caller: k
                });
                return console['old_'+k](...args);
            }
        };
        console.listify('log');
        console.listify('error');
        console.listify('warn');
        console.listify('assert');
        console.listify('debug');
        console.old_clear = console.clear;
        console.clear = function () {
            console.list = [];
            console.old_clear();
        }
    }
}