function saveOptions() {
    browser.storage.local.set({
        updateInterval: parseInt(document.querySelector('#updateInterval').value),
        includeSubmissionsInSummary: document.querySelector('#includeSubmissionsInSummary').checked,
        includeCommentsInSummary: document.querySelector('#includeCommentsInSummary').checked,
        includeJournalsInSummary: document.querySelector('#includeJournalsInSummary').checked,
        includeWatchesInSummary: document.querySelector('#includeWatchesInSummary').checked,
        includeFavoritesInSummary: document.querySelector('#includeFavoritesInSummary').checked,
        includePrivateMessagesInSummary: document.querySelector('#includePrivateMessagesInSummary').checked
    });

    browser.runtime.sendMessage({'action': 'optionsChange'});
}

function restoreOptions() {
    browser.storage.local.get(function (result) {
        document.querySelector("#updateInterval").value = result.updateInterval || 5;
        document.querySelector("#includeSubmissionsInSummary").checked = result.includeSubmissionsInSummary !== false;
        document.querySelector("#includeCommentsInSummary").checked = result.includeCommentsInSummary !== false;
        document.querySelector("#includeJournalsInSummary").checked = result.includeJournalsInSummary !== false;
        document.querySelector("#includeWatchesInSummary").checked = result.includeWatchesInSummary !== false;
        document.querySelector("#includeFavoritesInSummary").checked = result.includeFavoritesInSummary !== false;
        document.querySelector("#includePrivateMessagesInSummary").checked = result.includePrivateMessagesInSummary !== false;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
