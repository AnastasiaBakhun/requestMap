var fs = require('fs');
var XMLHttpRequest = require('xhr2');
require('isomorphic-fetch');


var data = {}
var nodes=[{id:"www.ebay.com", label:"www.ebay.com", time:0}] 
var edges = []
function replace(object, replace){
    for (var j in object){
        a = object[j]
        x = new RegExp(replace, "i")
        if (a.search(x) == 0 ){        
            var c = a.split(": ")
            var d = c[1]
        return d
        }
    }
}
function clearUrl(object){
    var a = String(object)
    if (a.search("http://") == 0){        
        a = a.replace("http://","")
        a = a.replace(/\/$/,"")
    } 
    if (a.search("https://") >= 0){        
        a = a.replace("https://","")
        a = a.replace(/\/$/,"")
    } 
    return a
}

function draw(){
    fetch("https://www.webpagetest.org/jsonResult.php?test=181214_7X_2277a7c766b61a718e3709445dacc478")
        .then(function(resp) { 
            return resp.json()
        })
        .then(function(data) {
            num = data.data.runs["1"].firstView.requests
            
            for (var i = 0 ; i<(num.length); i++){
                var host = data.data.runs["1"].firstView.requests[String(i)].host
                var referer = clearUrl(replace(data.data.runs["1"].firstView.requests[String(i)].headers.request,"referer"))
                var full_url = clearUrl(data.data.runs["1"].firstView.requests[String(i)].full_url)
                var url = data.data.runs["1"].firstView.requests[String(i)].url
                var response = data.data.runs["1"].firstView.requests[String(i)].responseCode
                var location = clearUrl(replace(data.data.runs["1"].firstView.requests[String(i)].headers.response, "location")) 
                var edge = {}
                if (String(response).startsWith("3")){
                    edge["to"] = location
                    edge["from"] = full_url //host
                    edge["label"] = referer
                    edges.push(edge)   
                }
                
            }
            // document.getElementById("mynetwork").innerHTML = host
            for (var i = 0 ; i<(num.length); i++){
                host = data.data.runs["1"].firstView.requests[String(i)].host
                time = data.data.runs["1"].firstView.requests[String(i)].all_start
                referer = clearUrl(replace(data.data.runs["1"].firstView.requests[String(i)].headers.request,"referer"))
                full_url = clearUrl(data.data.runs["1"].firstView.requests[String(i)].full_url)
                url = data.data.runs["1"].firstView.requests[String(i)].url
                var index = data.data.runs["1"].firstView.requests[String(i)].index
                response = data.data.runs["1"].firstView.requests[String(i)].responseCode
                location = clearUrl(replace(data.data.runs["1"].firstView.requests[String(i)].headers.response,"location"))
                var initiator = clearUrl(data.data.runs["1"].firstView.requests[String(i)].initiator)
                var node = {}
                node["id"]=full_url
                node["label"]=clearUrl(host) + " " +index
                node["time"]=time
                var lenNodes = (nodes.filter(e => (e.id == full_url))).length //same as "(nodes.filter(function(e){return e.id == host})).length"
                if (lenNodes == 0){
                    nodes.push(node)  
                }
                var edge = {}
                edge["to"] = full_url //host
                if ((initiator != "undefined") && (initiator.length != 0)) {
                    edge["from"] = initiator
                } else {
                    edge["from"] = referer
                }
                edge["label"] = referer
                var lenEdgesTo = (edges.filter(e => (e.to == full_url))).length 
                var lenEdgesFrom = (edges.filter(e => (e.from == referer))).length 
                if (lenEdgesTo != 0){
                    if (lenEdgesFrom == 0){
                        edges.push(edge)
                    }    
                } else {
                    edges.push(edge)
                }
            }
        })
        .then(function (){
            // console.log(JSON.stringify(nodes))
            // var network = null;
            // var container = document.getElementById('mynetwork');
            // var data = {nodes: nodes, edges: edges};
            // var options = {
            //     nodes: {
            //         shape: 'dot',
            //         scaling:{
            //             label: {
            //                 min:8,
            //                 max:20
            //             }
            //         }
            //     },
            //     edges:{arrows:'to'}
            //     };
            // var network = new vis.Network(container, data, options);
        }); 
}

function newNodes(nodes,time=2000){
    var newNodes=[];
    for (var i=0; i<(nodes.length); i++){
        if((JSON.stringify(nodes[i].time))<time){
            newNodes.push(nodes[i])
        } 
    }
    nodes.sort(function(a,b){
        return a.time-b.time
    })
    console.log(JSON.stringify(nodes))
    // console.log(newNodes)
}

