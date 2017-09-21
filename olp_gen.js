welcome = "Welcome!" // Set a default welcome message.
output = [];

function generate(text, i) {
    output[i] = text;
    f_output = output.join('\n[===]\n')
    document.getElementById("output").value = f_output;
}

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
    generate(s.join("\n\n"), 2);
}

function speaker(evt) {
    s = evt.target.value;
    if (s) {
        generate(s, 1);
    };
}

function scripture(evt) {
    book = document.getElementById("book").value;
    chap = document.getElementById("chapter").value.toString();
    verse = document.getElementById("verse").value.toString();
    speaker = document.getElementById("speaker").value;
    if (book == "unknown") {
        text = null;
        generate(speaker, 1);
    } else { 
        text = book + " " + chap + ":" + verse;
        generate(speaker + "\n\n" + text, 1);
    };
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
    };

window.onload = function() {
    if (window.File && window.Blob) {
        output = [welcome, document.getElementById("speaker").value]
        var x = document.getElementById("file").addEventListener("change", handleFile, false);
        var y = document.getElementById("speaker").addEventListener("change", speaker, false);
        var z = document.getElementById("scripture").addEventListener("change", scripture, false);
        document.getElementById("copy").addEventListener("click", function(evt) {
            var x = document.getElementById("output");
            x.select();

            try {
                document.execCommand('copy');
            } catch (err) {
                evt.target.disabled;
            };
        });
    } else {
        document.getElementById("output").value = 'APIs unsupported';
    };
};