function findLink(href, mustContainInteger)
{
    var links = document.getElementsByTagName('a');
    var link;
    var linkHref;

    for (var i = 0; i < links.length; ++i) {
        link = links[i];
        linkHref = link.getAttribute('href');

        if (mustContainInteger && isNaN(parseInt(link.textContent))) {
            continue;
        }

        if (linkHref !== null && linkHref.endsWith(href)) {
            return link;
        }
    }

    return null;
}

function addToItemCount(href, itemKey, itemCounts)
{
    var link = findLink(href, true);
    itemCounts[itemKey] = link === null ? 0 : parseInt(link.textContent);
}

if (document.getElementsByTagName('title').length > 0) {
    var itemCounts = null;
    var loginLink = findLink('/login/', false);

    if (null === loginLink) {
        itemCounts = {};

        addToItemCount('/msg/submissions/', 'submissions', itemCounts);
        addToItemCount('/msg/others/#comments', 'comments', itemCounts);
        addToItemCount('/msg/others/#journals', 'journals', itemCounts);
        addToItemCount('/msg/others/#watches', 'watches', itemCounts);
        addToItemCount('/msg/others/#favorites', 'favorites', itemCounts);
        addToItemCount('/msg/pms/', 'privateMessages', itemCounts);
    }

    browser.runtime.sendMessage({'action': 'itemCountsChange', itemCounts: itemCounts});
}
