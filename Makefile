all: clean furaffinity-notifier.xpi

furaffinity-notifier.xpi:
	zip -r furaffinity-notifier.xpi background content icons options popup LICENSE manifest.json

clean:
	rm -f furaffinity-notifier.xpi
