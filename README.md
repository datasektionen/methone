

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
Once the bar is loaded, the bar will load the Fuzzyfile (if
specified) to learn how to fuzzy search pages on the site. Also,
the master Fuzzyfile will be loaded from the server. The fuzzyfiles
are used to support fuzzy-text search across all systems.

Please use the same system-name for all instances of your
implementation, or there will be duplicates.

How to use
----------
    // Include this in the beginning

    <script>
      window.tbaas_conf = {
        system_name: "meta-tv",
        target_id: "some-element-id"
        system_color: 0xE2007F,
        fuzzy_file: "http://my.system.se/Fuzzyfile"
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
      type="text/javascript"/>




* VanillaJS
* Extensible