function play(){
    
    for (var i = 1; i <= 10; i++) {
        (function(index) {
            setTimeout(function() { 
                
                var newNodes=[];
                for (var j=0; j<(nodes.length); j++){
                    if((JSON.stringify(nodes[j].time))<index*1000){
                    newNodes.push(nodes[j])
                    } 
                };
                
                var network = null;
                var container = document.getElementById('mynetwork');
                var data = {nodes: newNodes, edges: edges};
                var options = {
                    nodes: {
                        shape: 'dot',
                        scaling:{
                            label: {
                                min:8,
                                max:20
                            }
                        }
                    },
                    edges:{arrows:'to'}
                    };
                var network = new vis.Network(container, data, options);

                // document.getElementById("mynetwork").innerHTML = `${index}` + " " + edges.length;
                // document.getElementById("mynetwork").innerHTML = `${index}` + " " + newNodes.length;

            }, i*3000);
        })(i);
    }



    // var network = null;
    // var container = document.getElementById('mynetwork');
    // var data = {nodes: nodes, edges: edges};
    // var options = {
    //     nodes: {
    //         shape: 'dot',
    //         scaling:{
    //             label: {
    //                 min:8,
    //                 max:20
    //             }
    //         }
    //     },
    //     edges:{arrows:'to'}
    //     };
    // var network = new vis.Network(container, data, options);
}; 
 

draw();
setTimeout(function(){newNodes(nodes)},3000);



// function test(){
//     var xhr = new XMLHttpRequest();
//     var url = "https://www.webpagetest.org/jsonResult.php?test=181214_7X_2277a7c766b61a718e3709445dacc478";
//     xhr.open("GET", url, true);
//     xhr.send();
//     xhr.onreadystatechange = function () { 
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             var data = JSON.parse(this.responseText);
//             num = data.data.runs["1"].firstView.requests
//             for (var i = 0 ; i<(num.length); i++){
//                 host = data.data.runs["1"].firstView.requests[String(i)].host
//                 referer = clearUrl(replace(data.data.runs["1"].firstView.requests[String(i)].headers.request,"referer"))
//                 full_url = clearUrl(data.data.runs["1"].firstView.requests[String(i)].full_url)
//                 url = data.data.runs["1"].firstView.requests[String(i)].url
//                 response = data.data.runs["1"].firstView.requests[String(i)].responseCode
//                 location = clearUrl(replace(data.data.runs["1"].firstView.requests[String(i)].headers.response, "location")) 
//                 var edge = {}
//                 if (String(response).startsWith("3")){
//                     edge["to"] = location
//                     edge["from"] = full_url //host
//                     edge["label"] = referer
//                     edges.push(edge)   
//                 }
//             }
//             for (var i = 0 ; i<(num.length); i++){
//                 host = data.data.runs["1"].firstView.requests[String(i)].host
//                 // time = data.data.runs["1"].firstView.requests[String(i)].all_start
//                 referer = clearUrl(replace(data.data.runs["1"].firstView.requests[String(i)].headers.request,"referer"))
//                 full_url = clearUrl(data.data.runs["1"].firstView.requests[String(i)].full_url)
//                 url = data.data.runs["1"].firstView.requests[String(i)].url
//                 index = data.data.runs["1"].firstView.requests[String(i)].index
//                 response = data.data.runs["1"].firstView.requests[String(i)].responseCode
//                 location = clearUrl(replace(data.data.runs["1"].firstView.requests[String(i)].headers.response,"location"))
//                 initiator = clearUrl(data.data.runs["1"].firstView.requests[String(i)].initiator)
//                 var node = {}
//                 node["id"]=full_url
//                 node["label"]=clearUrl(host) + " " +index
//                 lenNodes = (nodes.filter(e => (e.id == full_url))).length //same as "(nodes.filter(function(e){return e.id == host})).length"
//                 if (lenNodes == 0){
//                     nodes.push(node)  
//                 }
//                 var edge = {}
//                 edge["to"] = full_url //host
//                 if ((initiator != "undefined") && (initiator.length != 0)) {
//                     edge["from"] = initiator
//                 } else {
//                     edge["from"] = referer
//                 }
//                 edge["label"] = referer
//                 lenEdgesTo = (edges.filter(e => (e.to == full_url))).length 
//                 lenEdgesFrom = (edges.filter(e => (e.from == referer))).length 
//                 if (lenEdgesTo != 0){
//                     if (lenEdgesFrom == 0){
//                         edges.push(edge)
//                     }    
//                 } else {
//                     edges.push(edge)
//                 }
//             }console.log(JSON.stringify(nodes))
//         }
//     }
// }
            
// var network = null;
// function draw() {
//     var container = document.getElementById('mynetwork');
//     var data = {nodes: nodes, edges: edges};
//     var options = {
//         nodes: {
//             shape: 'dot',
//             scaling:{
//                 label: {
//                     min:8,
//                     max:20
//                 }
//             }
//         },
//         edges:{arrows:'to'}
//     };
// network = new vis.Network(container, data, options);
// }

// // setTimeout(function () {test()},3000);
// // draw();
// // setTimeout(function () {console.log(JSON.stringify(nodes))},1000)
// // console.log(JSON.stringify(nodes))
// // console.log(JSON.stringify(edges))
