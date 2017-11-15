function updateTimeout()
{
    updateCount();

    browser.storage.local.get(function (options) {
        setTimeout(updateTimeout, (options.updateInterval || 5) * 60 * 1000);
    });
}

var itemCounts = null;
var itemMap = {
    'Submissions': 'submissions',
    'Comments': 'comments',
    'Journals': 'journals',
    'Watches': 'watches',
    'Favorites': 'favorites',
    'Private Messages': 'privateMessages'
};

function updateCount()
{
    var request = new XMLHttpRequest();
    request.addEventListener('load', function () {
        var document = this.responseXML;

        if (document.querySelector('a[href="/login/"]')) {
            itemCounts = null;
            updateValues();
            return;
        }

        itemCounts = {
            'submissions': 0,
            'comments': 0,
            'journals': 0,
            'watches': 0,
            'favorites': 0,
            'privateMessages': 0
        };

        var lists = document.getElementsByClassName('alt1 addpad');
        var links;
        var node;
        var matchResult;
        var itemKey;

        for (var i = 0; i < lists.length; ++i) {
            links = lists[i].getElementsByTagName('a');

            for (var j = 0; j < links.length; ++j) {
                node = links[j];
                matchResult = node.textContent.match(/^(\d+) (.+)$/);

                if (null === matchResult || !matchResult[2] in itemMap) {
                    continue;
                }

                itemKey = itemMap[matchResult[2]];
                itemCounts[itemKey] = parseInt(matchResult[1]);
            }
        }

        updateValues();
    });

    request.open('GET', 'https://www.furaffinity.net/controls/messages/');
    request.responseType = 'document';
    request.send();
}

function updateValues()
{
    if (itemCounts === null) {
        browser.browserAction.setBadgeText({text: ''});
        return;
    }

    browser.storage.local.get(function (options) {
        var total = 0;
        total += false !== options.includeSubmissionsInSummary ? itemCounts.submissions : 0;
        total += false !== options.includeCommentsInSummary ? itemCounts.comments : 0;
        total += false !== options.includeJournalsInSummary ? itemCounts.journals : 0;
        total += false !== options.includeWatchesInSummary ? itemCounts.watches : 0;
        total += false !== options.includeFavoritesInSummary ? itemCounts.favorites : 0;
        total += false !== options.includePrivateMessagesInSummary ? itemCounts.privateMessages : 0;

        if (total > 0) {
            browser.browserAction.setBadgeBackgroundColor({color: '#AA0000'});
            browser.browserAction.setBadgeText({text: total.toString()});
        } else {
            browser.browserAction.setBadgeText({text: ''});
        }
    });
}

updateTimeout();

browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.action) {
        case 'optionsChange':
            updateValues();
            break;

        case 'itemCountsChange':
            itemCounts = message.itemCounts;
            updateValues();
            break;

        case 'getItemCounts':
            sendResponse({itemCounts: itemCounts});
            break;
    }
});
