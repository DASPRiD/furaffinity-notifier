var ul = document.getElementsByTagName('ul')[0];

var sending = browser.runtime.sendMessage({action: 'getItemCounts'});
sending.then(function (message) {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    var itemCounts = message.itemCounts;

    if (itemCounts === null) {
        addLink(null, 'Please log in', null, '/login/');
        return;
    }

    addLink(itemCounts.submissions, 'Submission', 'Submissions', '/msg/submissions/');
    addLink(itemCounts.comments, 'Comment', 'Comments', '/msg/others/#comments');
    addLink(itemCounts.journals, 'Journal', 'Journals', '/msg/others/#journals');
    addLink(itemCounts.watches, 'Watch', 'Watches', '/msg/others/#watches');
    addLink(itemCounts.favorites, 'Favorite', 'Favorites', '/msg/others/#favorites');
    addLink(itemCounts.privateMessages, 'Private Message', 'Private Messages', '/msg/pms/');
});

function addLink(count, singularLabel, pluralLabel, path)
{
    var a = document.createElement('a');

    if (null === count) {
        a.textContent = singularLabel;
    } else {
        a.textContent = count.toString() + ' ' + (1 === count ? singularLabel : pluralLabel);
    }

    a.setAttribute('href', 'https://www.furaffinity.net' + path);
    a.setAttribute('target', '_blank');
    a.addEventListener('click', function (event) {
        browser.tabs.create({
            url: this.getAttribute('href')
        });

        event.preventDefault();
        window.close();
    });

    var li = document.createElement('li');
    li.appendChild(a);
    ul.appendChild(li);
}
