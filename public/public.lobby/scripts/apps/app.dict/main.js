function Dict()
{
  App.call(this);

  this.name = "dict";
  this.size = {width:600,height:420};
  this.origin = {x:120,y:120};
  this.methods.find = {name:"find", shortcut:"f"};

  this.payload = null;

  this.on_launch = function()
  {
    this.reload();
  }

  this.reload = function()
  {
    var app = this;
    app.el.innerHTML = "Loading. ";

    $.ajax({url: '/dict.load',
      type: 'POST', 
      data: { date:"20170101" },
      success: function(response) {
        var a = JSON.parse(response);
        app.payload = a;
        app.el.innerHTML = "Ready. ";
        app.refresh();
      }
    })
  }

  this.refresh = function()
  {
    var html = "";
    var count = 0;
    for(english in this.payload){
      count += 1;
    }
    this.el.innerHTML = "<list>Found "+count+" words.</li>";
  }

  this.on_input_change = function(val)
  {
    if(val.split(" ")[0] != "dict.find"){ return; }

    query = val.split(" "); query.shift(); query = query.join(" ").trim();
    this.find(query);
  }

  this.find = function(q)
  {
    var html = "";
    var count = 0;

    for(english in this.payload){
      var word = this.payload[english];
      if(english.indexOf(q) == -1){ continue; }
      html += this.print_word(english,word,q);
      count += 1;
    }
    this.el.innerHTML = "<hl style='margin-bottom:15px'>Found "+count+" results for \""+q+"\".</hl><list style='column-count:3'>"+html+"</list>";
  }

  this.print_word = function(en,word,q)
  {
    var html = "";

    html += "<b>"+en.replace(q,"<t style='text-decoration:underline'>"+q+"</t>")+"</b> ";
    for(lang in word){
      html += "<i>"+lang.substr(0,2)+"</i> "+word[lang]+" ";
    }
    return "<ln class='lh15'>"+html+"</ln>";
  }
}

lobby.install_callback("Dict");
