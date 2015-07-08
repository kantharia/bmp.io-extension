/**********************************
    For Chrom extention
**********************************/

var api = {
  protocol : "http",
  host: "bmp.io",
  create: "/create",
  getHostName : function(){
    return [this.protocol,"://",this.host].join("");
  },
  getCreateUrl : function(){
    return [this.getHostName(),this.create].join("");
  } 
};

function copyToClipboard() {
    var text = $("#shortUrl").val(); 
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);
    copyDiv.innerHTML = text;
    copyDiv.unselectable = "off";
    copyDiv.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);
    $('body').fadeOut('slow').queue( function(){ window.close(); } );
}


function shortenUrl(longUrl) {
    
    var mydata = JSON.stringify({
        "url": longUrl
    });

    $.ajax({
        url: api.getCreateUrl(),
        type: "POST",
        data: "url="+encodeURIComponent(longUrl),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(data) {
          console.log(data);
          if(data.id){
            $('#shortUrl').val(api.getHostName()+"/"+data.id);
            $(".btn").show();
            $("#copyButton").focus();
          } else {
            $('#shortUrl').val("Not valid url");
            $(".btn").hide();
          }
          
          //Adding Event Listener Becoz of Chrome Security Issue
          var copyBtn = document.getElementById("copyButton");
          copyBtn.addEventListener("click", copyToClipboard, false);

        }
    });
}


//Init
chrome.tabs.getSelected(null, function(tab) {
    shortenUrl(tab.url);
});
