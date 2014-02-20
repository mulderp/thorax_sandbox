var view;

view = new Thorax.LayoutView({
  setView: function(view) {
    view.on('all', function(eventName) {
      return $('body').append(this.name + ': ' + eventName + '<br>');
    });
    Thorax.LayoutView.prototype.setView.call(this, view);
    return $('body').append('<hr>');
  },
  showViewA: function() {
    return this.setView(new Thorax.View({
      name: 'A',
      template: Handlebars.compile("A")
    }));
  },
  showViewB: function() {
    return this.setView(new Thorax.View({
      name: "B",
      template: Handlebars.compile("B")
    }));
  },
  template: Handlebars.compile("{{layout-element}}\n{{#button \"showViewA\" class=\"btn\"}}Set View A{{/button}}\n{{#button \"showViewB\" class=\"btn\"}}Set View B{{/button}}")
});

view.appendTo('body');
