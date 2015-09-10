var RedditApp = {};

RedditApp.Item = function() {
};

RedditApp.Item.all = function() {
  console.log('Item.all got called');
  return $.get('http://api.reddit.com').then(function(response){
    var items = response.data.children;
    console.log('Response from api arrived. Thenned function in Item.all running.');
    return items;
  });
};

RedditApp.Controller = function(view){
  this.view = view;
};

RedditApp.Controller.prototype.loadAllPosts = function(){
  console.log('controller loadAllPosts running');
  var futureItems = RedditApp.Item.all();
  console.log('Item.all has returned');
  futureItems.then(function(data){
    console.log('Thenned function in controller loadAllPosts running');
    this.view.drawItems(data);
  }.bind(this));
};


RedditApp.View = function($element){
  this.$element = $element;
};

RedditApp.View.prototype.drawItems = function(items){
  console.log('View drawItems called');
  var templateSource = $('#posts_template').html();
  var template = Handlebars.compile(templateSource);
  var context = {posts: items};
  var output = template(context);
  $('div#posts').html(output);

};


$(document).ready(function(){
  var view = new RedditApp.View($('div#posts'));
  var ctrl = new RedditApp.Controller(view);
  ctrl.loadAllPosts();
  console.log('controller loadAllPosts returned');
});