# maximus-addon-0.0.1 #
Firefox and Firefox Android Addon for [maximus](https://github.com/W3G33K/maximus).

The maximus-addon project uses Webpack's own built in module resolution to help keep ES6 style imports short and sweet, e.g.
``import StringUtil from "app/util/string.util";`` is easier on the eyes than ``import StringUtil from "../util/string.util";``.
However the downside to this is some IDEs like JetBrains WebStorm may not resolve the modules since it cannot parse and apply
the Webpack config.

To fix this you just have to mark the **src directory** as a resource root (Right-Click, Mark Directory As / Resource Root).
