/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';


importScripts("scripts/sw/sw-toolbox.js","scripts/sw/runtime-caching.js");


/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [["clienti.html","f78ceb5b0ed1eb8180957a7543748380"],["elements.html","5f34fe21382851361f66e830cd6d73d9"],["images/adwords1.jpg","dcd527cde86eb27844ab925ecd50d8cc"],["images/bg.jpg","a767849a1150eb5c8e6cc687aa3228d2"],["images/bg.png","518a64ef8463b4fab56458ba66ad903e"],["images/copywrite.jpg","5edcc5f408af933a5969347eb7fe423d"],["images/email-marketing.jpg","212b376e5e6bbca546f7276c459ba385"],["images/graphic.jpg","59b2dc07ea45bf34f8f65d02f1f27031"],["images/icons/android-icon-144x144.png","6957dde047aa73ffd918db7fd0add6b5"],["images/icons/android-icon-192x192.png","d9e29a1f129e991fa579237826e200ae"],["images/icons/android-icon-36x36.png","1ffa94b7a77741ff7ef04fbd08e58c45"],["images/icons/android-icon-48x48.png","f8517f5284676fb1a487d5a8216d6442"],["images/icons/android-icon-72x72.png","eb18faf08a3d184dd250e42f2f470bf2"],["images/icons/android-icon-96x96.png","85607940f9e2d228bf2b2f1855fc4eb6"],["images/icons/apple-icon-114x114.png","22735b520af92b5d8daff9db3cd00f46"],["images/icons/apple-icon-120x120.png","294bbfcc99996ed28669153ddd763a5e"],["images/icons/apple-icon-144x144.png","6c673197b6a7263229fb8918dad876f9"],["images/icons/apple-icon-152x152.png","920c2422c61efaf96de2cdcb0970b9e1"],["images/icons/apple-icon-180x180.png","bb34653c0ab6a59ad2ff7b01b8c24cc2"],["images/icons/apple-icon-57x57.png","98661221927861fc37f26159ba4ce482"],["images/icons/apple-icon-60x60.png","126bea218e702717f16b0d8fc333237e"],["images/icons/apple-icon-72x72.png","eb18faf08a3d184dd250e42f2f470bf2"],["images/icons/apple-icon-76x76.png","c44345bf288114baa332373717c1c574"],["images/icons/apple-icon-precomposed.png","c90e877d2055b4030ddcb76435fda065"],["images/icons/apple-icon.png","c90e877d2055b4030ddcb76435fda065"],["images/icons/favicon-16x16.png","f323b51471fa88f89890d089cbccbdd1"],["images/icons/favicon-32x32.png","19f2d2ac92670a1f8fcc0a2be8fc9583"],["images/icons/favicon-96x96.png","85607940f9e2d228bf2b2f1855fc4eb6"],["images/icons/ms-icon-144x144.png","6c673197b6a7263229fb8918dad876f9"],["images/icons/ms-icon-150x150.png","148eacdf5d93a9fedf07f4c002ef410f"],["images/icons/ms-icon-310x310.png","8dad584d9f0bfd47805565c623d04b3a"],["images/icons/ms-icon-70x70.png","3838c6c993fec02ff825aea3acfcfb03"],["images/paid-advertising.jpg","fa2b9f4e538b6eb15d66b5f3580582bc"],["images/parteneri/pap-tot.jpg","af84b2cfc661858d02c8155de44fa535"],["images/pic01.jpg","6406f8a621ec46cc234623d4501f6853"],["images/sekko-light.png","d8ee1e86a19eb1ea50ae5b373c8c8c39"],["images/sekko-logo.png","9de57ced7bff580bf209db1f2c14f352"],["images/sekko-tree-dark.png","5bf522b6130e5adf9fe5f41d839537c2"],["images/sekko-tree-light-small.png","e3abb6222ead35dc7c21b15fc8169416"],["images/sekko-tree-light.png","3d53c75a52e78323c3d3e6073a3c2808"],["images/social-media-main.jpg","26085d581fe9e0b15038d543fe4f12b3"],["images/social-media.jpg","a5dc2c341cf987bc0dc17ca36a9d572a"],["images/strategy.jpg","1ce6bc58973d782987528d88aec88ad2"],["index.html","4fc0826dd8b2310a71a8a97775c2126b"],["manifest.json","fa91dd6a87244f76296bcf46e7963210"],["scripts/main.js","6403d9899e86250abc1b7965013b4725"],["scripts/main.min.js","37b1c73784ee38bf4abf9872ab5dd178"],["scripts/sw/runtime-caching.js","4f3881ee12be74267853341468418ccb"],["scripts/sw/sw-toolbox.js","42dd9073ba0a0c8e0ae2230432870678"],["styles/main.css","4d73fb9a351aed622497d117506f3bfe"]];
/* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-sekko-front-end-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var getCacheBustedUrl = function (url, now) {
    now = now || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') + 'sw-precache=' + now;

    return urlWithCacheBusting.toString();
  };

var populateCurrentCacheNames = function (precacheConfig,
    cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  var now = Date.now();

  event.waitUntil(
    caches.keys().then(function(allCacheNames) {
      return Promise.all(
        Object.keys(CurrentCacheNamesToAbsoluteUrl).filter(function(cacheName) {
          return allCacheNames.indexOf(cacheName) === -1;
        }).map(function(cacheName) {
          var urlWithCacheBusting = getCacheBustedUrl(CurrentCacheNamesToAbsoluteUrl[cacheName],
            now);

          return caches.open(cacheName).then(function(cache) {
            var request = new Request(urlWithCacheBusting, {credentials: 'same-origin'});
            return fetch(request).then(function(response) {
              if (response.ok) {
                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName], response);
              }

              console.error('Request for %s returned a response with status %d, so not attempting to cache it.',
                urlWithCacheBusting, response.status);
              // Get rid of the empty cache if we can't add a successful response to it.
              return caches.delete(cacheName);
            });
          });
        })
      ).then(function() {
        return Promise.all(
          allCacheNames.filter(function(cacheName) {
            return cacheName.indexOf(CacheNamePrefix) === 0 &&
                   !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      });
    }).then(function() {
      if (typeof self.skipWaiting === 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command === 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    var navigateFallback = '';
    // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
    // supported yet:
    // https://code.google.com/p/chromium/issues/detail?id=540967
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
    if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
        event.request.headers.get('accept').includes('text/html')) {
      var navigateFallbackUrl = new URL(navigateFallback, self.location);
      cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
    }

    if (cacheName) {
      event.respondWith(
        // Rely on the fact that each cache we manage should only have one entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              if (response) {
                return response;
              }
              // If for some reason the response was deleted from the cache,
              // raise and exception and fall back to the fetch() triggered in the catch().
              throw Error('The cache ' + cacheName + ' is empty.');
            });
          });
        }).catch(function(e) {
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});

