function Controller()
{
  this.name = "Unnamed";
  this.el = null;
  this.status_el = null;
  this.is_selected = false;

  this.input = function(keyCode,keyVal)
  {

  }

  // Keyboard Numbers
  this.key_number_0 = function(){ }
  this.key_number_1 = function(){ }
  this.key_number_2 = function(){ }
  this.key_number_3 = function(){ }
  this.key_number_4 = function(){ }
  this.key_number_5 = function(){ }
  this.key_number_6 = function(){ }
  this.key_number_7 = function(){ }
  this.key_number_8 = function(){ }
  this.key_number_9 = function(){ }
  // Keyboard Notes
  this.key_letter_a = function(){ }
  this.key_letter_s = function(){ }
  this.key_letter_d = function(){ }
  this.key_letter_f = function(){ }
  this.key_letter_g = function(){ }
  this.key_letter_h = function(){ }
  this.key_letter_j = function(){ }
  // Keyboard Notes sharp
  this.key_letter_w = function(){ }
  this.key_letter_e = function(){ }
  this.key_letter_t = function(){ }
  this.key_letter_y = function(){ }
  this.key_letter_u = function(){ }
  // Controls
  this.key_letter_c = function(){ }
  this.key_letter_v = function(){ }
  // Controls up/down
  this.key_letter_x = function(){ }
  this.key_letter_z = function(){ }
  // Brackets
  this.key_square_bracket_right = function(){}
  this.key_square_bracket_left  = function(){}
  this.key_curly_bracket_right  = function(){}
  this.key_curly_bracket_left   = function(){}
  // Keyboard Hex
  this.key_letter_a = function(){ }
  this.key_letter_b = function(){ }
  this.key_letter_c = function(){ }
  this.key_letter_d = function(){ }
  this.key_letter_e = function(){ }
  this.key_letter_f = function(){ }
  // Arrows
  this.key_arrow_up    = function(){ }
  this.key_arrow_down  = function(){ }
  this.key_arrow_left  = function(){ }
  this.key_arrow_right = function(){ }
  // Etc
  this.key_escape      = function(){ }
  this.key_delete      = function(){ console.log("No effect"); }
}

lobby.apps.marabu.setup.confirm("controllers/controller");

