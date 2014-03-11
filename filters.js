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
    { title: "django unchained", genre: 'action' },
    { title: "taxi driver", genre: 'action' },
    { title: "wolf of wallstreet", genre: 'action' },
   ]);


var activeFilter;
var FilterExample = Thorax.View.extend({

      itemFilter: function (model) {
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
        movies.trigger('reset');
      },

      filterOther: function() {
        activeFilter = 'action';
        movies.trigger('reset');
      },

      filterReset: function() {
        activeFilter = null;
        movies.trigger('reset');
      },


      collection: movies,

      template: Handlebars.compile("{{#button 'filterDrama' class='btn'}}drama{{/button}} {{#button 'filterOther' class='btn'}} other {{/button}} {{#button 'filterReset' class='btn'}}Clear{{/button}}  <br> <h2>movies</h2> {{#collection}}<li>{{title}} ( {{  genre  }} )</li>{{/collection}}")
});
