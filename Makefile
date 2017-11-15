all: clean furaffinity-notifier.xpi

furaffinity-notifier.xpi:
	zip -r furaffinity-notifier.xpi background icons LICENSE manifest.json options

clean:
	rm -f furaffinity-notifier.xpi
