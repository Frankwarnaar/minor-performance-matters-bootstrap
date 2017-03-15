# Audits on Bootstrap docs

## 1. Critical css

With gulp I automated generated critical css. This reduced the time before the initial render.

![Before](https://github.com/Frankwarnaar/minor-performance-matters-bootstrap/blob/master/audits/critical-css/before.png)
Before

![After](https://github.com/Frankwarnaar/minor-performance-matters-bootstrap/blob/master/audits/critical-css/after.png)
After

## 2. CDN usage

I serve static files from CDN's where possible.

![Before](https://github.com/Frankwarnaar/minor-performance-matters-bootstrap/blob/master/audits/cdn/css_before.png)
Css before

![After](https://github.com/Frankwarnaar/minor-performance-matters-bootstrap/blob/master/audits/cdn/css_after.png)
Css after

![Before](https://github.com/Frankwarnaar/minor-performance-matters-bootstrap/blob/master/audits/cdn/js_before.png)
Js before

![After](https://github.com/Frankwarnaar/minor-performance-matters-bootstrap/blob/master/audits/cdn/js_after.png)
Js after

## 3. Minify css
I minified the css files I cannot serve from a CDN

![Before](https://github.com/Frankwarnaar/minor-performance-matters-bootstrap/blob/master/audits/minify-css/before.png)
Before

![After](https://github.com/Frankwarnaar/minor-performance-matters-bootstrap/blob/master/audits/minify-css/after.png)
After

## 4. Minify html
I Minified the html files

![Before](https://github.com/Frankwarnaar/minor-performance-matters-bootstrap/blob/master/audits/minify-html/before.png)
Before

![After](https://github.com/Frankwarnaar/minor-performance-matters-bootstrap/blob/master/audits/minify-html/after.png)
After

## 5. Images converted to webp
With gulp I converted all the images to the .webp format. Also I automated replacing images in the html with pictures. These pictures first try to use the .webp sources and fallback to the original compressed images.

![Before](https://github.com/Frankwarnaar/minor-performance-matters-bootstrap/blob/master/audits/compress-images/before.png)
Before

![After](https://github.com/Frankwarnaar/minor-performance-matters-bootstrap/blob/master/audits/compress-images/after.png)
After
