var ui, view;

ui = {};

ui.comedies = new Thorax.View({
  template: Handlebars.compile("comedies")
});

ui.dramas = new Thorax.View({
  template: Handlebars.compile("dramas")
});

view = new Thorax.View({
  listing: new Thorax.LayoutView,

  setA: function() {
    ui.dramas.retain();
    return this.listing.setView(ui.dramas);
  },

  setB: function() {
    ui.comedies.retain();
    return this.listing.setView(ui.comedies);
  },

  template: Handlebars.compile("<div class=\"sidebar\">\n  {{#button \"setA\"}}Comedies{{/button}}\n  {{#button \"setB\"}}Dramas{{/button}}\n</div>\n<div class=\"main\">\n  {{view listing}}\n</div>")
});

$(document).ready(function() {
  view.appendTo('body');
})
