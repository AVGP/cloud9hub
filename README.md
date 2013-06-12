#Cloud9Hub

##What's this?
It's a simple interface for the Cloud 9 open source edition to easily create, use and manage multiple workspaces.
[The Cloud9 service](https://c9.io) has a shiny and awesome dashboard interface where you can manage multiple workspaces,
however the [open source edition](https://github.com/ajaxorg/cloud9) is a single workspace instance of Cloud9.

As I like the possibility to easily start working on different workspaces, create or delete them, I created Cloud9Hub to do so.

##What's Cloud9?
A full-blown IDE in your browser. It has a full terminal integration, can run and deploy code of different languages (e.g. Ruby, node.js, PHP)
and [lots more](https://c9.io/site/features/).

##Status Quo of Cloud9Hub
Right now it can
* Create new workspaces
* Launch multiple workspace instances
* Kill them automatically after 15 minutes
* List available workspaces

It **can't**
* Manage multiple users
* Do authentication/sessions
* Remove workspaces
* Sense, that you're active and **not** kill your workspace after 15 minutes.

right now. These are the next steps for me to build (or you make a Pull Request with the features you want).

##License
MIT, baby.

##WARNING
This is highly insecure, experimental and it may bite.
