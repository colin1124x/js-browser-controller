var BrowserController = function(){

    var me = this,
        map = [];

    me.open = function(wins){
        var w;
        me.close();
        for (var i = 0, len = wins.length; i < len; i++) {
            w = window.open(wins[i], i, "width=100, height=100, titlebar=no, scrollbars=no, menubar=no, status=no");
            if ( ! w) throw new Error('無法開啟視窗');
            map[i] = w;            
        }
    };
  
    me.each = function(callback){
        for (var i = 0, len = map.length; i < len; i++) {
            callback(map[i], i);
        }
    };

    me.lineUp = function(w, h, x, y, rows, space, toolbar, callback){
        var cols;
        w = parseInt(w, 10);
        h = parseInt(h, 10);
        x = parseInt(x) || 0;
        y = parseInt(y) || 0;
        rows = parseInt(rows, 10) || 1;
        space = parseFloat(space) || 0;
        toolbar = parseInt(toolbar) || 0;
        cols = Math.ceil(map.length/rows);
        if (rows < 1) throw new Error('rows must over then 1');
        if (cols < 1) throw new Error('no sub windows');
        me.each(function(win, i){
            var num = i + 1,
                row = Math.ceil(num/cols),
                col = (num % cols) || cols,
                _x, _y;

            _x = x + (w + space) * (col - 1);
            _y = y + (h + space - toolbar) * (row - 1);
            win.resizeTo(w, h);
            win.moveTo(_x, _y);

            callback && callback(win, col, row);
        });
        
        for (var i = map.length - 1; i >= 0; i--) {
            map[i].focus();
        }
        self.focus();
    };

    me.reload = function(){
        me.each(function(w){w.location.reload();});
    };

    me.close = function(){
        me.each(function(w){w.close();});
        map = [];
    };

    me.hash = function(name, i){
        if (typeof i == 'undefined') {
            me.each(function(w){
                w.location.hash = name;
            });
            return;
        }

        if (map[i]) {
            map[i].location.hash = name;
        }
    };

    me.hasWindow = function(){
        return map.length > 0;
    };
}; 
