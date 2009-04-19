/**
 * Script: Moos.js
 * 		A Javascript API that uses Mootools 1.2 to control MP3 playback from Flash.
 * 
 * License:
 * 		MIT-style license
 * 
 * Copyright:
 * 		2009 - Zohar Arad - www.zohararad.com
 */

/**
 * Class: Moos
 * 		A Javascript API that uses Mootools 1.2 to control MP3 playback from Flash.
 * 
 * Implements:
 * 		Mootools.Options, Mootools.Events
 * 
 * Requires:
 * 		Mootools 1.2 Core with Class, Class.Extras, Events, Swiff
 * 
 * Options:
 * 		swf (Object) - Swiff-specific options
 * 			- id (String) - A Unique ID for the Swiff used to play the MP3 file.
 * 				Defaults to 'moosSwf'.
 * 			- container (DOM element) - The DOM element containing the Swiff used to play the MP3 file.
 * 				Defaults to $(document.body).
 * 			- url (String) - The relative or absolute URL of the Swiff used to play the MP3 file.
 * 				Defaults to 'swf/Player.swf'.
 * 			- instance (String) - The name of the Moos instance variable (used to give the Swiff global access to the instance of the Moos class).
 * 				Defaults to 'moos'.
 * 			- autoPlay (Boolean) - Determines whether the loaded MP3 file should be autoplayed or not
 * 				Defaults to false
 * 			- debug (Boolean) - Determines whether or not to display status messages in the Javascript consoles
 * Example:
 * 		<code>
 * 		var moos = new Moos({
 * 			swf:{
 * 				id:'myMoos',
 * 				container:'moosContainer'
 * 			},
 * 			autoPlay:true,
 * 			debug:true
 * 		});
 * 		moos.addEvents({
 * 			'ready': function(i){i.loadFile('somefile.mp3');i.log('ready')},
 * 			'onPlay':function(i){i.log('play')},
 * 			'onPlayback':function(position,duration,i){i.log(position+','+duration)}
 * 		});
 * 		</code>
 */
