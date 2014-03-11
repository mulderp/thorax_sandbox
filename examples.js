Handlebars.template["examples"] = Handlebars.compile('{{#collection examples tag="ul"}}<li>{{#button action }} {{name}} {{/button}}</li>{{/collection}}');

Handlebars.template["root"] = Handlebars.compile(' <div id="sidebar"> <a href="#">All</a> {{view sidebar}}  </div> {{layout-element}}');

var examples = new Thorax.Collection( 
    [
           {id: 1, name: "todos", action: "todosExample"},
           {id: 2, name: "helpers", action: "helpersExample"},
           {id: 3, name: "layouts", action: "layoutExample"},
           {id: 4, name: "filtering", action: "filterExample"}
    ]);


//----- the router
var ExamplesList = Thorax.View.extend({
  className: 'controls',
  template: Handlebars.template["examples"],
  todosExample: function(ev) {
    ev.preventDefault();
    var target = $(ev.currentTarget);
    this._navigateTo(target.model().get('action'));
  },
  helpersExample: function(ev) {
    ev.preventDefault();
    var target = $(ev.currentTarget);
    this._navigateTo(target.model().get('action'));
  },
  filterExample: function(ev) {
    ev.preventDefault();
    var target = $(ev.currentTarget);
    this._navigateTo(target.model().get('action'));
  },
  layoutExample: function(ev) {
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

var layoutExample;


//----- the router
var ExamplesRouter = Backbone.Router.extend({

  routes: {
    "examples/:id": "showExample",
    "": "showIndex"
  },

  showExample: function(id) {
    if (id == "todosExample") {
      var todosExample = new TodosExample();
      rootView.setView(todosExample);
    }
    else if (id == "helpersExample")
    {
      var helperExample = new HelperExampleView();
      rootView.setView(helperExample);
    }
    else if (id == "layoutExample")
    {
      layoutExample = new LayoutExample();
      layoutExample.on("deactivated", function() {
        layoutExample.retain();
      });
      rootView.setView(layoutExample);
    }
    else if (id == "filterExample")
    {
      var filterExample = new FilterExample();
      rootView.setView(filterExample);
    }
  },

  showIndex: function(id) {
    console.log("show index view");
    var showWelcome = new WelcomesView();
    rootView.setView(showWelcome);
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
