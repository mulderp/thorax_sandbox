var Movie = Thorax.Model.extend({
  defaults: {
    title: '',
    genre: ''
  }
})

var Movies = Thorax.Collection.extend({
  model: Movie
})

var movies = new Movies([
    
    { title: "the artist", genre: 'drama'},
    { title: "la dolce vita", genre: 'drama' },
    { title: "django unchained", genre: 'action' }
   ]);


 var activeFilter= null;
 var listView = new Thorax.View({
      el: "#movies",
      events: {
        collection: {
          'all': function(ev) { console.log(ev) },
          filter: function(ev) { console.log("**"); console.log(ev) }
        }

      },

      itemFilter: function (model) {
        console.log("-- itemfilter --");
        console.log(activeFilter);
        if (activeFilter) {
			return model.get('genre') == activeFilter;
        }
        else {
          return true;
        }
      },

      filterDrama: function() {
        console.log(activeFilter);
        activeFilter = 'drama';
        movies.trigger('filter');
      },

      filterOther: function() {
        activeFilter = 'action';
        movies.trigger('filter');
      },


      collection: movies,

      template: Handlebars.compile("{{#button 'filterDrama' class='btn'}}drama{{/button}} {{#button 'filterOther' class='btn'}} other {{/button}} movies: {{#collection}}<li>{{title}} ( {{  genre  }} )</li>{{/collection}}")
  });

$(document).ready(function() {
  console.log("** render **");
  listView.render();
});
