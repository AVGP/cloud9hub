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
* Delete workspaces
* Manage multiple users
* Do authentication/sessions
* Sense, that you're active and will kill your workspace after 15-20 minutes of inactivity.

right now. These are the next steps for me to build (or you make a Pull Request with the features you want).

##Installation
First you will need [node.js](http://nodejs.org/), at least v0.8.

Then you can try the quick install or the manual way:

### Quick install

```shell
curl https://raw2.github.com/AVGP/cloud9hub/master/install.sh | sh
```

This should install Cloud9 and Cloud9Hub into the current folder. If this succeeded, you can now go to the configuration section.

### Manual installation
1. Install [Cloud9](https://github.com/ajaxorg/cloud9) into some folder, say ``/var/awesomeness/cloud9``.
**Note, the cloud9 is currently hardcoded to c9. when cloning cloud9, clone to c9 dir. If this isn't done, hub will crash.
2. Then install Cloud9Hub into the parent folder above your cloud9 installation, so in my example``/var/awesomeness/cloud9hub` and run ``npm install``.

# Configuration

First things first: You need a Github application to provide the "Login with Github" feature, which is currently the only login mechanism.

Go to [https://github.com/settings/applications/new](https://github.com/settings/applications/new) and create a new application. Note down the client ID and secret, you'll need them later.

Now copy the ``config.js.example`` to ``config.js`` and edit the contents:

- Add your Github client ID and secret
- Change your BASE_URL to your server's address (do not include the port!)

##Firewall
You will need ports 3000 and 5000 to however many connections will be taking place concurrently (each session is given a different port)

##Running as a daemon
If you wish to, you can run it as a daemon, so that it stays alive.

To do so, I recommend [forever](https://npmjs.org/package/forever).

##License
**This project:** [MIT License](http://opensource.org/licenses/MIT), baby.
**Cloud9 itself:** [GPL](http://www.gnu.org/licenses/gpl.html)

##WARNING
This is highly insecure, experimental and it may bite.
