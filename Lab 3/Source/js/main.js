$(document).ready(function () {
    $('#git').keyup(function(){
        $('#ID').html("<p>Invalid User</p>")
        gitLookup($('#git').val());
    });

});

function gitLookup(user) {
    var API = 'https://api.github.com'
    $.get(API+'/users/'+user,function(data, status){
        $('#avatar').attr("src",data['avatar_url']);
        $('#ID').html("<p>User ID: "+data['login']);
        $('#name').html("<p>Name: "+data['name']);
        $('#date').html("<p>Name: "+data['created_at']);
        $('#link').html(" <a id='temp'>Profile</a>");
        $('#temp').attr("href",data['url']);
        $('#followers').html("<p>Followed by: "+data['followers']+" users");
        $('#following').html("<p>Follows: "+data['following']+" users");
        $('#num_repos').html("<p>Public Repos: "+data['public_repos']);
    });
    $.get(API+'/users/'+user+"/repos",function(data, status){
        $('#repos').html("<p>Repo 1: "+data[0]['name']+"<p>Repo 2: "+data[1]['name']+"<p>Repo 3: "+data[2]['name']+"<p>Repo 4: "+data[3]['name']+"<p>Repo 5: "+data[4]['name']);
    });
}

