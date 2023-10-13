/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://threejs.org/
*    Release: https://github.com/mrdoob/three.js/releases/tag/r75
*    Source File: MaskPass.js
*    
*    Copyrights:
*      copyright":"copyright (c) magenta ltd., 2004","description":"","trademark":"","designer":"","designer_url":"","unique_font_i
*      copyright":"copyright (c) μagenta ltd, 2004","description":"","trademark":"","designer":"","designer_url":"","unique_font_id
*      copyright":"copyright (c) magenta ltd., 2004.","description":"","trademark":"","designer":"","designer_url":"","unique_font_
*      copyright":"copyright (c) magenta ltd, 2004.","description":"","trademark":"","designer":"","designer_url":"","unique_font_i
*      ©":{"x_min":72,"x_max":1064,"ha":1138,"o":"m 1064 486 q 918 139 1064 285 q 570 -6 772 -6 q 220 139 369 -6 q 72 488 72 285 q 
*      ©":{"x_min":58,"x_max":957,"ha":1015,"o":"m 724 280 q 657 217 688 241 q 598 180 626 193 q 544 163 570 167 q 491 159 518 159 
*      ©":{"x_min":4,"x_max":830,"ha":834,"o":"m 416 1006 q 720 867 610 1006 q 830 495 830 729 q 720 123 830 261 q 416 -14 610 -14 
*      ©":{"x_min":3,"x_max":1007,"ha":1104,"o":"m 507 -6 q 129 153 269 -6 q 3 506 3 298 q 127 857 3 713 q 502 1017 266 1017 q 880 
*      ©":{"x_min":77,"x_max":1097,"ha":1174,"o":"m 611 247 q 670 255 643 247 q 719 277 697 263 q 756 307 741 290 q 782 341 772 324
*      ©":{"x_min":77,"x_max":1097,"ha":1174,"o":"m 77 495 q 95 631 77 566 q 146 753 113 696 q 225 857 179 810 q 328 937 272 903 q 
*      ©":{"x_min":-3,"x_max":1008,"ha":1106,"o":"m 502 -7 q 123 151 263 -7 q -3 501 -3 294 q 123 851 -3 706 q 502 1011 263 1011 q 
*      ©":{"x_min":80,"x_max":1058,"ha":1139,"o":"m 816 905 q 992 726 927 841 q 1058 481 1058 611 q 912 138 1058 283 q 567 -6 766 -
*      ©":{"x_min":68,"x_max":1088,"ha":1156,"o":"m 604 713 q 531 698 563 713 q 477 655 499 683 q 444 587 455 627 q 433 495 433 546
*      ©":{"x_min":68,"x_max":1088,"ha":1156,"o":"m 606 699 q 504 645 540 699 q 468 495 468 591 q 501 344 468 397 q 606 291 534 291
*      copyright � 2004 by magenta ltd. all rights reserved
*      copyright (c) 2004 by magenta ltd. all rights reserved.\r\n\r\npermission is hereby granted, free of charge, to any person o
*      copyright 2011 data arts team, google creative lab
*      copyright":"digitized data copyright © 2006, google corporation.","description":"","trademark":"droid is a trademark of goog
*      copyright":"digitized data copyright © 2006, google corporation.","description":"droid sans is a humanist sans serif typefac
*      copyright 2011 google inc. all rights reserved
*      ©":{"x_min":68,"x_max":922,"ha":990,"o":"m 690 250 q 632 201 659 221 q 579 169 604 181 q 528 152 553 157 q 479 147 503 147 q
*      copyright = u'2011, three.js authors
*      copyright":"copyright (c) sil international, 2003-2008.","description":"","trademark":"gentium is a trademark of sil interna
*      copyright (c) 2003-2008, sil international (http://www.sil.org/) with reserved font names \"gentium\" and \"sil\".\r\n\r\nth
*      copyright (c) 2009-2010 marcus geelnard
*      copyright (c) 2010-2012 three.js authors. all rights reserved
*    
*    Licenses:
*      MIT License
*      SPDXId: MIT
*    
*    Auto-attribution by Threatrix, Inc.
*    
*    ------ END LICENSE ATTRIBUTION ------
*/
/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.MaskPass = function ( scene, camera ) {

	this.scene = scene;
	this.camera = camera;

	this.enabled = true;
	this.clear = true;
	this.needsSwap = false;

	this.inverse = false;

};

THREE.MaskPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		var context = renderer.context;

		// don't update color or depth

		context.colorMask( false, false, false, false );
		context.depthMask( false );

		// set up stencil

		var writeValue, clearValue;

		if ( this.inverse ) {

			writeValue = 0;
			clearValue = 1;

		} else {

			writeValue = 1;
			clearValue = 0;

		}

		context.enable( context.STENCIL_TEST );
		context.stencilOp( context.REPLACE, context.REPLACE, context.REPLACE );
		context.stencilFunc( context.ALWAYS, writeValue, 0xffffffff );
		context.clearStencil( clearValue );

		// draw into the stencil buffer

		renderer.render( this.scene, this.camera, readBuffer, this.clear );
		renderer.render( this.scene, this.camera, writeBuffer, this.clear );

		// re-enable update of color and depth

		context.colorMask( true, true, true, true );
		context.depthMask( true );

		// only render where stencil is set to 1

		context.stencilFunc( context.EQUAL, 1, 0xffffffff );  // draw if == 1
		context.stencilOp( context.KEEP, context.KEEP, context.KEEP );

	}

};


THREE.ClearMaskPass = function () {

	this.enabled = true;

};

THREE.ClearMaskPass.prototype = {

	render: function ( renderer, writeBuffer, readBuffer, delta ) {

		var context = renderer.context;

		context.disable( context.STENCIL_TEST );

	}

};
