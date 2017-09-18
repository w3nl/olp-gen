function handle_osj(text) {
    osj = JSON.parse(text);
    var s = [];
    for (i = 1; i < osj.length; i++) {
        o = osj[i];
        if (!o.serviceitem) {
            continue;
        } else if (o.serviceitem.header.name == "songs") {
            s.push(o.serviceitem.header.title);
        };
    }
    document.getElementById("output").value = s.join("\n\n");//<br/><br/>");
}

function handleFile(evt) {
    f = evt.target.files;
    z = f[0];
    // var reader = new FileReader();
    // reader.readAsBinaryString(z);
    zip.createReader(new zip.BlobReader(z), function(reader) {
        // get all entries from the zip
        reader.getEntries(function(entries) {
            if (entries.length) {
                search: for (i = 0; i < entries.length; i++) {
                    if (entries[i].filename.slice(-4) == ".osj") {
                        // get first entry content as text
                        entries[0].getData(new zip.TextWriter(), function(text) {
                        // text contains the entry data as a String
                        //console.log(text);
                        // document.getElementById("test").innerHTML = text;
                        handle_osj(text);
            
                        // close the zip reader
                        reader.close(function() {
                        // onclose callback
                        });
            
                        }, function(current, total) {
                        // onprogress callback
                        });
                        
                        break search;
                    };
                }
            }
          });
        }, function(error) {
          // onerror callback
          document.getElementById("output").value = 'Unexpected error';
        });
    }

window.onload = function() {
    if (window.File && window.Blob) {
        var x = document.getElementById("file");
        x.addEventListener("change", handleFile, false);
    } else {
        document.getElementById("output").value = 'APIs unsupported';
    };
};