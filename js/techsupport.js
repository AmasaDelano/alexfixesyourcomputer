(function () {
    "use strict";

    var APP = angular.module("techsupport", ['ngRoute']);

    APP.controller("TabController", function ($location) {
        var tabCtrl = this,
            tabs = ["support", "thoughts", "contact"],
            routeTabName = $location.path().substr(1),
            isTab = function (tab) {
                return tab === tabCtrl.currentTab;
            },
            setTab = function (newTab) {
                tabCtrl.currentTab = newTab;
            };

        tabCtrl.currentTab = tabs.indexOf(routeTabName) + 1;
        tabCtrl.currentTab = tabCtrl.currentTab || 1;

        // Assign public functions to controller
        tabCtrl.isTab = isTab;
        tabCtrl.setTab = setTab;
    });

    APP.controller("OsController", function () {
        var osCtrl = this,
            platform = navigator.userAgent,
            supportedOses = [
                {
                    platforms: /Windows|Win32/i,
                    displayName: "Windows",
                    longTermDownload: "http://download.teamviewer.com/download/TeamViewer_Setup_en.exe",
                    shortTermDownload: "http://download.teamviewer.com/download/TeamViewerQS_en.exe"
                },
                {
                    platforms: /Mac/i,
                    displayName: "Mac",
                    longTermDownload: "http://download.teamviewer.com/download/TeamViewer.dmg",
                    shortTermDownload: "http://download.teamviewer.com/download/TeamViewerQS.dmg"
                },
                {
                    platforms: /Linux/i,
                    displayName: "Linux",
                    longTermDownload: "http://download.teamviewer.com/download/teamviewer_i386.deb",
                    shortTermDownload: "http://download.teamviewer.com/download/teamviewer_qs.tar.gz"
                },
                {
                    platforms: /Android/i,
                    displayName: "Android",
                    longTermDownload: "https://play.google.com/store/apps/details?id=com.teamviewer.teamviewer.market.mobile",
                    shortTermDownload: "https://play.google.com/store/apps/details?id=com.teamviewer.quicksupport.market"
                },
                {
                    platforms: /iPhone|iPod|iPad/i,
                    displayName: "iOS",
                    longTermDownload: "https://itunes.apple.com/us/app/teamviewer/id692035811",
                    downloadPath: "https://itunes.apple.com/us/app/teamviewer-quicksupport/id661649585"
                }
            ],
            definiteOsIndex = -1,
            osIndex,
            multipleOses = function () {
                return osCtrl.possibleOses && osCtrl.possibleOses.length > 1;
            };

        // Figure out which OSes are possible
        osCtrl.possibleOses = [];
        for (osIndex = 0; osIndex < supportedOses.length; osIndex += 1) {
            if (supportedOses[osIndex].platforms.test(platform)) {
                definiteOsIndex = osIndex;
                break;
            }
        }
        if (definiteOsIndex === -1) { // || true) {
            osCtrl.possibleOses = supportedOses;
        } else {
            osCtrl.possibleOses = [ supportedOses[definiteOsIndex] ];
        }

        // Assign public functions to controller
        osCtrl.multipleOses = multipleOses;
    });

}());