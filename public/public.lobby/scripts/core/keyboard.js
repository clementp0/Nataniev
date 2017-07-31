function Keyboard()
{
  this.host = null;

  this.shift_held = false;
  this.alt_held = false;

  this.start = function()
  {
    document.onkeyup = function myFunction(){ lobby.keyboard.listen_onkeyup(event); };
    document.onkeydown = function myFunction(){ lobby.keyboard.listen_onkeydown(event); };
  }
  
  this.listen_onkeydown = function(event)
  {
    if(event.shiftKey == true){
      this.shift_held = true;
    }
    if(event.altKey == true){
      this.alt_held = true;

      switch (event.key || event.keyCode || event.which)
      {
        case "ArrowUp": event.preventDefault(); break;
        case "ArrowDown": event.preventDefault(); break;
        case "ArrowLeft": event.preventDefault(); break;
        case "ArrowRight": event.preventDefault(); break;
      }
    }

    if(event.ctrlKey && event.key.toLowerCase() != "control" && this.host){
      this.host.on_shortcut(event.key.toLowerCase());
    }
    if(event.altKey && event.key.toLowerCase() != "alt" && this.host){
      this.host.on_option(event.key.toLowerCase());
    }

    if(event.key == "Tab" && lobby.commander.is_typing()){
      event.preventDefault();
      if(lobby.commander.autocomplete){
        lobby.commander.inject(lobby.commander.autocomplete);
      }
    }
  }

  this.listen_onkeyup = function(event)
  {
    event.preventDefault();

    this.host = lobby.commander.app;

    if(!this.host){ return; }

    this.host.on_key(event.key);

    switch (event.key || event.keyCode || event.which)
    {
      case "ArrowUp": this.host.key_arrow_up(); break;
      case "ArrowDown": this.host.key_arrow_down(); break;
      case "ArrowLeft": this.host.key_arrow_left(); break;
      case "ArrowRight": this.host.key_arrow_right(); break;

      case "Escape" || 27:  this.host.key_escape(); break;
      // case "Backspace" || 8:  this.host.key_delete(); break;
      case "Enter" :  this.host.key_enter(); break;
      case 192: this.host.key_back_quote(); break;
    }
    this.shift_held = false;
    this.alt_held = false;
  }
}
