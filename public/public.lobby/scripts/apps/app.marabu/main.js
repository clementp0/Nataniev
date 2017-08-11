
var GUI = null;
var keyboard = null;

function Marabu()
{
	App.call(this);

  this.name = "marabu";

  this.window.size = {width:780,height:420};
  this.window.pos = {x:120,y:120};
  this.window.theme = "noir";

  this.setup.includes = [
    "core/common",
    "core/demo-songs",
    "core/jammer",
    "core/keyboard",
    "core/player-small",
    "core/player-worker",
    "core/player",
    "core/rle",

    "gui/gui",
    "gui/gui.slider",

    "inc/Blob",
    "inc/deflate",
    "inc/FileSaver",
    "inc/inflate",

    "controllers/controller",
    "controllers/instrument_controller",
    "controllers/pattern_controller",
    "controllers/sequence_controller"
  ];

  this.setup.start = function()
  {
    this.app.wrapper_el.innerHTML = this.app.draw();
    gui_init();
  }

  this.draw = function()
  {
    return "<div class='sequencer' id='sequence_controller'>    <h1 class='title'>SEQ      <span class='status' id='sequence_controller_status'></span>      <input id='bpm' type='text' size='3' value='' title='Beats per minute (song speed)'/>      <span id='sequencerCopy' class='icon copy hide'></span>      <span id='sequencerPaste' class='icon paste hide'></span>      <span id='sequencerPatDown' class='icon remove hide'></span>      <span id='sequencerPatUp' class='icon add hide'></span>      <span id='playSong' class='icon play_song' title='Play song'></span>      <span id='stopPlaying' class='icon play_stop hide' title='Stop playing'></span>      <span class='icon recording'></span>      <hr/>    </h1>    <div id='sequencer' title='Enter pattern numbers, 0-9'>      <table class='tracks' id='sequencer-table'></table>    </div>  </div>  <div class='pattern' id='pattern_controller'>    <h1 class='title'>PAT      <span class='status' id='pattern_controller_status'></span>      <input id='rpp' type='text' size='3' value='' title='Rows per pattern' />      <span id='playRange' class='icon play_range' title='Play selected range (SPACE)'></span>      <span class='icon recording'></span>      <hr />    </h1>    <div id='pattern'>      <table class='tracks' id='pattern-table' title='Use the piano or keyboard to enter notes'></table>    </div>    <div id='fxtrack'>      <table class='tracks' id='fxtrack-table' title='Use instrument and effect controls to edit'></table>    </div>  </div>  <div class='effects hide'>    <h1>MOD      <span id='fxCopy' class='icon copy'></span>      <span id='fxPaste' class='icon paste'></span>      <hr />    </h1>  </div>  <div class='instrument'>    <h1 class='title'>INS       <span class='status' id='instrument_controller_status'></span>      <input id='instrument_name' type='text' size='20' value='' title='Instrument Name' />      <span id='exportINSTRUMENT' title='Export .instrument' class='icon export_instrument'></span>      <span id='exportKIT' title='Export .kit' class='icon export_kit'></span>      <select id='midiInput' title='Select a MIDI source' style='margin-left: 10px; display: none'>        <option value=''>(select MIDI)</option>      </select>      <hr />    </h1>    <div class='osc'>      <h1>OSC1        <img id='osc1_wave_saw' title='Saw' src='media/graphics/wave_saw.svg' alt='Saw' />        <img id='osc1_wave_sqr' title='Square' src='media/graphics/wave_sqr.svg' alt='Sqr' />        <img id='osc1_wave_tri' title='Triangle' src='media/graphics/wave_tri.svg' alt='Tri' />        <img id='osc1_wave_sin' title='Sine' src='media/graphics/wave_sin.svg' alt='Sin' />        <img id='osc1_xenv' class='box' src='media/graphics/toggle_off.svg' width='10' height='12' alt='' />      </h1>      <div id='osc1_vol'></div>      <div id='osc1_semi'></div>      <div id='noise_vol'></div>    </div>    <div class='osc'>      <h1>OSC2        <img id='osc2_wave_saw' title='Saw' src='media/graphics/wave_saw.svg' alt='Saw' />        <img id='osc2_wave_sqr' title='Square' src='media/graphics/wave_sqr.svg' alt='Sqr' />        <img id='osc2_wave_tri' title='Triangle' src='media/graphics/wave_tri.svg' alt='Tri' />        <img id='osc2_wave_sin' title='Sine' src='media/graphics/wave_sin.svg' alt='Sin' />        <img id='osc2_xenv' class='box' src='media/graphics/toggle_off.svg' width='10' height='12' alt='' />      </h1>      <div id='osc2_vol'></div>      <div id='osc2_semi'></div>      <div id='osc2_det'></div>    </div>    <div class='env'>      <h1>ENV</h1>      <div id='env_att'></div>      <div id='env_sust'></div>      <div id='env_rel'></div>    </div>    <div class='arp'>      <h1>ARP</h1>      <div id='arp_note1'></div>      <div id='arp_note2'></div>      <div id='arp_speed'></div>    </div>    <div class='efx'>      <h1>EFX        <img id='fx_filt_lp' src='media/graphics/wave_lp.svg' alt='Saw' />        <img id='fx_filt_bp' src='media/graphics/wave_bp.svg' alt='Saw' />        <img id='fx_filt_hp' src='media/graphics/wave_hp.svg' alt='Saw' />      </h1>      <div id='fx_freq'></div>      <div id='fx_res'></div>      <div id='fx_dly_amt'></div>      <div id='fx_dly_time'></div>      <div id='fx_pan_amt'></div>      <div id='fx_pan_freq'></div>    </div>    <div class='lfo'>      <h1>LFO        <img id='lfo_wave_saw' title='Saw' src='media/graphics/wave_saw.svg' alt='Saw' style='margin-right: 10px' />        <img id='lfo_wave_sqr' title='Square' src='media/graphics/wave_sqr.svg' alt='Sqr' />        <img id='lfo_wave_tri' title='Triangle' src='media/graphics/wave_tri.svg' alt='Tri' style='margin-right: 10px' />        <img id='lfo_wave_sin' title='Sine' src='media/graphics/wave_sin.svg' alt='Sin' style='margin-right: 10px' />      </h1>      <div id='lfo_amt'></div>      <div id='lfo_freq'></div>      <div id='lfo_fxfreq'></div>    </div>    <div class='noi'>      <h1>NOI</h1>      <div id='fx_drive'></div>      <div id='fx_dist'></div>    </div>  </div>  <div class='status'>    LOG    <span id='statusText'>Idle.</span>    <div id='exportWAV' class='icon export_wav' title='Export song as .wav'></div>    <div id='exportBINARY' class='icon export_binary' title='Export song as binary'></div>    <div id='exportJS' class='icon export_json' title='Export song as .json'></div>    <hr />  </div>";
  }
}

lobby.summon.confirm("Marabu");