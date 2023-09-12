Methone: The worlds first responsive topbar-as-a-service, or TBaaS
==================================================================
Because this is exactly what everybody really wanted.

All of datasektionen's systems should have the unified top bar. The
TBaaS was created to ensure that all systems use the latest and
greatest topbar.

Arch
----

Pages that wants the top-bar should include the main.js file into
each page. The script loads configuration from the object methone_conf
which must have been defined before including bar.js.

Fuzzyfiles
----------
Methone provides fuzzy navigation on sites where deployed. For this to work,
you might need to supply methone with an fuzzyfile, which describes what items
it should be possible to search for. Once the bar is loaded, the bar will load
the fuzzyfile (if specified) to learn how to fuzzy search pages on the site. Also,
the master fuzzyfile will be loaded from the server.

How to use
----------
Everything works best when the parent element is an immidiate child of the body
tag. You should probably lower your page content by 50 pixels.
```html
<body>
  <div id="methone-container-replace"> <!-- Should be a direct child of body -->
  <nav>This will be replaced</nav>
  </div>
  ....

<script>
  window.methone_conf = {
  system_name: "meta-tv",
  color_scheme: "cerise",
  login_text: "Login with trisslott", // Default null, null hides button
  login_href: "/login",
  links: [
    {
    str: "About us",
    href: "http://my.system.se/about-us",
    }, ...
  ]
  }
</script>

<script async src="//methone.datasektionen.se/bar.js"></script>
<script>
  // The config can be updated dynamically!
  window.methone_conf.update({
  login_text: "Log out",
  login_href: "/logout"
  })
  // Only the provided keys will be updated.
</script>
```

Usage as a React component
--------------------------

If you are building a React app it is possible to include Methone as a component directly. If you do this you will be able to also use React Router with top-bar navigation. Instead of defining a `window.methone_conf` you directly pass a config property on the Methone element.
```javascript
config = {
  system_name: "meta-tv",
  color_scheme: "cerise",
  links: [
    {
      str: "About us",
      href: "http://my.system.se/about-us",
    },
    <Link to="/">Home</Link>,
    <Link to="/some/href">str</Link>,
    {
      str: "Interchangable links should work",
      href: "/but/who?knows"
    }
  ]
}

return (
  <div id="application" className="cerise"> // To color header (if used)
  <Methone config={config} />
  <Header title="Methone"> // Optional header displayed below the bar
  <div>
    ...
  </div>
  </div>
)
```

The implementation for Link elements is quite primitive, so they should probably follow the above format quite closely. If something else works, great, but dont count on it...

I want my links in the search!
------------------------------
There are two types of links, global and local. To add a global link do it need to be in the fuzzyfile.js of this repo, pull request are a good way to get your system to appear everywhere!
If you want local links that are only available in your system methone looks for a fuzzyfile at `/fuzzyfile`. The content may be dynamically generated.

An example fuzzyfile:
Search is performed on the str value.
```json
{
  "@type": "fuzzyfile",

  "fuzzes": [
  {
    "name": "Lokalbokning - Datasektionen.se",
    "str": "lokalbokning booking",
    "color": "#FDDE00",
    "href": "http://datasektionen.se/sektionen/lokalbokning"
  },
  {
    "name": "Mottagningen - Datasektionen.se",
    "str": "mottagningen",
    "href": "/sektionen/mottagningen"
  }
  ]
}
```
