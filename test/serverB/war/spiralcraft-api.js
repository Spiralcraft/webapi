/////////////////////////////////////////////////////


///////////////////////////////////////////////////////
//
// API object to call server
//
SPIRALCRAFT.api = (function(self) {

  self.baseURL = "http://localhost:8080/api";
  self.apiKey = "my-api-key";
  self.sharedSecret = "my-shared-secret";
  self.sessionId = null;

  self.post = (function(method,callback,data) {
    SPIRALCRAFT.ajax.post(self.baseURL+"/"+method+"?apikey="+self.apiKey,callback,data);
  });
      
  self.get = (function(method,callback) {
    SPIRALCRAFT.ajax.get(self.baseURL+"/"+method+"?apikey="+self.apiKey,callback);
  });
  
  self.getJSON = (function(method,callback) {
    self.get(
      method,
      function(val) { 
        if (val!=null && val.length>0) { 
          var jval=SPIRALCRAFT.json.parse(val); 
          console.log(jval); 
          if (callback) { callback(jval); }
        } else { 
          if (callback) { callback(null); } 
        }
      }
     );
  });

  self.postJSON = (function(method,callback,obj) {
    self.post(
      method,
      function(val) { 
        if (val!=null && val.length>0) {
          var jval=SPIRALCRAFT.json.parse(val); 
          console.log(jval); 
          if (callback) { callback(jval); }
        } else { 
          if (callback) { callback(null); }
        }
      },
      SPIRALCRAFT.json.stringify(obj)
    );
  });

  self.hello = (function() { 
    self.getJSON(
        ".hello"
        ,function(r) { SPIRALCRAFT.api.sessionId = r.sessionId; alert(r.sessionId); }
        );
    
  });
  
  self.login = (function(userId,salt,digest) {
    self.postJSON(
        ".login"
        ,null
        ,{ userId:userId
         , salt:salt
         , digest:digest
         }
        );
    
  
  });
  

  self.testLogin = (function() {
    self.login("exampleUser123","my-random-salt","my-digest");

  });

  return self;
}(SPIRALCRAFT.api || {}));



//
// When this JS file is loaded, process the dom to create all the bindings
//
SPIRALCRAFT.dom.registerBodyOnLoad(
    function() { SPIRALCRAFT.webui.processTree(document); return true; }
  );


