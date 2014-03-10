  var TodosExample;
  
  TodosExample = Thorax.View.extend({
    collection: new Thorax.Collection([
      {
        title: "First Todo",
        done: true
      }
    ]),
    events: {
      "submit form": function(event) {
        event.preventDefault();
        this.collection.add(this.serialize());
        return this.$('input[name="title"]').val('');
      },
      'change input[type="checkbox"]': function(event) {
        return $(event.target).model().set({
          done: event.target.checked
        });
      }
    },
    template: Handlebars.compile("{{#collection tag=\"ul\"}}\n  <li {{#done}}class=\"done\"{{/done}}>\n    <input type=\"checkbox\" {{#done}}checked{{/done}}>\n    {{title}}\n  </li>\n{{/collection}}\n<form>\n  <input name=\"title\">\n  <input type=\"submit\" value=\"Add\">\n</form>")
  });
