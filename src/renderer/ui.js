document.getElementById("urlInput").addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        let url = this.value;
        if(!url.startsWith("http")) url = "https://" + url;
        window.location.href = url;
    }
});