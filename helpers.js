  Handlebars.registerViewHelper('on', function(name, view) {
    return view.listenTo(view.parent, name, function() {
      return view.render();
    });
  });
  
  var HelperExampleview = Thorax.View.extend({
    increment: function() {
      this.count || (this.count = 0);
      ++this.count;
      return this.trigger('incremented');
    },
    template: Handlebars.compile("{{#button \"increment\" class=\"btn\"}}++{{/button}}\n{{#on \"incremented\" tag=\"span\"}}{{count}}{{/on}}")
  });
