var ui, view;

var LayoutExample = Thorax.View.extend({
  listing: new Thorax.LayoutView,

  setA: function() {
    this.dramas.retain();
    return this.listing.setView(this.dramas);
  },

  setB: function() {
    this.comedies.retain();
    return this.listing.setView(this.comedies);
  },

  template: Handlebars.compile("<div class=\"sidebar\">\n  {{#button \"setA\"}}Comedies{{/button}}\n  {{#button \"setB\"}}Dramas{{/button}}\n</div>\n<div class=\"main\">\n  {{view listing}}\n</div>"),

  initialize: function() {
    this.comedies = new Thorax.View({
      template: Handlebars.compile("comedies")
    });
    
    this.dramas = new Thorax.View({
      template: Handlebars.compile("dramas")
    });
  }
});

