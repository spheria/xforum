// Compiled using marko@4.4.19 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_escapeXml = marko_helpers.x,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out) {
  var data = input;

  out.w("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>My App</title><title>Home</title><link rel=\"stylesheet\" href=\"/css/vendor/superhero.min.css\"><link rel=\"stylesheet\" href=\"/css/nav.css\"><script src=\"https://www.google-analytics.com/analytics.js\"></script><script src=\"/js/lib/jquery.min.js\"></script><script src=\"/js/lib/bootstrap.min.js\"></script><script src=\"/js/main.js\"></script></head><body>");

  component_globals_tag({}, out);

  out.w("<nav class=\"navbar navbar-default navbar-static-top\"><div class=\"container\"><div class=\"navbar-header\"><button type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar\" class=\"navbar-toggle collapsed\"><span class=\"sr-only\">Toggle navigation</span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span><span class=\"icon-bar\"></span></button><a href=\"/\" class=\"navbar-brand\">Project name</a></div><div id=\"navbar\" class=\"navbar-collapse collapse\"><ul class=\"nav navbar-nav\"><li class=\"active\"><a href=\"/\">Home</a></li><li class=\"\"><a href=\"/contact\">Contact</a></li><li class=\"\"><a href=\"/account/posts\">Posts</a></li><li class=\"\"><a href=\"/categories/list\">Categories</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li class=\"dropdown\"><a href=\"#\" data-toggle=\"dropdown\" class=\"navbar-avatar dropdown-toggle\"><img src=\"https://gravatar.com/avatar/a27a3c93ba78d42097c3a834ccdaad8c?s=200&amp;amp;d=retro\"> Ace Besmonte <i class=\"caret\"></i></a><ul class=\"dropdown-menu\"><li><a href=\"/account/profile\">My Account</a></li><li class=\"divider\"></li><li><a href=\"/logout\">Logout</a></li></ul></li></ul></div></div></nav><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-sm-4\"><div class=\"panel\"><div class=\"panel-body\">");

  if (data) {
    out.w("<h3>" +
      marko_escapeXml(data.post.title) +
      "</h3><p>" +
      marko_escapeXml(data.post.body) +
      "</p><cite>" +
      marko_escapeXml(data.post.categories) +
      "</cite>");
  }

  out.w("</div></div></div></div></div><footer><p>© 2016 Company, Inc. All Rights Reserved.</p></footer><script>\n    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=\n      function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;\n      e=o.createElement(i);r=o.getElementsByTagName(i)[0];\n      e.src='https://www.google-analytics.com/analytics.js';\n      r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));\n      ga('create','UA-XXXXX-X','auto');ga('send','pageview');\n    </script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out);

  out.w("</body></html>");
}

marko_template._ = render;

marko_template.meta = {
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
