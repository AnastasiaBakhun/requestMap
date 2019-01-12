// var fs = require('fs');
// var json_data = fs.readFileSync('ebay.json');
// var data = JSON.parse(json_data);

// for (var i = 0 ; i<(num.length); i++){
//     all_st = data.data.runs["1"].firstView.requests[String(i)].all_start
//     download = data.data.runs["1"].firstView.requests[String(i)].download_start
//     console.log(i + "--" + JSON.stringify(download))
// }

// var nodes = [
//     {id: 1,  value: 2,  label: "Algie" , "time": "300"},
//     {id: 2,  value: 31, label: "Alston", "time": "200"},
//     {id: 3,  value: 12, label: "Barney", "time": "100"}
// ]


// function sortByKey(array, key) {
//     return array.sort(function(a, b) {
//         var x = a[key];
//         var y = b[key];

//         if (typeof x == "string")
//         {
//             x = (""+x).toLowerCase(); 
//         }
//         if (typeof y == "string")
//         {
//             y = (""+y).toLowerCase();
//         }

//         return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//     });
// }

// var sort_object = sortByKey(nodes, time)

// console.log(JSON.stringify(sort_object))



// var fs = require('fs');
// var json_data = fs.readFileSync('ebay.json');
// var data = JSON.parse(json_data);

nodes=[{id:"www.ebay.com", label:"www.ebay.com"}] //www.ebay.com
// var node = {}
var edges = []
// var edge = {}
// var temp



var data = null
var test_id = null
var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();
var url = "https://www.webpagetest.org/jsonResult.php?test=181214_7X_2277a7c766b61a718e3709445dacc478";
xhr.open("GET", url, true);
xhr.send();
// xhr.setRequestHeader("Content-type", "application/json");
xhr.onreadystatechange = function () { 
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(this.responseText);
        console.log(data.data.id)
        test_id = data.data.id
        // document.getElementById("test").innerHTML = data.data.id

    }
}

setTimeout(function () {console.log(test_id)},1000)

// console.log(data.data.id)


// var data = JSON.stringify({"email":"tomb@raider.com","name":"LaraCroft"});




// console.log(JSON.stringify(num.length))

// replaced with replace function
// function findReferer(object){
//     for (var i in object){
//         a = object[i]
//         if (a.search(/referer/i) == 0 ){        
//             var c = a.split(": ")
//             var d = c[1]
//            return d
//         }
//     }
// }
// replaced with replace function
// function findLocation(object){
//     for (var i in object){
//         a = object[i]
//         if (a.search(/location/i) == 0 ){        
//             var c = a.split(": ")
//             var d = c[1]
//            return d
//         }
//     }
// }


// function replace(object, replace){
//     for (var j in object){
//         a = object[j]
//         x = new RegExp(replace, "i")
//         if (a.search(x) == 0 ){        
//             var c = a.split(": ")
//             var d = c[1]
//            return d
//         }
//     }
// }
// function clearUrl(object){
//     var a = String(object)
//     if (a.search("http://") == 0){        
//         a = a.replace("http://","")
//         a = a.replace(/\/$/,"")
//     } 
//     if (a.search("https://") >= 0){        
//         a = a.replace("https://","")
//         a = a.replace(/\/$/,"")
//     } 
//     return a
// }


// // temp = (nodes.filter(function(e){return e.id === "snvbvome"})).length

//     // console.log(typeof(JSON.stringify(temp)))
//     for (var i = 0 ; i<(num.length); i++){
//         // full_url = data.data.runs["1"].firstView.requests[String(i)].full_url
//         host = data.data.runs["1"].firstView.requests[String(i)].host
//         referer = clearUrl(replace(data.data.runs["1"].firstView.requests[String(i)].headers.request,"referer"))
//         full_url = clearUrl(data.data.runs["1"].firstView.requests[String(i)].full_url)
//         url = data.data.runs["1"].firstView.requests[String(i)].url
//         response = data.data.runs["1"].firstView.requests[String(i)].responseCode
//         location = clearUrl(replace(data.data.runs["1"].firstView.requests[String(i)].headers.response, "location")) 
//         var edge = {}
//         if (String(response).startsWith("3")){
//             edge["to"] = location
//             edge["from"] = full_url //host
//             edge["label"] = referer
//             edges.push(edge)
//             // lenEdgesTo = (edges.filter(e => (e.to == location))).length 
//             // lenEdgesFrom = (edges.filter(e => (e.from == full_url))).length //host
//             // if ((lenEdgesTo && lenEdgesFrom) == 0){
//             //     edges.push(edge)  
//             // // console.log(edges)
//             // }   
//         } 
        
//     }

// for (var i = 0 ; i<(num.length); i++){
//     // full_url = data.data.runs["1"].firstView.requests[String(i)].full_url
//     host = data.data.runs["1"].firstView.requests[String(i)].host
//     time = data.data.runs["1"].firstView.requests[String(i)].all_start
//     referer = clearUrl(replace(data.data.runs["1"].firstView.requests[String(i)].headers.request,"referer"))
//     full_url = clearUrl(data.data.runs["1"].firstView.requests[String(i)].full_url)
//     url = data.data.runs["1"].firstView.requests[String(i)].url
//     index = data.data.runs["1"].firstView.requests[String(i)].index
//     response = data.data.runs["1"].firstView.requests[String(i)].responseCode
//     location = clearUrl(replace(data.data.runs["1"].firstView.requests[String(i)].headers.response,"location"))
//     initiator = clearUrl(data.data.runs["1"].firstView.requests[String(i)].initiator)

//     var node = {}
//     // if (url.search("safeframe") >= 0){
//         node["id"]=clearUrl(full_url)
//         node["label"]=clearUrl(host) + " " +index
//     // } else{
//     //     node["id"]=full_url //host
//     //     node["label"]=host + " " + index
//     // }
    
//     lenNodes = (nodes.filter(e => (e.id == full_url))).length //same as "(nodes.filter(function(e){return e.id == host})).length"
//     if (lenNodes == 0){
//         nodes.push(node)  
//     }

//     var edge = {}
//     edge["to"] = full_url //host
//     // console.log(initiator + " " + initiator.length)
//     if ((initiator != "undefined") && (initiator.length != 0)) {
//         edge["from"] = initiator
//     } else {
//         edge["from"] = referer
//     }
//     edge["label"] = referer
//     lenEdgesTo = (edges.filter(e => (e.to == full_url))).length //host
//     lenEdgesFrom = (edges.filter(e => (e.from == referer))).length 
//     if (lenEdgesTo != 0){
//         if (lenEdgesFrom == 0){
//             edges.push(edge)
//         }    
//     } else {
//         edges.push(edge)
//     }
// }


// // console.log(nodes.length)
// // console.log(JSON.stringify(nodes))



// // console.log(JSON.stringify(nodes))

// // create node.json file
// // var fs = require("fs")
// // var nodeContent = JSON.stringify(nodes)
// // var edgeContent = JSON.stringify(edges)
// // fs.writeFile("./node.js", nodeContent, (err)=>{
// //     if (err){
// //         console.log(err);
// //         return;
// //     };
// //     // console.log("node.json created")
// // })
// // create edge.json file
// // fs.writeFile("./edge.js", edgeContent, (err)=>{
// //     if (err){
// //         console.log(err);
// //         return;
// //     };
// //     // console.log("node.json created")
// // })

// // $.getJSON("./edge.json", function(json){
// //     console.log(json)
// // })
// // fs.readFile("./node.json", function(text){
// //     console.log(text)
// // })
// // var byLine= text.split("\n")

