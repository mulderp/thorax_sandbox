view = new Thorax.View
  collection: new Thorax.Collection [
    title: "First Todo", done: true
  ]
  events:
    "submit form": (event) ->
      event.preventDefault()
      @collection.add @serialize()
      @$('input[name="title"]').val('')
    'change input[type="checkbox"]': (event) ->
      $(event.target).model().set done: event.target.checked
  template: Handlebars.compile """
    {{#collection tag="ul"}}
      <li {{#done}}class="done"{{/done}}>
        <input type="checkbox" {{#done}}checked{{/done}}>
        {{title}}
      </li>
    {{/collection}}
    <form>
      <input name="title">
      <input type="submit" value="Add">
    </form>
  """
view.appendTo('body')
