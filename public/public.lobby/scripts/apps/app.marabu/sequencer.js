function Sequencer()
{
  var app = lobby.apps.marabu;
  var target = this;

  this.edit_mode = false;
  this.selection = {x1:0,y1:0,x2:0,y2:0};
  this.sequence = {length:32}

  this.bpm_el = document.getElementById("bpm");

  this.status = function()
  {
    var html = "";
    html += "SEQ("+this.selection.x1+":"+this.selection.y1+" "+this.selection.x2+":"+this.selection.y2+") ";
    return html;
  }

  this.build = function()
  {
    var html = "";

    html += "  <div class='sequencer' id='sequence_controller' style='width:120px; display:inline-block; vertical-align:top'>";
    html += "    <h1 class='lh30'><b>SEQ</b> <input id='bpm' type='text' size='3' value='' title='Beats per minute (song speed)' class='bh fh'/></h1>";
    html += "    <div id='sequencer'><table class='tracks' id='sequencer-table'></table></div>";
    html += "  </div>";

    return html;
  }

  this.pattern_id_at = function(x,y)
  {
    var instrument_id = GUI.instrument_controller.id;
    var pattern_id = GUI.song().songData[instrument_id].p[this.selection.y1];
    return pattern_id - 1;
  }

  this.select = function(x1 = 0,y1 = 0,x2 = 0,y2 = 0)
  {
    this.selection = {x1:x1,y1:y1,x2:x2,y2};

    var target_pattern_value = document.getElementById("sc"+x2+"r"+y2).textContent;
    var target_instrument_id = x2;
    var target_pattern_id = target_pattern_value == "-" ? -1 : parseInt(target_pattern_value);    

    app.sequencer.refresh_table();
    app.editor.load(target_pattern_id);
    app.instrument.load(target_instrument_id);
  }

  this.deselect = function()
  {
    this.selection = {x1:-1,y1:-1,x2:-1,y2:-1};
  }

  this.edit = function(toggle = true)
  {
    this.edit_mode = toggle;

    var table = document.getElementById("sequencer-table");
    table.className = toggle ? "tracks edit" : "tracks";
  }

  this.inject = function(value)
  {
    var target_instrument_id = this.selection.x2;
    var target_pattern_id = this.selection.y2;

    GUI.song().songData[target_instrument_id].p[target_pattern_id] = parseInt(value);

    this.refresh_table();
    this.edit(false);
    app.editor.pattern.id = value;
    app.editor.edit();
  }

  function bpm_update(e)
  {
    // if(GUI.sequence_controller.bpm_el.value == ""){ return; }
    // var new_bpm = parseInt(GUI.sequence_controller.bpm_el.value);
    // if(new_bpm < 20){ new_bpm = 10; }
    // if(new_bpm > 800){ new_bpm = 800;}
    // GUI.update_bpm(new_bpm);
  }

  // 
  // Sequence Table
  // 

  this.sequence_mouse_down = function(e)
  {
    var col = parseInt(e.target.id.slice(2,3));
    var row = parseInt(e.target.id.slice(4));

    target.edit();
    target.select(col,row,col,row);
    lobby.commander.update_status();
  }

  this.build_sequence_table = function()
  {
    var table = document.getElementById("sequencer-table");
    // Clean
    while (table.firstChild){
      table.removeChild(table.firstChild);
    }
    var tr, td;
    for (var row = 0; row < this.sequence.length; row++) {
      tr = document.createElement("tr");
      tr.className = row % 4 === 0 ? "beat" : "";
      for (var col = 0; col < 8; col++) {
        td = document.createElement("td");
        td.id = "sc" + col + "r" + row;
        td.textContent = "-";
        td.addEventListener("mousedown", this.sequence_mouse_down, false);
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  }

  this.refresh_table = function()
  {
    for (var r = 0; r < this.sequence.length; ++r)
    {
      for (var c = 0; c < 8; ++c)
      {
        var o = document.getElementById("sc" + c + "r" + r);
        var pat = GUI.song().songData[c].p[r];
        var classes = "";
        if(pat > 0){ classes += "pattern_"+pat+" "; }
        if (r >= this.selection.y1 && r <= this.selection.y2 && c >= this.selection.x1 && c <= this.selection.x2){ classes += "selected "; }
        o.className = classes;
        o.textContent = pat ? pat : "-";
      }
    }
  }

  // Keyboard Events

  this.when = 
  {
    key : function(key)
    {
      if(!target.edit_mode){ return; }
      if(["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"].indexOf(key) == -1){ console.log("SEQ: Unknown Key"); return; }

      target.inject(key);
    }
  }

}

lobby.apps.marabu.setup.confirm("sequencer");
