// $.ajax({
//             type: "GET",
//             headers:{
//             	'Content-Type': 'application/json',
//             	'Access-Control-Allow-Origin' : '*',
//             	'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-    Type, Accept'
//             },
//             url: "http://www.mocky.io/v2/5c3c7ad13100007400a1a401",
//             //data : ,
//             success: function (data) {

//             	console.log(data)

//             }

//         });

// const Http = new XMLHttpRequest();
// const url='http://www.mocky.io/v2/5c3c7ad13100007400a1a401';
// Http.open("GET", url);
// Http.send();
// Http.onreadystatechange=(e)=>{
// console.log(Http.responseText)
// }


var str = ''; 

str += '<ul>';

function getTreeStructure(arr, parent) {
            var out = []
             
            // console.log('<ul>')
            for(var i in arr) {
              
              // console.log(arr[i]) 
                if(arr[i].parent == parent) {
                  str +=  '<li>'+arr[i]['text'] ;
                    var children = getTreeStructure(arr, arr[i].id)
                    
                    if(children.length) {
                      str +='<ul>';
                      // console.log(children, parent);
                        arr[i]['children'] = children
                      
                        for(j=0;j<children.length;j++){
                          str += '<li>'+children[j]['text']+'</li>';
                        }
                     str += '</ul>';
                    }
                    out.push(arr[i]);
                  str +=  '</li>';
                }
            }
  
            return out
        }

function handleResponse(data){
  
  var o = getTreeStructure(data.nodes, 0);
  
   str += '</ul>';
  
  console.log('Final', o, str);

  elem = document.getElementById("tree");
  
  elem.innerHTML = elem.innerHTML + str;
  
  return;
  
  for(i=0;i<o.length;i++){
    
    console.log('Parent', o[i]['id']);
    
    if(!o[i]['children']){
      continue;
    }
    
    var c = o[i]['children'];
    
    for(j=0;j<c.length;j++){
      console.log('Grand child',c[j]['children']);
    } 
    
  }
}

axios.get('https://www.mocky.io/v2/5c3c7ad13100007400a1a401')
  .then(function (response) {
    // handle success
    // console.log(response.data);
  
    handleResponse(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error.data);
  })