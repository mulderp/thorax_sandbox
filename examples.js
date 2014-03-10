Handlebars.template["examples"] = Handlebars.compile('{{#collection examples tag="ul"}}<li>{{#button action }} {{name}} {{/button}}</li>{{/collection}}');

Handlebars.template["root"] = Handlebars.compile(' <div id="sidebar"> <a href="#">All</a> {{view sidebar}}  </div> {{layout-element}}');

var examples = new Thorax.Collection( 
    [
           {id: 1, name: "todos", action: "someExample"},
           {id: 2, name: "todos 2", action: "otherExample"} 
    ]);


var ExamplesList = Thorax.View.extend({
  className: 'container',
  template: Handlebars.template["examples"],
  someExample: function(ev) {
    ev.preventDefault();
    var target = $(ev.currentTarget);
    this._navigateTo(target.model().get('action'));
  },
  otherExample: function(ev) {
    ev.preventDefault();
    var target = $(ev.currentTarget);
    this._navigateTo(target.model().get('action'));
  },
  _navigateTo: function(dest) {
    router.navigate("#examples/" + dest, {trigger: true});
  }

});


var RootView = Thorax.LayoutView.extend({
  tagName: "article",
  template: Handlebars.template["root"],
  sidebar: new ExamplesList({examples: examples})
});

var ExamplesRouter = Backbone.Router.extend({

  routes: {
    "examples/:id": "showExample",
    "": "showIndex"
  },

  showExample: function(id) {
    console.log("render a single example with layout");
    if (id == "someExample") {
      var todosExample = new TodosExample();
      rootView.setView(todosExample);
    }
    else
    {
      var helperExampleview = new HelperExampleview();
      rootView.setView(helperExampleview);
    }
  },

  showIndex: function(id) {
    console.log("show index view");
    rootView.setView(todosExample);
  }

});

var router, rootView, examplesList;
$(document).ready(function() {
  examplesList = new ExamplesList({el: "#sidebar", examples: examples});

  rootView = new RootView();
  rootView.appendTo("body");
  
  router = new ExamplesRouter();
  Backbone.history.start();

  console.log("render collection filter");

});