var Moos = new Class({
	Implements:[Options,Events],
	options:{
		swf:{
			id:'moosSwf',
			container:$(document.body),
			url:'swf/Player.swf'
		},
		instance:'moos',
		autoPlay:false,
		debug:false
	},
	/**
	 * Method: initialize
	 * 		Initializes the Moos class
	 * 
	 * Arguments:
	 * 		options (Object) - See 'Options' above
	 * 
	 */
	initialize:function(options){
		this.swf = null;
		this.ready = false;
		this.id3 = {};
		this.setOptions(options);
		this.render();
	},
	/**
	 * Method: render
	 * 		Renders the Swiff used to play the MP3 file and creates a class reference to it.
	 */
	render:function(){
		var swf = new Swiff(this.options.swf.url,{
			id:this.options.swf.id,
			container:this.options.swf.container,
			width: 1,
			height: 1,
			vars:{
				instance:this.options.swf.instance,
				autoPlay:this.options.autoPlay
			},
			params:{
				allowScriptAccess:'always'
			}
		});
		this.swf = document.getElementById(this.options.swf.id);
	},
	/**
	 * Playback Control Methods
	 */
	/**
	 * Method: loadFile
	 * 		Loads a new MP3 file for playback
	 * 
	 * Arguments:
	 * 		url (String) - A relative or absolute URL to the MP3 file to play.
	 */
	loadFile:function(url){
		if(!this.ready){return};
		this.swf.loadSound(url);
	},
	/**
	 * Method: play
	 * 		Plays or resumes playback of the MP3 file.
	 */
	play:function(){
		if(!this.ready){return};
		this.swf.playSound();
	},
	/**
	 * Method: pause
	 * 		Pauses playback of the MP3 file.
	 */
	pause:function(){
		if(!this.ready){return};
		this.swf.pauseSound();
	},
	/**
	 * Method: stop
	 * 		Stops playback of the MP3 file, resets playhead position to begining and unloads the file.
	 */
	stop:function(){
		if(!this.ready){return};
		this.swf.stopSound();
	},
	/**
	 * Method: seek
	 * 		Seeks the playhead to a new position
	 * 
	 * Arguments:
	 * 		pos (Int) - The new position to seek to (in milliseconds)
	 */
	seek:function(pos){
		if(!this.ready){return};
		this.swf.seek(pos);
	},
	/**
	 * Getter / Setter Methods
	 */
	/**
	 * Method: setVolume
	 * 		Sets the volume of the MP3 file
	 * 
	 * Arguments:
	 * 		v (Int) - The new volume to set between 0-100.
	 */
	setVolume:function(v){
		if(!this.ready){return};
		this.swf.setVolume(v);
	},
	/**
	 * Method: getVolume
	 * 		Returns the current volume level of the MP3 file
	 * 
	 * Returns:
	 * 		volume (Int) - The current volume level of the MP3 file (between 0-100).
	 */
	getVolume:function(){
		if(!this.ready){return};
		return this.swf.getVolume();
	},
	/**
	 * Method: getDownloadProgress
	 * 		Returns the current download progress of the MP3 file in percent.
	 * 
	 * Returns:
	 * 		progress (Int) - Current download progress of the MP3 file in percent.
	 */
	getDownloadProgress:function(){
		if(!this.ready){return};
		return this.swf.getDownloadProgress();
	},
	/**
	 * Method: getBytesLoaded
	 * 		Returns the amount of the MP3 file data loaded in bytes.
	 * 
	 * Returns:
	 * 		bytes (Int) - Amount of the MP3 file data loaded in bytes.
	 */
	getBytesLoaded:function(){
		if(!this.ready){return};
		return this.swf.getBytesLoaded();
	},
	/**
	 * Method: getBytesTotal
	 * 		Returns the total amount of the MP3 file data in bytes.
	 * 
	 * Returns:
	 * 		bytes (Int) - Total amount of the MP3 file data in bytes.
	 */
	getBytesTotal:function(){
		if(!this.ready){return};
		return this.swf.getBytesTotal();
	},
	/**
	 * Method: getPosition
	 * 		Returns the position of the playhead in milliseconds.
	 * 
	 * Returns:
	 * 		position (Int) - Position of the playhead in milliseconds.
	 */
	getPosition:function(){
		if(!this.ready){return};
		return this.swf.getPosition();
	},
	/**
	 * Method: getDuration
	 * 		Returns the total duration of the MP3 file in milliseconds.
	 * 
	 * Returns:
	 * 		duration (Int) - Total duration of the MP3 file in milliseconds.
	 */
	getDuration:function(){
		if(!this.ready){return};
		return this.swf.getDuration();
	},
	/**
	 * Events
	 */
	 
	/**
	 * Event: onSwiffLoad
	 * 		Fires when the Swiff has been loaded into the browser and its API is ready.
	 * 
	 * Arguments:
	 * 		this (Object) - Reference to the Moos class.
	 */
	onSwiffLoad:function(){
		this.ready = true;
		this.fireEvent('ready',[this]);
	},
	/**
	 * Event: onPlay
	 * 		Fires when the MP3 starts playing.
	 * 
	 * Arguments:
	 * 		this (Object) - Reference to the Moos class.
	 */
	onPlay:function(){
		this.fireEvent('onPlay',[this]);
	},
	/**
	 * Event: onPause
	 * 		Fires when the MP3 is paused.
	 * 
	 * Arguments:
	 * 		this (Object) - Reference to the Moos class.
	 */
	onPause:function(){
		this.fireEvent('onPause',[this]);
	},
	/**
	 * Event: onStop
	 * 		Fires when the MP3 is stopped.
	 * 
	 * Arguments:
	 * 		this (Object) - Reference to the Moos class.
	 */
	onStop:function(){
		this.fireEvent('onStop',[this]);
	},
	/**
	 * Event: onPlayback
	 * 		Fires periodically every 250ms during playback.
	 * 		Use this callback to receive periodical update on the playback progress.
	 * 
	 * Arguments:
	 * 		position (Int) - Position of the playhead in milliseconds.
	 * 		duration (Int) - Total duration of the MP3 file in milliseconds.
	 * 		this (Object) - Reference to the Moos class.
	 */
	onPlayback:function(position,duration){
		this.fireEvent('onPlayback',[position,duration,this]);
	},
	/**
	 * Event: onSoundProgress
	 * 		Fires periodically as long as the MP3 file is being downloaded by the browser.
	 * 		Use this callback to receive periodical update on the download progress
	 * 
	 * Arguments:
	 * 		bytesLoaded (Int) - Amount of the MP3 file data loaded in bytes.
	 * 		bytesTotal (Int) - Total amount of the MP3 file data in bytes.
	 * 		this (Object) - Reference to the Moos class.
	 */
	onSoundProgress:function(bytesLoaded,bytesTotal){
		this.fireEvent('onSoundProgress',[bytesLoaded,bytesTotal,this]);
	},
	/**
	 * Event: onSoundError
	 * 		Fires when there was an error loading the MP3 file.
	 * 
	 * Arguments:
	 * 		error (String) - Error text returned from the Flash API.
	 * 		this (Object) - Reference to the Moos class.
	 */
	onSoundError:function(error){
		this.ready = false;
		this.fireEvent('onSoundError',[error,this]);
	},
	/**
	 * Event: onSongComplete
	 * 		Fires when the MP3 file has finished playing.
	 * 
	 * Arguments:
	 * 		this (Object) - Reference to the Moos class.
	 */
	onSongComplete:function(){
		this.fireEvent('onSongComplete',[this]);
	},
	/**
	 * Event: onID3
	 * 		Fires when the ID3 data of the MP3 file is available (usually after successful download).
	 * 
	 * Arguments:
	 * 		id3Obj (Object) - The ID3 data object (in JSON format)
	 * 		this (Object) - Reference to the Moos class.
	 */
	onID3:function(id3Obj){
		this.id3 = id3Obj;
		this.fireEvent('onID3',[id3Obj,this]);
	},
	/**
	 * Util functions
	 */
	 
	/**
	 * Method: log
	 * 		Outputs log messages to the Javascript console (if available)
	 */
	log:function(msg){
		if(!this.options.debug || !$defined(console)){
			return;
		}
		console.log(msg);
	},
	/**
	 * Method: getFormattedDuration
	 * 		Returns the MP3 duration formatted in hh:mm:ss
	 * 
	 * Returns:
	 * 		duration (string) - The MP3 duration formatted in hh:mm:ss
	 */
	getFormattedDuration:function(){
		if(!this.ready){return};
		var t = this.getFormattedTime(this.getDuration());
		return t;
	},
	/**
	 * Method: getFormattedPosition
	 * 		Returns the MP3 position formatted in hh:mm:ss
	 * 
	 * Returns:
	 * 		position (string) - The MP3 position formatted in hh:mm:ss
	 */
	getFormattedPosition:function(){
		if(!this.ready){return};
		var t = this.getFormattedTime(this.getPosition());
		return t;
	},
	/**
	 * Method: getFormattedTime
	 * 		Converts a number from milliseconds to hh:mm:ss
	 * 
	 * Arguments:
	 * 		ms (Int) - A number (in milliseconds) to format
	 * 
	 * Returns:
	 * 		ms (string) - a string formatted in hh:mm:ss
	 */
	getFormattedTime:function(ms){
		var sec = Math.floor(ms/1000);
		var min = Math.floor(sec/60);
		var hr = this.formatZero(Math.floor(min/60));
		sec = this.formatZero(sec % 60);
		min = this.formatZero(min % 60);
		return hr+':'+min+':'+sec;
	},
	/**
	 * Method: formatZero
	 * 		Adds zero prefix to numbers lower than 10
	 * 
	 * Arguments:
	 * 		n (Int) - A number to format
	 * 
	 * Returns:
	 * 		n (string) - a string formatted with or without a zero prefix
	 */
	formatZero:function(n){
		return n < 10 ? '0'+n : n;
	}
});