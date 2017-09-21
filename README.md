# olp-gen
Generate a welcome slide for OpenLP.

## Instructions
- Add your hymns to an OpenLP service file and save.
- Launch olp-gen.html in a browser.
- Type in the speaker's name.
- Do the same for the Scripture reference. If you don't know it, just leave it as _unknown_.
- Choose the service file (ending in .osz).
- Copy the text.
- Create a new custom slide (or edit an old one).
- Click on edit all, select all (Ctrl + A) and paste.

## Setup
olp-gen should work out of the box if your broswer is compatible. There are one or two configuration options.
- In olp-gen.js, at the top there is a _welcome_ variable that can have a welcome message.
- In olp-gen.html, you can set a default value for _speaker_.

## Compatibility
olp-gen should work with any modern browser that interacts via the FIle API. Copying to the clipboard using the button is dependent on your browser, but isn't and essential part of the package.
