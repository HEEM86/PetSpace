
$(document).ready(function () {

    var postContainer = $(".postContainer")
  
  
    var posts = [];
  
  
  
    getData();
    function getData() { 
    
    $.get("/api/user_data").then(function(data) {
        thisID = data.id
        console.log(thisID)
        $.get("api/user/"+thisID, function (data) {
            posts = data
      
            console.log(data)
            initializeRows()
          })     
    
        })
        }
    function initializeRows() {
  
      postContainer.empty();
      var rowsToAdd = [];
  
  
      for (var i = posts.length-1; i >= 0; i--) {
        rowsToAdd.push(createNewRow(posts[i]));
  
      }
      console.log(rowsToAdd)
      postContainer.prepend(rowsToAdd)
  
    }
  
    function createNewRow(post) {
      console.log(post)
      var commentString = "";
      for (var i = 0; i < post.Comments.length; i++) {
        commentString += '<p class="card p-2 m-1"><strong>' + post.Comments[i].User.username + ":</strong>  " + post.Comments[i].comment + '</p>'
      }
  
      var $newInputRow = $(
        `
            <div class="col-lg mb-4">
                <div class="card h-100">
                <img class="card-img-top img-fluid" src="${post.imageURL}" alt="">
                <div class="card-body">
                <h2 class="card-title caption"><strong>${post.User.username}:</strong>    ${post.title}</h2>
                <p class="card-text"> ${commentString}</p>
                </div>
                <div class="card-footer">
                <div class="input-group">
                <input type="text" class="form-control commentText${post.id}" aria-label="With textarea" style="border: orange 2px solid;"></input>
                    <button type="button" class="btn commentBtn" data-id="${post.id}" style="background-color: orange">Comment</button>
                </div>
                </div>
            </div>
            </div>
        `

      )

      $newInputRow.data("post", post);
      return $newInputRow;
    };  
  
  })