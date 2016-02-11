

Methone: The worlds first responsive topbar-as-a-service, or TBaaS
==================================================================
Because this is exactly what everybody really wanted.

All of datasektionen's systems should have the unified top bar. The
TBaaS was created to ensure that all systems use the latest and
greatest topbar.

Arch
----

Pages that wants the top-bar should include the bar.js file into
each page. The script loads configuration from the object tbaas_conf
which ofc must have been defined before including bar.js.

Fuzzyfiles
----------
Methone provides fuzzy navigation on sites where deployed. For this to work,
you might need to supply methone with an Fuzzyfile, which describes what items
it should be possible to search for. Once the bar is loaded, the bar will load
the Fuzzyfile (if specified) to learn how to fuzzy search pages on the site. Also,
the master Fuzzyfile will be loaded from the server. The menu items specified in
the configuration will also be added for fuzzy searching.

Please use the same system-name for all instances of your
implementation, or there will be duplicates.

How to use
----------
Everything works best when the parent element is an immidiate child of the body
tag. You should probably lower your page content by 50 pixels.

    <body>
      <div id="to-be-parent-element-for-bar"> <!-- Should be a direct child of body -->
        <nav>This will be replaced</nav>
      </div>
      ....

    <script>
      window.tbaas_conf = {
        system_name: "meta-tv",
        target_id: "to-be-parent-element-for-bar", // The only required var
        primary_color: "#E2007F",
        secondary_color "white",
        login_text: "Login with trisslott", // Default null, null hides button
        login_href: "/login",
        delta_invert: true,
        json_rpc_api_url: "/rpc", // The rpc command in the terminal will call this enpoint

        topbar_items: [
          {
            str: "About us",
            href: "http://my.system.se/about-us",
            new_window: true // Optional, default false
          }, ...
        ]
      }
    </script>

    <script async src="//methone.datasektionen.se"></script>

TERMINAL and json-rpc
--------
The terminal can be accessed by pressing cmd+i. By adding the json_rpc_api_url
configuration var you enable using the terminal to make json-rpc calls to the
service. It is recommended that the server implements the help command. See
example below for adding custom client side commands.

JS API
------
Available functions:

    //Add something to the fuzzy search
    Methone.addFuzzyEntry("Some function", "function fn", "#234234", "http://sf.se");

    // Update the menu. Menuspec can be seen in example above.
    Methone.setMenu(menuspec);

    Methone.setLoginButtonText("LOGIN");

    Methone.setOnLoginButtonClicked(function() {...});

    // Fn called when the overlay is shown/hidden.
    Methone.setOnShowHandler(fn);
    Methone.setOnHideHandler(fn);

    // To add commands to the terminal:
    document.body.addEventListener("methone:term:load", function(event) {
      Methone.dispatch.register("alert", function(cmd, term) {
        if(cmd.length < 2) {
          term.print("Usage: alert MESSAGE");
          return;
        }
        alert(cmd[1]);
      });
    });

An example Fuzzyfile:
---
Search is performed on the str value. The name MUST be of the form "Some Name -
Service name"

    {
      "@type": "fuzzyfile",

      "fuzzes": [
        {
          "name": "Lokalbokning - Datasektionen.se",
          "str": "lokalbokning booking",
          "color": "#FDDE00",
          "href": "http://datasektionen.se/sektionen/lokalbokning"
        }
      ]
    }

I want my links in the search!
----
1. Add a fuzzyfile to your system and publish it. It might be dynamically
generated.
2. Add your system to providers.json
3. Pull request
4. Ask ior to rebuild methone
