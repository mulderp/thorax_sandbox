var paragraphView, view;

paragraphView = new Thorax.View({
  events: {
    'click p': function() {
      return $('body').append('child clicked<br>');
    }
  },
  template: Handlebars.compile("<p>I'm inside another view, I'll be treated\nas my own distinct view.</p>")
});

view = new Thorax.View({
  name: 'embed-example',
  events: {
    'click p': function() {
      return $('body').append('parent clicked<br>');
    }
  },
  paragraphOne: paragraphView,
  paragraphThree: $("<p>I'm inside a DOM element that was created with $ and will be treated as part of the view.</p>"),
  template: Handlebars.compile("<h3>A Tale of Three Paragraphs</h3>\n{{view paragraphOne}}\n{{template \"paragraph-two\"}}\n{{element paragraphThree}}\n<hr>")
});

Thorax.templates['paragraph-two'] = Handlebars.compile("<p>I'll be embedded directly as a part of the\ntemplate and be treated as part of the view.</p>");

view.appendTo('body');
