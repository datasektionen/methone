

Methone: The worlds first topbar-as-a-service, or TBaaS
==============================================
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

    <div id="to-be-parent-element-for-bar">
      <nav>This will be replaced</nav>
    </div>

    <script>
      window.tbaas_conf = {
        system_name: "meta-tv",
        target_id: "to-be-parent-element-for-bar"
        primary_color: "#E2007F",
        secondary_color "white",
        fuzzy_file: "/Fuzzyfile",
        fuzzy_only: false, /* Only add support for cmd+K shortcut, do not insert top bar
        topbar_items: [
          {
            str: "About us",
            href: "http://my.system.data.se/about-us"
          }, ...
        ]
      }
    </script>

    <script
      src="//tbaas.datasektionen.se/bar.js"
      type="text/javascript"></script>


An example Fuzzyfile:
---
Search is performed on the str value.

    {
      "@type": "fuzzyfile",

      "fuzzes": [
        {
          "str": "Kapplöpning",
          "href": "href://datasektionen.se/sektionen/metadorerna/kapplopning"
        }
      ]
    }
