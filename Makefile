port = 8000

NODE_PATH ?= ./node_modules/.bin

server:
	python -m SimpleHTTPServer $(port)

python3:
	python -m http.server $(port)

build-css:
	$(NODE_PATH)/uglifycss widgets/css/default.css > widgets/css/default.min.css
	$(NODE_PATH)/uglifycss widgets/css/base.css > widgets/css/base.min.css

build-js:
	$(NODE_PATH)/uglifyjs widgets/horoscope-widget.js -o widgets/horoscope-widget.min.js -c --lint --comments

lint:
	$(NODE_PATH)/jshint --show-non-errors widgets/horoscope-widget.js

build: lint build-js build-css

build-deps:
	npm install
