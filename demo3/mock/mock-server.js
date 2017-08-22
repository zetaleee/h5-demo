const Express = require('express');
const app = new Express();
const path = require('path');
const fs = require('fs');

app.get('/:id', function(req, res){
    const page = req.params.id;
    res.setHeader("Access-Control-Allow-Origin", "*");
    // console.log(page);
    fs.readFile(path.resolve(__dirname, 'mock.json'), function(err, data){
        if(err){
            throw err;
        }
        const static = JSON.parse(data).data;
        const arr = Array.from(static);
        const len = arr.length;
        const next = page - 0 + 1 <= len ? true : false;
        for(let value of arr){
            if(value.page == page){
                res.json({data: value.data, next: next});
            }
        }
    });
});

app.listen(3000);