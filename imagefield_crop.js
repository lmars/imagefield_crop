/* $Id$ */

Drupal.behaviors.imagefield_crop = function (context) { 
  //$('#cropbox', context).Jcrop({
  var api = $.Jcrop($('#cropbox', context), {
    onChange: showPreview, 
    onSelect: setCoords,
    aspectRatio: Drupal.imagefield_crop.ratio,
    boxWidth: Drupal.imagefield_crop.box_width,
    boxHeight: Drupal.imagefield_crop.box_heignt
//    setSelect: getDimensions()
  });   
  var dim = getDimensions();
  api.setSelect(dim);

  // if images was scaled for display, scale the crop box. This should be given by Jcrop in future versions.
  var select = api.tellSelect();
  var scaled = api.tellScaled();
  var xscale = scaled.x/select.x;
  var yscale = scaled.y/select.y;
  if (xscale != 1 || yscale != 1) {
    api.animateTo([dim[0]*xscale, dim[1]*yscale, dim[2]*xscale, dim[3]*yscale]);
  }
  

  function setCoords(c) {
    setDimensions(c.x, c.y, c.w, c.h);
  };

  function showPreview(c) {
   
    var rx = Drupal.settings.imagefield_crop.preview.width / c.w;
    var ry = Drupal.settings.imagefield_crop.preview.height / c.h;
    
    $('.jcrop-preview', context).css({
      width: Math.round(rx * Drupal.settings.imagefield_crop.preview.orig_width) + 'px',
      height: Math.round(ry * Drupal.settings.imagefield_crop.preview.orig_height) + 'px',
      marginLeft: '-' + Math.round(rx * c.x) + 'px',
      marginTop: '-' + Math.round(ry * c.y) + 'px'
    });
      
  };

  // get select box dimensions from the form
  function getDimensions() {
    x =  parseInt($(".edit-image-crop-x", context).val()); 
    y =  parseInt($(".edit-image-crop-y", context).val());
    w =  parseInt($(".edit-image-crop-width", context).val());
    h =  parseInt($(".edit-image-crop-height", context).val());
    return [x, y, x+w, y+h];
  };

  function setDimensions(x, y, w, h) {
    $(".edit-image-crop-x", context).val(x);
    $(".edit-image-crop-y", context).val(y);
    if (w) $(".edit-image-crop-width", context).val(w);
    if (h) $(".edit-image-crop-height", context).val(h);
    $(".edit-image-crop-changed", context).val(1);
  };
};


